import { z } from "./zod";

export type CandidateFormValues = {
  name: string;
  email: string;
  phone: string;
  street_address?: string;
  postal_code?: string;
  postal_city?: string;
  available_from?: string;
  skills?: string;
  other_comp?: string;
  work_main: string[];
  other_notes?: Record<string, string>;
  wants_temporary: string;
  stcw_has: string;
  stcw_mod?: string[];
  stcw_confirm: boolean;
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
    street_address: z.string().trim().optional(),
    postal_code: z.string().trim().optional(),
    postal_city: z.string().trim().optional(),
    available_from: z.string().trim().optional(),
    skills: z.string().trim().optional(),
    other_comp: z.string().trim().optional(),
    work_main: z.array(z.string()).min(1, "Velg minst ett arbeidsområde"),
    other_notes: z.record(z.string().trim()).optional(),
    wants_temporary: z.enum(["ja", "nei"], "Velg om du er åpen for midlertidige oppdrag"),
    stcw_has: z.enum(["ja", "nei"], "Angi om du har STCW"),
    stcw_mod: z.array(z.string()).optional(),
    stcw_confirm: z
      .boolean()
      .refine((v) => v === true, "Du må bekrefte at du har eller vil skaffe STCW og helseattest"),
    gdpr: z.boolean().refine((v) => v === true, "Samtykke til personvern er påkrevd"),
    honey: z.literal(""),
  })
  .superRefine((values, ctx) => {
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
  num_people?: string;
  start_date?: string;
  urgency?: string;
  desc?: string;
  gdpr_client: boolean;
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
    num_people: z.string().trim().optional(),
    start_date: z.string().trim().optional(),
    urgency: z.string().trim().optional(),
    desc: z.string().trim().optional(),
  gdpr_client: z.boolean().refine((v) => v === true, "Samtykke til personvern er påkrevd"),
    honey: z.literal(""),
  })
  .superRefine((values, ctx) => {
    if (values.c_county && !values.c_municipality) {
      ctx.addIssue("Velg kommune", ["c_municipality"]);
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
    street_address: getString("street_address") || undefined,
    postal_code: getString("postal_code") || undefined,
    postal_city: getString("postal_city") || undefined,
    available_from: getString("available_from") || undefined,
    skills: getString("skills") || undefined,
    other_comp: getString("other_comp") || undefined,
    work_main: workChoices,
    other_notes: Object.keys(otherNotes).length ? otherNotes : undefined,
    wants_temporary: getString("wants_temporary"),
    stcw_has: getString("stcw_has"),
    stcw_mod: stcwMods.length ? stcwMods : undefined,
    stcw_confirm: fd.get("stcw_confirm") === "on",
    gdpr: getString("gdpr") === "yes",
    honey: getString("honey"),
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
    num_people: getString("num_people") || undefined,
    start_date: getString("start_date") || undefined,
    urgency: getString("urgency") || undefined,
    desc: getString("desc") || undefined,
    gdpr_client: fd.get("gdpr_client") === "on",
    honey: getString("honey"),
  };
}
