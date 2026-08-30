"use client";

import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/components/LanguageProvider";

export function Testimonials() {
  const { t } = useI18n();
  const quotes = [
    { name: TESTIMONIALS[0].name, role: t.testimonial.t1r, quote: t.testimonial.t1q },
    { name: TESTIMONIALS[1].name, role: t.testimonial.t2r, quote: t.testimonial.t2q },
    { name: TESTIMONIALS[2].name, role: t.testimonial.t3r, quote: t.testimonial.t3q },
  ];

  return (
    <section id="avis" className="px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand">{t.reviews.kicker}</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t.reviews.title}</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {quotes.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.08}>
              <article className="glass h-full rounded-[1.7rem] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/10">
                <div className="flex items-center justify-between">
                  <Quote className="text-brand" />
                  <div className="flex gap-0.5 text-gold" aria-label={t.reviews.stars}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-slate-700 dark:text-slate-200">&ldquo;{item.quote}&rdquo;</p>
                <p className="mt-6 font-semibold">{item.name}</p>
                <p className="text-sm text-slate-500">{item.role}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
