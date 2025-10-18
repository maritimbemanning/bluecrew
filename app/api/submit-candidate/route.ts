import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function GET() {
  return new Response("submit-candidate API er oppe. Bruk POST fra skjemaet.", { status: 200 });
}

export async function POST(req: Request) {
  try {
    const fd = await req.formData();

    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const phone = String(fd.get("phone") || "");
    const city = String(fd.get("city") || "");
    const availableFrom = String(fd.get("available_from") || "");
    const skills = String(fd.get("skills") || "");
    const otherComp = String(fd.get("other_comp") || "");

    const workChoices = fd.getAll("work_main").map(String);
    const stcwHas = String(fd.get("stcw_has") || "");
    const stcwMods = fd.getAll("stcw_mod").map(String);
    const deckHas = String(fd.get("deck_has") || "");
    const deckClass = String(fd.get("deck_class") || "");

    const otherNotes: string[] = [];
    for (const [k, v] of fd.entries()) {
      if (k.startsWith("other_") && typeof v === "string" && v.trim()) {
        otherNotes.push(`${k.replace(/^other_/, "")}: ${v.trim()}`);
      }
    }

    // Vedlegg – CV må være PDF og påkrevd
    const attachments: { filename: string; content: Buffer; contentType?: string }[] = [];

    const cv = fd.get("cv");
    if (!cv || typeof cv === "string") {
      return new Response("FEIL: CV (PDF) er påkrevd", { status: 400 });
    } else {
      const file = cv as File;
      if (!file || file.size === 0) return new Response("FEIL: CV mangler eller er tom", { status: 400 });
      if (file.size > 10 * 1024 * 1024) return new Response("FEIL: CV for stor (maks 10 MB)", { status: 400 });
      const lower = (file.name || "").toLowerCase();
      if (!lower.endsWith(".pdf")) return new Response("FEIL: CV må være PDF", { status: 400 });
      attachments.push({
        filename: file.name || "CV.pdf",
        content: Buffer.from(await file.arrayBuffer()),
        contentType: file.type || "application/pdf",
      });
    }

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

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      requireTLS: true,
      auth: { user: process.env.SMTP_USER as string, pass: process.env.SMTP_PASS as string },
      authMethod: "LOGIN",
      tls: { minVersion: "TLSv1.2", servername: "mail.bluecrew.no" },
    });

    await transporter.verify();

    const lines: string[] = [];
    lines.push(
      "NY JOBBSØKER",
      `Navn: ${name}`,
      `E-post: ${email}`,
      `Telefon: ${phone}`,
      `Bosted: ${city}`,
      `Tilgjengelig fra: ${availableFrom || "-"}`,
      ""
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
      "",
      "Andre relevante sertifikater/kompetanse:",
      otherComp || "-"
    );

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: `Bluecrew jobbsøker: ${name || "(uten navn)"}`,
      text: lines.join("\n"),
      attachments,
    });

    const back = new URL("/jobbsoker/registrer?sent=worker", req.url);
    return Response.redirect(back, 303);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("❌ Sendefeil (candidate):", err);
    return new Response("FEIL: " + msg, { status: 500 });
  }
}

