"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { stats } from "@/lib/content";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={sectionRef} id="about" className="snap-pane relative px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div style={{ y }}>
          <SectionHeading
            eyebrow="About Me"
            title="Who I Am"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="mt-6 max-w-2xl text-sm text-slate-300 sm:text-base"
          >
            I’m a backend-focused software engineer with strong experience in Django, API design, and system architecture. I work extensively with machine learning and deep learning models, integrating them into production systems through scalable backend infrastructures. I enjoy solving complex problems involving data flow, performance, and system design.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.05, 0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-4"
        >
          {stats.map((item) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              className="glass glow-border rounded-2xl p-5 transition-transform hover:-translate-y-1"
            >
              <p className="text-3xl font-semibold text-white sm:text-4xl">{item.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-300">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
