"use client";

import { motion, useScroll, useSpring } from "framer-motion";

type ScrollProgressProps = {
  container: React.RefObject<HTMLElement | null>;
};

export default function ScrollProgress({ container }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll({ container });
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 24, mass: 0.12 });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[95] h-[3px] w-full origin-left bg-gradient-to-r from-orange-400 via-orange-300 to-cyan-300"
      style={{ scaleX }}
    />
  );
}
