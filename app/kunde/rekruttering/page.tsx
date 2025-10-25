import { Metadata } from "next";
import SiteLayout from "../../components/SiteLayout";
import { sx } from "../../lib/styles";

export const metadata: Metadata = {
  title: "Maritim rekruttering - Kapteiner, styrmann og nøkkelpersonell",
  description:
    "Headhunting og rekruttering av erfarne maritime ledere. Proaktivt søk etter kapteiner, styrmenn, maskinoffiserer og driftsledere. Grundig prosess med referansesjekk.",
  keywords: [
    "maritim rekruttering",
    "kaptein rekruttering",
    "styrmann jobb",
    "maskinoffiser rekruttering",
    "maritime ledere",
    "headhunting maritim",
    "driftsleder havbruk",
    "teknisk leder fartøy",
    "rekruttering Nord-Norge",
    "maritime stillinger Norge",
  ],
  openGraph: {
    title: "Maritim rekruttering og headhunting | Bluecrew AS",
    description: "Vi finner erfarne maritime ledere til nøkkelroller. Proaktivt søk og grundig prosess.",
    type: "website",
  },
};

export default function Page() {
  return (
    <SiteLayout active="kunde">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <h1 style={sx.h2}>Rekruttering og headhunting til sjøs</h1>
          <p style={sx.leadSmall}>
            Vi finner faste ansatte til nøkkelroller på bro, dekk og i landorganisasjonen. Bluecrew kombinerer nettverk fra
            sjøen med moderne rekrutteringsprosesser for å sikre riktig match.
          </p>

          {/* Når passer rekruttering */}
          <div style={{ display: "grid", gap: 24, marginTop: 48 }}>
            <section style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 20, padding: 32, display: "grid", gap: 16 }}>
              <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Når passer rekruttering?</h2>
              <p style={{ margin: 0, lineHeight: 1.7, fontSize: 17, color: "#cbd5e1" }}>
                Rekruttering (fast ansettelse) passer når dere trenger kontinuitet, lojalitet og noen som skal bygge kultur over tid. 
                Typiske situasjoner:
              </p>
              <ul style={{ margin: "16px 0 0 0", paddingLeft: 24, lineHeight: 1.7, display: "grid", gap: 10, fontSize: 16, color: "#e2e8f0" }}>
                <li>Nøkkelroller som kaptein, maskinsjef, driftsleder eller teknisk ansvarlig</li>
                <li>Stillinger som krever lang opplæring og lokal/operativ kunnskap</li>
                <li>Ledere som skal bygge team og kultur ombord</li>
                <li>Spesialistkompetanse som er vanskelig å finne (ROV, akvakulturteknologi, komplekst utstyr)</li>
                <li>Landbaserte roller som operasjonsleder, sikkerhetsansvarlig eller bemanningskoordinator</li>
              </ul>
              <p style={{ margin: "20px 0 0 0", lineHeight: 1.7, fontSize: 16, color: "#94a3b8", fontStyle: "italic" }}>
                Ikke sikker på om dere trenger bemanning eller rekruttering? Vi hjelper dere gjerne med vurderingen.
              </p>
            </section>

            {/* Rekrutteringsprosessen */}
            <section style={{ background: "#ffffff", borderRadius: 20, border: "1px solid #e2e8f0", padding: 32, boxShadow: "0 18px 36px rgba(15, 23, 42, 0.07)", display: "grid", gap: 16 }}>
              <h2 style={{ ...sx.h2, fontSize: 26, marginBottom: 8 }}>Vår rekrutteringsprosess</h2>
              <p style={{ margin: 0, color: "#475569", lineHeight: 1.7, fontSize: 17 }}>
                Vi har en strukturert tilnærming som kombinerer proaktivt søk med grundig kvalitetssikring:
              </p>

              <div style={{ display: "grid", gap: 24, marginTop: 20 }}>
                <div style={{ display: "grid", gap: 10 }}>
                  <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: "#0f172a" }}>1. Behovsanalyse og stillingsutforming</h3>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                    Vi starter med et grundig møte (fysisk eller digitalt) der vi kartlegger stillingens krav, fartøyets operasjon, 
                    teamdynamikk og kultur. Dette gjør at vi kan finne kandidater som passer teknisk <em>og</em> menneskelig.
                  </p>
                  <p style={{ margin: "8px 0 0 0", color: "#475569", lineHeight: 1.7 }}>
                    Vi hjelper også med å utforme stillingsannonse og kravprofil hvis dere ønsker det.
                  </p>
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: "#0f172a" }}>2. Proaktivt søk og headhunting</h3>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                    Vi søker aktivt i vårt nettverk, tar kontakt med relevante kandidater i bransjen og annonserer på relevante kanaler. 
                    For senior roller (kaptein, maskinsjef, driftsleder) bruker vi primært headhunting, ikke åpne annonser.
                  </p>
                  <p style={{ margin: "8px 0 0 0", color: "#475569", lineHeight: 1.7 }}>
                    Vi har tilgang til erfarne folk som ikke aktivt søker jobb, men som er åpne for de riktige mulighetene.
                  </p>
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: "#0f172a" }}>3. Screening og intervju</h3>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                    Alle kandidater gjennomgår telefonintervju og strukturert personlig intervju hos oss. Vi sjekker:
                  </p>
                  <ul style={{ margin: "8px 0 0 0", paddingLeft: 24, color: "#334155", lineHeight: 1.7, display: "grid", gap: 6, fontSize: 16 }}>
                    <li>Teknisk kompetanse og erfaring (verifisering av sertifikater og anbefalinger)</li>
                    <li>Motivasjon og forventninger til stillingen</li>
                    <li>Kulturell match og verdier</li>
                    <li>Referanser fra tidligere arbeidsgivere (minimum 2-3 referanser)</li>
                  </ul>
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: "#0f172a" }}>4. Presentasjon og kundeintervju</h3>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                    Vi presenterer 2-4 kvalifiserte kandidater med CV, våre vurderinger og anbefaling. Dere intervjuer selv (vi kan 
                    delta hvis ønskelig) og velger kandidat for videre prosess.
                  </p>
                  <p style={{ margin: "8px 0 0 0", color: "#475569", lineHeight: 1.7 }}>
                    For senior roller anbefaler vi også praktisk testing eller case-basert vurdering hvis mulig.
                  </p>
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: "#0f172a" }}>5. Kontraktsbistand og onboarding</h3>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                    Vi hjelper med å utforme arbeidskontrakt (hvis ønskelig), forhandler lønn og betingelser, og følger opp gjennom 
                    prøvetiden. Dette sikrer at både arbeidsgiver og ansatt får en god start.
                  </p>
                </div>
              </div>

              <p style={{ margin: "24px 0 0 0", color: "#475569", lineHeight: 1.7, fontSize: 16, fontWeight: 600 }}>
                Gjennomsnittlig prosess: 4-8 uker fra oppstart til signert kontrakt, avhengig av stillingens kompleksitet og tilgjengelighet.
              </p>
            </section>

            {/* Stillinger vi rekrutterer */}
            <section style={{ background: "#f8fafc", borderRadius: 20, padding: 32, display: "grid", gap: 16 }}>
              <h2 style={{ ...sx.h2, fontSize: 26, marginBottom: 8 }}>Stillinger vi rekrutterer</h2>
              <p style={{ margin: 0, color: "#475569", lineHeight: 1.7, fontSize: 17 }}>
                Vi har erfaring med rekruttering til hele det maritime spekteret:
              </p>

              <div style={{ display: "grid", gap: 20, marginTop: 12 }}>
                <div>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>Offshore og servicefartøy</h3>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                    Kaptein, overstyrmann, maskinsjef, elektriker, dekksmann med spesialkompetanse (kranoperatør, ROV, AHT-erfaring).
                  </p>
                </div>

                <div>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>Havbruk og brønnbåt</h3>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                    Kaptein, styrmann, fiskehelsepersonell, tekniske operatører, base-/driftsledere. Må kjenne oppdrettsnæringen og 
                    fiskevelferd.
                  </p>
                </div>

                <div>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>Landbaserte roller</h3>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                    Operasjonsleder, HMS-koordinator, bemanningskoordinator, teknisk sjef. Folk som har vært til sjøs og forstår 
                    operasjonen, men som nå skal jobbe fra land.
                  </p>
                </div>

                <div>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>Spesialistroller</h3>
                  <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                    ROV-piloterer, survey-personell, elektrotekniske spesialister, automatiseringsingeniører. Nisjeroller der det er 
                    få kandidater og høy etterspørsel.
                  </p>
                </div>
              </div>
            </section>

            {/* Priser og garantier */}
            <section style={{ background: "#ffffff", borderRadius: 20, border: "1px solid #e2e8f0", padding: 32, boxShadow: "0 18px 36px rgba(15, 23, 42, 0.07)", display: "grid", gap: 16 }}>
              <h2 style={{ ...sx.h2, fontSize: 26, marginBottom: 8 }}>Priser og garantier</h2>
              <p style={{ margin: 0, color: "#475569", lineHeight: 1.7, fontSize: 17 }}>
                Vi tar betalt basert på kandidatens årslønn. Prisen avhenger av stillingens kompleksitet og vår innsats:
              </p>

              <ul style={{ margin: "16px 0 0 0", paddingLeft: 24, color: "#334155", lineHeight: 1.7, display: "grid", gap: 8, fontSize: 16 }}>
                <li><strong>Standardroller</strong> (matros, dekksmann, junior styrmann): 15-20% av årslønn</li>
                <li><strong>Mellomledere</strong> (styrmann, maskinoffiser, teknisk ansvarlig): 20-25% av årslønn</li>
                <li><strong>Seniorroller</strong> (kaptein, maskinsjef, driftsleder): 25-30% av årslønn</li>
                <li><strong>Spesialistroller og headhunting</strong>: Skreddersydd pris basert på kompleksitet</li>
              </ul>

              <p style={{ margin: "20px 0 0 0", color: "#475569", lineHeight: 1.7, fontSize: 17 }}>
                <strong>Eksempel:</strong> Rekruttering av kaptein med årslønn på 800 000 kr = gebyr på ca. 200 000-240 000 kr (25-30%).
              </p>

              <div style={{ background: "#f0f9ff", border: "2px solid #0ea5e9", borderRadius: 12, padding: 20, marginTop: 20 }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: 19, fontWeight: 700, color: "#0f172a" }}>Våre garantier</h3>
                <ul style={{ margin: 0, paddingLeft: 24, color: "#334155", lineHeight: 1.7, display: "grid", gap: 6, fontSize: 16 }}>
                  <li><strong>6 måneders garantitid:</strong> Hvis kandidaten slutter eller blir sagt opp innen 6 måneder, starter vi ny søk uten ekstra kostnader.</li>
                  <li><strong>3 måneders delvis refusjon:</strong> Hvis kandidaten slutter innen 3 måneder, refunderer vi 50% av gebyret.</li>
                  <li><strong>Oppfølging i prøvetiden:</strong> Vi tar kontakt med både dere og kandidaten etter 1, 3 og 6 måneder for å sikre at alt går bra.</li>
                </ul>
              </div>

              <p style={{ margin: "20px 0 0 0", color: "#475569", lineHeight: 1.7, fontSize: 16, fontStyle: "italic" }}>
                Alle priser er eks. mva. Vi sender tilbud med fast pris før oppstart, ingen skjulte kostnader.
              </p>
            </section>

            {/* Hvorfor velge oss */}
            <section style={{ background: "#0f172a", color: "#e2e8f0", borderRadius: 20, padding: 32, display: "grid", gap: 16 }}>
              <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Hvorfor velge Bluecrew?</h2>
              <p style={{ margin: 0, lineHeight: 1.7, fontSize: 17, color: "#cbd5e1" }}>
                Vi er ikke bare rekrutterere, vi er maritime folk som forstår realitetene til sjøs:
              </p>

              <ul style={{ margin: "16px 0 0 0", paddingLeft: 24, lineHeight: 1.7, display: "grid", gap: 10, fontSize: 16, color: "#e2e8f0" }}>
                <li><strong>Ekte sjøerfaring:</strong> Vi har selv jobbet på fartøy og forstår hva som kreves i ulike roller.</li>
                <li><strong>Lokalt nettverk:</strong> Vi er basert i Harstad og har sterke nettverk i hele Nord-Norge og langs kysten.</li>
                <li><strong>Kvalitet over kvantitet:</strong> Vi presenterer kun kandidater vi selv ville ansatt.</li>
                <li><strong>Personlig oppfølging:</strong> Dere får én fast kontaktperson gjennom hele prosessen.</li>
                <li><strong>Transparent prosess:</strong> Vi holder dere oppdatert på fremdrift og eventuelle utfordringer underveis.</li>
              </ul>
            </section>

            {/* CTA */}
            <section style={{ background: "#0ea5e9", color: "#ffffff", borderRadius: 20, padding: 40, textAlign: "center" as const }}>
              <h2 style={{ margin: "0 0 16px 0", fontSize: 28, fontWeight: 800 }}>Trenger dere hjelp til rekruttering?</h2>
              <p style={{ margin: "0 0 28px 0", fontSize: 18, lineHeight: 1.6, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
                Vi starter med en uforpliktende samtale der vi kartlegger deres behov og foreslår beste fremgangsmåte.
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
                  Send forespørsel
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
