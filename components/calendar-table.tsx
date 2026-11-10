"use client";

import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";
import type { CalendarEvent } from "@/resources/calendar-events";
import { CalendarTableGrid } from "@/components/calendar-table-grid";
import { buildCalendarWeeks, getCalendarBounds } from "@/libs/calendar-utils";
import { APPLE_REDUCED_TRANSITION, APPLE_SPRING_SNAPPY, projectMomentum } from "@/libs/apple-motion";

interface CalendarViewProps {
  events: CalendarEvent[];
  currentDate: moment.Moment | null;
}

export default function CalendarTable({ events, currentDate }: CalendarViewProps) {
  const prefersReducedMotion = useReducedMotion();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canSwipeMonths, setCanSwipeMonths] = useState(false);
  const { minDate, maxDate } = getCalendarBounds(events);

  const [[currentMonth, direction], setMonthState] = useState<[moment.Moment, number]>(() => {
    const startMonth = moment().startOf("month");
    if (startMonth.isBefore(minDate, "month")) return [minDate.clone(), 0];
    if (startMonth.isAfter(maxDate, "month")) return [maxDate.clone(), 0];
    return [startMonth, 0];
  });

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    function updateSwipeCapability() {
      if (!container) return;
      setCanSwipeMonths(container.scrollWidth <= container.clientWidth + 1);
    }
    updateSwipeCapability();
    const observer = new ResizeObserver(updateSwipeCapability);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const isAtMin = currentMonth.isSameOrBefore(minDate, "month");
  const isAtMax = currentMonth.isSameOrAfter(maxDate, "month");

  function prevMonth() {
    setMonthState(([prev]) => {
      const next = prev.clone().subtract(1, "month");
      return next.isBefore(minDate, "month") ? [prev, 0] : [next, -1];
    });
  }

  function nextMonth() {
    setMonthState(([prev]) => {
      const next = prev.clone().add(1, "month");
      return next.isAfter(maxDate, "month") ? [prev, 0] : [next, 1];
    });
  }

  function handleSwipeEnd(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    const projectedX = info.offset.x + projectMomentum(info.velocity.x, 0.992);
    if (projectedX < -95 && !isAtMax) nextMonth();
    else if (projectedX > 95 && !isAtMin) prevMonth();
  }

  const weeks = buildCalendarWeeks(currentMonth);
  const isDragEnabled = !prefersReducedMotion && canSwipeMonths;

  return (
    <div className="mt-3 mb-6 rounded-lg border border-black/10 bg-white p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-2 sm:gap-3">
        <button type="button" onClick={prevMonth} disabled={isAtMin} className="rounded-md border border-brand-primary bg-brand-primary px-2.5 py-1.5 text-small font-medium text-white transition-[transform,background-color,border-color,opacity] duration-100 ease-out hover:border-brand-tertiary hover:bg-brand-tertiary active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-45 sm:px-3">
          Anterior
        </button>
        <h2 className="font-display m-0 text-center text-base font-semibold capitalize text-brand-primary sm:text-2xl">
          {currentMonth.format("MMMM YYYY")}
        </h2>
        <button type="button" onClick={nextMonth} disabled={isAtMax} className="rounded-md border border-brand-secondary bg-brand-secondary px-2.5 py-1.5 text-small font-medium text-white transition-[transform,background-color,border-color,opacity] duration-100 ease-out hover:border-[#973D38] hover:bg-[#973D38] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-45 sm:px-3">
          Próximo
        </button>
      </div>
      <div ref={scrollContainerRef} className="overflow-x-auto overflow-y-visible rounded-md border border-black/10">
        <motion.div
          key={currentMonth.format("YYYY-MM")}
          drag={isDragEnabled ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.22}
          dragTransition={{ bounceStiffness: 420, bounceDamping: 40 }}
          onDragEnd={handleSwipeEnd}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: direction * 20 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
          transition={prefersReducedMotion ? APPLE_REDUCED_TRANSITION : APPLE_SPRING_SNAPPY}
          style={{ touchAction: isDragEnabled ? "pan-y" : "auto" }}
        >
          <CalendarTableGrid weeks={weeks} currentMonth={currentMonth} currentDate={currentDate} events={events} />
        </motion.div>
      </div>
    </div>
  );
}
