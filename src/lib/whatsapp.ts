import { SITE } from "@/lib/constants";
import { dictionary, type Locale } from "@/lib/i18n";
import { whatsappRecipients } from "@/lib/whatsapp-recipients";

const STAFF_LEAD_KEY = "gsm-staff-wa";

export function staffWhatsAppNumber(): string {
  const raw = whatsappRecipients[0] ?? SITE.whatsapp;
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("212")) return digits;
  if (digits.startsWith("0")) return `212${digits.slice(1)}`;
  return digits;
}

export function getStaffWhatsAppUrl(text: string): string {
  return `https://api.whatsapp.com/send?phone=${staffWhatsAppNumber()}&text=${encodeURIComponent(text)}`;
}

export function getStartWeekWhatsAppUrl(locale: Locale = "fr"): string {
  return getStaffWhatsAppUrl(dictionary[locale].wa.startWeek);
}

export function storeStaffWhatsAppMessage(text: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STAFF_LEAD_KEY, text);
  localStorage.setItem(STAFF_LEAD_KEY, text);
}

export function readStaffWhatsAppMessage(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(STAFF_LEAD_KEY) ?? localStorage.getItem(STAFF_LEAD_KEY);
}

export type BookingPayload = {
  nom: string;
  niveau: string;
  matiere: string;
  parent: string;
  telephone: string;
};

export function buildWhatsAppMessage(data: BookingPayload, locale: Locale = "fr"): string {
  if (locale === "darija") {
    return `سلام مركز GSM 👋

بغيت نستافد من السيمانة المجانية.

👤 التلميذ : ${data.nom}

🎓 المستوى : ${data.niveau}

📚 المادة : ${data.matiere}

👨‍👩‍👦 الولي : ${data.parent}

📱 التليفون : ${data.telephone}

بغيت المعلومات ديال السيمانة المجانية.

شكراً.`;
  }

  return `Bonjour Centre GSM 👋

Je souhaite profiter de la semaine gratuite.

👤 Élève : ${data.nom}

🎓 Niveau : ${data.niveau}

📚 Matière : ${data.matiere}

👨‍👩‍👦 Parent : ${data.parent}

📱 Téléphone : ${data.telephone}

Je souhaite recevoir les informations concernant la semaine gratuite.

Merci.`;
}

export function getWhatsAppUrl(data: BookingPayload, locale: Locale = "fr"): string {
  return getStaffWhatsAppUrl(buildWhatsAppMessage(data, locale));
}

export function getWhatsAppChatUrl(locale: Locale = "fr", prefill?: string): string {
  return getStaffWhatsAppUrl(prefill ?? dictionary[locale].wa.chat);
}
