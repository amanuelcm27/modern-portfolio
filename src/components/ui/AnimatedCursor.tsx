"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function AnimatedCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const smoothX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.2 });
  const smoothY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.2 });

  useEffect(() => {
    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[90] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-300/60 bg-orange-200/10 blur-[0.2px] mix-blend-screen md:block"
        style={{ x: smoothX, y: smoothY }}
      />
      <motion.div
        className="pointer-events-none fixed z-[89] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-300 md:block"
        style={{ x: smoothX, y: smoothY }}
      />
    </>
  );
}
