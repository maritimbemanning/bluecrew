# BEHANDLINGSOVERSIKT - BLUECREW AS

**Behandlingsansvarlig:** Bluecrew AS (Org.nr 936 321 194)  
**Kontaktperson:** Isak (CEO) - isak@bluecrew.no / 923 28 850  
**Dato:** 30. oktober 2025  
**Hjemmel:** GDPR Art. 30(1) - Protokoll over behandlingsaktiviteter

---

## 1. KANDIDATREGISTRERING

### Formål
Rekruttering, bemanning og matching av maritime arbeidstakere med kundeoppdrag.

### Rettslig grunnlag
- **Samtykke (GDPR Art. 6(1)(a)):** Kandidaten gir eksplisitt samtykke ved registrering
- **Avtaleinngåelse (GDPR Art. 6(1)(b)):** Behandling nødvendig for å inngå arbeidsavtale

### Kategorier av personopplysninger
- **Grunnleggende:** Navn, e-post, telefon, bosted (fylke + kommune)
- **Sertifikater:** STCW-bevis, dekksbevis, HMS-kort, helseattest (uploadet som PDF)
- **Arbeidserfaring:** CV, arbeidshistorikk, referanser
- **Identifikasjon:** Fødselsnummer (SHA-256 hashet, aldri klartekst)
- **Verifisering:** BankID-verifiseringsdato, OCR confidence score (0-100)
- **Preferanser:** Tilgjengelig fra dato, ønsket arbeid, midlertidige oppdrag

### Mottakere av data
- **Supabase (database):** EU/USA - lagring av strukturert data (PostgreSQL)
- **Supabase Storage:** EU - lagring av CV/sertifikater (private bucket, signerte URLs)
- **Resend (e-post):** EU/USA - transaksjonelle e-poster (registreringsbekreftelse)
- **Upstash Redis:** EU/USA - rate-limiting (IP-adresse + timestamp)

### Tredjeland (overføringer utenfor EU/EØS)
- **USA (Supabase, Resend, Upstash):**
  - Standard Contractual Clauses (SCC 2021)
  - TIA utført (Transfer Impact Assessment) - vurdert som lav risiko
  - Ingen sensitive kategorier overføres (GDPR Art. 9)

### Lagringstid
- **Aktive kandidater:** 24 måneder fra siste aktivitet
- **Automatisk sletting:** GitHub Actions-script kjører månedlig
- **Manuell sletting:** Kandidat kan be om sletting via isak@bluecrew.no

### Sikkerhetstiltak
- **Kryptering i transit:** TLS 1.3 (HTTPS)
- **Kryptering at rest:** AES-256 (Supabase PostgreSQL)
- **Fødselsnummer:** SHA-256 hashet før lagring (irreversibel)
- **Tilgangskontroll:** Row Level Security (RLS) på Supabase
- **Rate-limiting:** Maks 5 registreringer per IP per time
- **OCR-validering:** Tesseract.js sjekker STCW-dokumenter

---

## 2. KUNDEFORESPØRSLER (LEADS)

### Formål
Besvare henvendelser fra potensielle kunder og oppfølging av bemanningsbehov.

### Rettslig grunnlag
- **Berettiget interesse (GDPR Art. 6(1)(f)):** Nødvendig for å besvare henvendelser og drive virksomhet

### Kategorier av personopplysninger
- **Kontaktperson:** Navn, e-post, telefon
- **Bedriftsinformasjon:** Bedriftsnavn, org.nr (valgfritt), bransje
- **Behov:** Beskrivelse av bemanningsbehov, ønsket kompetanse, start-/sluttdato

### Mottakere av data
- **Supabase (database):** EU/USA - lagring av leads
- **Resend (e-post):** EU/USA - e-post til Bluecrew (isak@bluecrew.no)

### Tredjeland
- **USA (Supabase, Resend):**
  - SCC 2021
  - TIA vurdert som lav risiko (kun kontaktinfo, ingen sensitive data)

### Lagringstid
- **12 måneder fra siste aktivitet**
- Automatisk sletting via GitHub Actions

### Sikkerhetstiltak
- TLS 1.3 + AES-256
- RLS på Supabase
- Rate-limiting (5 forespørsler per IP per time)

---

## 3. WEBANALYSE (PLAUSIBLE ANALYTICS)

### Formål
Statistikk og forbedring av nettstedet (trafikk, populære sider, brukeratferd).

### Rettslig grunnlag
- **Samtykke (GDPR Art. 6(1)(a)):** Cookie-banner ber om samtykke før analytics lastes

### Kategorier av personopplysninger
- **Anonymisert IP-adresse:** Siste oktet fjernet (f.eks. 192.168.1.XXX)
- **Teknisk data:** Nettleser, OS, skjermstørrelse, språk
- **Atferd:** Besøkte sider, session duration, referrer

### Mottakere av data
- **Plausible Analytics:** EU-basert (Frankfurt, Tyskland)
- **Ingen tredjepartsdelingar:** Plausible selger ikke data til annonsører

### Tredjeland
- **Nei:** All data lagres i EU (Frankfurt)

### Lagringstid
- **13 måneder** (Plausible policy)

### Sikkerhetstiltak
- **Ingen cookies:** Plausible bruker localStorage (ikke cookies)
- **Anonym analyse:** Ingen personidentifiserbare data
- **GDPR-compliant:** Plausible er designet for GDPR

---

## 4. RATE-LIMITING OG SPAM-FOREBYGGING

### Formål
Forebygge spam, misbruk og automatiserte angrep (brute-force).

### Rettslig grunnlag
- **Berettiget interesse (GDPR Art. 6(1)(f)):** Nødvendig for å beskytte systemet og brukere

### Kategorier av personopplysninger
- **IP-adresse:** Lagret midlertidig for rate-limiting
- **Timestamp:** Tidspunkt for forespørsel
- **Request count:** Antall forespørsler per IP per time

### Mottakere av data
- **Upstash Redis:** EU/USA - in-memory database (90 dagers retention)

### Tredjeland
- **USA (Upstash):**
  - SCC 2021
  - TIA vurdert som lav risiko (teknisk data, anonymt)

### Lagringstid
- **90 dager** (automatisk slettet)

### Sikkerhetstiltak
- **Pseudonymisering:** IP hashet med SHA-256 før lagring
- **TTL (Time To Live):** Data slettes automatisk etter 90 dager

---

## 5. KONTAKTSKJEMA (GENERELL HENVENDELSE)

### Formål
Besvare spørsmål fra jobbsøkere, kunder eller andre interesserte.

### Rettslig grunnlag
- **Berettiget interesse (GDPR Art. 6(1)(f)):** Nødvendig for å besvare henvendelser

### Kategorier av personopplysninger
- Navn, e-post, melding (fritekst)

### Mottakere av data
- **Resend (e-post):** EU/USA - sender e-post til isak@bluecrew.no

### Tredjeland
- **USA (Resend):**
  - SCC 2021
  - TIA vurdert som lav risiko

### Lagringstid
- **E-poster lagres i Gmail (Google Workspace):** Manuell sletting etter 12 måneder

### Sikkerhetstiltak
- **Honeypot-felt:** Skjult felt stopper spam-bots
- **Rate-limiting:** 5 forespørsler per IP per time

---

## 6. VIPPS BANKID-VERIFISERING (FREMTIDIG)

### Formål
Verifisere identiteten til kandidater ved registrering (hindre falske profiler).

### Rettslig grunnlag
- **Samtykke (GDPR Art. 6(1)(a)):** Kandidaten godtar BankID-verifisering ved pålogging

### Kategorier av personopplysninger
- **Fra Vipps:** Fødselsnummer, navn, telefon
- **Lagret hos Bluecrew:** SHA-256 hash av fødselsnummer (ikke klartekst)

### Mottakere av data
- **Vipps AS:** Norge - BankID-verifisering
- **Supabase:** EU/USA - lagring av hash

### Tredjeland
- **USA (Supabase):** SCC 2021 + TIA (hash, ikke fødselsnummer i klartekst)

### Lagringstid
- **Hash lagres permanent** (til kandidat ber om sletting)
- **Vipps session token:** Slettet etter 1 time

### Sikkerhetstiltak
- **SHA-256 hashing:** Fødselsnummer aldri lagret i klartekst
- **AES-256 session encryption:** Vipps session-data kryptert
- **HTTPSOnly:** Sikker overføring via TLS 1.3

---

## 7. DATABEHANDLERAVTALER (DPA)

Vi har inngått Data Processing Agreements (DPA) med alle underleverandører:

| Leverandør | Tjeneste | DPA-status | Lokasjon |
|------------|----------|------------|----------|
| Supabase | Database + Storage | ✅ Signert (2025) | EU/USA (SCC) |
| Resend | E-postvarsling | ✅ Signert (2025) | EU/USA (SCC) |
| Upstash | Rate-limiting (Redis) | ✅ Signert (2025) | EU/USA (SCC) |
| Plausible | Webanalyse | ✅ Signert (2025) | EU (Frankfurt) |
| Vipps | BankID-verifisering | ✅ Signert (2025) | Norge |

**DPA-dokumenter lagres i:** `docs/dpa/` (intern bruk, ikke public)

---

## 8. REGISTRERTES RETTIGHETER

Kandidater og kunder har følgende rettigheter i henhold til GDPR:

### Innsyn (Art. 15)
Be om kopi av alle personopplysninger vi har lagret.

### Retting (Art. 16)
Be om korreksjon av feil eller utdaterte opplysninger.

### Sletting (Art. 17)
Be om sletting av personopplysninger ("retten til å bli glemt").

### Begrensning (Art. 18)
Be om midlertidig stans av behandling (f.eks. ved tvist).

### Dataportabilitet (Art. 20)
Be om strukturert kopi av data (JSON/CSV) for overføring til annen tjeneste.

### Innsigelse (Art. 21)
Protestere mot behandling basert på berettiget interesse.

### Automatiserte beslutninger (Art. 22)
Vi bruker **ikke** automatiserte beslutninger med rettslige konsekvenser (ingen AI-screening uten menneskelig vurdering).

**Hvordan utøve rettigheter:**
- **E-post:** isak@bluecrew.no
- **Telefon:** 923 28 850
- **Brev:** Bluecrew AS, Østenbekkveien 43, 9403 Harstad
- **Responstid:** Innen 30 dager

---

## 9. PERSONVERNBRUDD (INCIDENT RESPONSE)

Ved personvernbrudd følger vi denne prosedyren:

1. **Umiddelbar respons (innen 1 time):**
   - Isoler systemet (ta offline hvis nødvendig)
   - Logg tidspunkt, omfang, berørte personer
   - Varsle CEO (isak@bluecrew.no)

2. **Varsling til Datatilsynet (innen 72 timer):**
   - Meldes via datatilsynet.no/meld-personvernbrudd
   - Telefon: 22 39 69 00

3. **Varsling til berørte personer (hvis høy risiko):**
   - E-post til alle berørte kandidater/kunder
   - Informasjon om hva som har skjedd
   - Råd om tiltak (f.eks. endre passord)

4. **Post-incident review:**
   - Dokumenter hendelsen
   - Identifiser rot-årsak
   - Implementer tiltak for å forhindre gjentakelse

**Se også:** `docs/gdpr/incident-response.md` (fullstendig plan)

---

## 10. KONTAKTINFORMASJON

**Behandlingsansvarlig:**  
Bluecrew AS  
Org.nr: 936 321 194  
Adresse: Østenbekkveien 43, 9403 Harstad  

**Personvernansvarlig:**  
Isak (CEO)  
E-post: isak@bluecrew.no  
Telefon: 923 28 850  

**Datatilsynet:**  
https://datatilsynet.no  
Telefon: 22 39 69 00  

---

## 11. OPPDATERINGSHISTORIKK

| Dato | Endring | Utført av |
|------|---------|-----------|
| 30. oktober 2025 | Opprettet behandlingsoversikt (GDPR Art. 30) | Isak (CEO) |
| - | - | - |

**Neste review:** Q2 2026 (eller ved vesentlige endringer)

---

**🔒 INTERNT DOKUMENT - IKKE PUBLISER PÅ NETTSTEDET**

_Dette dokumentet er til intern bruk for Bluecrew AS og skal oppbevares i henhold til GDPR Art. 30._
