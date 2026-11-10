"use client";

import { useEffect, useState } from "react";
import moment from "moment";
import { motion, useReducedMotion } from "framer-motion";
import "@/resources/resources";
import { appConfigs } from "@/resources/resources";
import { events } from "@/resources/calendar-events";
import CalendarButtons from "@/components/calendar-buttons";
import AnimatedComponents from "@/components/animated-component/animated-components";
import { PageHeading } from "@/components/page-heading";
import CalendarTable from "@/components/calendar-table";
import CalendarList from "@/components/calendar-list";
import {
  CalendarViewToggle,
  type CalendarViewType,
} from "@/components/calendar-view-toggle";
import {
  APPLE_REDUCED_TRANSITION,
  APPLE_SPRING_SNAPPY,
} from "@/libs/apple-motion";

moment.locale(appConfigs.locale);

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState<moment.Moment | null>(null);
  const [viewType, setViewType] = useState<CalendarViewType>("list");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setCurrentDate(moment());
  }, []);

  return (
    <AnimatedComponents>
      <div className="mt-6 mb-10 sm:mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <PageHeading title="Calendário" />
          <CalendarViewToggle viewType={viewType} onChange={setViewType} />
        </div>

        <motion.div
          key={viewType}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion ? APPLE_REDUCED_TRANSITION : APPLE_SPRING_SNAPPY
          }
        >
          {viewType === "list" ? (
            <CalendarList events={events} currentDate={currentDate} />
          ) : (
            <CalendarTable events={events} currentDate={currentDate} />
          )}
        </motion.div>

        <CalendarButtons events={events} />
      </div>
    </AnimatedComponents>
  );
}
