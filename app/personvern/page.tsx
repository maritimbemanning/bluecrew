import type { CSSProperties } from "react";
import SiteLayout from "../components/SiteLayout";
import { sx } from "../lib/styles";

const listStyle: CSSProperties = {
  margin: "18px 0",
  paddingLeft: 22,
  lineHeight: 1.7,
  color: "#334155",
  fontSize: 15,
};

export default function PersonvernPage() {
  return (
    <SiteLayout active="personvern">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <h1 style={sx.h2}>Personvernerklæring for Bluecrew AS</h1>
          <p style={sx.leadSmall}>
            Denne erklæringen beskriver hvordan Bluecrew AS behandler personopplysninger når du registrerer deg som kandidat,
            sender inn forespørsel som kunde eller på annen måte kommuniserer med oss. Vi følger personvernforordningen (GDPR)
            og norsk lovgivning, og oppdaterer dokumentet ved endringer i behandlingene våre.
          </p>
        </div>
      </section>

      <section style={sx.section}>
        <div style={sx.wrapNarrow}>
          <div style={{ display: "grid", gap: 36 }}>
            <section>
              <h2 style={sx.h2}>Behandlingsansvarlig</h2>
              <p style={sx.leadSmall}>
                Bluecrew AS (org.nr. 936 321 194) er behandlingsansvarlig for personopplysninger vi samler inn. Postadresse er
                Østenbekkveien 43, 9403 Harstad. Du kan kontakte oss på <a href="mailto:kontakt@bluecrew.no">kontakt@bluecrew.no</a>
                {" "}eller telefon <a href="tel:+4777131313">+47 77 13 13 13</a> ved spørsmål om personvern.
              </p>
            </section>

            <section>
              <h2 style={sx.h2}>Hvilke data vi samler inn</h2>
              <ul style={listStyle}>
                <li>Kandidatdata fra skjemaet vårt: kontaktinformasjon, erfaring, sertifikater, tilgjengelighet og opplastede dokumenter.</li>
                <li>Kundeleads: navn, rolle, virksomhet, kontaktinfo og beskrivelser av bemanningsbehov.</li>
                <li>Tekniske logger: tidspunkt, IP-adresse og nettleserrelaterte hendelser som er nødvendige for sikkerhet og misbruksvern.</li>
                <li>Samtykkeinformasjon: tidspunkt og versjon av samtykketekst.</li>
              </ul>
            </section>

            <section>
              <h2 style={sx.h2}>Formål og behandlingsgrunnlag</h2>
              <ul style={listStyle}>
                <li>Å kunne vurdere og følge opp kandidater til bemanning og rekruttering (samtykke, GDPR art. 6(1)(a)).</li>
                <li>Å svare på kundehenvendelser og tilby passende tjenester (berettiget interesse, GDPR art. 6(1)(f)).</li>
                <li>Å oppfylle rettslige krav innen bemanning, HMS og arbeidsrett (rettslig forpliktelse, GDPR art. 6(1)(c)).</li>
                <li>Å sikre drift, sikkerhet og misbruksvern for tjenestene våre (berettiget interesse, GDPR art. 6(1)(f)).</li>
              </ul>
            </section>

            <section>
              <h2 style={sx.h2}>Lagring, sikkerhet og retensjon</h2>
              <p style={sx.leadSmall}>
                Kandidat- og kundedata lagres i Supabase (PostgreSQL) innen EU/EØS. Dokumenter som CV og sertifikater lagres i et privat
                lagringsområde med tilgang via tidsbegrensede lenker. Vi oppretter rollebaserte tilgangskontroller, krypterer datatrafikk
                og logger sikkerhetshendelser uten å lagre innholdet i skjemaene eksternt.
              </p>
              <p style={sx.leadSmall}>
                Kandidatprofiler slettes eller anonymiseres etter 12 måneder uten aktiv dialog, med mindre videre lagring er avtalt med deg.
                Kundeleads slettes når dialogen er avsluttet eller senest etter 24 måneder. Du kan når som helst be om at vi oppdaterer eller
                sletter informasjonen din.
              </p>
            </section>

            <section>
              <h2 style={sx.h2}>Deling og databehandlere</h2>
              <p style={sx.leadSmall}>
                Bluecrew deler ikke personopplysninger med tredjeparter uten gyldig grunnlag. Vi bruker følgende leverandører som
                databehandlere og har inngått databehandleravtaler (DPA) med dem:
              </p>
              <ul style={listStyle}>
                <li>Supabase (database og fil-lagring, driftet i EU/EØS).</li>
                <li>Resend (utsendelse av e-postvarsler ved innsendinger).</li>
              </ul>
              <p style={sx.leadSmall}>
                Leverandørene behandler kun data på våre vegne og etter instruks. Dersom vi tar i bruk nye leverandører oppdateres denne
                oversikten.
              </p>
            </section>

            <section>
              <h2 style={sx.h2}>Dine rettigheter</h2>
              <ul style={listStyle}>
                <li>Innsyn i hvilke opplysninger vi behandler om deg.</li>
                <li>Retting av uriktige eller ufullstendige data.</li>
                <li>Sletting av data – retten til å bli glemt – når vilkårene er oppfylt.</li>
                <li>Begrensning av behandling eller protest mot behandling i gitte situasjoner.</li>
                <li>Dataportabilitet for opplysninger du har gitt oss basert på samtykke eller avtale.</li>
                <li>Å trekke tilbake samtykke når som helst, uten at det påvirker lovligheten av tidligere behandling.</li>
              </ul>
              <p style={sx.leadSmall}>
                Henvendelser behandles fortløpende og senest innen 30 dager. Du kan også klage til Datatilsynet dersom du mener vår behandling
                er i strid med regelverket.
              </p>
            </section>

            <section>
              <h2 style={sx.h2}>Kontakt og klage</h2>
              <p style={sx.leadSmall}>
                Send spørsmål om personvern til <a href="mailto:personvern@bluecrew.no">personvern@bluecrew.no</a>. Merk e-posten med
                «Personvern». Dersom du ikke får medhold hos oss kan du kontakte Datatilsynet på <a href="https://www.datatilsynet.no">datatilsynet.no</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
