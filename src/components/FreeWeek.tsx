"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/components/LanguageProvider";

export function FreeWeek() {
  const { t } = useI18n();

  return (
    <section id="semaine-gratuite" className="px-4 py-16">
      <Reveal>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] bg-brand px-6 py-16 text-white shadow-2xl shadow-brand/30 sm:px-12">
          <div className="animated-gradient absolute -end-20 -top-20 h-64 w-64 rounded-full opacity-40 blur-2xl" />
          <div className="absolute bottom-0 start-10 h-40 w-40 rounded-full bg-gold/30 blur-3xl" />
          <div className="relative max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">{t.freeWeek.kicker}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-5xl">{t.freeWeek.title}</h2>
            <p className="mt-5 text-lg text-violet-100">{t.freeWeek.text}</p>
            <motion.a
              href="#reservation"
              whileHover={{ scale: 1.05, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-brand shadow-xl animate-[pulse-glow_2.4s_ease-in-out_infinite]"
            >
              {t.freeWeek.cta}
              <ArrowRight size={18} className="rtl:rotate-180" />
            </motion.a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
