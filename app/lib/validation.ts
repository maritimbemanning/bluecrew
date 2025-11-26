import { z } from "./zod";

export type CandidateFormValues = {
  name: string;
  email: string;
  phone: string;
  fylke: string;
  kommune: string;
  available_from: string;
  skills: string;
  other_comp: string;
  work_main: string[];
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
    fylke: z.string().trim().min(1, "Velg fylke"),
    kommune: z.string().trim().min(1, "Oppgi kommune"),
    available_from: z.string().trim(),
    skills: z.string().trim(),
    other_comp: z.string().trim(),
    work_main: z.array(z.string()).min(1, "Velg minst ett arbeidsområde"),
    other_notes: z.record(z.string().trim()).optional(),
    wants_temporary: z
      .string()
      .refine(
        (val) => val === "ja" || val === "nei",
        "Velg om du er åpen for midlertidige oppdrag"
      ),
    stcw_confirm: z
      .boolean()
      .refine(
        (v) => v === true,
        "Du må bekrefte at du har eller vil skaffe STCW og helseattest"
      ),
    gdpr: z
      .boolean()
      .refine((v) => v === true, "Samtykke til personvern er påkrevd"),
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
  c_phone?: string; // Valgfritt
  need_type: string;
  num_people: string;
  start_date: string;
  work_location: string;
  // Steg 2 (valgfritt)
  need_duration?: string;
  urgency?: string;
  desc?: string;
  // Org.nr autofyll
  org_number?: string;
  honey: string;
};

export const clientSchema = z.object<ClientFormValues>({
  company: z.string().trim().min(2, "Oppgi selskap."),
  contact: z.string().trim().min(2, "Oppgi kontaktperson."),
  c_email: z.string().trim().email("Oppgi gyldig e-post."),
  c_phone: z.string().trim().optional(),
  need_type: z.string().trim().min(2, "Velg kategori."),
  num_people: z.string().trim().min(1, "Oppgi antall personer."),
  start_date: z.string().trim().min(1, "Oppgi oppstartsdato."),
  work_location: z.string().trim().min(2, "Oppgi arbeidssted."),
  need_duration: z.string().trim().optional(),
  urgency: z.string().trim().optional(),
  desc: z.string().trim().max(280, "Maks 280 tegn.").optional(),
  org_number: z.string().trim().optional(),
  honey: z.literal(""),
});

export function extractCandidateForm(fd: FormData): {
  values: CandidateFormValues;
  files: CandidateFiles;
} {
  const getString = (name: string) => {
    const value = fd.get(name);
    return value === null ? "" : String(value).trim();
  };

  const workChoices = fd
    .getAll("work_main")
    .map((value) => String(value).trim())
    .filter(Boolean);

  // const stcwMods = fd
  //     .getAll("stcw_mod")
  //     .map((value) => String(value).trim())
  //     .filter(Boolean);

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
    fylke: getString("fylke"),
    kommune: getString("kommune"),
    available_from: getString("available_from") || "",
    skills: getString("skills") || "",
    other_comp: getString("other_comp") || "",
    work_main: workChoices,
    other_notes: Object.keys(otherNotes).length ? otherNotes : undefined,
    wants_temporary: getString("wants_temporary"),
    // Checkboxes: checked = value exists, unchecked = null
    stcw_confirm: fd.get("stcw_confirm") !== null,
    gdpr: fd.get("gdpr") !== null,
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
    c_phone: getString("c_phone") || undefined,
    need_type: getString("need_type"),
    num_people: getString("num_people"),
    start_date: getString("start_date"),
    work_location: getString("work_location"),
    need_duration: getString("need_duration") || undefined,
    urgency: getString("urgency") || undefined,
    desc: getString("desc") || undefined,
    org_number: getString("org_number") || undefined,
    honey: getString("honey"),
  };
}
