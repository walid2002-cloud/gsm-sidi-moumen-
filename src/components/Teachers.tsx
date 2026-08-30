"use client";

import { Reveal } from "@/components/Reveal";
import { TeachersCarousel } from "@/components/TeachersCarousel";
import { useI18n } from "@/components/LanguageProvider";

export function Teachers() {
  const { t } = useI18n();
  return (
    <section id="equipe" className="relative overflow-x-clip px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand">{t.teachers.kicker}</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.teachers.title}
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">{t.teachers.subtitle}</p>
        </Reveal>
        <TeachersCarousel />
      </div>
    </section>
  );
}
