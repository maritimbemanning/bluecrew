"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { FileInput, Input, Select, Textarea } from "../components/FormControls";
import { STCW_MODULES, WORK_OPTIONS } from "../lib/formOptions";
import { sx } from "../styles";

const CANDIDATE_SUPPORT = [
  {
    icon: "🧭",
    title: "Oppdrag langs hele kysten",
    text: "Vi bemanner fartøy fra sør til nord og legger til rette for reise og losji der det trengs.",
  },
  {
    icon: "🪪",
    title: "Sertifikatkontroll",
    text: "STCW-moduler, helseerklæring og fagbrev verifiseres før du sendes i oppdrag.",
  },
  {
    icon: "🤝",
    title: "Oppfølging underveis",
    text: "Du får en fast kontaktperson i Bluecrew som følger deg opp på vaktplan og utvikling.",
  },
];

export default function CandidatePage() {
  return (
    <Suspense fallback={<div />}> 
      <CandidatePageContent />
    </Suspense>
  );
}

function CandidatePageContent() {
  const searchParams = useSearchParams();
  const sent = searchParams.get("sent");
  const [openMain, setOpenMain] = useState<Record<string, boolean>>({});
  const [otherText, setOtherText] = useState<Record<string, string>>({});
  const [hasSTCW, setHasSTCW] = useState<"" | "ja" | "nei">("");
  const [hasDeck, setHasDeck] = useState<"" | "ja" | "nei">("");
  const [deckClass, setDeckClass] = useState("");

  const toggleMain = (main: string) =>
    setOpenMain((prev) => ({ ...prev, [main]: !prev[main] }));

  return (
    <main style={sx.page}>
      <SiteHeader current="kandidat" />

      <section style={{ ...sx.hero, paddingBottom: 32 }}>
        <div
          style={{
            ...sx.heroWrap,
            textAlign: "left",
            maxWidth: 720,
          }}
        >
          <div style={sx.heroPill}>For kandidater</div>
          <h1 style={sx.h1}>Registrer deg som kandidat</h1>
          <p style={{ ...sx.h1Sub, marginLeft: 0, marginRight: 0 }}>
            Del erfaring, sertifikater og tilgjengelighet – så matcher vi deg med
            oppdrag innen havbruk, fiskeri og servicefartøy.
          </p>
          <div style={{ ...sx.pillList, justifyContent: "flex-start", marginTop: 24 }}>
            <span style={sx.pill}>Tilgang til maritime oppdrag</span>
            <span style={sx.pill}>Personlig rådgiver</span>
            <span style={sx.pill}>Ryddige kontrakter</span>
          </div>
          <div style={{ marginTop: 24 }}>
            <Link
              href="/#tjenester"
              style={{
                ...sx.btnMain,
                background: "#fff",
                color: "#0B1F3A",
                borderColor: "#0B1F3A",
                boxShadow: "0 6px 18px rgba(2,6,23,0.08)",
              }}
            >
              Se hvilke tjenester vi dekker
            </Link>
          </div>
        </div>
      </section>

      <section style={{ ...sx.section, background: "#fff" }}>
        <div style={sx.wrapNarrow}>
          <h2 style={sx.h2}>Kandidatprofil</h2>
          <p style={sx.muted}>
            Legg inn kontaktinfo, velg fagområder og last opp CV (PDF). Vi kontakter
            deg når relevant oppdrag dukker opp.
          </p>

          {sent === "worker" ? (
            <div style={sx.ok} role="status">
              Takk! Skjemaet er sendt inn.
            </div>
          ) : (
            <form
              action="/api/submit-candidate"
              method="POST"
              encType="multipart/form-data"
              style={sx.form}
              noValidate
            >
              <Input label="Fullt navn" name="name" required />
              <Input label="E-post" name="email" type="email" required />
              <Input label="Telefon" name="phone" required />
              <Input label="Bosted (by/kommune)" name="city" required />

              <div style={{ gridColumn: "1 / -1" }}>
                <div style={{ fontWeight: 800, marginBottom: 8 }}>Ønsket arbeid</div>
                <div style={{ display: "grid", gap: 12 }}>
                  {Object.entries(WORK_OPTIONS).map(([main, subs]) => {
                    const open = !!openMain[main];
                    return (
                      <div
                        key={main}
                        style={{
                          border: "1px solid #E2E8F0",
                          borderRadius: 12,
                          padding: 12,
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
                            onChange={() => toggleMain(main)}
                          />
                          <span style={{ fontWeight: 700 }}>{main}</span>
                        </label>

                        {open ? (
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
                                          setOtherText((p) => ({
                                            ...p,
                                            [main]: e.target.value,
                                          }))
                                        }
                                        style={sx.input}
                                      />
                                    </label>
                                  </div>
                                ) : (
                                  <label key={sub} style={sx.tagItem}>
                                    <input type="checkbox" name="work[]" value={`${main} – ${sub}`} />
                                    {sub}
                                  </label>
                                )
                              )}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>

              <fieldset style={{ ...sx.fieldset, gridColumn: "1 / -1" }}>
                <legend style={sx.legend}>Sertifikater og kurs</legend>

                <div style={{ fontWeight: 600 }}>STCW Grunnleggende sikkerhetskurs</div>
                <div style={sx.inlineRadios}>
                  <label>
                    <input
                      type="radio"
                      name="stcw_has"
                      value="ja"
                      required
                      onChange={() => setHasSTCW("ja")}
                    />{" "}
                    Har
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="stcw_has"
                      value="nei"
                      onChange={() => setHasSTCW("nei")}
                    />{" "}
                    Har ikke
                  </label>
                </div>
                {hasSTCW === "ja" ? (
                  <div style={sx.checkGrid}>
                    {STCW_MODULES.map((module) => (
                      <label key={module} style={sx.checkItem}>
                        <input type="checkbox" name="stcw_modules[]" value={module} defaultChecked />
                        {module}
                      </label>
                    ))}
                  </div>
                ) : null}

                <div style={{ marginTop: 14 }}>
                  <div style={{ fontWeight: 600 }}>Dekksoffiser-sertifikat</div>
                  <div style={sx.inlineRadios}>
                    <label>
                      <input
                        type="radio"
                        name="deck_has"
                        value="ja"
                        onChange={() => setHasDeck("ja")}
                      />{" "}
                      Har
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="deck_has"
                        value="nei"
                        onChange={() => setHasDeck("nei")}
                      />{" "}
                      Har ikke
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
              </fieldset>

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
                  gap: 8,
                }}
              >
                <input id="gdpr" type="checkbox" required />
                <label htmlFor="gdpr" style={{ fontSize: 13, color: "#475569" }}>
                  Jeg samtykker til behandling av persondata for bemanning/rekruttering.
                </label>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <button type="submit" style={sx.btnMain}>
                  Send inn kandidatprofil
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <h2 style={sx.h2}>Hva du kan forvente</h2>
            <p style={sx.muted}>
              Vi sørger for at du er godt informert før, under og etter hvert oppdrag.
            </p>
          </div>

          <div style={sx.featureGrid}>
            {CANDIDATE_SUPPORT.map((item) => (
              <article key={item.title} style={sx.featureCard}>
                <div style={sx.featureIcon} aria-hidden="true">
                  {item.icon}
                </div>
                <h3 style={sx.featureTitle}>{item.title}</h3>
                <p style={sx.featureText}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ ...sx.section, background: "#fff" }}>
        <div style={sx.wrapNarrow}>
          <h2 style={sx.h2}>Spørsmål?</h2>
          <p style={sx.muted}>
            Ta kontakt om du trenger hjelp med skjemaet eller ønsker en prat om mulige
            oppdrag.
          </p>
          <Link href="mailto:isak@bluecrew.no" style={{ ...sx.btnMain, display: "inline-block" }}>
            Kontakt Bluecrew
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
