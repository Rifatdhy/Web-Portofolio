"use client";

import { memo } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

function LiquidAmbientInner() {
  const reduce = useReducedMotionSafe();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[2] overflow-hidden select-none print:hidden"
    >
      {/* Top / Hero Liquid Blob */}
      <div
        className={`liquid-orb liquid-orb-1 absolute top-[5%] left-[15%] w-[450px] h-[450px] md:w-[650px] md:h-[650px] -translate-x-1/2 rounded-full ${
          reduce ? "" : "animate-liquid-1"
        }`}
      />

      {/* Middle Projects / Skills Liquid Blob */}
      <div
        className={`liquid-orb liquid-orb-2 absolute top-[45%] right-[5%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] translate-x-1/4 rounded-full ${
          reduce ? "" : "animate-liquid-2"
        }`}
      />

      {/* Bottom Contact Liquid Blob */}
      <div
        className={`liquid-orb liquid-orb-3 absolute bottom-[10%] left-[20%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] -translate-x-1/3 rounded-full ${
          reduce ? "" : "animate-liquid-3"
        }`}
      />
    </div>
  );
}

export const LiquidAmbient = memo(LiquidAmbientInner, () => true);
export default LiquidAmbient;
