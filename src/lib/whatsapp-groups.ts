export const whatsappGroups = {
  primaire: "",
  college1: "",
  college2: "",
  college3: "",
  tc: "",
  bac1: "",
  eco: "",
  pc: "",
  svt: "",
  sm: "",
} as const;

export type WhatsAppGroupKey = keyof typeof whatsappGroups;

export const levelWhatsAppGroupKey = {
  primaire: "primaire",
  "1ac": "college1",
  "2ac": "college2",
  "3ac": "college3",
  tc: "tc",
  "1bac": "bac1",
  "2bac-eco": "eco",
  "2bac-sp": "pc",
  "2bac-svt": "svt",
  "2bac-sm": "sm",
} as const;

export function getLevelWhatsAppGroup(levelId: keyof typeof levelWhatsAppGroupKey): string {
  return whatsappGroups[levelWhatsAppGroupKey[levelId]];
}
