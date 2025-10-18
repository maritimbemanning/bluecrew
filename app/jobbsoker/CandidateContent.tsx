"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FileInput, Input, Select, Textarea } from "../components/FormControls";
import { WORK, STCW_MODULES, COUNTIES, MUNICIPALITIES_BY_COUNTY } from "../lib/constants";
import { sx } from "../lib/styles";

function createInitialOpen() {
  const initial: Record<string, boolean> = {};
  Object.keys(WORK).forEach((key) => {
    initial[key] = false;
  });
  return initial;
}

export default function CandidateContent() {
  const [openMain, setOpenMain] = useState<Record<string, boolean>>(() => createInitialOpen());
  const [otherText, setOtherText] = useState<Record<string, string>>({});
  const [hasSTCW, setHasSTCW] = useState<"" | "ja" | "nei">("");
  const [hasDeck, setHasDeck] = useState<"" | "ja" | "nei">("");
  const [deckClass, setDeckClass] = useState("");
  const [county, setCounty] = useState("");
  const [municipality, setMunicipality] = useState("");

  const searchParams = useSearchParams();
  const sent = searchParams.get("sent");
  const submitted = sent === "worker";

  const workEntries = useMemo(() => Object.entries(WORK), []);
  const municipalityOptions = useMemo(
    () => (county ? MUNICIPALITIES_BY_COUNTY[county] ?? [] : []),
    [county],
  );

  const toggleMain = (main: string) => {
    setOpenMain((prev) => ({ ...prev, [main]: !prev[main] }));
  };

  return submitted ? (
    <div style={sx.ok} role="status">
      Takk! Søknaden er mottatt. Vi tar kontakt når vi har et oppdrag som matcher profilen din.
    </div>
  ) : (
    <form action="/api/submit-candidate" method="POST" encType="multipart/form-data" style={sx.form} noValidate>
      <Input label="Fullt navn" name="name" required />
      <Input label="E-post" name="email" type="email" required />
      <Input label="Telefon" name="phone" required />
      <Select
        label="Fylke"
        name="county"
        options={COUNTIES}
        value={county}
        onChange={(value) => {
          setCounty(value);
          if (!value) {
            setMunicipality("");
          } else if (!(MUNICIPALITIES_BY_COUNTY[value] || []).includes(municipality)) {
            setMunicipality("");
          }
        }}
        placeholder="Velg fylke"
        required
      />
      <Select
        label="Kommune"
        name="municipality"
        options={municipalityOptions}
        value={municipality}
        onChange={setMunicipality}
        placeholder={county ? "Velg kommune" : "Velg fylke først"}
        disabled={!county}
        required
      />

      <div style={{ gridColumn: "1 / -1" }}>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Ønsket arbeid</div>
        <div style={{ display: "grid", gap: 12 }}>
          {workEntries.map(([main, subs]) => {
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
                    <div style={sx.tags}>
                      {subs.map((sub) =>
                        sub === "Annet" ? (
                          <div key={sub} style={{ flex: 1, minWidth: 240 }}>
                            <label style={sx.label}>
                              <span>Annet (kort beskrivelse)</span>
                              <input
                                name={`other_${main}`}
                                placeholder="Skriv kort om ønsket arbeid"
                                value={otherText[main] || ""}
                                onChange={(e) =>
                                  setOtherText((prev) => ({ ...prev, [main]: e.target.value }))
                                }
                                style={sx.input}
                              />
                            </label>
                          </div>
                        ) : (
                          <label key={sub} style={sx.tagItem}>
                            <input type="checkbox" name="work_main" value={`${main}:${sub}`} /> <span>{sub}</span>
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

      <div style={{ gridColumn: "1 / -1" }}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Er du åpen for midlertidige oppdrag?</div>
        <div style={sx.inlineRadios}>
          <label style={sx.radioLabel}>
            <input type="radio" name="wants_temporary" value="ja" required /> Ja
          </label>
          <label style={sx.radioLabel}>
            <input type="radio" name="wants_temporary" value="nei" /> Nei
          </label>
        </div>
      </div>

      <div style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>STCW – Grunnleggende sikkerhetskurs</div>
          <div style={sx.inlineRadios}>
            <label style={sx.radioLabel}>
              <input type="radio" name="stcw_has" value="ja" required onChange={() => setHasSTCW("ja")} /> Ja
            </label>
            <label style={sx.radioLabel}>
              <input type="radio" name="stcw_has" value="nei" onChange={() => setHasSTCW("nei")} /> Nei
            </label>
          </div>
          {hasSTCW === "ja" && (
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 13, color: "#475569", marginBottom: 6 }}>Huk av relevante moduler</div>
              <div style={sx.checkGrid}>
                {STCW_MODULES.map((m) => (
                  <label key={m} style={sx.checkItem}>
                    <input type="checkbox" name="stcw_mod" value={m} /> <span>{m}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Dekksoffiser-sertifikat</div>
          <div style={sx.inlineRadios}>
            <label style={sx.radioLabel}>
              <input type="radio" name="deck_has" value="ja" required onChange={() => setHasDeck("ja")} /> Ja
            </label>
            <label style={sx.radioLabel}>
              <input type="radio" name="deck_has" value="nei" onChange={() => setHasDeck("nei")} /> Nei
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
      <Textarea
        label="Kompetanse og erfaring (kort)"
        name="skills"
        rows={4}
        full
        description="Skriv kort om erfaring, sertifikater og kurs du ønsker å fremheve."
      />
      <Textarea
        label="Andre kommentarer (valgfritt)"
        name="other_comp"
        rows={4}
        full
        description="Legg til annen informasjon vi bør vite om tilgjengelighet, språk eller preferanser."
      />

      <FileInput label="CV (PDF, maks 10 MB)" name="cv" accept=".pdf" required />
      <FileInput label="Sertifikater (PDF/zip, valgfritt)" name="certs" accept=".pdf,.zip" />

      <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 8 }}>
        <input id="gdpr" type="checkbox" required />
        <label htmlFor="gdpr" style={{ fontSize: 13, color: "#475569", cursor: "pointer" }}>
          Jeg samtykker til behandling av persondata for bemanning/rekruttering.
        </label>
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <button type="submit" style={sx.btnMain}>
          Send inn jobbsøkerprofil
        </button>
      </div>
    </form>
  );
}
