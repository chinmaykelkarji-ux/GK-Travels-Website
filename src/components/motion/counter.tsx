"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

/** Counts up to `value` once it scrolls into view. */
export function AnimatedCounter({ value, suffix = "", className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const display = useTransform(count, (latest) => Math.round(latest).toLocaleString("en-IN"));

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [isInView, shouldReduceMotion, value, count]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
