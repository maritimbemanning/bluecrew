import { Metadata } from "next";
import SiteLayout from "../../components/SiteLayout";
import { sx } from "../../lib/styles";

export const metadata: Metadata = {
  title: "Maritim bemanning - Servicefartøy, havbruk og offshore",
  description:
    "Komplette team eller enkeltressurser til havbruk, servicefartøy og offshore. STCW-sertifisert mannskap med HMS-dokumentasjon. Rask oppstart og fleksible løsninger.",
  keywords: [
    "servicefartøy bemanning",
    "havbruk mannskap",
    "brønnbåt bemanning",
    "offshore bemanning",
    "maritime vikarer",
    "dekksmannskap",
    "maskinmannskap",
    "STCW sertifisert bemanning",
    "operativ bemanning Norge",
    "fartøy mannskap Nord-Norge",
  ],
  openGraph: {
    title: "Maritim bemanning til servicefartøy og havbruk | Bluecrew AS",
    description: "Erfarne mannskaper til havbruk, servicefartøy og offshore. STCW-sertifisert med rask oppstart.",
    type: "website",
  },
};

export default function Page() {
  return (
    <SiteLayout active="kunde">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <h1 style={sx.h2}>Bemanning når operasjonen ikke kan stoppe</h1>
          <p style={sx.leadSmall}>
            Vi leverer komplette team eller enkeltressurser til havbruk, fiskeri, servicefartøy, logistikk og beredskap. Bluecrew
            håndterer skiftplan, kontrakter og dokumentasjon slik at du kan fokusere på driften.
          </p>

          {/* Våre leveranser */}
          <div style={{ display: "grid", gap: 24, marginTop: 48 }}>
            <section style={{ background: "#ffffff", borderRadius: 20, border: "1px solid #e2e8f0", padding: 32, boxShadow: "0 18px 38px rgba(15, 23, 42, 0.08)", display: "grid", gap: 16 }}>
              <h2 style={{ ...sx.h2, fontSize: 26, marginBottom: 8 }}>Våre leveranser</h2>
              <p style={{ margin: 0, color: "#475569", lineHeight: 1.7, fontSize: 17 }}>
                Vi leverer operativ bemanning til hele den maritime næringen. Det betyr at vi tar ansvar for hele bemanningsprosessen, 
                fra rekruttering og verifisering til oppfølging og rapportering under oppdraget.
              </p>
              <ul style={{ margin: "16px 0 0 0", paddingLeft: 24, color: "#334155", lineHeight: 1.7, display: "grid", gap: 10, fontSize: 16 }}>
                <li><strong>Korttidsoppdrag og vikariater:</strong> Fra noen dager til flere måneder. Perfekt ved sykdom, ferie eller topper i aktivitet.</li>
                <li><strong>Sesongbemanning:</strong> Havbruksektoren har stor variasjon i aktivitet. Vi leverer ekstra mannskap i høysesongen og skalerer ned ved lavere behov.</li>
                <li><strong>Fast turnus:</strong> Vi kan levere mannskap i fast rotasjon (2/2, 2/4, 4/4 osv.) over lengre perioder. Dette gir stabilitet og forutsigbarhet.</li>
                <li><strong>Komplette team:</strong> Trenger dere et helt mannskap til et nytt fartøy eller prosjekt? Vi setter sammen erfarne team som fungerer fra dag én.</li>
              </ul>
            </section>

            {/* Stillinger vi leverer */}
            <section style={{ background: "#f8fafc", borderRadius: 20, padding: 32, display: "grid", gap: 16 }}>
              <h2 style={{ ...sx.h2, fontSize: 26, marginBottom: 8 }}>Stillinger vi leverer</h2>
              <p style={{ margin: 0, color: "#475569", lineHeight: 1.7, fontSize: 17 }}>
                Vi har kandidater innen alle operative roller på norske fartøy:
              </p>
              
              <div style={{ display: "grid", gap: 20, marginTop: 12 }}>
                <div>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>Dekk</h3>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                    Kapteiner, styrmenn, matroser, bosun, dekksmannskap. Alle med gyldige STCW-sertifikater og relevant erfaring 
                    fra havbruk, servicefartøy eller offshore.
                  </p>
                </div>
                
                <div>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>Maskin</h3>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                    Maskinsjef, maskinoffiserer, motormann, elektriker. Erfaring med dieselmotorer, hydraulikk, elektriske systemer 
                    og vedlikehold av komplekst utstyr.
                  </p>
                </div>
                
                <div>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>Teknisk personell</h3>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                    Fiskehelsepersonell, ROV-piloterer, tekniske operatører, kok/messemannskap. Spesialistkompetanse tilpasset deres drift.
                  </p>
                </div>
              </div>
            </section>

            {/* Prosessen */}
            <section style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 20, padding: 32, display: "grid", gap: 16 }}>
              <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Slik fungerer det i praksis</h2>
              <p style={{ margin: 0, lineHeight: 1.7, fontSize: 17, color: "#cbd5e1" }}>
                Vi har en strømlinjeformet prosess som sikrer rask respons og riktig kvalitet:
              </p>
              
              <ol style={{ margin: "16px 0 0 0", paddingLeft: 24, lineHeight: 1.7, display: "grid", gap: 14, fontSize: 16, color: "#e2e8f0" }}>
                <li>
                  <strong style={{ color: "#ffffff" }}>Behovskartlegging (24 timer):</strong> Dere sender inn behov via skjema eller ringer oss. 
                  Vi avklarer rolle, kompetansekrav, periode og praktiske detaljer.
                </li>
                <li>
                  <strong style={{ color: "#ffffff" }}>Matching og verifisering (24-48 timer):</strong> Vi finner kandidater i vårt nettverk, 
                  verifiserer sertifikater, referanser og HMS-dokumentasjon. Dere får CV-er og anbefaling fra oss.
                </li>
                <li>
                  <strong style={{ color: "#ffffff" }}>Godkjenning og kontrakt (24 timer):</strong> Dere godkjenner kandidat(er), vi utarbeider 
                  kontrakter og klargjør praktiske detaljer (reise, innlosjering, utstyr).
                </li>
                <li>
                  <strong style={{ color: "#ffffff" }}>Oppstart og oppfølging:</strong> Mannskapet møter som avtalt. Vi følger opp underveis, 
                  håndterer timeregistrering, fakturering og eventuelle utfordringer.
                </li>
              </ol>
              
              <p style={{ margin: "20px 0 0 0", lineHeight: 1.7, fontSize: 16, color: "#94a3b8", fontStyle: "italic" }}>
                Normalt responstid fra forespørsel til oppstart: 48-72 timer for standardroller, kortere ved akutte behov.
              </p>
            </section>

            {/* HMS og kvalitet */}
            <section style={{ background: "#ffffff", borderRadius: 20, border: "1px solid #e2e8f0", padding: 32, boxShadow: "0 18px 38px rgba(15, 23, 42, 0.08)", display: "grid", gap: 16 }}>
              <h2 style={{ ...sx.h2, fontSize: 26, marginBottom: 8 }}>HMS og kvalitetssikring</h2>
              <p style={{ margin: 0, color: "#475569", lineHeight: 1.7, fontSize: 17 }}>
                Alle våre kandidater gjennomgår grundig kvalitetskontroll før de sendes ut:
              </p>
              
              <ul style={{ margin: "16px 0 0 0", paddingLeft: 24, color: "#334155", lineHeight: 1.7, display: "grid", gap: 10, fontSize: 16 }}>
                <li><strong>Sertifikater:</strong> Vi verifiserer at alle STCW-sertifikater (grunnkurs, brann, maritim helse osv.) er gyldige og oppdaterte.</li>
                <li><strong>Referanser:</strong> Vi tar kontakt med tidligere arbeidsgivere for å bekrefte erfaring og arbeidsevne.</li>
                <li><strong>HMS-dokumentasjon:</strong> Helseattest, politiattest (hvis relevant), sikkerhetskurs og annen nødvendig dokumentasjon.</li>
                <li><strong>Kompetanseverifisering:</strong> Vi sjekker at kandidatens faktiske erfaring matcher kravene i deres operasjon.</li>
                <li><strong>Forsikring:</strong> Vi har yrkesskadeforsikring og nødvendig ansvarsdekning for våre utleide mannskaper.</li>
              </ul>
              
              <p style={{ margin: "20px 0 0 0", color: "#475569", lineHeight: 1.7, fontSize: 16 }}>
                Vi er medlem av NHO og følger Bemanningsforskriften. Dette sikrer at både dere og mannskapet får ordnede forhold, 
                korrekt lønn og trygge arbeidsvilkår.
              </p>
            </section>

            {/* Priser */}
            <section style={{ background: "#f8fafc", borderRadius: 20, padding: 32, display: "grid", gap: 16 }}>
              <h2 style={{ ...sx.h2, fontSize: 26, marginBottom: 8 }}>Priser og avtaleformer</h2>
              <p style={{ margin: 0, color: "#475569", lineHeight: 1.7, fontSize: 17 }}>
                Vi tilbyr transparente priser basert på markedslønn pluss vårt påslag. Prisene varierer med:
              </p>
              
              <ul style={{ margin: "16px 0 0 0", paddingLeft: 24, color: "#334155", lineHeight: 1.7, display: "grid", gap: 8, fontSize: 16 }}>
                <li>Stillingens ansvarsnivå (matros vs. kaptein)</li>
                <li>Kompetansekrav og sertifiseringer</li>
                <li>Oppdragets varighet (korttid dyrere enn langtid)</li>
                <li>Geografi og tilgjengelighet</li>
              </ul>
              
              <p style={{ margin: "20px 0 0 0", color: "#475569", lineHeight: 1.7, fontSize: 17 }}>
                <strong>Eksempel timepris (veiledende):</strong> Matros/dekksmann fra ca. 450-550 kr/time. Styrmann/maskinoffiser fra ca. 
                600-750 kr/time. Kaptein/maskinsjef fra ca. 750-950 kr/time. Alle priser inkluderer sosiale kostnader, forsikring og vårt påslag.
              </p>
              
              <p style={{ margin: "16px 0 0 0", color: "#475569", lineHeight: 1.7, fontSize: 16 }}>
                Vi kan tilby <strong>rammeavtaler</strong> for kunder med jevnlig behov. Dette gir forutsigbare priser, prioritert tilgang 
                til våre beste kandidater og raskere oppstartstid.
              </p>
              
              <p style={{ margin: "16px 0 0 0", color: "#475569", lineHeight: 1.7, fontSize: 16, fontStyle: "italic" }}>
                Kontakt oss for skreddersydd pristilbud basert på deres spesifikke behov.
              </p>
            </section>

            {/* CTA */}
            <section style={{ background: "#0ea5e9", color: "#ffffff", borderRadius: 20, padding: 40, textAlign: "center" as const }}>
              <h2 style={{ margin: "0 0 16px 0", fontSize: 28, fontWeight: 800 }}>Trenger dere bemanning?</h2>
              <p style={{ margin: "0 0 28px 0", fontSize: 18, lineHeight: 1.6, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
                Vi hjelper dere raskt med kvalifisert mannskap. Ring oss eller send inn behovet deres, så tar vi kontakt innen 24 timer.
              </p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" as const }}>
                <a
                  href="/kunde/registrer-behov"
                  style={{
                    display: "inline-block",
                    background: "#ffffff",
                    color: "#0ea5e9",
                    padding: "16px 32px",
                    borderRadius: 12,
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: 17,
                    transition: "transform 0.2s",
                  }}
                >
                  Registrer behov
                </a>
                <a
                  href="tel:+4792328850"
                  style={{
                    display: "inline-block",
                    background: "rgba(255,255,255,0.15)",
                    color: "#ffffff",
                    padding: "16px 32px",
                    borderRadius: 12,
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: 17,
                    border: "2px solid rgba(255,255,255,0.3)",
                  }}
                >
                  Ring 923 28 850
                </a>
              </div>
            </section>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
