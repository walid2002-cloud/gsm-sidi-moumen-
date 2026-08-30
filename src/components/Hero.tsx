"use client";

import dynamic from "next/dynamic";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { PHOTOS } from "@/lib/constants";
import { FloatingPortrait } from "@/components/Portrait";
import { useI18n } from "@/components/LanguageProvider";
import { useEffect } from "react";

const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-violet-950 via-slate-950 to-violet-900" />
  ),
});

export function Hero() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 60, damping: 20 });
  const y = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (event: MouseEvent) => {
      mx.set((event.clientX / window.innerWidth - 0.5) * 18);
      my.set((event.clientY / window.innerHeight - 0.5) * 12);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduce]);

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        {reduce ? (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(103,17,239,0.5),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(255,197,2,0.28),transparent_40%),linear-gradient(180deg,#0a0616,#16082e)]" />
        ) : (
          <HeroScene />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/35 via-slate-950/55 to-slate-950" />
        <div className="animated-gradient absolute -left-24 top-24 h-72 w-72 rounded-full opacity-30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-brand/35 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl items-center gap-10 px-4 pb-16 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20">
        <motion.div style={reduce ? undefined : { x, y }} className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-violet-100 backdrop-blur"
          >
            <Sparkles size={16} className="text-gold-soft" />
            {t.hero.badge}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            <span className="hero-shine">{t.hero.title}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-5 max-w-xl text-lg text-slate-300"
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <motion.a
              href="#niveaux"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="cta-shimmer inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 font-semibold shadow-lg shadow-brand/40"
            >
              {t.hero.ctaFormations}
              <ArrowRight size={18} className="rtl:rotate-180" />
            </motion.a>
            <motion.a
              href="#reservation"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3.5 font-semibold backdrop-blur transition hover:bg-white/20"
            >
              {t.hero.ctaWeek}
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="relative"
        >
          <FloatingPortrait name="Maître Mohssine" photo={PHOTOS.founder} title={t.hero.director} />
        </motion.div>
      </div>
    </section>
  );
}
