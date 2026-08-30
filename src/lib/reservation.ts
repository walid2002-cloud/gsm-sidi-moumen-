import { NextResponse } from "next/server";
import { buildStaffWhatsAppMessage, joinSubjects, toLeadRecord, type LeadInput } from "@/lib/leads";
import { appendLeadToSheet } from "@/lib/sheets";
import { sendAdminNotification } from "@/lib/whatsapp/baileys";

function str(value: unknown) {
  return String(value ?? "").trim();
}

function parseLead(body: Partial<LeadInput> & { matiere?: string | string[] }): LeadInput {
  return {
    nom: str(body.nom),
    prenom: str(body.prenom),
    parent: str(body.parent),
    telephone: str(body.telephone),
    whatsapp: str(body.whatsapp) || str(body.telephone),
    niveau: str(body.niveau),
    matiere: joinSubjects(Array.isArray(body.matiere) ? body.matiere.map(str) : str(body.matiere)),
    message: str(body.message),
    source: str(body.source) || "landing",
  };
}

export async function handleReservationPost(request: Request) {
  try {
    const body = (await request.json()) as Partial<LeadInput> & { matiere?: string | string[] };
    const input = parseLead(body);
    const required = [
      input.nom,
      input.prenom,
      input.telephone,
      input.whatsapp,
      input.niveau,
      input.matiere,
    ];
    if (required.some((value) => !value)) {
      return NextResponse.json({ success: false, error: "Champs manquants" }, { status: 400 });
    }

    const lead = toLeadRecord(input);
    const paragraph = buildStaffWhatsAppMessage(lead);

    const sheet = await appendLeadToSheet(lead);
    if (!sheet) {
      return NextResponse.json({ success: false, error: "Enregistrement impossible" }, { status: 500 });
    }

    await sendAdminNotification(paragraph);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur serveur";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
