export type LeadInput = {
  nom: string;
  prenom: string;
  parent: string;
  telephone: string;
  whatsapp: string;
  niveau: string;
  matiere: string;
  message: string;
  source?: string;
};

export type LeadRecord = LeadInput & {
  date: string;
  statut: string;
};

export function formatLeadDate(date = new Date()): string {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Africa/Casablanca",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function toLeadRecord(input: LeadInput): LeadRecord {
  return {
    ...input,
    source: input.source?.trim() || "landing",
    date: formatLeadDate(),
    statut: "nouveau",
  };
}

export function joinSubjects(value: string | string[]): string {
  const list = Array.isArray(value) ? value : [value];
  return list.map((item) => item.trim()).filter(Boolean).join(", ");
}

export function buildStaffWhatsAppMessage(lead: LeadRecord): string {
  return `📥 *Nouvelle inscription - GSM Sidi Moumen*

👤 *Élève :* ${lead.prenom} ${lead.nom}
🎓 *Niveau :* ${lead.niveau}
📚 *Matières :* ${lead.matiere}

📞 *Téléphone :* ${lead.telephone}
💬 *WhatsApp :* ${lead.whatsapp}

📝 *Message / Disponibilités :*
${lead.message?.trim() ? lead.message : "Aucun message"}`;
}
