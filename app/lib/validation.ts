import { z } from "./zod";

export type CandidateFormValues = {
  name: string;
  email: string;
  phone: string;
  street_address: string;
  postal_code: string;
  postal_city: string;
  available_from?: string;
  skills?: string;
  other_comp?: string;
  work_main: string;
  other_notes?: Record<string, string>;
  wants_temporary: string;
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
    street_address: z.string().trim().min(3, "Oppgi gateadresse"),
    postal_code: z.string().trim().regex(/^\d{4}$/, "Oppgi gyldig postnummer (4 siffer)"),
    postal_city: z.string().trim().min(2, "Oppgi poststed"),
    available_from: z.string().trim().optional(),
    skills: z.string().trim().optional(),
    other_comp: z.string().trim().optional(),
    work_main: z.string().min(1, "Velg arbeidskategori"),
    other_notes: z.record(z.string().trim()).optional(),
    wants_temporary: z.enum(["ja", "nei"], "Velg om du er åpen for midlertidige oppdrag"),
    stcw_confirm: z
      .boolean()
      .refine((v) => v === true, "Du må bekrefte at du har eller vil skaffe STCW og helseattest"),
    gdpr: z.boolean().refine((v) => v === true, "Samtykke til personvern er påkrevd"),
    honey: z.literal(""),
  })
  .superRefine((values, ctx) => {
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
  c_work_location_name: string;
  c_street_address: string;
  c_postal_code: string;
  c_postal_city: string;
  c_county?: string;
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
    c_work_location_name: z.string().trim().min(2, "Oppgi arbeidssted"),
    c_street_address: z.string().trim().min(3, "Oppgi gateadresse"),
    c_postal_code: z.string().trim().regex(/^\d{4}$/, "Oppgi gyldig postnummer (4 siffer)"),
    c_postal_city: z.string().trim().min(2, "Oppgi poststed"),
    c_county: z.string().trim().optional(),
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
    if (!values.desc || values.desc.length < 10) {
      ctx.addIssue("Beskriv kort behovet (minst 10 tegn)", ["desc"]);
    }
  });

export function extractCandidateForm(fd: FormData): { values: CandidateFormValues; files: CandidateFiles } {
  const getString = (name: string) => {
    const value = fd.get(name);
    return value === null ? "" : String(value).trim();
  };

  // work_main is now a single dropdown value, not an array
  const workMain = getString("work_main");

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
    street_address: getString("street_address"),
    postal_code: getString("postal_code"),
    postal_city: getString("postal_city"),
    available_from: getString("available_from") || undefined,
    skills: getString("skills") || undefined,
    other_comp: getString("other_comp") || undefined,
    work_main: workMain,
    other_notes: Object.keys(otherNotes).length ? otherNotes : undefined,
    wants_temporary: getString("wants_temporary"),
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
    c_work_location_name: getString("c_work_location_name"),
    c_street_address: getString("c_street_address"),
    c_postal_code: getString("c_postal_code"),
    c_postal_city: getString("c_postal_city"),
  c_county: getString("c_county") || undefined,
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
