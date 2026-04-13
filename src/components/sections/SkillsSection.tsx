"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { skills } from "@/lib/content";
import { fadeUp, staggerContainer } from "@/lib/animations";

const levels: Record<string, number> = {
  Django: 95,
  "REST APIs": 92,
  PostgreSQL: 88,
  "System Design": 84,
  TensorFlow: 82,
  PyTorch: 80,
  "Scikit-learn": 90,
  "LLM Tooling": 84,
  React: 84,
  "Next.js": 78,
  "Tailwind CSS": 86,
};

export default function SkillsSection() {
  return (
    <section id="skills" className="snap-pane px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl content-center gap-10">
        <SectionHeading
          eyebrow="Skills"
          title="My Experience in each tech stack"
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {Object.entries(skills).map(([category, items], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="glass glow-border rounded-2xl p-5"
            >
              <p className="mb-4 text-sm uppercase tracking-[0.2em] text-orange-200">{category}</p>
              <motion.div variants={staggerContainer(0.02, 0.06)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-3">
                {items.map((skill) => (
                  <motion.div key={skill} variants={fadeUp} className="group">
                    <div className="mb-1 flex items-center justify-between text-xs text-slate-300">
                      <span className="group-hover:text-white">{skill}</span>
                      <span>{levels[skill]}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${levels[skill]}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-orange-400 to-cyan-300"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
