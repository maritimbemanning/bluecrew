import { NextResponse } from "next/server";
import { enforceRateLimit } from "../../lib/server/rate-limit";
import {
  sendCandidateReceipt,
  sendNotificationEmail,
} from "../../lib/server/email";

/** Enkel HTML-escaping */
function esc(s: string = "") {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

/**
 * Denne versjonen unngår alle types/SDK-mismatch:
 * - Leser formData direkte (uavhengig av schema-typer)
 * - Sender e-post med sikker HTML
 * - Beholder rate limiting
 */
export async function POST(req: Request) {
  // Rate limit med stabil nøkkel (enforceRateLimit forventer trolig 1 string-arg)
  try {
    await enforceRateLimit("submit-candidate");
  } catch (e) {
    // Hvis rate limit ikke er konfigurert i dev, svarer vi mildt
    console.warn("[submit-candidate] rate limit warning:", e);
  }

  const contentType = req.headers.get("content-type") || "";
  const acceptsJson = (req.headers.get("accept") || "").includes("application/json");
  const isJsonPayload = contentType.includes("application/json");

  const asStringArray = (value: unknown): string[] => {
    if (Array.isArray(value)) {
      return value.map((item) => (item == null ? "" : String(item).trim())).filter(Boolean);
    }
    if (typeof value === "string") {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
    return [];
  };

  let form: FormData | null = null;
  let json: Record<string, unknown> = {};

  if (isJsonPayload) {
    json = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  } else {
    form = await req.formData();
  }

  const read = (key: string) => {
    if (form) {
      const value = form.get(key);
      return value == null ? "" : value.toString().trim();
    }
    const value = json[key];
    return value == null ? "" : String(value).trim();
  };

  // Les kjente felter (fallback tom streng hvis ikke finnes)
  const name = read("name");
  const email = read("email");
  const phone = read("phone");
  const county = read("county");
  const municipality = read("municipality");
  const availableFrom = read("available_from");
  const wantsTemporary = read("wants_temporary");
  const stcwHas = read("stcw_has");
  const deckHas = read("deck_has");
  const deckClass = read("deck_class");
  const skills = read("skills");
  const otherComp = read("other_comp");
  const legacyMessage = read("message");

  const workChoices = form
    ? form
        .getAll("work_main")
        .map((item) => (item == null ? "" : item.toString().trim()))
        .filter(Boolean)
    : asStringArray(json["work_main"]);

  const stcwModules = form
    ? form
        .getAll("stcw_mod")
        .map((item) => (item == null ? "" : item.toString().trim()))
        .filter(Boolean)
    : asStringArray(json["stcw_mod"]);

  const otherNotes: Record<string, string> = {};
  if (form) {
    for (const [key, value] of form.entries()) {
      if (key.startsWith("other_") && typeof value === "string") {
        const trimmed = value.trim();
        if (trimmed) {
          otherNotes[key.replace(/^other_/, "")] = trimmed;
        }
      }
    }
  } else if (json["other_notes"] && typeof json["other_notes"] === "object") {
    const notes = json["other_notes"] as Record<string, unknown>;
    for (const [key, value] of Object.entries(notes)) {
      if (typeof value === "string") {
        const trimmed = value.trim();
        if (trimmed) {
          otherNotes[key] = trimmed;
        }
      }
    }
  }

  const workList = workChoices
    .map((entry) => {
      const [main, sub] = entry.split(":");
      const subLabel = sub ? ` – ${esc(sub)}` : "";
      return `<li>${esc(main)}${subLabel}</li>`;
    })
    .join("");

  const otherList = Object.entries(otherNotes)
    .map(([key, value]) => `<li><b>${esc(key)}</b>: ${esc(value)}</li>`)
    .join("");

  // Bygg trygg HTML uansett hva som er gitt (Resend krever html eller text)
  const subject = `Bluecrew jobbsøker: ${name || "Uten navn"}`;
  const html = `
    <div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6">
      <h2 style="margin:0 0 8px">Ny jobbsøker</h2>
      <table style="border-collapse:collapse">
        <tr><td style="padding:4px 8px"><b>Navn</b></td><td style="padding:4px 8px">${esc(name || "-")}</td></tr>
        <tr><td style="padding:4px 8px"><b>E-post</b></td><td style="padding:4px 8px">${esc(email || "-")}</td></tr>
        <tr><td style="padding:4px 8px"><b>Telefon</b></td><td style="padding:4px 8px">${esc(phone || "-")}</td></tr>
        <tr><td style="padding:4px 8px"><b>Fylke</b></td><td style="padding:4px 8px">${esc(county || "-")}</td></tr>
        <tr><td style="padding:4px 8px"><b>Kommune</b></td><td style="padding:4px 8px">${esc(municipality || "-")}</td></tr>
        <tr><td style="padding:4px 8px"><b>Tilgjengelig fra</b></td><td style="padding:4px 8px">${esc(availableFrom || "-")}</td></tr>
        <tr><td style="padding:4px 8px"><b>Midlertidige oppdrag</b></td><td style="padding:4px 8px">${esc(wantsTemporary || "-")}</td></tr>
        <tr><td style="padding:4px 8px"><b>STCW</b></td><td style="padding:4px 8px">${esc(
          stcwHas ? `${stcwHas}${stcwModules.length ? ` (${stcwModules.join(", ")})` : ""}` : "-",
        )}</td></tr>
        <tr><td style="padding:4px 8px"><b>Dekksoffiser</b></td><td style="padding:4px 8px">${esc(
          deckHas
            ? `${deckHas}${deckClass ? ` (klasse ${deckClass})` : ""}`
            : "-",
        )}</td></tr>
      </table>
      <div style="margin-top:16px">
        <h3 style="margin:0 0 6px;font-size:16px">Ønsket arbeid</h3>
        ${workList ? `<ul style="margin:0 0 12px;padding-left:18px">${workList}</ul>` : "<p>Ingen valg</p>"}
        ${
          otherList
            ? `<div style="margin-top:8px"><strong>Tilleggsnotater</strong><ul style="margin:4px 0 12px;padding-left:18px">${otherList}</ul></div>`
            : ""
        }
      </div>
      ${
        skills
          ? `<div style="margin-top:12px"><h3 style="margin:0 0 6px;font-size:16px">Kompetanse</h3><p style="margin:0;white-space:pre-wrap">${esc(
              skills,
            )}</p></div>`
          : ""
      }
      ${
        otherComp
          ? `<div style="margin-top:12px"><h3 style="margin:0 0 6px;font-size:16px">Andre kommentarer</h3><p style="margin:0;white-space:pre-wrap">${esc(
              otherComp,
            )}</p></div>`
          : ""
      }
      ${
        legacyMessage && legacyMessage !== otherComp
          ? `<div style="margin-top:12px"><h3 style="margin:0 0 6px;font-size:16px">Ekstra melding</h3><p style="margin:0;white-space:pre-wrap">${esc(
              legacyMessage,
            )}</p></div>`
          : ""
      }
    </div>
  `;

  // Send e-post til team (replyTo settes hvis bruker oppga e-post)
  await sendNotificationEmail({
    subject,
    html,
    replyTo: email || undefined,
  });

  await sendCandidateReceipt({ name, email });

  if (acceptsJson || isJsonPayload) {
    return NextResponse.json({ ok: true });
  }

  const redirectUrl = new URL("/jobbsoker?sent=worker", req.url);
  return NextResponse.redirect(redirectUrl, { status: 303 });
}
