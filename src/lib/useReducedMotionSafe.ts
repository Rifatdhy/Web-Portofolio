"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

const emptySubscribe = () => () => {};

export function useReducedMotionSafe(): boolean {
  const reduce = useReducedMotion();
  return useSyncExternalStore(
    emptySubscribe,
    () => Boolean(reduce),
    () => false
  );
}
