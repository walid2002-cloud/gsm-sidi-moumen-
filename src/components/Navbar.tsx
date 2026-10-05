"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { SITE } from "@/lib/constants";
import { LOCALES } from "@/lib/i18n";
import { useTheme } from "@/components/ThemeProvider";
import { useI18n } from "@/components/LanguageProvider";
import { BrandLogo } from "@/components/BrandLogo";
import { useEffect, useState } from "react";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { t, locale, setLocale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const LINKS = [
    { href: "#niveaux", label: t.nav.levels },
    { href: "#localisation", label: t.nav.location },
    { href: "#avis", label: t.nav.reviews },
    { href: "#faq", label: t.nav.faq },
    { href: "#reservation", label: t.nav.booking },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const nextLocale = locale === "fr" ? "darija" : "fr";
  const navGlass = scrolled
    ? "border border-white/12 bg-[#12051f]/88 text-white"
    : "border border-white/12 bg-[#12051f]/55 text-white";
  const navControl = "border border-white/15 bg-white/10 text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`flex items-center justify-between gap-2 rounded-full px-2 py-1.5 shadow-lg backdrop-blur-2xl transition ${navGlass}`}
        >
        <a
          href="#top"
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-white"
        >
          <BrandLogo size={36} priority className="shrink-0 ring-1 ring-white/20" />
          <span className="hidden text-sm font-semibold sm:block">{SITE.name}</span>
        </a>
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label={t.nav.navLabel}
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLocale(nextLocale)}
            className={`rounded-full px-3 py-2 text-xs font-bold backdrop-blur-xl transition hover:scale-105 ${navControl}`}
            aria-label={t.nav.lang}
          >
            {LOCALES.find((item) => item.id === nextLocale)?.short}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className={`rounded-full p-2.5 backdrop-blur-xl transition hover:scale-105 ${navControl}`}
            aria-label={theme === "dark" ? t.nav.light : t.nav.dark}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <motion.a
            href="#reservation"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="cta-shimmer cta-pulse hidden rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-brand shadow-lg shadow-accent/40 sm:inline-flex"
          >
            {t.nav.freeWeek}
          </motion.a>
          <button
            type="button"
            className={`rounded-full p-2.5 md:hidden ${navControl}`}
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        </div>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-4 mt-2 rounded-3xl border border-white/12 bg-[#12051f]/95 p-4 text-white backdrop-blur-2xl md:hidden"
            aria-label={t.nav.navMobile}
          >
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-3 py-3 text-sm font-medium text-white/90 hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#reservation"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-full bg-accent px-4 py-3 text-center text-sm font-semibold text-brand"
            >
              {t.nav.freeWeek}
            </a>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
