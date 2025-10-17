"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

const WORK: Record<string, string[]> = {
  "Servicefartøy mannskap": ["Skipper/Styrmann", "Matros", "Kokekyndig", "Annet"],
  Havbruk: ["Operativt", "Akvatekniker m/fagbrev", "Laseroperatør", "Fôringsoperatør", "Annet"],
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

export function CandidateForm() {
  const searchParams = useSearchParams();
  const sent = searchParams?.get("sent");

  const [openMain, setOpenMain] = useState<Record<string, boolean>>({});
  const [otherText, setOtherText] = useState<Record<string, string>>({});
  const [hasSTCW, setHasSTCW] = useState<"" | "ja" | "nei">("");
  const [hasDeck, setHasDeck] = useState<"" | "ja" | "nei">("");
  const [deckClass, setDeckClass] = useState("");

  const toggleMain = (main: string) =>
    setOpenMain((prev) => ({ ...prev, [main]: !prev[main] }));

  if (sent === "worker") {
    return (
      <div style={formStyles.ok} role="status">
        Takk! Kandidatprofilen din er registrert.
      </div>
    );
  }

  return (
    <form action="/api/submit-candidate" method="POST" encType="multipart/form-data" style={formStyles.form} noValidate>
      <Input label="Fullt navn" name="name" required />
      <Input label="E-post" name="email" type="email" required />
      <Input label="Telefon" name="phone" required />
      <Input label="Bosted (by/kommune)" name="city" required />

      <div style={{ gridColumn: "1 / -1" }}>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Ønsket arbeid</div>
        <div style={{ display: "grid", gap: 12 }}>
          {Object.entries(WORK).map(([main, subs]) => {
            const open = !!openMain[main];
            return (
              <div
                key={main}
                style={{ border: "1px solid #E2E8F0", borderRadius: 12, padding: 12, background: "#fff" }}
              >
                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                  <input type="checkbox" checked={open} onChange={() => toggleMain(main)} />
                  <span style={{ fontWeight: 700 }}>{main}</span>
                </label>

                {open && (
                  <div style={{ marginTop: 10 }}>
                    <div style={formStyles.tags}>
                      {subs.map((sub) =>
                        sub === "Annet" ? (
                          <div key={sub} style={{ flex: 1, minWidth: 220 }}>
                            <label style={formStyles.label}>
                              <span>Annet (kort beskrivelse)</span>
                              <input
                                name={`other_${main}`}
                                placeholder="Skriv kort om ønsket arbeid"
                                value={otherText[main] || ""}
                                onChange={(e) =>
                                  setOtherText((prev) => ({ ...prev, [main]: e.target.value }))
                                }
                                style={formStyles.input}
                              />
                            </label>
                          </div>
                        ) : (
                          <label key={sub} style={formStyles.tagItem}>
                            <input type="checkbox" name="work_main" value={`${main}:${sub}`} />
                            <span>{sub}</span>
                          </label>
                        ),
                      )}
                    </div>
                    <small style={{ color: "#64748b" }}>
                      Velg undervalg (eller fyll «Annet»). Du kan åpne flere hovedkategorier.
                    </small>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>STCW – Grunnleggende sikkerhetskurs</div>
          <div style={formStyles.inlineRadios}>
            <label>
              <input type="radio" name="stcw_has" value="ja" required onChange={() => setHasSTCW("ja")} /> Har
            </label>
            <label>
              <input type="radio" name="stcw_has" value="nei" onChange={() => setHasSTCW("nei")} /> Har ikke
            </label>
          </div>
          {hasSTCW === "ja" && (
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 13, color: "#475569", marginBottom: 6 }}>Huk av relevante moduler</div>
              <div style={formStyles.checkGrid}>
                {STCW_MODULES.map((module) => (
                  <label key={module} style={formStyles.checkItem}>
                    <input type="checkbox" name="stcw_mod" value={module} /> <span>{module}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Dekksoffiser-sertifikat</div>
          <div style={formStyles.inlineRadios}>
            <label>
              <input type="radio" name="deck_has" value="ja" required onChange={() => setHasDeck("ja")} /> Har
            </label>
            <label>
              <input type="radio" name="deck_has" value="nei" onChange={() => setHasDeck("nei")} /> Har ikke
            </label>
          </div>
          {hasDeck === "ja" && (
            <div style={{ marginTop: 8 }}>
              <Select
                label="Klasse"
                name="deck_class"
                options={["1", "2", "3", "4", "5", "6"]}
                value={deckClass}
                onChange={setDeckClass}
                placeholder="Velg klasse (1–6)"
              />
              <small style={{ color: "#475569" }}>1 = høyeste, 6 = laveste (D6).</small>
            </div>
          )}
        </div>
      </div>

      <Input label="Tilgjengelig fra" name="available_from" type="date" />
      <Textarea label="Kompetanse/kurs (kort)" name="skills" rows={4} full />
      <Textarea label="Andre relevante sertifikater og kompetanse (valgfritt)" name="other_comp" rows={4} full />

      <FileInput label="CV (PDF, maks 10 MB)" name="cv" accept=".pdf" required />
      <FileInput label="Sertifikater (PDF/zip, valgfritt)" name="certs" accept=".pdf,.zip" />

      <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 8 }}>
        <input id="gdpr" type="checkbox" required />
        <label htmlFor="gdpr" style={{ fontSize: 13, color: "#475569" }}>
          Jeg samtykker til behandling av persondata for bemanning/rekruttering.
        </label>
      </div>

      <div style={{ gridColumn: "1 / -1" }}>
        <button type="submit" style={formStyles.btnMain}>
          Send inn kandidatprofil
        </button>
      </div>
    </form>
  );
}

export function ClientForm() {
  const searchParams = useSearchParams();
  const sent = searchParams?.get("sent");

  if (sent === "client") {
    return (
      <div style={formStyles.ok} role="status">
        Takk! Vi tar kontakt snarest for å følge opp bemanningsbehovet deres.
      </div>
    );
  }

  return (
    <form action="/api/submit-client" method="POST" style={formStyles.form} noValidate>
      <Input label="Selskap" name="company" required />
      <Input label="Kontaktperson" name="contact" required />
      <Input label="E-post" name="c_email" type="email" required />
      <Input label="Telefon" name="c_phone" required />
      <Input label="Lokasjon/område" name="location" />
      <Select label="Type behov" name="need_type" options={Object.keys(WORK)} placeholder="Velg fagområde" />
      <Textarea label="Kort beskrivelse av oppdraget" name="desc" rows={4} full />

      <div style={{ gridColumn: "1 / -1" }}>
        <button type="submit" style={formStyles.btnMain}>
          Send forespørsel
        </button>
      </div>
    </form>
  );
}

export function Input({
  label,
  name,
  type = "text",
  required,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  const id = `${name}-id`;
  const errId = `${name}-err`;
  return (
    <label style={formStyles.label} htmlFor={id}>
      <span>
        {label}
        {required ? " *" : ""}
      </span>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        style={{ ...formStyles.input, ...(error ? formStyles.inputErr : null) }}
      />
      {error ? (
        <div id={errId} style={formStyles.errText} role="alert">
          {error}
        </div>
      ) : null}
    </label>
  );
}

export function Textarea({
  label,
  name,
  rows = 4,
  full = false,
}: {
  label: string;
  name: string;
  rows?: number;
  full?: boolean;
}) {
  const id = `${name}-id`;
  return (
    <label style={{ ...formStyles.label, gridColumn: full ? "1 / -1" : undefined }} htmlFor={id}>
      <span>{label}</span>
      <textarea id={id} name={name} rows={rows} style={{ ...formStyles.input, height: rows * 24 }} />
    </label>
  );
}

export function Select({
  label,
  name,
  options = [] as string[],
  value,
  onChange,
  placeholder,
  disabled,
  error,
}: {
  label: string;
  name: string;
  options?: string[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}) {
  const id = `${name}-id`;
  const errId = `${name}-err`;
  return (
    <label style={formStyles.label} htmlFor={id}>
      <span>{label}</span>
      <select
        id={id}
        name={name}
        value={value ?? ""}
        onChange={(event) => (onChange ? onChange(event.target.value) : undefined)}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        style={{
          ...formStyles.input,
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? "not-allowed" : "pointer",
          ...(error ? formStyles.inputErr : null),
        }}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? (
        <div id={errId} style={formStyles.errText} role="alert">
          {error}
        </div>
      ) : null}
    </label>
  );
}

export function FileInput({
  label,
  name,
  accept,
  error,
  required,
}: {
  label: string;
  name: string;
  accept?: string;
  error?: string;
  required?: boolean;
}) {
  const id = `${name}-id`;
  const errId = `${name}-err`;
  return (
    <label style={formStyles.label} htmlFor={id}>
      <span>
        {label}
        {required ? " *" : ""}
      </span>
      <input
        id={id}
        name={name}
        type="file"
        accept={accept}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        style={formStyles.input}
      />
      {error ? (
        <div id={errId} style={formStyles.errText} role="alert">
          {error}
        </div>
      ) : null}
    </label>
  );
}

const formStyles: Record<string, React.CSSProperties> = {
  form: {
    display: "grid",
    gap: 16,
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    background: "rgba(255,255,255,0.9)",
    border: "1px solid #E2E8F0",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 12px 36px rgba(15,23,42,0.08)",
  },
  label: {
    display: "grid",
    gap: 6,
    fontSize: 14,
    color: "#0F172A",
  },
  input: {
    borderRadius: 10,
    border: "1px solid #CBD5E1",
    padding: "12px 14px",
    fontSize: 15,
    background: "#F8FAFC",
    color: "#0F172A",
    transition: "border-color .15s ease, box-shadow .15s ease",
  },
  inputErr: {
    borderColor: "#F87171",
    boxShadow: "0 0 0 3px rgba(248,113,113,0.25)",
  },
  errText: {
    color: "#B91C1C",
    fontSize: 12,
  },
  inlineRadios: {
    display: "flex",
    gap: 16,
    fontSize: 14,
    color: "#0F172A",
  },
  checkGrid: {
    display: "grid",
    gap: 8,
  },
  checkItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 14,
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid #E2E8F0",
    background: "#F8FAFC",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
  },
  tagItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 12px",
    borderRadius: 999,
    border: "1px solid #E2E8F0",
    background: "#F1F5F9",
    fontSize: 13,
    color: "#0F172A",
  },
  btnMain: {
    width: "100%",
    padding: "14px 18px",
    borderRadius: 999,
    border: "none",
    background: "linear-gradient(135deg, #38BDF8, #0EA5E9)",
    color: "#0B1F3A",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
    boxShadow: "0 14px 30px rgba(14,165,233,0.28)",
  },
  ok: {
    padding: 18,
    borderRadius: 16,
    background: "#DCFCE7",
    border: "1px solid #22C55E",
    color: "#166534",
    fontWeight: 600,
    textAlign: "center",
  },
};
