import type { Transition } from "framer-motion";

/**
 * Critically damped spring (damping ~1.0, response 0.4s) for standard UI transitions.
 * Interruptible and velocity-preserving without overshoot.
 */
export const APPLE_SPRING_DEFAULT: Transition = {
  type: "spring",
  duration: 0.4,
  bounce: 0,
};

/**
 * Snappier critically damped spring (damping ~1.0, response 0.3s) for menus,
 * popovers, segmented controls, and dismiss resets.
 */
export const APPLE_SPRING_SNAPPY: Transition = {
  type: "spring",
  duration: 0.3,
  bounce: 0,
};

/**
 * Under-damped spring (damping ~0.8) reserved strictly for momentum-driven
 * interactions such as flicks and swipe releases.
 */
export const APPLE_SPRING_MOMENTUM: Transition = {
  type: "spring",
  duration: 0.36,
  bounce: 0.2,
};

/**
 * Non-vestibular cross-fade transition for prefers-reduced-motion.
 */
export const APPLE_REDUCED_TRANSITION: Transition = {
  duration: 0.16,
  ease: "easeOut",
};

/**
 * Apple Designing Fluid Interfaces exponential momentum projection.
 */
export function projectMomentum(
  initialVelocity: number,
  decelerationRate = 0.998
): number {
  return ((initialVelocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/**
 * Progressive boundary resistance (rubber-banding) past edge limits.
 */
export function rubberband(
  overshoot: number,
  dimension: number,
  constant = 0.55
): number {
  if (dimension <= 0) return 0;
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

