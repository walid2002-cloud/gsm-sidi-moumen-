"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type PortraitProps = {
  name: string;
  accent?: string;
  size?: "sm" | "lg";
  photo?: string;
};

function initials(name: string) {
  return name
    .replace("Maître ", "")
    .replace("Prof ", "")
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function slug(name: string) {
  return name.replace(/[^a-zA-Z0-9]/g, "-");
}

export function Portrait({ name, accent = "#6711EF", size = "sm", photo }: PortraitProps) {
  const large = size === "lg";

  if (photo) {
    return (
      <div className={`relative overflow-hidden ${large ? "h-full min-h-[460px] w-full" : "aspect-[4/5] w-full"}`}>
        <Image
          src={photo}
          alt={name}
          fill
          priority={large}
          sizes={large ? "(min-width: 1024px) 420px, 90vw" : "(min-width: 1024px) 360px, 50vw"}
          className="object-cover object-[center_12%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
        <div className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur">
          {initials(name)}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${large ? "h-full min-h-[420px] w-full" : "aspect-[4/5] w-full"}`}
      style={{
        background: `linear-gradient(160deg, ${accent} 0%, #0f172a 72%)`,
      }}
    >
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, #fff 0, transparent 40%)" }} />
      <svg
        viewBox="0 0 200 260"
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 ${large ? "h-[92%]" : "h-[95%]"} w-auto`}
        aria-hidden
      >
        <defs>
          <linearGradient id={`skin-${slug(name)}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f2d4b8" />
            <stop offset="100%" stopColor="#c9956c" />
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="250" rx="78" ry="28" fill="black" opacity="0.18" />
        <rect x="55" y="150" width="90" height="110" rx="28" fill={accent} />
        <rect x="62" y="168" width="76" height="92" rx="18" fill="#f8fafc" opacity="0.18" />
        <circle cx="100" cy="96" r="42" fill={`url(#skin-${slug(name)})`} />
        <path d="M62 92c8-34 68-34 76 2-18-18-58-18-76-2z" fill="#1e293b" />
        <circle cx="86" cy="98" r="4.2" fill="#0f172a" />
        <circle cx="114" cy="98" r="4.2" fill="#0f172a" />
        <path d="M90 116c8 8 14 8 22 0" fill="none" stroke="#7c4a2d" strokeWidth="2.2" strokeLinecap="round" />
        {large ? <rect x="78" y="188" width="44" height="8" rx="4" fill="#FFC502" /> : null}
      </svg>
      <div className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur">
        {initials(name)}
      </div>
    </div>
  );
}

export function FloatingPortrait({
  name,
  photo,
  title,
}: {
  name: string;
  photo?: string;
  title?: string;
}) {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-md"
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-brand/40 via-transparent to-accent/40 blur-2xl" />
      <div className="glass relative overflow-hidden rounded-[2rem] p-2 shadow-2xl shadow-brand/40">
        <div className="overflow-hidden rounded-[1.55rem]">
          <Portrait name={name} size="lg" photo={photo} />
        </div>
        <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/15 p-4 text-white backdrop-blur-xl">
          <p className="text-sm font-medium text-accent">{title ?? "Directeur pédagogique"}</p>
          <p className="text-xl font-semibold">{name}</p>
        </div>
      </div>
    </motion.div>
  );
}
