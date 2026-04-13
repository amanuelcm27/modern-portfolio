"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainer(0.05, 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="max-w-3xl"
    >
      <motion.p variants={fadeUp} className="mb-3 text-xs uppercase tracking-[0.22em] text-orange-300/90">
        {eyebrow}
      </motion.p>
      <motion.h2 variants={fadeUp} className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
          {subtitle}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
