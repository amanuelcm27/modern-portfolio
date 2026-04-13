"use client";

import { RefObject, ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FloatingNavProps = {
  containerRef: RefObject<HTMLElement | null>;
};

type Item = {
  id: string;
  label: string;
  icon: ReactNode;
};

const navItems: Item[] = [
  {
    id: "hero",
    label: "Home",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
      </svg>
    ),
  },
  {
    id: "about",
    label: "About",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="7" r="3" />
        <path d="M5 21c1.5-4 4-6 7-6s5.5 2 7 6" />
      </svg>
    ),
  },
  {
    id: "experience",
    label: "Experience",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="7" width="18" height="12" rx="2" />
        <path d="M9 7V5h6v2" />
        <path d="M3 12h18" />
      </svg>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 7h18" />
        <path d="M6 7V5h12v2" />
        <rect x="4" y="7" width="16" height="12" rx="2" />
      </svg>
    ),
  },
  {
    id: "skills",
    label: "Skills",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 20V10" />
        <path d="M10 20V4" />
        <path d="M16 20v-7" />
        <path d="M22 20v-4" />
      </svg>
    ),
  },
  {
    id: "tech",
    label: "Tech",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="2" />
        <circle cx="5" cy="12" r="2" />
        <circle cx="19" cy="12" r="2" />
        <path d="M7 12h3" />
        <path d="M14 12h3" />
      </svg>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
];

export default function FloatingNav({ containerRef }: FloatingNavProps) {
  const [active, setActive] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateActive = () => {
      const scrollTop = container.scrollTop;
      let nearest = "hero";
      let nearestDistance = Number.POSITIVE_INFINITY;

      navItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (!element) return;
        const distance = Math.abs(element.offsetTop - scrollTop - 120);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = item.id;
        }
      });

      setActive(nearest);
    };

    updateActive();
    container.addEventListener("scroll", updateActive, { passive: true });
    return () => container.removeEventListener("scroll", updateActive);
  }, [containerRef]);

  const jumpTo = (id: string) => {
    const container = containerRef.current;
    const element = document.getElementById(id);
    if (!container || !element) return;

    container.scrollTo({
      top: element.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="fixed right-5 top-1/2 z-[98] hidden -translate-y-1/2 md:block">
        <div className="glass rounded-2xl border border-white/10 px-2 py-2 shadow-2xl shadow-black/30">
          <ul className="grid gap-2">
            {navItems.map((item) => {
              const isActive = active === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => jumpTo(item.id)}
                    className={`group relative flex h-10 w-10 items-center justify-center rounded-xl text-sm transition-all ${
                      isActive ? "text-orange-100" : "text-slate-300 hover:text-white"
                    }`}
                    aria-label={item.label}
                  >
                    <span className="grid h-6 w-6 place-items-center">{item.icon}</span>
                    <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full border border-white/10 bg-[#0b1220] px-3 py-1 text-xs uppercase tracking-[0.16em] opacity-0 shadow-lg shadow-black/30 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-1">
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="fixed bottom-5 right-5 z-[99] md:hidden">
        <button
          className="glass rounded-full border border-white/10 p-3 text-slate-100"
          onClick={() => setMobileOpen((state) => !state)}
          aria-label="Toggle navigation"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 7h16" />
            <path d="M4 12h16" />
            <path d="M4 17h16" />
          </svg>
        </button>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.22 }}
              className="absolute bottom-14 right-0 w-52 rounded-2xl border border-white/10 bg-[#0b1220]/96 p-2 shadow-2xl shadow-black/40 backdrop-blur-lg"
            >
              <ul className="grid gap-1">
                {navItems.map((item) => {
                  const isActive = active === item.id;

                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          jumpTo(item.id);
                          setMobileOpen(false);
                        }}
                        className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs uppercase tracking-[0.16em] ${
                          isActive ? "bg-orange-400/20 text-orange-100" : "text-slate-200 hover:bg-white/8"
                        }`}
                      >
                        <span className="grid h-5 w-5 place-items-center">{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}
