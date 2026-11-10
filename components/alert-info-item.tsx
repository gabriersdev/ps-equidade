"use client";

import { useState } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform, type PanInfo } from "framer-motion";
import { renderText } from "@/libs/render-text";
import type { AppAlert } from "@/resources/alerts-data";
import { APPLE_REDUCED_TRANSITION, APPLE_SPRING_DEFAULT, APPLE_SPRING_MOMENTUM, projectMomentum } from "@/libs/apple-motion";

interface AlertInfoItemProps {
  alert: AppAlert;
  onDismiss: (id: string) => void;
}

export function AlertInfoItem({ alert, onDismiss }: AlertInfoItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const [dismissDirection, setDismissDirection] = useState<number>(0);
  const x = useMotionValue(0);
  const dragOpacity = useTransform(x, [-240, 0, 240], [0.25, 1, 0.25]);

  function handleDragEnd(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    const projectedX = info.offset.x + projectMomentum(info.velocity.x, 0.992);
    if (Math.abs(projectedX) > 135 || Math.abs(info.offset.x) > 110) {
      setDismissDirection((projectedX || info.offset.x) >= 0 ? 1 : -1);
      onDismiss(alert.id);
    }
  }

  return (
    <motion.section
      layout={!prefersReducedMotion}
      role="status"
      aria-label={`Aviso: ${alert.title}`}
      style={prefersReducedMotion ? undefined : { x, opacity: dragOpacity, touchAction: "pan-y" }}
      drag={prefersReducedMotion ? false : "x"}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.42}
      dragTransition={{ bounceStiffness: 420, bounceDamping: 40 }}
      onDragEnd={handleDragEnd}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={
        prefersReducedMotion
          ? { opacity: 0, transition: APPLE_REDUCED_TRANSITION }
          : {
              opacity: 0,
              x: dismissDirection !== 0 ? dismissDirection * 280 : 0,
              y: dismissDirection === 0 ? -8 : 0,
              transition: dismissDirection !== 0 ? APPLE_SPRING_MOMENTUM : APPLE_SPRING_DEFAULT,
            }
      }
      transition={prefersReducedMotion ? APPLE_REDUCED_TRANSITION : APPLE_SPRING_DEFAULT}
      className="bg-brand-notice mb-4 flex flex-col gap-3 rounded-md border border-black/10 px-5 py-5 text-white select-none sm:px-6"
    >
      <div className="flex w-full items-center justify-between gap-2">
        <span className="text-small font-normal text-white/85">aviso</span>
        <button
          type="button"
          onClick={() => {
            setDismissDirection(0);
            onDismiss(alert.id);
          }}
          aria-label={`Dispensar aviso: ${alert.title}`}
          className="inline-flex h-8 w-8 items-center justify-center rounded-sm text-white/90 transition-[transform,color,background-color] duration-100 ease-out hover:bg-white/15 hover:text-white active:scale-90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col gap-2 select-text">
        <h2 className="font-display m-0 p-0 text-xl font-semibold text-white sm:text-2xl">{renderText(alert.title)}</h2>
        <p className="m-0 p-0 text-base leading-[1.6] text-white/95">{renderText(alert.content)}</p>
      </div>
    </motion.section>
  );
}
