"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PHOTOS, STATS } from "@/lib/constants";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/components/LanguageProvider";

function Counter({ value, suffix, light }: { value: number; suffix: string; light?: boolean }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const obj = { n: 0 };
        gsap.to(obj, {
          n: value,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => setDisplay(Math.round(obj.n)),
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span
      ref={ref}
      className={`font-display text-4xl font-semibold sm:text-5xl ${light ? "text-white" : "text-brand"}`}
    >
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  const { t } = useI18n();
  const labels = [t.stats.students, t.stats.teachers, t.stats.success, t.stats.years];
  return (
    <section id="impact" className="px-4 py-8">
      <Reveal>
        <div className="relative mx-auto min-h-[420px] max-w-7xl overflow-hidden rounded-[2.2rem] shadow-2xl shadow-brand/20">
          <Image
            src={PHOTOS.event}
            alt={t.stats.alt}
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover object-center"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/35" />
          <div className="relative px-6 py-14 sm:px-10 sm:py-16">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">{t.stats.kicker}</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-white sm:text-4xl">
              {t.stats.title}
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((stat, index) => (
                <Reveal
                  key={stat.label}
                  delay={index * 0.08}
                  className="rounded-3xl border border-white/15 bg-white/10 px-4 py-6 text-center backdrop-blur-xl"
                >
                  <Counter value={stat.value} suffix={stat.suffix} light />
                  <p className="mt-2 text-sm font-medium text-violet-100">{labels[index]}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
