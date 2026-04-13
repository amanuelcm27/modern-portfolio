"use client";

import { AnimatePresence, motion } from "framer-motion";

type LoadingScreenProps = {
  loading: boolean;
};

export default function LoadingScreen({ loading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {loading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7 } }}
          className="fixed inset-0 z-[120] grid place-items-center bg-[#05070d]"
        >
          <div className="relative h-32 w-32">
            <motion.div
              className="absolute inset-0 rounded-full border border-orange-300/60"
              animate={{ rotate: 360 }}
              transition={{ duration: 2.3, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-3 rounded-full border border-cyan-300/50"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.7, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 grid place-items-center text-xs uppercase tracking-[0.32em] text-slate-300"
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              Loading
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
