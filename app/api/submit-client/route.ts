import nodemailer from "nodemailer";
export const runtime = "nodejs";

export async function GET() {
  return new Response("submit-client API er oppe. Bruk POST fra skjemaet.", { status: 200 });
}

export async function POST(req: Request) {
  try {
    const fd = await req.formData();
    const company   = String(fd.get("company") || "");
    const contact   = String(fd.get("contact") || "");
    const email     = String(fd.get("c_email") || "");
    const phone     = String(fd.get("c_phone") || "");
    const county    = String(fd.get("c_county") || "");
    const municipality = String(fd.get("c_municipality") || "");
    const needType  = String(fd.get("need_type") || "");
    const duration  = String(fd.get("need_duration") || "");
    const desc      = String(fd.get("desc") || "");

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

    const clientLocation = municipality
      ? county
        ? `${municipality} (${county})`
        : municipality
      : county || "-";

    const text = [
      "NY KUNDEFORESPØRSEL",
      `Selskap: ${company}`,
      `Kontaktperson: ${contact}`,
      `E-post: ${email}`,
      `Telefon: ${phone}`,
      `Lokasjon: ${clientLocation}`,
      `Type behov: ${needType}`,
      `Oppdragstype: ${duration || "-"}`,
      "",
      "Beskrivelse:",
      desc || "-",
    ].join("\n");

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: `Bluecrew kunde: ${company || "(uten selskap)"} – ${needType || "Behov"}`,
      text,
    });

    const back = new URL("/kunde?sent=client", req.url);
    return Response.redirect(back, 303);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("❌ Sendefeil (client):", err);
    return new Response("FEIL: " + msg, { status: 500 });
  }
}
