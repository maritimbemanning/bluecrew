# TRANSFER IMPACT ASSESSMENT (TIA)

**Dato:** 6. november 2025  
**Behandlingsansvarlig:** Bluecrew AS (Org.nr: 936 321 194)  
**Formål:** Vurdering av personvernrisiko ved overføring av personopplysninger til tredjeland (USA)

---

## 1. EXECUTIVE SUMMARY

**Konklusjon:** Personopplysningsoverføringer til USA (Resend, Upstash) vurderes som **lav risiko** basert på:
- ✅ EU Standard Contractual Clauses (SCC) inngått med begge leverandører
- ✅ Begrenset dataomfang (kun nødvendige opplysninger)
- ✅ Tilleggstiltak implementert (kryptering, pseudonymisering, tilgangskontroll)
- ✅ Ingen sensitive personopplysninger overføres (kun navn, e-post, telefon)
- ✅ EU Data Privacy Framework (DPF) godkjent for amerikanske selskaper (2023)

**Schrems II-vurdering:** Risiko for amerikansk overvåkning vurderes som minimal gitt:
- Dataene er ikke av interesse for amerikanske sikkerhetstjenester
- Volum er lite (mindre enn 100 henvendelser/måned)
- Ingen politisk sensitive opplysninger
- Kryptering beskytter mot uautorisert tilgang

---

## 2. DATABEHANDLERE I TREDJELAND

### 2.1 Resend (USA) – E-posttjeneste

**Selskap:** Resend, Inc.  
**Land:** USA (San Francisco, California)  
**Tjeneste:** Transaksjonell e-post (varsling ved kandidat-/kunderegistrering)  
**Personopplysninger behandlet:**
- Navn (fornavn + etternavn)
- E-postadresse
- Telefonnummer (valgfritt, kun hvis oppgitt)
- Referanse til stilling/oppdrag (f.eks. "Styrmann søkt")

**Behandlingsgrunnlag:**
- GDPR art. 6(1)(b) – Avtaleoppfyllelse (varsling ved registrering)
- GDPR art. 6(1)(f) – Berettiget interesse (intern notifikasjon til Bluecrew)

**Overføringsmekanisme:**
- EU Standard Contractual Clauses (SCC 2021 – Module 2: Controller-to-Processor)
- Resend DPA signert 15. oktober 2024

**Tilleggstiltak:**
- ✅ TLS 1.3 kryptering for all kommunikasjon
- ✅ E-poster sendes kun til Bluecrew-ansatte (ikke eksterne tredjeparter)
- ✅ Ingen lagring av persondata hos Resend utover 90 dager (automatisk sletting)
- ✅ API-nøkkel lagret i environment variables (ikke hardkodet)
- ✅ Rate limiting forhindrer misbruk

**Risikovurdering:**
- **Sannsynlighet for ulovlig tilgang:** Meget lav (kryptert overføring, ingen sensitiv data)
- **Konsekvens ved brudd:** Lav (kun kontaktinformasjon, ingen helseopplysninger eller politiske meninger)
- **Samlet risiko:** Lav ✅

---

### 2.2 Upstash (USA) – Redis rate-limiting

**Selskap:** Upstash, Inc.  
**Land:** USA (Delaware)  
**Tjeneste:** Redis-database for rate-limiting og midlertidig cache
**Personopplysninger behandlet:**
- IP-adresse (anonymisert etter 90 dager)
- Tidspunkt for API-forespørsler
- Ingen navn, e-post eller CV-data

**Behandlingsgrunnlag:**
- GDPR art. 6(1)(f) – Berettiget interesse (sikkerhet mot spam og DDoS-angrep)

**Overføringsmekanisme:**
- EU Standard Contractual Clauses (SCC 2021 – Module 2: Controller-to-Processor)
- Upstash DPA signert 1. september 2024

**Tilleggstiltak:**
- ✅ IP-adresser pseudonymiseres (SHA-256 hash)
- ✅ Automatisk sletting etter 90 dager
- ✅ Ingen kobling til navn eller e-post
- ✅ TLS 1.3 kryptering for all kommunikasjon
- ✅ Environment variables for API-nøkler

**Risikovurdering:**
- **Sannsynlighet for ulovlig tilgang:** Meget lav (kun hashede IP-adresser)
- **Konsekvens ved brudd:** Meget lav (ingen identifiserbare personopplysninger)
- **Samlet risiko:** Meget lav ✅

---

### 2.3 Plausible (EU) – Webanalyse

**Selskap:** Plausible Analytics OÜ  
**Land:** Estland (EU/EØS)  
**Tjeneste:** Anonymisert webanalyse
**Personopplysninger behandlet:**
- Ingen (IP-adresser ikke lagret, ingen cookies, ingen brukertracking)

**Overføringsmekanisme:**
- N/A (kun EØS-behandling)

**Risikovurdering:**
- Ingen risiko (GDPR-konform, ingen tredjelandsoverføring) ✅

---

### 2.4 Supabase (EU) – Database og Storage

**Selskap:** Supabase, Inc.  
**Land:** Singapore (hovedkontor), men **EU-region valgt** for databehandling
**Databehandlingssted:** Frankfurt, Tyskland (AWS eu-central-1)
**Tjeneste:** PostgreSQL database og fillagring (Storage)

**Personopplysninger behandlet:**
- Alle kandidat- og kundedata (navn, e-post, telefon, CV, vedlegg)

**Overføringsmekanisme:**
- N/A (kun EØS-behandling – data forlater aldri EU)

**Tilleggstiltak:**
- ✅ AES-256 kryptering at rest
- ✅ TLS 1.3 kryptering i transit
- ✅ Row Level Security (RLS) for tilgangskontroll
- ✅ Automatisk backup i EU-region (Frankfurt)

**Risikovurdering:**
- Ingen risiko (kun EU-behandling) ✅

---

## 3. SCHREMS II-VURDERING

### 3.1 Bakgrunn

**Schrems II-dommen (C-311/18, 16. juli 2020):**
- EU-domstolen ugyldiggjorde EU-US Privacy Shield
- Standard Contractual Clauses (SCC) er fortsatt gyldige, men krever tilleggsvurdering
- Behandlingsansvarlig må vurdere lovgivning i tredjeland (særlig USA)

**US CLOUD Act (2018):**
- Gir amerikanske myndigheter tilgang til data lagret hos amerikanske selskaper (selv om servere er i EU)
- FISA 702 tillater overvåkning av utlendinger uten domstolskontroll

**EU-US Data Privacy Framework (2023):**
- Nytt rammeverk for dataoverføringer til USA (godkjent av EU-kommisjonen 10. juli 2023)
- Styrker personvern gjennom økt rettssikkerhet for EU-borgere
- Resend og Upstash deltar i DPF (verifisert via Data Privacy Framework List)

### 3.2 Risikovurdering for Bluecrew

**Kriterier for risiko (EU-kommisjonens veiledning):**

| Kriterie | Vurdering | Risiko |
|----------|-----------|--------|
| **Type data** | Kun kontaktinformasjon (navn, e-post, telefon). Ingen sensitive personopplysninger. | Lav |
| **Volum** | Mindre enn 100 registreringer/måned. | Lav |
| **Formål** | Intern varsling (Resend) og sikkerhet (Upstash). Ingen salg av data. | Lav |
| **Datasubjekter** | Norske sjøfolk og bedrifter. Ingen politiske aktører eller journalister. | Lav |
| **Tilgjengelighet for myndigheter** | Data er ikke av interesse for amerikanske sikkerhetstjenester (ingen nasjonal sikkerhet, terrorisme eller alvorlig kriminalitet). | Meget lav |
| **Kryptering** | TLS 1.3 (transit) + AES-256 (at rest). Beskytter mot uautorisert tilgang. | Styrker sikkerhet |
| **SCC implementering** | Resend og Upstash har begge signert EU SCC 2021 (Module 2). | ✅ Compliant |

**Konklusjon:**
Sannsynligheten for at amerikanske myndigheter vil kreve tilgang til Bluecrew-data er **ekstremt lav**, og selv om det skulle skje, er dataene:
1. Kryptert (TLS 1.3, AES-256)
2. Ikke sensitive (kun kontaktinformasjon)
3. Ikke relevante for nasjonal sikkerhet

**Total risiko:** ✅ **Lav nok til at overføring er forsvarlig under GDPR art. 46 (SCC) + tilleggstiltak.**

---

## 4. TILLEGGSTILTAK (GDPR art. 46)

For å styrke beskyttelsen utover SCC, har Bluecrew implementert følgende tiltak:

### 4.1 Tekniske tiltak

| Tiltak | Implementering | Formål |
|--------|----------------|--------|
| **End-to-end kryptering** | TLS 1.3 for all API-kommunikasjon | Forhindrer avlytting underveis |
| **Kryptering at rest** | AES-256 i Supabase (EU) | Beskytter data på servere |
| **Pseudonymisering** | IP-adresser hashet (SHA-256) i Upstash | GDPR art. 32(1)(a) |
| **Dataminimering** | Kun nødvendige felter sendes til Resend/Upstash | GDPR art. 5(1)(c) |
| **Automatisk sletting** | 90 dager for Resend, 90 dager for Upstash | GDPR art. 5(1)(e) |
| **API-nøkler i environment variables** | Secrets ikke i git | Forhindrer lekkasje |
| **Rate limiting** | 10 requests/minutt per IP | DDoS-beskyttelse |

### 4.2 Organisatoriske tiltak

| Tiltak | Implementering | Formål |
|--------|----------------|--------|
| **DPA-avtaler** | Signert med Resend (15. okt 2024), Upstash (1. sep 2024) | GDPR art. 28 |
| **Minimalt antall databehandlere** | Kun 2 i tredjeland (Resend, Upstash) | Reduserer risiko |
| **Regelmessig gjennomgang** | TIA oppdateres hvert kvartal | Kontinuerlig forbedring |
| **Brukerinformasjon** | Personvernerklæring nevner tredjelandsoverføringer | GDPR art. 13(1)(f) |
| **Klageadgang** | Datatilsynet.no lenket i personvern | GDPR art. 77 |

---

## 5. ALTERNATIVER VURDERT

### 5.1 EU-baserte alternativer

| Tjeneste | EU-alternativ | Vurdert | Valg |
|----------|---------------|---------|------|
| **Resend (e-post)** | SendGrid EU, Mailgun EU | Ja | ❌ Dyrere, dårligere DX |
| **Upstash (Redis)** | AWS ElastiCache (eu-central-1) | Ja | ❌ Krever egen infrastruktur |
| **Plausible (analytics)** | N/A (allerede EU) | - | ✅ Bruker Plausible |
| **Supabase** | N/A (allerede EU-region) | - | ✅ Bruker EU-region |

**Begrunnelse for valg av Resend/Upstash:**
- Betydelig lavere kostnad (Resend: $20/mnd vs. SendGrid EU: $80/mnd)
- Bedre utvikleropplevelse (færre tekniske problemer)
- Risikoen vurderes som så lav at kostnadsbesparelsen er forsvarlig
- SCC + tilleggstiltak gir tilstrekkelig beskyttelse

---

## 6. OVERVÅKING OG REVIDERING

**Ansvarlig:** Daglig leder (Isak Didriksson)  
**Revisjonsfrekvens:** Hvert kvartal (eller ved endringer i lovgivning)

**Neste revisjon:** 1. februar 2026

**Triggere for umiddelbar revidering:**
1. Ny dom fra EU-domstolen om tredjelandsoverføringer
2. Endringer i amerikansk overvåkningslovgivning (FISA, CLOUD Act)
3. Sikkerhetsbrudd hos Resend eller Upstash
4. Endringer i Bluecrew sin databehandling (nye kategorier, større volum)
5. Klage fra datasubjekt

**Loggen for endringer:**

| Dato | Endring | Ansvarlig |
|------|---------|-----------|
| 6. nov 2025 | TIA opprettet | Isak Didriksson |

---

## 7. KONKLUSJON OG GODKJENNING

**Samlet vurdering:**
Overføring av personopplysninger til Resend (USA) og Upstash (USA) vurderes som **forsvarlig** under GDPR art. 46 (SCC) med tilleggstiltak. Risikoen for ulovlig tilgang fra amerikanske myndigheter er **meget lav**, og konsekvensene ved eventuelt brudd er **begrenset** gitt dataomfanget.

**Godkjenning:**

| Rolle | Navn | Dato | Signatur |
|-------|------|------|----------|
| Daglig leder / Behandlingsansvarlig | Isak Didriksson | 6. november 2025 | [Digital godkjenning] |

---

## 8. VEDLEGG

### 8.1 DPA-referanser

- **Resend DPA:** Signert 15. oktober 2024 (lagret i `docs/dpa/resend-dpa-2024.pdf`)
- **Upstash DPA:** Signert 1. september 2024 (lagret i `docs/dpa/upstash-dpa-2024.pdf`)

### 8.2 SCC-dokumentasjon

- **EU Standard Contractual Clauses (2021):** https://ec.europa.eu/info/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en
- **Module 2 (Controller-to-Processor):** Brukt for både Resend og Upstash

### 8.3 Data Privacy Framework (DPF)

- **EU-US DPF:** https://www.dataprivacyframework.gov/
- **Resend DPF-status:** Verifisert medlem (per 1. januar 2024)
- **Upstash DPF-status:** Verifisert medlem (per 15. mars 2024)

### 8.4 Juridiske referanser

- **GDPR Art. 44-50:** Overføring av personopplysninger til tredjeland
- **GDPR Art. 46:** Overføring med egnede garantier (SCC)
- **Schrems II (C-311/18):** EU-domstolen 16. juli 2020
- **EU-kommisjonens anbefalinger:** "Recommendations 01/2020 on measures that supplement transfer tools"

---

**Opprettholdt av:** Bluecrew AS (Org.nr: 936 321 194)  
**Kontakt:** isak@bluecrew.no  
**Neste revisjon:** 1. februar 2026
