"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const HeroNeuralScene = dynamic(() => import("@/components/three/HeroNeuralScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-slate-900/40" />,
});

export default function HeroSection() {
  const headingWords = ["Amanuel", "Firew", "Lema"];

  return (
    <section id="hero" className="snap-pane relative isolate flex min-h-screen items-center px-6 py-12 sm:px-10 lg:px-16">
      <div className="absolute inset-0 -z-20">
        <HeroNeuralScene />
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-[64%]">
        <Image
          src="/my_pic.png"
          alt="Blended portrait background"
          fill
          sizes="(max-width: 1024px) 70vw, 50vw"
          className="object-cover object-top opacity-48 [mask-image:linear-gradient(to_left,black_72%,transparent),linear-gradient(to_bottom,black_72%,transparent)]"
          priority
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/30 via-[#07090f]/75 to-[#07090f]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(7,9,15,0.9),rgba(7,9,15,0.58)_52%,rgba(7,9,15,0.24))]" />

      <motion.div
        variants={staggerContainer(0.15, 0.12)}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-7xl"
      >
        <div>
          <motion.p variants={fadeUp} className="mb-5 text-xs uppercase tracking-[0.25em] text-orange-200/90">
            Full Stack + AI Engineer
          </motion.p>

          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {headingWords.map((word) => (
              <motion.span key={word} variants={fadeUp} className="mr-4 inline-block glow-text">
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p variants={fadeUp} className="mt-5 max-w-3xl text-base text-slate-200 sm:text-xl">
            Backend Engineer | Django Specialist | AI Engineer
          </motion.p>
          <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
            Building scalable backend systems and AI-powered applications
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="group rounded-full bg-orange-400 px-7 py-3 text-sm font-semibold text-black transition-all hover:scale-[1.03] hover:bg-orange-300"
            >
              View Work
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
            </a>
            <a
              href="#contact"
              className="glass glow-border rounded-full px-7 py-3 text-sm font-semibold text-orange-100 transition-all hover:scale-[1.03] hover:bg-white/10"
            >
              Contact Me
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
