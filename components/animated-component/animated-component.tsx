"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import {
  APPLE_REDUCED_TRANSITION,
  APPLE_SPRING_DEFAULT,
} from "@/libs/apple-motion";

interface AnimatedComponentProps {
  children: ReactNode;
}

export default function AnimatedComponent({ children }: AnimatedComponentProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={APPLE_REDUCED_TRANSITION}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={APPLE_SPRING_DEFAULT}
    >
      {children}
    </motion.div>
  );
}
