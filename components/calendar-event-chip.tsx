"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { renderText } from "@/libs/render-text";
import type { CalendarEvent } from "@/resources/calendar-events";
import { APPLE_REDUCED_TRANSITION, APPLE_SPRING_SNAPPY } from "@/libs/apple-motion";

interface CalendarEventChipProps {
  event: CalendarEvent;
  isPast: boolean;
  preferBelow?: boolean;
  alignEdge?: "left" | "center" | "right";
}

export function CalendarEventChip({
  event,
  isPast,
  preferBelow = false,
  alignEdge = "center",
}: CalendarEventChipProps) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const tooltipId = useId();
  const prefersReducedMotion = useReducedMotion();
  const offsetY = preferBelow ? -4 : 4;

  const horizontalPositionClass =
    alignEdge === "left"
      ? "left-0"
      : alignEdge === "right"
        ? "right-0"
        : "left-1/2 -translate-x-1/2";

  const transformOrigin = `${preferBelow ? "top" : "bottom"} ${alignEdge}`;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsTooltipOpen(true)}
      onMouseLeave={() => setIsTooltipOpen(false)}
    >
      <button
        type="button"
        aria-describedby={isTooltipOpen ? tooltipId : undefined}
        onFocus={() => setIsTooltipOpen(true)}
        onBlur={() => setIsTooltipOpen(false)}
        onClick={() => setIsTooltipOpen((prev) => !prev)}
        className={`block w-full rounded-sm bg-brand-tertiary px-2 py-1.5 text-left text-white transition-[transform,background-color] duration-100 ease-out hover:bg-brand-primary active:scale-[0.97] ${isPast ? "opacity-50" : ""}`}
        style={{ fontSize: "0.875rem", lineHeight: 1.25 }}
      >
        <span className="flex items-center gap-1 font-bold">
          {event.timeInit.substring(0, 5)}
          {isPast && (
            <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 -960 960 960" width="14" fill="currentColor" aria-hidden="true">
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          )}
        </span>
        <span className="mt-0.5 line-clamp-2 block">{renderText(event.title)}</span>
      </button>

      <AnimatePresence>
        {isTooltipOpen && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: offsetY, scale: 0.96 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: offsetY, scale: 0.96 }}
            transition={prefersReducedMotion ? APPLE_REDUCED_TRANSITION : APPLE_SPRING_SNAPPY}
            style={{ transformOrigin }}
            className={`apple-chrome-tooltip pointer-events-none absolute z-30 w-max max-w-[220px] rounded-sm border border-white/20 px-2.5 py-1.5 text-white ${horizontalPositionClass} ${preferBelow ? "top-full mt-1.5" : "bottom-full mb-1.5"}`}
          >
            <span className="text-small block text-balance font-sans">{renderText(event.title)}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
