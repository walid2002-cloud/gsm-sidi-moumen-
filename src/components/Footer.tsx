"use client";

import { MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/constants";
import { getWhatsAppChatUrl } from "@/lib/whatsapp";
import { useI18n } from "@/components/LanguageProvider";
import { BrandLogo } from "@/components/BrandLogo";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function Footer() {
  const { t, locale } = useI18n();

  return (
    <footer className="px-4 pb-10 pt-16">
      <div className="glass mx-auto max-w-7xl rounded-[2rem] px-6 py-10 sm:px-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex items-start gap-3">
            <BrandLogo size={48} className="shrink-0" />
            <div>
              <p className="text-lg font-semibold">{SITE.legalName}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{SITE.name}</p>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <a
              href={SITE.mapsUrl}
              className="flex items-start gap-2 hover:text-brand"
              target="_blank"
              rel="noreferrer"
              aria-label={t.footer.location}
            >
              <MapPin size={18} className="mt-0.5 shrink-0" />
              {SITE.address}
            </a>
            <a href={`tel:${SITE.phoneTel}`} className="flex items-center gap-2 hover:text-brand">
              <Phone size={18} />
              {SITE.phoneDisplay}
            </a>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-2 text-sm font-medium hover:bg-brand hover:text-white"
              aria-label="Instagram gsm_sidi_moumen"
            >
              <InstagramIcon />
              gsm_sidi_moumen
            </a>
            <WhatsAppButton href={getWhatsAppChatUrl(locale)}>WhatsApp</WhatsAppButton>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="inline-flex items-center gap-2 rounded-full bg-slate-500/10 px-4 py-2 text-sm font-medium hover:bg-brand hover:text-white"
            >
              <Phone size={18} />
              {t.footer.call}
            </a>
          </div>
        </div>
        <p className="mt-8 border-t border-black/5 pt-6 text-xs text-slate-500 dark:border-white/10">
          © {new Date().getFullYear()} {SITE.legalName}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}
