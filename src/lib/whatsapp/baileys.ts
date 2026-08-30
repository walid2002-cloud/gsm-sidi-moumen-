import { whatsappRecipients } from "@/lib/whatsapp-recipients";

export async function sendAdminNotification(text: string): Promise<void> {
  const base = process.env.WHATSAPP_BAILEYS_URL ?? "http://127.0.0.1:3100";
  const res = await fetch(`${base.replace(/\/$/, "")}/notify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, to: whatsappRecipients[0] }),
  });
  const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
  if (!res.ok || json.ok === false) {
    throw new Error(json.error || `WhatsApp local ${res.status}`);
  }
}
