"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  FileInput,
  Input,
  Select,
  Textarea,
  formStyles,
} from "@/components/forms/Controls";

const WORK: Record<string, string[]> = {
  "Servicefartøy mannskap": [
    "Skipper/Styrmann",
    "Matros",
    "Kokekyndig",
    "Annet",
  ],
  Havbruk: [
    "Operativt",
    "Akvatekniker m/fagbrev",
    "Laseroperatør",
    "Fôringsoperatør",
    "Annet",
  ],
  Fiskeri: ["Skipper/Styrmann", "Matros", "Annet"],
  Midlertidig: ["Korttidsoppdrag", "Sesong", "Annet"],
  Annet: ["Annet"],
};

const STCW_MODULES = [
  "Sjøoverlevelse (PST)",
  "Brannvern (FPFF)",
  "Førstehjelp (EFA)",
  "PSSR",
];

function CandidateForm() {
  const searchParams = useSearchParams();
  const sent = searchParams.get("sent");

  const [openMain, setOpenMain] = useState<Record<string, boolean>>({});
  const [otherText, setOtherText] = useState<Record<string, string>>({});
  const [hasSTCW, setHasSTCW] = useState<"" | "ja" | "nei">("");
  const [hasDeck, setHasDeck] = useState<"" | "ja" | "nei">("");
  const [deckClass, setDeckClass] = useState("");

  if (sent === "worker") {
    return <div style={formStyles.success}>Takk! Skjemaet er sendt inn.</div>;
  }

  return (
    <form
      action="/api/submit-candidate"
      method="POST"
      encType="multipart/form-data"
      style={formStyles.form}
      noValidate
    >
      <Input label="Fullt navn" name="name" required />
      <Input label="E-post" name="email" type="email" required />
      <Input label="Telefon" name="phone" required />
      <Input label="Bosted (by/kommune)" name="city" required />

      <div style={{ gridColumn: "1 / -1" }}>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Ønsket arbeid</div>
        <div style={{ display: "grid", gap: 12 }}>
          {Object.keys(WORK).map((main) => {
            const open = !!openMain[main];
            const subs = WORK[main];
            return (
              <div
                key={main}
                style={{
                  border: "1px solid #E2E8F0",
                  borderRadius: 12,
                  padding: 14,
                  background: "#fff",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={open}
                    onChange={() =>
                      setOpenMain((prev) => ({ ...prev, [main]: !prev[main] }))
                    }
                  />
                  <span style={{ fontWeight: 700 }}>{main}</span>
                </label>
                {open ? (
                  <div style={{ marginTop: 12 }}>
                    <div style={formStyles.tags}>
                      {subs.map((sub) =>
                        sub === "Annet" ? (
                          <div key={sub} style={{ flex: 1, minWidth: 240 }}>
                            <label style={formStyles.label}>
                              <span>Annet (kort beskrivelse)</span>
                              <input
                                name={`other_${main}`}
                                placeholder="Skriv kort om ønsket arbeid"
                                value={otherText[main] || ""}
                                onChange={(event) =>
                                  setOtherText((prev) => ({
                                    ...prev,
                                    [main]: event.target.value,
                                  }))
                                }
                                style={formStyles.input}
                              />
                            </label>
                          </div>
                        ) : (
                          <label key={sub} style={formStyles.tagItem}>
                            <input
                              type="checkbox"
                              name="work_main"
                              value={`${main}:${sub}`}
                            />
                            <span>{sub}</span>
                          </label>
                        ),
                      )}
                    </div>
                    <small style={{ color: "#64748b" }}>
                      Velg undervalg (eller fyll &quot;Annet&quot;). Du kan åpne flere hovedkategorier.
                    </small>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          gridColumn: "1 / -1",
          display: "grid",
          gap: 18,
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        }}
      >
        <div>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>
            STCW – Grunnleggende sikkerhetskurs
          </div>
          <div style={formStyles.inlineRadios}>
            <label>
              <input
                type="radio"
                name="stcw_has"
                value="ja"
                required
                onChange={() => setHasSTCW("ja")}
              />
              {" "}Har
            </label>
            <label>
              <input
                type="radio"
                name="stcw_has"
                value="nei"
                onChange={() => setHasSTCW("nei")}
              />
              {" "}Har ikke
            </label>
          </div>
          {hasSTCW === "ja" ? (
            <div style={{ marginTop: 8 }}>
              <div style={formStyles.checkGrid}>
                {STCW_MODULES.map((module) => (
                  <label key={module} style={formStyles.checkItem}>
                    <input type="checkbox" name="stcw_mod" value={module} />
                    <span>{module}</span>
                  </label>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>
            Dekksoffiser-sertifikat
          </div>
          <div style={formStyles.inlineRadios}>
            <label>
              <input
                type="radio"
                name="deck_has"
                value="ja"
                required
                onChange={() => setHasDeck("ja")}
              />
              {" "}Har
            </label>
            <label>
              <input
                type="radio"
                name="deck_has"
                value="nei"
                onChange={() => setHasDeck("nei")}
              />
              {" "}Har ikke
            </label>
          </div>
          {hasDeck === "ja" ? (
            <div style={{ marginTop: 8 }}>
              <Select
                label="Klasse"
                name="deck_class"
                options={["1", "2", "3", "4", "5", "6"]}
                value={deckClass}
                onChange={setDeckClass}
                placeholder="Velg klasse (1–6)"
              />
              <small style={{ color: "#475569" }}>
                1 = høyeste, 6 = laveste (D6).
              </small>
            </div>
          ) : null}
        </div>
      </div>

      <Input label="Tilgjengelig fra" name="available_from" type="date" />
      <Textarea label="Kompetanse/kurs (kort)" name="skills" rows={4} full />
      <Textarea
        label="Andre relevante sertifikater og kompetanse (valgfritt)"
        name="other_comp"
        rows={4}
        full
      />

      <FileInput label="CV (PDF, maks 10 MB)" name="cv" accept=".pdf" required />
      <FileInput
        label="Sertifikater (PDF/zip, valgfritt)"
        name="certs"
        accept=".pdf,.zip"
      />

      <div
        style={{
          gridColumn: "1 / -1",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <input id="gdpr" type="checkbox" required />
        <label htmlFor="gdpr" style={{ fontSize: 13, color: "#475569" }}>
          Jeg samtykker til behandling av persondata for bemanning/rekruttering.
        </label>
      </div>

      <div style={{ gridColumn: "1 / -1" }}>
        <button type="submit" style={formStyles.primaryButton}>
          Send inn kandidatprofil
        </button>
      </div>
    </form>
  );
}

export default function CandidateFormShell() {
  return (
    <Suspense fallback={<div style={{ height: 48 }} />}>
      <CandidateForm />
    </Suspense>
  );
}
