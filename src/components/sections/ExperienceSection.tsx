"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { featuredHighlights } from "@/lib/content";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function ExperienceSection() {
  return (
    <section id="experience" className="snap-pane relative overflow-hidden px-6 py-16 sm:px-10 lg:px-16">
      <div className="absolute inset-0 -z-10 bg-transparent" />
      <div className="absolute inset-0 -z-10 opacity-26 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-[#07090f] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-[#07090f] to-transparent" />

      <div className="mx-auto grid min-h-screen w-full max-w-7xl content-center gap-10">
        <SectionHeading
          eyebrow="Featured Project"
          title="Kazana Lighthouse"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.08, 0.1)}
          className="grid gap-4 md:grid-cols-2"
        >
          <motion.div variants={fadeUp} className="glass glow-border rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-orange-300">Role</p>
            <p className="mt-2 text-2xl font-semibold text-white">Backend Engineer + AI Agent Expert</p>
            <p className="mt-3 text-sm text-slate-300">
              Led system design and backend strategy for scalable data ingestion, API delivery, and AI-assisted funding recommendation workflows.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="glass glow-border rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-orange-300">System Focus</p>
            <ul className="mt-3 grid gap-2 text-sm text-slate-200">
              <li>Django backend architecture for modular services</li>
              <li>REST APIs for internal and external integrations</li>
              <li>Centralized database for subsidiary operations</li>
              <li>Data aggregation pipelines and resilient system design</li>
            </ul>
          </motion.div>

          {featuredHighlights.map((highlight) => (
            <motion.div
              key={highlight.title}
              variants={fadeUp}
              className="group glass rounded-2xl border border-white/10 p-5 transition-all hover:-translate-y-1 hover:border-orange-300/50"
            >
              <p className="text-lg font-semibold text-white">{highlight.title}</p>
              <p className="mt-2 text-sm text-slate-300 transition-colors group-hover:text-slate-100">{highlight.detail}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
