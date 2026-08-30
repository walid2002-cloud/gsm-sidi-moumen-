"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { getStaffWhatsAppUrl, readStaffWhatsAppMessage } from "@/lib/whatsapp";
import { useI18n } from "@/components/LanguageProvider";

function ConfirmationContent() {
  const { t } = useI18n();
  const params = useSearchParams();
  const alreadySent = params.get("sent") === "1";
  const [paragraph, setParagraph] = useState<string | null>(null);
  const [waHref, setWaHref] = useState(getStaffWhatsAppUrl("Nouvelle inscription GSM Sidi Moumen."));

  useEffect(() => {
    const text = readStaffWhatsAppMessage();
    const href = getStaffWhatsAppUrl(
      text ?? "Nouvelle inscription GSM Sidi Moumen. Merci de consulter Google Sheets.",
    );
    setParagraph(text);
    setWaHref(href);
    if (alreadySent || !text) return;
    window.location.assign(href);
  }, [alreadySent]);

  return (
    <main className="flex min-h-[100svh] items-center justify-center px-4 py-16">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass max-w-lg rounded-[2rem] p-8 text-center"
      >
        <CheckCircle2 className="mx-auto text-emerald-500" size={56} />
        <h1 className="mt-4 font-display text-3xl font-semibold">{t.confirm.title}</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">{alreadySent ? t.confirm.sent : t.confirm.text}</p>
        {paragraph ? (
          <pre className="mt-5 max-h-56 overflow-auto whitespace-pre-wrap rounded-2xl bg-slate-50 p-4 text-start text-sm text-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
            {paragraph}
          </pre>
        ) : null}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={waHref}
            className="rounded-full bg-brand px-5 py-3 font-semibold text-white transition hover:scale-105"
          >
            {t.confirm.reopen}
          </a>
          <Link href="/" className="rounded-full border border-slate-200 px-5 py-3 font-semibold dark:border-white/10">
            {t.confirm.home}
          </Link>
        </div>
      </motion.section>
    </main>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense>
      <ConfirmationContent />
    </Suspense>
  );
}
