import { z } from "./zod";

export type CandidateFormValues = {
  name: string;
  email: string;
  phone: string;
  county: string;
  municipality: string;
  available_from?: string;
  skills?: string;
  other_comp?: string;
  work_main: string[];
  other_notes?: Record<string, string>;
  wants_temporary: string;
  stcw_has: string;
  stcw_mod?: string[];
  deck_has: string;
  deck_class?: string;
  gdpr: boolean;
  honey: string;
};

export type CandidateFiles = {
  cv: File | null;
  certs: File | null;
};

export const candidateSchema = z
  .object<CandidateFormValues>({
    name: z.string().trim().min(2, "Oppgi fullt navn"),
    email: z.string().trim().email("Oppgi gyldig e-post"),
    phone: z.string().trim().min(6, "Oppgi telefon"),
    county: z.string().trim().min(2, "Velg fylke"),
    municipality: z.string().trim().min(2, "Velg kommune"),
    available_from: z.string().trim().optional(),
    skills: z.string().trim().optional(),
    other_comp: z.string().trim().optional(),
    work_main: z.array(z.string()).min(1, "Velg minst ett arbeidsområde"),
    other_notes: z.record(z.string().trim()).optional(),
    wants_temporary: z.enum(["ja", "nei"], "Velg om du er åpen for midlertidige oppdrag"),
    stcw_has: z.enum(["ja", "nei"], "Angi om du har STCW"),
    stcw_mod: z.array(z.string()).optional(),
    deck_has: z.enum(["ja", "nei"], "Angi om du har dekksoffiser-sertifikat"),
    deck_class: z.string().trim().optional(),
    gdpr: z.literal(true),
    honey: z.literal(""),
  })
  .superRefine((values, ctx) => {
    if (values.deck_has === "ja" && !values.deck_class) {
      ctx.addIssue("Velg klasse", ["deck_class"]);
    }

    if (values.stcw_has === "ja" && !(values.stcw_mod && values.stcw_mod.length)) {
      ctx.addIssue("Velg minst én STCW-modul", ["stcw_mod"]);
    }

    if (values.other_notes) {
      for (const [key, value] of Object.entries(values.other_notes)) {
        if (value.length > 200) {
          ctx.addIssue("Maks 200 tegn", ["other_notes", key]);
        }
      }
    }
  });

export type ClientFormValues = {
  company: string;
  contact: string;
  c_email: string;
  c_phone: string;
  c_county: string;
  c_municipality?: string;
  need_type: string;
  need_duration: string;
  desc?: string;
  honey: string;
};

export const clientSchema = z
  .object<ClientFormValues>({
    company: z.string().trim().min(2, "Oppgi selskap"),
    contact: z.string().trim().min(2, "Oppgi kontaktperson"),
    c_email: z.string().trim().email("Oppgi gyldig e-post"),
    c_phone: z.string().trim().min(6, "Oppgi telefon"),
    c_county: z.string().trim().min(2, "Velg fylke"),
    c_municipality: z.string().trim().optional(),
    need_type: z.string().trim().min(2, "Velg behov"),
    need_duration: z.string().trim().min(2, "Velg oppdragstype"),
    desc: z.string().trim().optional(),
    honey: z.literal(""),
  })
  .superRefine((values, ctx) => {
    if (values.c_county && !values.c_municipality) {
      ctx.addIssue("Velg kommune", ["c_municipality"]);
    }

    if (!values.desc || values.desc.length < 10) {
      ctx.addIssue("Beskriv kort behovet (minst 10 tegn)", ["desc"]);
    }
  });

export function extractCandidateForm(fd: FormData): { values: CandidateFormValues; files: CandidateFiles } {
  const getString = (name: string) => {
    const value = fd.get(name);
    return value === null ? "" : String(value).trim();
  };

  const workChoices = fd
    .getAll("work_main")
    .map((value) => String(value).trim())
    .filter(Boolean);

  const stcwMods = fd
    .getAll("stcw_mod")
    .map((value) => String(value).trim())
    .filter(Boolean);

  const otherNotes: Record<string, string> = {};
  for (const [key, value] of fd.entries()) {
    if (key.startsWith("other_") && typeof value === "string") {
      const note = value.trim();
      if (note) {
        otherNotes[key.replace(/^other_/, "")] = note;
      }
    }
  }

  const values: CandidateFormValues = {
    name: getString("name"),
    email: getString("email"),
    phone: getString("phone"),
    county: getString("county"),
    municipality: getString("municipality"),
    available_from: getString("available_from") || undefined,
    skills: getString("skills") || undefined,
    other_comp: getString("other_comp") || undefined,
    work_main: workChoices,
    other_notes: Object.keys(otherNotes).length ? otherNotes : undefined,
    wants_temporary: getString("wants_temporary"),
    stcw_has: getString("stcw_has"),
    stcw_mod: stcwMods.length ? stcwMods : undefined,
    deck_has: getString("deck_has"),
    deck_class: getString("deck_class") || undefined,
    gdpr: getString("gdpr") === "yes",
    honey: getString("website"),
  };

  const files: CandidateFiles = {
    cv: (fd.get("cv") as File | null) ?? null,
    certs: (fd.get("certs") as File | null) ?? null,
  };

  return { values, files };
}

export function extractClientForm(fd: FormData): ClientFormValues {
  const getString = (name: string) => {
    const value = fd.get(name);
    return value === null ? "" : String(value).trim();
  };

  return {
    company: getString("company"),
    contact: getString("contact"),
    c_email: getString("c_email"),
    c_phone: getString("c_phone"),
    c_county: getString("c_county"),
    c_municipality: getString("c_municipality") || undefined,
    need_type: getString("need_type"),
    need_duration: getString("need_duration"),
    desc: getString("desc") || undefined,
    honey: getString("website"),
  };
}
