"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { LEVELS, subjectsForLevel, type Subject } from "@/lib/constants";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/components/LanguageProvider";

const empty = {
  nom: "",
  prenom: "",
  niveau: "",
  telephone: "",
  whatsapp: "",
  message: "",
};

const fieldClass =
  "w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15 dark:border-white/10 dark:bg-slate-900/70";

export function BookingForm() {
  const { t } = useI18n();
  const [data, setData] = useState(empty);
  const [matieres, setMatieres] = useState<Subject[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [sending, setSending] = useState(false);

  const available = useMemo(() => subjectsForLevel(data.niveau), [data.niveau]);

  function toggleMatiere(subject: Subject) {
    setMatieres((current) => {
      if (subject === "Toutes les matières") {
        return current.includes(subject) ? [] : [subject];
      }
      const withoutAll = current.filter((item) => item !== "Toutes les matières");
      return withoutAll.includes(subject)
        ? withoutAll.filter((item) => item !== subject)
        : [...withoutAll, subject];
    });
  }

  function changeNiveau(niveau: string) {
    const next = subjectsForLevel(niveau);
    setData({ ...data, niveau });
    setMatieres((current) => current.filter((item) => next.includes(item)));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const niveauId = String(form.get("niveau") ?? "").trim();
    const payload = {
      nom: String(form.get("nom") ?? "").trim(),
      prenom: String(form.get("prenom") ?? "").trim(),
      niveau: t.level[niveauId as keyof typeof t.level] ?? niveauId,
      matiere: matieres.map((key) => t.subject[key]),
      telephone: String(form.get("telephone") ?? "").trim(),
      whatsapp: String(form.get("whatsapp") ?? "").trim(),
      message: String(form.get("message") ?? "").trim(),
      source: "landing",
    };
    if (
      !payload.nom ||
      !payload.prenom ||
      !payload.niveau ||
      payload.matiere.length === 0 ||
      !payload.telephone ||
      !payload.whatsapp
    ) {
      setError(t.form.error);
      return;
    }
    setError("");
    setSuccess("");
    setSending(true);
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !json.success) {
        setError(json.error || t.form.serverError);
        return;
      }
      setData(empty);
      setMatieres([]);
      setSuccess(t.form.success);
    } catch {
      setError(t.form.serverError);
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="reservation" className="px-4 py-24">
      <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand">{t.form.kicker}</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t.form.title}</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">{t.form.text}</p>
          <ul className="mt-8 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {[t.form.step1, t.form.step2, t.form.step3].map((step, index) => (
              <motion.li
                key={step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * index, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-2xl px-4 py-3"
              >
                {step}
              </motion.li>
            ))}
          </ul>
        </Reveal>
        <Reveal>
          <form onSubmit={onSubmit} className="glass rounded-[2rem] p-6 sm:p-8" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t.form.lastName} htmlFor="nom">
                <input
                  id="nom"
                  name="nom"
                  autoComplete="family-name"
                  required
                  value={data.nom}
                  onChange={(e) => setData({ ...data, nom: e.target.value })}
                  className={fieldClass}
                  placeholder={t.form.lastNamePh}
                />
              </Field>
              <Field label={t.form.firstName} htmlFor="prenom">
                <input
                  id="prenom"
                  name="prenom"
                  autoComplete="given-name"
                  required
                  value={data.prenom}
                  onChange={(e) => setData({ ...data, prenom: e.target.value })}
                  className={fieldClass}
                  placeholder={t.form.firstNamePh}
                />
              </Field>
              <Field label={t.form.level} htmlFor="niveau" className="sm:col-span-2">
                <select
                  id="niveau"
                  name="niveau"
                  required
                  value={data.niveau}
                  onChange={(e) => changeNiveau(e.target.value)}
                  className={fieldClass}
                >
                  <option value="">{t.form.levelPh}</option>
                  {LEVELS.map((level) => (
                    <option key={level.id} value={level.id}>
                      {t.level[level.id]}
                    </option>
                  ))}
                </select>
              </Field>
              <fieldset className="sm:col-span-2">
                <legend className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  {t.form.subject}
                </legend>
                <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
                  {data.niveau ? t.form.subjectHint : t.form.subjectNeedLevel}
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {available.map((subject) => {
                    const checked = matieres.includes(subject);
                    return (
                      <label
                        key={subject}
                        className={`flex cursor-pointer items-center gap-2 rounded-2xl border px-3 py-2.5 text-sm transition ${
                          checked
                            ? "border-brand bg-brand/10 text-brand"
                            : "border-slate-200 bg-slate-50/80 dark:border-white/10 dark:bg-slate-900/70"
                        } ${data.niveau ? "" : "pointer-events-none opacity-50"}`}
                      >
                        <input
                          type="checkbox"
                          className="accent-[#6711EF]"
                          checked={checked}
                          disabled={!data.niveau}
                          onChange={() => toggleMatiere(subject)}
                        />
                        <span>{t.subject[subject]}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              <Field label={t.form.phone} htmlFor="telephone">
                <input
                  id="telephone"
                  name="telephone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  value={data.telephone}
                  onChange={(e) => setData({ ...data, telephone: e.target.value })}
                  className={fieldClass}
                  placeholder="06 .. .. .. .."
                />
              </Field>
              <Field label={t.form.whatsapp} htmlFor="whatsapp">
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  inputMode="tel"
                  required
                  value={data.whatsapp}
                  onChange={(e) => setData({ ...data, whatsapp: e.target.value })}
                  className={fieldClass}
                  placeholder="06 .. .. .. .."
                />
              </Field>
              <Field label={t.form.message} htmlFor="message" className="sm:col-span-2">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={data.message}
                  onChange={(e) => setData({ ...data, message: e.target.value })}
                  className={`${fieldClass} resize-y`}
                  placeholder={t.form.messagePh}
                />
              </Field>
            </div>
            {error ? (
              <p className="mt-3 text-sm text-red-500" role="alert">
                {error}
              </p>
            ) : null}
            {success ? (
              <p className="mt-3 text-sm font-medium text-emerald-600 dark:text-emerald-400" role="status">
                {success}
              </p>
            ) : null}
            <motion.button
              type="submit"
              disabled={sending}
              whileHover={{ scale: sending ? 1 : 1.05 }}
              whileTap={{ scale: sending ? 1 : 0.98 }}
              className="mt-6 w-full rounded-full bg-brand py-3.5 font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-dark disabled:opacity-70"
            >
              {sending ? t.form.sending : t.form.submit}
            </motion.button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium ${className}`}>
      <span className="mb-2 block text-slate-700 dark:text-slate-200">{label}</span>
      {children}
    </label>
  );
}
