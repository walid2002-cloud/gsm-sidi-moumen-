"use client";

import { getLevelWhatsAppGroup, levelWhatsAppGroupKey } from "@/lib/whatsapp-groups";
import { getWhatsAppChatUrl } from "@/lib/whatsapp";
import { useI18n } from "@/components/LanguageProvider";
import { WhatsAppButton } from "@/components/WhatsAppButton";

type LevelId = keyof typeof levelWhatsAppGroupKey;

export function WhatsAppGroupButton({ levelId }: { levelId: LevelId }) {
  const { t, locale } = useI18n();
  const group = getLevelWhatsAppGroup(levelId);
  const href =
    group ||
    getWhatsAppChatUrl(
      locale,
      locale === "darija"
        ? `سلام مركز GSM 👋 بغيت ندخل لمجموعة واتساب ديال ${t.level[levelId]}.`
        : `Bonjour Centre GSM 👋 Je souhaite rejoindre le groupe WhatsApp ${t.level[levelId]}.`,
    );

  return (
    <WhatsAppButton href={href} className="mt-4" ariaLabel={t.levels.joinGroup}>
      WhatsApp
    </WhatsAppButton>
  );
}
