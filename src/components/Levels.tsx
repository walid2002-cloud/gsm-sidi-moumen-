"use client";

import {
  Atom,
  BookOpen,
  FlaskConical,
  GraduationCap,
  Layers,
  Leaf,
  LineChart,
  NotebookPen,
  Pencil,
  Sigma,
  type LucideIcon,
} from "lucide-react";
import { LEVELS } from "@/lib/constants";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { WhatsAppGroupButton } from "@/components/WhatsAppGroupButton";
import { useI18n } from "@/components/LanguageProvider";

const ICONS: Record<string, LucideIcon> = {
  BookOpen,
  Pencil,
  NotebookPen,
  GraduationCap,
  Layers,
  Atom,
  LineChart,
  FlaskConical,
  Leaf,
  Sigma,
};

export function Levels() {
  const { t } = useI18n();
  return (
    <section id="niveaux" className="relative px-4 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-brand/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand">{t.levels.kicker}</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t.levels.title}</h2>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">{t.levels.subtitle}</p>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {LEVELS.map((level, index) => {
            const Icon = ICONS[level.icon];
            return (
              <Reveal key={level.id} delay={index * 0.04}>
                <TiltCard className="card-sheen glass group flex h-full flex-col rounded-3xl p-5 transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-brand/20">
                  <div
                    className={`mb-4 inline-flex rounded-2xl bg-gradient-to-br ${level.gradient} p-3 text-white shadow-lg`}
                  >
                    {Icon ? <Icon size={22} /> : null}
                  </div>
                  <h3 className="text-base font-semibold leading-snug">{t.level[level.id]}</h3>
                  <p className="mt-2 flex-1 text-sm text-slate-500 dark:text-slate-400">{t.levels.cardHint}</p>
                  <WhatsAppGroupButton levelId={level.id} />
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
