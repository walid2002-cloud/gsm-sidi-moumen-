"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { dictionary, getDir, type Dictionary, type Locale } from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function applyLocale(locale: Locale) {
  const dir = getDir(locale);
  document.documentElement.lang = locale === "darija" ? "ar" : "fr";
  document.documentElement.dir = dir;
  document.documentElement.classList.toggle("darija", locale === "darija");
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  useEffect(() => {
    const stored = window.localStorage.getItem("gsm-lang") as Locale | null;
    const next = stored === "darija" || stored === "fr" ? stored : "fr";
    setLocaleState(next);
    applyLocale(next);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem("gsm-lang", next);
    applyLocale(next);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      dir: getDir(locale),
      setLocale,
      t: dictionary[locale],
    }),
    [locale, setLocale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useI18n must be used within LanguageProvider");
  }
  return ctx;
}
