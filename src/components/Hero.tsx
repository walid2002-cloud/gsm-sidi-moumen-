"use client";

import Image from "next/image";
import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TEACHERS } from "@/lib/constants";
import { useI18n } from "@/components/LanguageProvider";

const STAFF = TEACHERS.filter((teacher) => teacher.name !== "Maître Mohssine");

function wallTiles(cols: number, rows: number) {
  return Array.from({ length: cols * rows }, (_, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const center = (cols - 1) / 2;
    const dist = Math.abs(col - center) / Math.max(center, 1);
    const hideCenter = dist < 0.18;
    return {
      teacher: STAFF[index % STAFF.length],
      col,
      row,
      dist,
      opacity: hideCenter ? 0.06 : 0.52 + dist * 0.42,
      blur: dist < 0.28 ? 1.1 : Math.min(dist * 0.55, 1.4),
    };
  });
}

export function Hero() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 40, damping: 24 });
  const y = useSpring(my, { stiffness: 40, damping: 24 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (event: MouseEvent) => {
      mx.set((event.clientX / window.innerWidth - 0.5) * 8);
      my.set((event.clientY / window.innerHeight - 0.5) * 6);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduce]);

  return (
    <section id="top" className="relative overflow-x-clip bg-[#0c0418] text-white">
      <div className="relative flex min-h-[100svh] flex-col">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_28%,rgba(103,17,239,0.45),transparent_52%),linear-gradient(180deg,#16082e_0%,#0c0418_58%,#07030f_100%)]" />

        <motion.div
          aria-hidden
          style={reduce ? undefined : { x, y }}
          className="pointer-events-none absolute inset-x-0 top-0 h-[72%] overflow-hidden"
        >
          <div className="hero-wall hidden md:block">
            <div className="hero-wall-grid hero-wall-grid-desktop">
              {wallTiles(11, 5).map((tile, index) => (
                <WallScreen key={`d-${index}`} tile={tile} sizes="140px" />
              ))}
            </div>
          </div>
          <div className="hero-wall md:hidden">
            <div className="hero-wall-grid hero-wall-grid-mobile">
              {wallTiles(5, 3).map((tile, index) => (
                <WallScreen key={`m-${index}`} tile={tile} sizes="90px" />
              ))}
            </div>
          </div>
          <div className="hero-wall-fade" />
        </motion.div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pt-24 sm:pt-28">
          <div className="relative mx-auto flex w-full max-w-5xl flex-1 items-end justify-center">
            <motion.aside
              initial={reduce ? false : { opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="hero-glass absolute left-0 top-[30%] z-20 hidden w-[240px] p-4 lg:block"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-200/75">
                {t.hero.cardTeamTitle}
              </p>
              <p className="mt-2 text-[1.35rem] font-semibold leading-snug text-white">{t.hero.cardTeamText}</p>
              <span className="mt-3 block h-0.5 w-20 rounded-full bg-[#c4b5fd]" />
              <p className="mt-3 text-xs leading-relaxed text-violet-100/70">{t.hero.cardTeamHint}</p>
            </motion.aside>

            <motion.aside
              initial={reduce ? false : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.42 }}
              className="hero-glass absolute right-0 top-[30%] z-20 hidden w-[240px] p-4 lg:block"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-200/75">
                {t.hero.cardLevelsTitle}
              </p>
              <p className="mt-2 text-[1.35rem] font-semibold leading-snug text-white">{t.hero.cardLevelsText}</p>
              <span className="mt-3 block h-0.5 w-20 rounded-full bg-[#c4b5fd]" />
              <p className="mt-3 text-xs leading-relaxed text-violet-100/70">{t.hero.cardLevelsHint}</p>
            </motion.aside>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 -mb-6 h-[52vh] w-[min(94vw,600px)] sm:h-[58vh] lg:-mb-10 lg:h-[68vh]"
            >
              <Image
                src="/images/mohssine-hero-transparent.png"
                alt="Maître Mohssine"
                fill
                priority
                sizes="(min-width: 1024px) 600px, 94vw"
                className="object-contain object-bottom [filter:drop-shadow(0_18px_28px_rgba(12,4,24,0.35))]"
              />
            </motion.div>
          </div>

          <div className="relative z-20 mx-auto max-w-4xl pb-6 pt-1 text-center">
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="font-display text-[1.9rem] font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.65rem]"
            >
              <span className="block text-white">{t.hero.titleLine1}</span>
              <span className="mt-1 block italic text-[#d8b4fe]">{t.hero.titleLine2}</span>
            </motion.h1>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.32 }}
              className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-violet-100/70 sm:text-base"
            >
              {t.hero.subtitle}
            </motion.p>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.4 }}
              className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
            >
              <motion.a
                href="#niveaux"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="cta-shimmer inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 font-semibold shadow-lg shadow-brand/50"
              >
                {t.hero.ctaFormations}
                <ArrowRight size={18} className="rtl:rotate-180" />
              </motion.a>
              <motion.a
                href="#reservation"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 px-6 py-3.5 font-semibold backdrop-blur transition hover:bg-white/16"
              >
                {t.hero.ctaWeek}
              </motion.a>
            </motion.div>
          </div>
        </div>

        <HeroTeamStrip />
      </div>
    </section>
  );
}

function WallScreen({
  tile,
  sizes,
}: {
  tile: ReturnType<typeof wallTiles>[number];
  sizes: string;
}) {
  return (
    <div
      className="hero-screen"
      style={{
        opacity: tile.opacity,
        filter: `blur(${tile.blur}px)`,
      }}
    >
      <Image
        src={tile.teacher.photo}
        alt=""
        fill
        sizes={sizes}
        quality={40}
        className="object-cover object-top"
      />
      <div className="absolute inset-0 bg-[#4e0bb8]/35 mix-blend-multiply" />
      <div className="absolute inset-0 bg-violet-950/25" />
    </div>
  );
}

function HeroTeamStrip() {
  const { t } = useI18n();
  const loop = [...TEACHERS, ...TEACHERS];

  return (
    <div className="relative z-20 border-t border-white/10 bg-[#07030f]/80 py-4 backdrop-blur-md">
      <div className="hero-marquee-mask">
        <div className="hero-marquee flex w-max gap-3 px-4">
          {loop.map((teacher, index) => (
            <article
              key={`${teacher.name}-${index}`}
              className="flex w-[168px] shrink-0 items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 p-2"
            >
              <div className="relative h-12 w-12 overflow-hidden rounded-xl">
                <Image
                  src={teacher.photo}
                  alt={teacher.name}
                  fill
                  sizes="48px"
                  quality={45}
                  loading="lazy"
                  className="object-cover object-[center_20%]"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold leading-tight text-white">{teacher.name}</p>
                <p className="truncate text-[10px] text-violet-200/70">{t.role[teacher.name]}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
