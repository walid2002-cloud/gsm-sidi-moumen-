"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function MouseGlow() {
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const x = useSpring(mx, { stiffness: 50, damping: 20 });
  const y = useSpring(my, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const onMove = (event: MouseEvent) => {
      mx.set(event.clientX - 220);
      my.set(event.clientY - 220);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-0 hidden h-[440px] w-[440px] rounded-full bg-brand/10 blur-3xl dark:bg-brand-light/10 lg:block"
      style={{ left: x, top: y }}
    />
  );
}
