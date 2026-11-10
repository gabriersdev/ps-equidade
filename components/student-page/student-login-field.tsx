"use client";

import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { APPLE_REDUCED_TRANSITION, APPLE_SPRING_SNAPPY } from "@/libs/apple-motion";

interface StudentLoginFieldProps {
  id: string;
  label: string;
  hint?: string;
  inputMode: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder: string;
  value: string;
  error?: string;
  disabled: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

export function StudentLoginField({
  id,
  label,
  hint,
  inputMode,
  placeholder,
  value,
  error,
  disabled,
  inputRef,
  onChange,
  onBlur,
}: StudentLoginFieldProps) {
  const prefersReducedMotion = useReducedMotion();
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-brand-ink">
        <span>{label}</span>
        {hint && (
          <span className="text-small block font-normal text-black/60">{hint}</span>
        )}
      </label>

      <input
        id={id}
        ref={inputRef}
        type="text"
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required
        disabled={disabled}
        autoComplete="off"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-md border bg-white px-3.5 py-2.5 text-base text-brand-ink transition-[border-color,outline-color] duration-100 placeholder:text-black/40 focus:outline-2 disabled:cursor-not-allowed disabled:bg-brand-canvas disabled:opacity-70 ${
          error
            ? "border-brand-secondary focus:border-brand-secondary focus:outline-brand-secondary/25"
            : "border-black/25 focus:border-brand-tertiary focus:outline-brand-tertiary/25"
        }`}
      />

      <AnimatePresence>
        {error && (
          <motion.span
            id={errorId}
            role="alert"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={prefersReducedMotion ? APPLE_REDUCED_TRANSITION : APPLE_SPRING_SNAPPY}
            className="text-small mt-1.5 block font-medium text-brand-secondary"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

