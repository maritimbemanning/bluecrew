import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function GET() {
  return new Response("submit-candidate API er oppe. Bruk POST fra skjemaet.", { status: 200 });
}

export async function POST(req: Request) {
  try {
    const fd = await req.formData();

    // ——— Tekstfelt
    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const phone = String(fd.get("phone") || "");
    const city = String(fd.get("city") || "");
    const availableFrom = String(fd.get("available_from") || "");
    const skills = String(fd.get("skills") || "");

    // ——— Valgfelt (flere)
    const workChoices = fd.getAll("work_main").map(String); // f.eks. ["Havbruk:Operativt", "Fiskeri:Matros"]

    const stcwHas = String(fd.get("stcw_has") || "");        // "ja"/"nei"/""
    const stcwMods = fd.getAll("stcw_mod").map(String);      // liste med moduler

    const deckHas = String(fd.get("deck_has") || "");        // "ja"/"nei"/""
    const deckClass = String(fd.get("deck_class") || "");    // "1"–"6"

    // «Annet»-fritekstfelt pr. kategori (other_Servicefartøy mannskap, other_Havbruk, ...)
    const otherNotes: string[] = [];
    for (const [k, v] of fd.entries()) {
      if (k.startsWith("other_") && typeof v === "string" && v.trim()) {
        otherNotes.push(`${k.replace(/^other_/, "")}: ${v.trim()}`);
      }
    }
// ——— Filer (vedlegg) — CV påkrevd
const attachments: { filename: string; content: Buffer; contentType?: string }[] = [];

const cv = fd.get("cv");
if (!cv || typeof cv === "string") {
  return new Response("FEIL: CV (PDF) er påkrevd", { status: 400 });
} else {
  const file = cv as File;
  if (!file || file.size === 0) {
    return new Response("FEIL: CV mangler eller er tom", { status: 400 });
  }
  if (file.size > 10 * 1024 * 1024) {
    return new Response("FEIL: CV for stor (maks 10 MB)", { status: 400 });
  }
  const lower = (file.name || "").toLowerCase();
  if (!lower.endsWith(".pdf")) {
    return new Response("FEIL: CV må være PDF", { status: 400 });
  }
  attachments.push({
    filename: file.name || "CV.pdf",
    content: Buffer.from(await file.arrayBuffer()),
    contentType: file.type || "application/pdf",
  });
}

// Sertifikater (valgfritt)
const certs = fd.get("certs");
if (certs && typeof certs !== "string") {
  const file = certs as File;
  if (file.size > 0) {
    attachments.push({
      filename: file.name || "sertifikater",
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type || "application/octet-stream",
    });
  }
}


    // ——— SMTP (587 STARTTLS)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,                      // mail.bluecrew.no
      port: Number(process.env.SMTP_PORT || 587),       // 587
      secure: false,                                    // STARTTLS
      requireTLS: true,
      auth: { user: process.env.SMTP_USER as string, pass: process.env.SMTP_PASS as string },
      authMethod: "LOGIN",
      tls: { minVersion: "TLSv1.2", servername: "mail.bluecrew.no" },
    });

    await transporter.verify();

    // ——— E-postinnhold
    const otherComp = String(fd.get("other_comp") || "");
    
    const lines: string[] = [];
    lines.push(
      "NY KANDIDAT",
      `Navn: ${name}`,
      `E-post: ${email}`,
      `Telefon: ${phone}`,
      `Bosted: ${city}`,
      `Tilgjengelig fra: ${availableFrom || "-"}`,
      ""
    );

       lines.push(
  "",
  "Andre relevante sertifikater/kompetanse:",
  otherComp || "-"
);



    lines.push("Ønsket arbeid:");
    if (workChoices.length) lines.push(...workChoices.map(w => `- ${w}`));
    else lines.push("- (ikke valgt)");

    if (otherNotes.length) {
      lines.push("", "Andre ønsker / «Annet»:", ...otherNotes.map(t => `- ${t}`));
    }

    lines.push(
      "",
      `STCW: ${stcwHas || "-"}` + (stcwHas === "ja" && stcwMods.length ? ` (${stcwMods.join(", ")})` : ""),
      `Dekksoffiser: ${deckHas || "-"}` + (deckHas === "ja" && deckClass ? ` (klasse ${deckClass})` : ""),
      "",
      "Kompetanse/kurs:",
      skills || "-",
    );

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: `Bluecrew kandidat: ${name || "(uten navn)"}`,
      text: lines.join("\n"),
      attachments, // ← CV og ev. sertifikater følger med her
    });

    // Tilbake til forsiden med “takk”
    const back = new URL("/?sent=worker#kandidat", req.url);
    return Response.redirect(back, 303);

  } catch (err: any) {
    console.error("❌ Sendefeil:", err);
    return new Response("FEIL: " + (err?.message || "ukjent"), { status: 500 });
  }
}
