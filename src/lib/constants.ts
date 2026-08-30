export const SITE = {
  name: "GSM Sidi Moumen",
  legalName: "Groupe Superprof Mohssine",
  tagline: "Centre N°1 de soutien scolaire à Sidi Moumen",
  description:
    "Accompagner chaque élève vers l'excellence grâce à une équipe de professeurs expérimentés.",
  phoneDisplay: "06 14 28 74 62",
  phoneTel: "+212614287462",
  whatsapp: "212786713408",
  instagram: "gsm_sidi_moumen",
  instagramUrl: "https://www.instagram.com/gsm_sidi_moumen",
  address: "Sidi Moumen Chraf près de l'établissement Al Wiam",
  city: "Sidi Moumen, Casablanca",
  mapsUrl: "https://maps.app.goo.gl/5Hb92eAvUGUc8ATT9",
  mapsEmbed:
    "https://maps.google.com/maps?q=Sidi+Moumen+Chraf+Al+Wiam+Casablanca&z=16&hl=fr&output=embed",
  hoursWeek: "Lun – Sam : 14h00 – 21h00",
  hoursSunday: "Dimanche : 09h00 – 13h00",
  googleSheetId: "1MzAueHjmF0DvY0scJdb-GSmOkybPjsHlqdUWIqnVTSc",
  googleSheetUrl:
    "https://docs.google.com/spreadsheets/d/1MzAueHjmF0DvY0scJdb-GSmOkybPjsHlqdUWIqnVTSc/edit",
} as const;

export const LEVELS = [
  { id: "primaire", label: "Primaire", icon: "BookOpen", gradient: "from-violet-400 to-[#6711EF]" },
  { id: "1ac", label: "1ère année collège", icon: "Pencil", gradient: "from-[#6711EF] to-[#4E0BB8]" },
  { id: "2ac", label: "2ème année collège", icon: "NotebookPen", gradient: "from-[#8B47F5] to-[#6711EF]" },
  { id: "3ac", label: "3ème année collège", icon: "GraduationCap", gradient: "from-[#6711EF] to-[#FFC502]" },
  { id: "tc", label: "Tronc Commun", icon: "Layers", gradient: "from-[#FFC502] to-[#6711EF]" },
  { id: "1bac", label: "1ère Bac", icon: "Atom", gradient: "from-[#8B47F5] to-[#4E0BB8]" },
  { id: "2bac-eco", label: "2ème Bac Économie", icon: "LineChart", gradient: "from-[#FFC502] to-[#4E0BB8]" },
  { id: "2bac-sp", label: "2ème Bac Sciences Physiques", icon: "FlaskConical", gradient: "from-[#6711EF] to-violet-400" },
  { id: "2bac-svt", label: "2ème Bac SVT", icon: "Leaf", gradient: "from-emerald-500 to-[#6711EF]" },
  { id: "2bac-sm", label: "2ème Bac Sciences Maths", icon: "Sigma", gradient: "from-[#8B47F5] to-[#FFC502]" },
] as const;

export const SUBJECTS = [
  "Mathématiques",
  "Physique-Chimie",
  "SVT",
  "Français",
  "Arabe",
  "Anglais",
  "Économie",
  "Comptabilité",
  "Philosophie",
  "Toutes les matières",
] as const;

export type Subject = (typeof SUBJECTS)[number];
export type LevelId = (typeof LEVELS)[number]["id"];

const CORE = ["Mathématiques", "Français", "Arabe", "Anglais"] as const;
const SCIENCES = ["Physique-Chimie", "SVT"] as const;
const ALL: Subject = "Toutes les matières";

export const SUBJECTS_BY_LEVEL: Record<LevelId, readonly Subject[]> = {
  primaire: [...CORE, "SVT", ALL],
  "1ac": [...CORE, ...SCIENCES, ALL],
  "2ac": [...CORE, ...SCIENCES, ALL],
  "3ac": [...CORE, ...SCIENCES, ALL],
  tc: [...CORE, ...SCIENCES, "Philosophie", ALL],
  "1bac": [...CORE, ...SCIENCES, "Économie", "Comptabilité", "Philosophie", ALL],
  "2bac-eco": [...CORE, "Économie", "Comptabilité", "Philosophie", ALL],
  "2bac-sp": [...CORE, ...SCIENCES, "Philosophie", ALL],
  "2bac-svt": [...CORE, ...SCIENCES, "Philosophie", ALL],
  "2bac-sm": [...CORE, "Physique-Chimie", "Philosophie", ALL],
};

export function subjectsForLevel(levelId: string): readonly Subject[] {
  if (levelId in SUBJECTS_BY_LEVEL) {
    return SUBJECTS_BY_LEVEL[levelId as LevelId];
  }
  return SUBJECTS;
}

export const PHOTOS = {
  founder: "/images/maitre-mohssine.jpg",
  elboukhari: "/images/prof-elboukhari.jpg",
  manoub: "/images/prof-manoub.jpg",
  ouatiki: "/images/prof-ayoub-ouatiki.jpg",
  haitam: "/images/prof-haitam-fanvaranta.jpg",
  driss: "/images/prof-driss.jpg",
  fouad: "/images/prof-saouri-fouad.jpg",
  seddik: "/images/prof-seddik.jpg",
  soultan: "/images/prof-soultan.jpg",
  event: "/images/evenement-gsm.jpg",
  logo: "/images/logo-gsm.png",
} as const;

export const TEACHERS = [
  {
    name: "Maître Mohssine",
    role: "Fondateur & Directeur pédagogique",
    accent: "#6711EF",
    photo: PHOTOS.founder,
  },
  {
    name: "Prof El Boukhari",
    role: "SVT",
    accent: "#4E0BB8",
    photo: PHOTOS.elboukhari,
  },
  {
    name: "Prof Manoub",
    role: "Mathématiques",
    accent: "#8B47F5",
    photo: PHOTOS.manoub,
  },
  {
    name: "Prof Ayoub Ouatiki",
    role: "Comptabilité · 2Bac SE/SGC",
    accent: "#6711EF",
    photo: PHOTOS.ouatiki,
  },
  {
    name: "Prof Haitam Fanvaranta",
    role: "Mathématiques",
    accent: "#4E0BB8",
    photo: PHOTOS.haitam,
  },
  {
    name: "Prof Driss",
    role: "Économie générale",
    accent: "#FFC502",
    photo: PHOTOS.driss,
  },
  {
    name: "Prof Saouri Fouad",
    role: "Organisation et Comptabilité",
    accent: "#6711EF",
    photo: PHOTOS.fouad,
  },
  {
    name: "Prof Seddik",
    role: "SVT",
    accent: "#8B47F5",
    photo: PHOTOS.seddik,
  },
  {
    name: "Prof Soultan",
    role: "Philosophie",
    accent: "#4E0BB8",
    photo: PHOTOS.soultan,
  },
] as const;

export const STATS = [
  { label: "Élèves accompagnés", value: 1800, suffix: "+" },
  { label: "Professeurs experts", value: 9, suffix: "" },
  { label: "Taux de réussite", value: 97, suffix: "%" },
  { label: "Années d'excellence", value: 12, suffix: "+" },
] as const;

export const TESTIMONIALS = [
  {
    name: "Fatima Zahra",
    role: "Maman d'une élève de 1ère Bac",
    quote:
      "Ma fille a repris confiance en maths en quelques semaines. L'ambiance est sérieuse, les professeurs vraiment à l'écoute.",
  },
  {
    name: "Karim B.",
    role: "Papa d'un élève de 3ème collège",
    quote:
      "La semaine gratuite nous a convaincus. Suivi régulier, explications claires, et des résultats visibles au contrôle suivant.",
  },
  {
    name: "Nadia El Amrani",
    role: "Maman d'un élève de 2ème Bac SP",
    quote:
      "Un vrai centre premium à Sidi Moumen. Maître Mohssine et son équipe préparent les élèves avec exigence et bienveillance.",
  },
] as const;

export const FAQ_ITEMS = [
  {
    q: "Comment fonctionne la semaine gratuite ?",
    a: "Vous réservez via le formulaire, nous vous contactons sur WhatsApp, puis votre enfant assiste aux séances pendant une semaine, sans engagement ni paiement.",
  },
  {
    q: "Quels niveaux sont concernés ?",
    a: "Du primaire jusqu'au 2ème Bac (Économie, Sciences Physiques, SVT et Sciences Maths), avec un accompagnement adapté à chaque palier.",
  },
  {
    q: "Faut-il s'inscrire à toutes les matières ?",
    a: "Non. Vous choisissez la ou les matières dont votre enfant a besoin. Nous construisons un planning sur mesure.",
  },
  {
    q: "Où se trouve le centre ?",
    a: "À Sidi Moumen Chraf, près de l'établissement Al Wiam. L'adresse exacte et les horaires vous sont envoyés après réservation.",
  },
  {
    q: "Comment confirmer une inscription ?",
    a: "Après la semaine d'essai, nous validons ensemble le créneau, le niveau et les matières. Toute la communication se fait simplement sur WhatsApp.",
  },
] as const;
