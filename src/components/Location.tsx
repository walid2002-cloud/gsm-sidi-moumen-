"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Clock, MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/constants";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/components/LanguageProvider";

const ease = [0.22, 1, 0.36, 1] as const;

export function Location() {
  const { t } = useI18n();
  const reduce = useReducedMotion();

  const facts = [
    { icon: MapPin, label: t.location.address, value: SITE.address, href: SITE.mapsUrl },
    { icon: Phone, label: t.location.phone, value: SITE.phoneDisplay, href: `tel:${SITE.phoneTel}` },
    { icon: Clock, label: t.location.hours, value: `${SITE.hoursWeek}\n${SITE.hoursSunday}` },
  ];

  return (
    <section id="localisation" className="relative overflow-hidden px-4 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-accent/10"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand">{t.location.kicker}</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t.location.title}</h2>
            <p className="mt-4 max-w-xl text-slate-600 dark:text-slate-400">{t.location.text}</p>
          </Reveal>
          <div className="mt-8 space-y-3">
            {facts.map((item, index) => {
              const Icon = item.icon;
              const inner = (
                <>
                  <motion.span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand"
                    whileHover={{ rotate: 12, scale: 1.08 }}
                    transition={{ duration: 0.45, ease }}
                  >
                    <Icon size={18} />
                  </motion.span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">{item.label}</span>
                    <span className="mt-1 block whitespace-pre-line font-medium">{item.value}</span>
                  </span>
                </>
              );
              return (
                <Reveal key={item.label} delay={0.08 * index}>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="glass flex items-start gap-4 rounded-2xl p-4 transition hover:shadow-lg hover:shadow-brand/10">
                      {inner}
                    </a>
                  ) : (
                    <div className="glass flex items-start gap-4 rounded-2xl p-4">{inner}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
          <motion.a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="maps-glow mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand/30"
          >
            <motion.span whileHover={{ rotate: -18 }} className="inline-flex">
              <MapPin size={18} />
            </motion.span>
            {t.location.openMaps}
          </motion.a>
        </div>

        <Reveal>
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-brand/20"
          >
            <div className="pointer-events-none absolute inset-0 z-10">
              {["top", "right", "bottom", "left"].map((side) => (
                <span key={side} className={`map-ray map-ray-${side}`} />
              ))}
            </div>
            <iframe
              title={t.location.mapTitle}
              src={SITE.mapsEmbed}
              className="h-[420px] w-full grayscale-[0.15] contrast-[1.05] sm:h-[520px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <motion.button
              type="button"
              aria-label={t.location.openMaps}
              onClick={() => window.open(SITE.mapsUrl, "_blank", "noopener,noreferrer")}
              initial={reduce ? false : { y: -160, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 420, damping: 14, delay: 0.35 }}
              className="pin-3d absolute left-1/2 top-[46%] z-20 -translate-x-1/2 -translate-y-full"
            >
              <span className="pin-pulse" />
              <span className="pin-head" />
              <span className="pin-point" />
            </motion.button>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
