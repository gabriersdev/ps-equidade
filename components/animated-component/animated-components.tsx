"use client";

import AnimatedComponent from "./animated-component";
import { AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedComponentsProps {
  children?: ReactNode;
}

export default function AnimatedComponents({
  children = <></>,
}: AnimatedComponentsProps) {
  if (Array.isArray(children)) {
    return (
      <>
        {children.map((child, key) => (
          <AnimatePresence mode="wait" key={key}>
            <AnimatedComponent>{child}</AnimatedComponent>
          </AnimatePresence>
        ))}
      </>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <AnimatedComponent>{children}</AnimatedComponent>
    </AnimatePresence>
  );
}
