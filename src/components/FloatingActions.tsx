"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { getWhatsAppChatUrl } from "@/lib/whatsapp";
import { useI18n } from "@/components/LanguageProvider";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function FloatingActions() {
  const { t, locale } = useI18n();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 end-5 z-50 flex flex-col items-end gap-3">
      {showTop ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="rounded-full bg-white p-3 text-brand shadow-xl dark:bg-slate-800"
          aria-label={t.float.top}
        >
          <ArrowUp size={18} />
        </motion.button>
      ) : null}
      <WhatsAppButton href={getWhatsAppChatUrl(locale)} ariaLabel={t.float.wa}>
        WhatsApp
      </WhatsAppButton>
    </div>
  );
}
