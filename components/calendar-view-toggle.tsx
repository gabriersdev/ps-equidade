"use client";

import { motion, useReducedMotion } from "framer-motion";
import { APPLE_SPRING_SNAPPY } from "@/libs/apple-motion";

export type CalendarViewType = "list" | "calendar";

const VIEW_OPTIONS: { id: CalendarViewType; label: string }[] = [
  { id: "list", label: "Lista" },
  { id: "calendar", label: "Tabela" },
];

interface CalendarViewToggleProps {
  viewType: CalendarViewType;
  onChange: (view: CalendarViewType) => void;
}

export function CalendarViewToggle({
  viewType,
  onChange,
}: CalendarViewToggleProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      role="group"
      aria-label="Alternar visualização do calendário"
      className="relative mb-3 grid grid-cols-2 rounded-lg border border-black/10 bg-white p-1"
    >
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{ x: viewType === "calendar" ? "100%" : "0%" }}
        transition={prefersReducedMotion ? { duration: 0.12 } : APPLE_SPRING_SNAPPY}
        className="pointer-events-none absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-md bg-brand-tertiary"
      />

      {VIEW_OPTIONS.map((option) => {
        const isSelected = viewType === option.id;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onChange(option.id)}
            className={`relative z-10 rounded-md px-4 py-1.5 text-center text-small font-medium transition-[color,transform] duration-150 ease-out focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-primary active:scale-[0.97] ${
              isSelected
                ? "text-white"
                : "text-brand-ink hover:text-brand-primary"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
