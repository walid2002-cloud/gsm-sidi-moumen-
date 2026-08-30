import { whatsappRecipients } from "@/lib/whatsapp-recipients";

export type WhatsAppProviderId = "none" | "webhook" | "callmebot" | "cloud" | "twilio" | "green";

function configuredRecipients() {
  return whatsappRecipients.filter((n) => n && !n.includes("X"));
}

function digits(phone: string) {
  return phone.replace(/\D/g, "");
}

async function sendCloud(text: string) {
  const token = process.env.WHATSAPP_CLOUD_TOKEN;
  const phoneId = process.env.WHATSAPP_CLOUD_PHONE_ID;
  if (!token || !phoneId) throw new Error("WhatsApp Cloud API non configurée");

  for (const to of configuredRecipients()) {
    const res = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: digits(to),
        type: "text",
        text: { body: text },
      }),
    });
    if (!res.ok) throw new Error(`Cloud API ${res.status}: ${await res.text()}`);
  }
}

async function sendTwilio(text: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const auth = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  if (!sid || !auth || !from) throw new Error("Twilio WhatsApp non configuré");

  const authHeader = Buffer.from(`${sid}:${auth}`).toString("base64");
  for (const to of configuredRecipients()) {
    const body = new URLSearchParams({
      From: from.startsWith("whatsapp:") ? from : `whatsapp:${from}`,
      To: `whatsapp:${to.startsWith("+") ? to : `+${digits(to)}`}`,
      Body: text,
    });
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });
    if (!res.ok) throw new Error(`Twilio ${res.status}: ${await res.text()}`);
  }
}

async function sendCallMeBot(text: string) {
  const apikey = process.env.CALLMEBOT_APIKEY;
  if (!apikey) throw new Error("CallMeBot non configuré (CALLMEBOT_APIKEY)");

  for (const to of configuredRecipients()) {
    const phone = digits(to).startsWith("212") ? `+${digits(to)}` : `+${digits(to)}`;
    const url = new URL("https://api.callmebot.com/whatsapp.php");
    url.searchParams.set("phone", phone);
    url.searchParams.set("text", text);
    url.searchParams.set("apikey", apikey);
    const res = await fetch(url.toString(), { method: "GET" });
    const body = await res.text();
    if (!res.ok || /invalid api|apikey is not valid|error:/i.test(body)) {
      throw new Error(`CallMeBot ${res.status}: ${body.slice(0, 300)}`);
    }
  }
}

async function sendGreen(text: string) {
  const id = process.env.GREEN_API_ID_INSTANCE;
  const token = process.env.GREEN_API_TOKEN;
  if (!id || !token) throw new Error("Green API non configurée");

  for (const to of configuredRecipients()) {
    const res = await fetch(`https://api.green-api.com/waInstance${id}/sendMessage/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId: `${digits(to)}@c.us`, message: text }),
    });
    if (!res.ok) throw new Error(`Green API ${res.status}: ${await res.text()}`);
  }
}

async function sendWebhook(text: string) {
  const url = process.env.WHATSAPP_WEBHOOK_URL;
  if (!url) throw new Error("Webhook WhatsApp non configuré");

  const first = await fetch(url, {
    method: "POST",
    redirect: "manual",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: digits(configuredRecipients()[0] ?? "+212786713408"),
      phone: configuredRecipients()[0] ?? "+212786713408",
      text,
      message: text,
    }),
  });

  let res = first;
  const location = first.headers.get("location");
  if ((first.status === 301 || first.status === 302 || first.status === 303) && location) {
    res = await fetch(location, { method: "GET", redirect: "follow" });
  }
  const body = await res.text();
  if (!res.ok) throw new Error(`Webhook WhatsApp ${res.status}: ${body.slice(0, 300)}`);
}

function resolveProvider(): WhatsAppProviderId {
  const explicit = (process.env.WHATSAPP_PROVIDER ?? "").trim() as WhatsAppProviderId;
  if (explicit && explicit !== "none") return explicit;
  if (process.env.WHATSAPP_CLOUD_TOKEN && process.env.WHATSAPP_CLOUD_PHONE_ID) return "cloud";
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_WHATSAPP_FROM) {
    return "twilio";
  }
  if (process.env.GREEN_API_ID_INSTANCE && process.env.GREEN_API_TOKEN) return "green";
  if (process.env.CALLMEBOT_APIKEY) return "callmebot";
  if (process.env.WHATSAPP_WEBHOOK_URL) return "webhook";
  return "none";
}

export async function sendWhatsAppNotification(text: string): Promise<{ sent: boolean; provider: WhatsAppProviderId }> {
  const provider = resolveProvider();
  if (provider === "none" || configuredRecipients().length === 0) {
    return { sent: false, provider: "none" };
  }
  if (provider === "webhook") await sendWebhook(text);
  else if (provider === "callmebot") await sendCallMeBot(text);
  else if (provider === "cloud") await sendCloud(text);
  else if (provider === "twilio") await sendTwilio(text);
  else if (provider === "green") await sendGreen(text);
  else return { sent: false, provider: "none" };
  return { sent: true, provider };
}
