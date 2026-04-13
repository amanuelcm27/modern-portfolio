"use client";

import { motion } from "framer-motion";

export default function FooterSection() {
  return (
    <footer className="snap-pane flex min-h-screen items-end px-6 py-10 sm:px-10 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
        className="mx-auto w-full max-w-7xl border-t border-white/10 pt-6 text-xs uppercase tracking-[0.2em] text-slate-400"
      >
        <p>Amanuel Firew Lema</p>
        <p className="mt-2">Copyright 2026. All rights reserved.</p>
      </motion.div>
    </footer>
  );
}
