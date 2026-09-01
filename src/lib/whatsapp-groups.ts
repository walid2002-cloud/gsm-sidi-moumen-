export const whatsappGroups = {
  primaire: "https://chat.whatsapp.com/CnNkryWlSUdI5LbkZdcurb",
  college1: "https://chat.whatsapp.com/K74JjAaSyaC199doPk7n2y",
  college2: "https://chat.whatsapp.com/B7SnflvlYwhBiHs5cPfe6v",
  college3: "https://chat.whatsapp.com/CGUDbrMUiFQJ3zfgLJDY5p",
  tc: "https://chat.whatsapp.com/JM3GhXUTKcpKszgflwpSgp",
  bac1: "https://chat.whatsapp.com/K3vaM8CMLeh6hZsv4UlOhC",
  eco: "https://chat.whatsapp.com/E6DREGwgyPg86Z8lMsSRJH",
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
