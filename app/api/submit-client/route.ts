import nodemailer from "nodemailer";
export const runtime = "nodejs";

// Brukes hvis du tester API-et i nettleseren
export async function GET() {
  return new Response("submit-client API er oppe. Bruk POST fra skjemaet.", { status: 200 });
}

export async function POST(req: Request) {
  try {
    const fd = await req.formData();

    // Hent ut alle feltene fra skjemaet
    const company  = String(fd.get("company") || "");
    const contact  = String(fd.get("contact") || "");
    const email    = String(fd.get("c_email")  || "");
    const phone    = String(fd.get("c_phone")  || "");
    const location = String(fd.get("location") || "");
    const needType = String(fd.get("need_type")|| "");
    const desc     = String(fd.get("desc")     || "");

    // Sett opp e-postforbindelsen (samme som kandidat)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASS as string,
      },
      authMethod: "LOGIN",
      tls: { minVersion: "TLSv1.2", servername: "mail.bluecrew.no" },
    });

    await transporter.verify(); // tester innlogging

    // Lag innholdet i e-posten
    const text = [
      "NY KUNDEFORESPØRSEL",
      `Selskap: ${company}`,
      `Kontaktperson: ${contact}`,
      `E-post: ${email}`,
      `Telefon: ${phone}`,
      `Lokasjon: ${location}`,
      `Type behov: ${needType}`,
      "",
      "Beskrivelse:",
      desc || "-",
    ].join("\n");

    // Send e-posten til deg
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: `Bluecrew kunde: ${company || "(uten selskap)"} – ${needType || "Behov"}`,
      text,
    });

    // Send brukeren tilbake til forsiden med ?sent=client
    const back = new URL("/?sent=client#kunde", req.url);
    return Response.redirect(back, 303);

  } catch (err: any) {
    console.error("❌ Sendefeil (client):", err);
    return new Response("FEIL: " + (err?.message || "ukjent"), { status: 500 });
  }
}
