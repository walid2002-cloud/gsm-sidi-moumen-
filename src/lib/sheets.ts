import { SITE } from "@/lib/constants";
import { buildStaffWhatsAppMessage, type LeadRecord } from "@/lib/leads";

const COLUMNS = [
  "Date",
  "Nom",
  "Prénom",
  "Parent",
  "Téléphone",
  "WhatsApp",
  "Niveau",
  "Matière",
  "Message",
  "Source",
  "Statut",
] as const;

function row(lead: LeadRecord) {
  return [
    lead.date,
    lead.nom,
    lead.prenom,
    lead.parent,
    lead.telephone,
    lead.whatsapp,
    lead.niveau,
    lead.matiere,
    lead.message,
    lead.source,
    lead.statut,
  ];
}

export async function appendLeadToSheet(lead: LeadRecord): Promise<boolean> {
  const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhook) return false;

  const body = JSON.stringify({
    spreadsheetId: SITE.googleSheetId,
    columns: COLUMNS,
    values: row(lead),
    lead,
    whatsappMessage: buildStaffWhatsAppMessage(lead),
  });

  const first = await fetch(webhook, {
    method: "POST",
    redirect: "manual",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body,
  });

  let res = first;
  const location = first.headers.get("location");
  if ((first.status === 301 || first.status === 302 || first.status === 303) && location) {
    res = await fetch(location, { method: "GET", redirect: "follow" });
  }

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Google Sheets ${res.status}: ${text.slice(0, 300)}`);
  }
  if (text.includes("Erreur") || text.includes("Error")) {
    throw new Error(`Google Sheets: ${text.slice(0, 300)}`);
  }
  return true;
}
