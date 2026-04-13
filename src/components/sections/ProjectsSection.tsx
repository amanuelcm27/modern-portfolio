"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/lib/content";
import { fadeUp, staggerContainer } from "@/lib/animations";

type Project = (typeof projects)[number];

export default function ProjectsSection() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="snap-pane px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl content-center gap-10">
        <SectionHeading eyebrow="Projects" title="Company and personal projects" />

        <motion.div
          variants={staggerContainer(0.06, 0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.button
              key={project.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              onClick={() => setActive(project)}
              className="group glass rounded-2xl border border-white/10 p-5 text-left transition-all hover:border-orange-300/60"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-orange-200">{project.category}</p>
              <p className="mt-3 text-xl font-semibold text-white">{project.title}</p>
              <p className="mt-3 text-sm text-slate-300 line-clamp-3">{project.description}</p>
              <p className="mt-5 text-xs uppercase tracking-[0.18em] text-slate-400 transition-colors group-hover:text-orange-100">
                View Details
              </p>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[110] grid place-items-center bg-black/70 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#0b1220] p-6 shadow-2xl shadow-black/40"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-orange-300">{active.category}</p>
              <h3 className="mt-2 text-3xl font-semibold text-white">{active.title}</h3>
              <p className="mt-4 text-sm text-slate-200">{active.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {active.stack.map((item) => (
                  <span key={item} className="rounded-full border border-white/20 px-3 py-1 text-xs text-slate-100">
                    {item}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setActive(null)}
                className="mt-6 rounded-full bg-orange-400 px-5 py-2 text-sm font-semibold text-black hover:bg-orange-300"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
