"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/components/LanguageProvider";

export function FAQ() {
  const { t } = useI18n();
  const [open, setOpen] = useState(0);
  const items = [
    { q: t.faqItems.q1, a: t.faqItems.a1 },
    { q: t.faqItems.q2, a: t.faqItems.a2 },
    { q: t.faqItems.q3, a: t.faqItems.a3 },
    { q: t.faqItems.q4, a: t.faqItems.a4 },
    { q: t.faqItems.q5, a: t.faqItems.a5 },
  ];

  return (
    <section id="faq" className="px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand">{t.faq.kicker}</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t.faq.title}</h2>
        </Reveal>
        <div className="mt-10 space-y-3">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <Reveal key={item.q} delay={index * 0.04}>
                <div className="glass rounded-2xl">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start font-semibold"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : index)}
                  >
                    {item.q}
                    <ChevronDown className={`shrink-0 transition ${isOpen ? "rotate-180" : ""}`} size={18} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-slate-600 dark:text-slate-400">{item.a}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
