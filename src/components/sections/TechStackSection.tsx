"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const TechNetworkScene = dynamic(() => import("@/components/three/TechNetworkScene"), {
  ssr: false,
  loading: () => <div className="h-[340px] w-full animate-pulse rounded-2xl bg-slate-900/40" />,
});

export default function TechStackSection() {
  const mobileStacks = [
    "Django",
    "REST Framework",
    "NextJS",
    "React Native",
    "Postgres",
    "TensorFlow",
    "PyTorch",
    "RAG",
    "Agents",
  ];

  return (
    <section id="tech" className="snap-pane px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl content-center gap-10">
        <SectionHeading
          eyebrow="Tech Stack"
          title="My Tech stacks"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="glass glow-border rounded-3xl p-4 sm:p-5"
        >
          <div className="relative h-[420px] w-full overflow-hidden rounded-2xl sm:h-[520px] lg:h-[580px]">
            <div className="absolute inset-0 flex items-center justify-center md:hidden">
              <div className="grid w-full max-w-xl gap-3 px-4 py-6">
                {mobileStacks.map((stack, index) => (
                  <motion.div
                    key={stack}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.35 }}
                    className="rounded-2xl border border-white/10 bg-[#0b1220] px-4 py-3 text-sm text-slate-100 shadow-lg shadow-black/25"
                  >
                    <span className="text-xs uppercase tracking-[0.18em] text-orange-200">{stack}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="hidden h-full w-full md:block">
            <TechNetworkScene />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
