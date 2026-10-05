"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "framer-motion";
import { TEACHERS } from "@/lib/constants";
import { Portrait } from "@/components/Portrait";
import { useI18n } from "@/components/LanguageProvider";

type Mode = "mobile" | "tablet" | "desktop";

function wrap(value: number, length: number) {
  return ((value % length) + length) % length;
}

function modeFromWidth(width: number): Mode {
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

function metrics(mode: Mode, stageWidth: number) {
  if (mode === "mobile") {
    const card = Math.min(stageWidth * 0.86, 340);
    return { card, step: card + 28, falloff: 0.72, depth: 0.35, tilt: 8 };
  }
  if (mode === "tablet") {
    return { card: 250, step: 278, falloff: 1.45, depth: 0.55, tilt: 20 };
  }
  return { card: 280, step: 312, falloff: 2.55, depth: 0.62, tilt: 26 };
}

const EASE = "power3.out";
const BASE_SPEED = 1.12;
const COUNT = TEACHERS.length;

export function TeachersCarousel() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const spotRefs = useRef<(HTMLElement | null)[]>([]);
  const glowRefs = useRef<(HTMLElement | null)[]>([]);
  const tweens = useRef<{ speed?: gsap.core.Tween; pop?: gsap.core.Tween; snap?: gsap.core.Tween }>({});
  const resumeTimer = useRef(0);
  const ctx = useRef({
    offset: 0,
    speed: BASE_SPEED,
    dragging: false,
    dragOrigin: 0,
    dragOffset: 0,
    hoverIndex: -1,
    animIndex: -1,
    rx: 0,
    ry: 0,
    targetRx: 0,
    targetRy: 0,
    lift: 0,
    pop: 0,
    spotX: 50,
    spotY: 40,
    mode: "desktop" as Mode,
    step: 312,
    falloff: 2.55,
    depth: 0.52,
    tilt: 16,
    card: 280,
    reduce: false,
  });

  useEffect(() => {
    const state = ctx.current;
    state.reduce = Boolean(reduceMotion);
    if (state.reduce) state.speed = 0;
  }, [reduceMotion]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const state = ctx.current;

    const layout = () => {
      const total = COUNT * state.step;
      state.rx += (state.targetRx - state.rx) * 0.18;
      state.ry += (state.targetRy - state.ry) * 0.18;

      for (let i = 0; i < COUNT; i += 1) {
        const el = cardRefs.current[i];
        if (!el) continue;

        let x = i * state.step - state.offset;
        x = wrap(x + total / 2, total) - total / 2;

        const tNorm = Math.min(Math.abs(x) / (state.step * state.falloff), 1);
        const scale = 1 - tNorm * 0.22;
        const rotateY = (x / state.step) * -state.tilt;
        const z = -Math.abs(x) * state.depth;
        const y = tNorm * 14;
        const opacity = 1 - tNorm * 0.42;
        const active =
          state.hoverIndex === i ||
          (state.hoverIndex < 0 &&
            state.animIndex === i &&
            (Math.abs(state.lift) > 0.15 || state.pop > 0.002));

        el.style.opacity = `${Math.max(opacity, 0.2)}`;
        el.style.zIndex = `${Math.max(1, Math.round(10 + z * 0.05) + (active ? 8 : 0))}`;
        el.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y + (active ? state.lift : 0)}px), ${z}px) rotateX(${active ? state.rx : 0}deg) rotateY(${rotateY + (active ? state.ry : 0)}deg) scale(${scale * (1 + (active ? state.pop : 0))})`;

        const glow = glowRefs.current[i];
        if (glow) glow.style.opacity = active ? "1" : "0";
        const spot = spotRefs.current[i];
        if (spot) {
          spot.style.opacity = active ? "1" : "0";
          spot.style.transform = `translate3d(${state.spotX}%, ${state.spotY}%, 0) translate(-50%, -50%)`;
        }
      }
    };

    const syncMetrics = () => {
      const width = stage.clientWidth || window.innerWidth;
      state.mode = modeFromWidth(width);
      const next = metrics(state.mode, width);
      state.card = next.card;
      state.step = next.step;
      state.falloff = next.falloff;
      state.depth = next.depth;
      state.tilt = next.tilt;
      cardRefs.current.forEach((el) => {
        if (el) el.style.width = `${next.card}px`;
      });
      layout();
    };

    const tick = () => {
      if (!state.dragging && !state.reduce) {
        state.offset += state.speed * gsap.ticker.deltaRatio();
      }
      state.offset = wrap(state.offset, COUNT * state.step);
      layout();
    };

    syncMetrics();
    const resize = new ResizeObserver(syncMetrics);
    resize.observe(stage);
    gsap.ticker.add(tick);

    return () => {
      window.clearTimeout(resumeTimer.current);
      tweens.current.speed?.kill();
      tweens.current.pop?.kill();
      tweens.current.snap?.kill();
      resize.disconnect();
      gsap.ticker.remove(tick);
    };
  }, []);

  const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const setSpeed = (value: number, duration: number) => {
    const state = ctx.current;
    if (state.reduce) {
      state.speed = 0;
      return;
    }
    tweens.current.speed?.kill();
    tweens.current.speed = gsap.to(state, { speed: value, duration, ease: EASE, overwrite: true });
  };

  const pause = () => {
    window.clearTimeout(resumeTimer.current);
    setSpeed(0, 0.75);
  };

  const scheduleResume = () => {
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      const state = ctx.current;
      if (state.dragging || state.hoverIndex !== -1) return;
      setSpeed(BASE_SPEED, 1.05);
    }, 1000);
  };

  const resetHoverMotion = () => {
    const state = ctx.current;
    state.targetRx = 0;
    state.targetRy = 0;
    tweens.current.pop?.kill();
    tweens.current.pop = gsap.to(state, {
      lift: 0,
      pop: 0,
      duration: 0.7,
      ease: EASE,
      onComplete: () => {
        if (state.hoverIndex < 0) state.animIndex = -1;
      },
    });
  };

  return (
    <div
      ref={stageRef}
      dir="ltr"
      className="relative mt-12 h-[520px] w-full sm:h-[540px] lg:h-[560px]"
      style={{ perspective: "1280px", perspectiveOrigin: "50% 46%", touchAction: "pan-y" }}
      role="region"
      aria-roledescription="carousel"
      aria-label={t.teachers.title}
      onPointerEnter={() => {
        if (finePointer()) pause();
      }}
      onPointerLeave={() => {
        if (!finePointer()) return;
        ctx.current.hoverIndex = -1;
        resetHoverMotion();
        scheduleResume();
      }}
      onPointerDown={(event) => {
        if (event.pointerType === "mouse") return;
        const state = ctx.current;
        state.dragging = true;
        state.dragOrigin = event.clientX;
        state.dragOffset = state.offset;
        tweens.current.snap?.kill();
        pause();
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        const state = ctx.current;
        if (!state.dragging) return;
        state.offset = state.dragOffset - (event.clientX - state.dragOrigin);
      }}
      onPointerUp={(event) => {
        const state = ctx.current;
        if (!state.dragging) return;
        state.dragging = false;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
        const snapped = Math.round(state.offset / state.step) * state.step;
        tweens.current.snap?.kill();
        tweens.current.snap = gsap.to(state, { offset: snapped, duration: 0.72, ease: EASE });
        scheduleResume();
      }}
      onPointerCancel={(event) => {
        const state = ctx.current;
        state.dragging = false;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
        scheduleResume();
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 start-0 z-20 w-12 bg-gradient-to-r from-background to-transparent sm:w-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 end-0 z-20 w-12 bg-gradient-to-l from-background to-transparent sm:w-20"
      />
      {TEACHERS.map((teacher, index) => (
        <article
          key={teacher.name}
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
          className="absolute left-1/2 top-1/2 cursor-pointer will-change-transform"
          style={{
            width: 280,
            transform: "translate3d(-50%, -50%, 0)",
            backfaceVisibility: "hidden",
          }}
          onPointerEnter={() => {
            if (!finePointer()) return;
            const state = ctx.current;
            pause();
            state.hoverIndex = index;
            state.animIndex = index;
            tweens.current.pop?.kill();
            tweens.current.pop = gsap.to(state, { lift: -18, pop: 0.05, duration: 0.7, ease: EASE });
          }}
          onPointerMove={(event) => {
            if (!finePointer() || ctx.current.dragging) return;
            const el = cardRefs.current[index];
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const px = (event.clientX - rect.left) / Math.max(rect.width, 1);
            const py = (event.clientY - rect.top) / Math.max(rect.height, 1);
            const state = ctx.current;
            state.hoverIndex = index;
            state.animIndex = index;
            state.targetRy = (px - 0.5) * 12;
            state.targetRx = (0.5 - py) * 10;
            state.spotX = px * 100;
            state.spotY = py * 100;
          }}
          onPointerLeave={() => {
            if (!finePointer()) return;
            ctx.current.hoverIndex = -1;
            resetHoverMotion();
          }}
        >
          <div
            ref={(el) => {
              glowRefs.current[index] = el;
            }}
            aria-hidden
            className="pointer-events-none absolute -inset-6 rounded-[2.2rem] opacity-0 blur-2xl"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, rgba(103,17,239,0.45), rgba(255,197,2,0.22) 42%, transparent 70%)",
              transition: "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
          <div className="glass relative overflow-hidden rounded-[1.75rem] shadow-[0_18px_50px_rgba(22,8,46,0.18)]">
            <div
              ref={(el) => {
                spotRefs.current[index] = el;
              }}
              aria-hidden
              className="pointer-events-none absolute z-10 h-44 w-44 rounded-full opacity-0"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(103,17,239,0.18) 38%, transparent 70%)",
                transform: "translate3d(50%, 30%, 0) translate(-50%, -50%)",
                transition: "opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
                willChange: "transform, opacity",
              }}
            />
            <div className="overflow-hidden">
              <Portrait
                name={teacher.name}
                accent={teacher.accent}
                photo={"photo" in teacher ? teacher.photo : undefined}
                imageClassName={
                  teacher.name === "Maître Mohssine" ||
                  teacher.name === "Prof El Boukhari" ||
                  teacher.name === "Prof Manoub" ||
                  teacher.name === "Prof Saouri Fouad" ||
                  teacher.name === "Prof Ayoub Ouatiki" ||
                  teacher.name === "Prof Driss" ||
                  teacher.name === "Prof Seddik" ||
                  teacher.name === "Prof Soultan" ||
                  teacher.name === "Prof Rami"
                    ? "object-[center_28%]"
                    : undefined
                }
              />
            </div>
            <div className="relative px-5 py-4">
              <h3 className="text-lg font-semibold tracking-tight">{teacher.name}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t.role[teacher.name]}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
