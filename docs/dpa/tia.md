# Transfer Impact Assessment (TIA) for Bluecrew AS

**Dato:** 29. oktober 2025  
**Ansvarlig:** Bluecrew AS, Org.nr 936 463 843  
**Formål:** Dokumentere vurdering av dataoverføringer til tredjeland i henhold til GDPR art. 46 og Datatilsynets veiledning om Schrems II (C-311/18)

---

## 1. Bakgrunn og regelverk

Etter EU-domstolens avgjørelse i **Schrems II (C-311/18)** i juli 2020 ble EU-US Privacy Shield kjent ugyldig. Dette betyr at overføring av personopplysninger til USA og andre tredjeland (land utenfor EØS) må baseres på:

1. **Standard Contractual Clauses (SCC)** – EU-kommisjonens standardavtaler for dataoverføring
2. **Transfer Impact Assessment (TIA)** – Tilleggstiltak for å sikre et tilsvarende beskyttelsesnivå som GDPR

Datatilsynet krever at virksomheter som overfører data til tredjeland dokumenterer:
- Hvilke databehandlere som brukes
- Om de har inngått DPA (Data Processing Agreement) med SCC
- Hvilke tilleggstiltak som er iverksatt for å beskytte personvernet

---

## 2. Databehandlere og tredjelandsoverføringer

Bluecrew AS bruker følgende eksterne databehandlere:

| Tjeneste | Leverandør | Land | Formål | DPA/SCC | Kryptering | Pseudonymisering |
|----------|-----------|------|--------|---------|------------|------------------|
| **Supabase** | Supabase Inc. (PostgreSQL hosting) | USA (servere i EU: Frankfurt/Stockholm) | Database, filopplasting, autentisering | ✅ Ja, SCC 2021 | ✅ TLS 1.3 in transit, AES-256 at rest | ⚠️ Delvis (brukere identifiseres kun ved e-post) |
| **Resend** | Resend Inc. | USA | Transaksjonelle e-poster (notifikasjoner til Bluecrew, kvitteringer til kandidater) | ✅ Ja, SCC 2021 | ✅ TLS 1.3 in transit | ✅ Ja (persondata sendes kun i e-post, ikke lagret) |
| **Upstash** | Upstash Inc. | USA (servere i EU: Frankfurt) | Rate-limiting (Redis) | ✅ Ja, SCC 2021 | ✅ TLS 1.3 in transit, AES-256 at rest | ✅ Ja (kun IP-adresser, ingen persondata) |
| **Plausible Analytics** | Plausible Insights OÜ | Estland (EU) | Anonymisert webanalyse (frivillig samtykke) | ✅ Ja, DPA | ✅ TLS 1.3 | ✅ Ja (ingen persondata, kun aggregert statistikk) |

**Konklusjon:** Kun Resend og Upstash innebærer faktisk tredjelandsoverføring. Supabase har servere i EU (Frankfurt/Stockholm), men er et amerikansk selskap og underlagt CLOUD Act. Plausible er europeisk (Estland) og krever ingen TIA.

---

## 3. Vurdering av tilleggstiltak (SCC + TIA)

I henhold til Datatilsynets veiledning om Schrems II har vi vurdert følgende:

### 3.1 **Standard Contractual Clauses (SCC)**

✅ **Bekreftet:** Alle leverandører har inngått Data Processing Agreements (DPA) basert på EU-kommisjonens oppdaterte SCC fra 4. juni 2021.

- **Supabase:** DPA tilgjengelig på https://supabase.com/legal/dpa (SCC Module 2: Controller-to-Processor)
- **Resend:** DPA tilgjengelig på https://resend.com/legal/dpa (SCC Module 2)
- **Upstash:** DPA tilgjengelig på https://upstash.com/legal/dpa (SCC Module 2)

### 3.2 **Tekniske tilleggstiltak**

Følgende tekniske sikkerhetstiltak er implementert:

| Tiltak | Implementering | Effekt |
|--------|----------------|--------|
| **Kryptering i transitt** | TLS 1.3 (alle API-kall, e-poster, databasetilkoblinger) | Beskytter mot avlytting under overføring |
| **Kryptering at rest** | AES-256 (Supabase/Upstash disk encryption, Resend e-postarkiv) | Beskytter mot fysisk tilgang til servere |
| **Row Level Security (RLS)** | Supabase RLS aktivert på alle tabeller, ingen client-side policies | Sikrer at kun autoriserte brukere (service role) har tilgang til persondata |
| **Private storage bucket** | Supabase storage `candidates-private` med RLS, ingen offentlig tilgang | CV og sertifikater er ikke tilgjengelige uten autentisering |
| **Pseudonymisering** | Kandidater identifiseres kun via e-post (ingen personnummer eller direkte identifikatorer i database) | Reduserer risiko ved eventuelt datainnbrudd |
| **Lagringsminimering** | Planlagt automatisk sletting etter 12-24 måneder (GDPR art 5(1)(e)) | Begrenser mengden data som kan eksponeres |
| **IP-logging kun for sikkerhet** | IP-adresser logges kun for rate-limiting (berettiget interesse GDPR art 6(1)(f)), ikke koblet til kandidatprofil | Minimerer personopplysninger som overføres |

### 3.3 **Organisatoriske tilleggstiltak**

| Tiltak | Implementering | Effekt |
|--------|----------------|--------|
| **Begrenset tilgang til persondata** | Kun administrerende direktør Isak Simonsen har tilgang til kandidatdatabase via Supabase Dashboard | Reduserer intern risiko for misbruk |
| **Varsling ved databrudd** | Supabase/Resend/Upstash har varslingsprosedyrer i sine DPAer (notification within 72h) | Sikrer rask respons ved sikkerhetshendelser |
| **Jevnlig gjennomgang av DPA** | Årlig kontroll av at DPA/SCC er oppdatert og i henhold til GDPR | Sikrer kontinuerlig compliance |

### 3.4 **Vurdering av amerikansk overvåkningslovgivning (CLOUD Act, FISA 702)**

**Risikofaktorer:**
- USA har brede fullmakter til å kreve tilgang til data gjennom CLOUD Act og FISA 702
- Supabase, Resend og Upstash er amerikanske selskaper og kan i teorien motta pålegg fra amerikanske myndigheter

**Reduserende faktorer:**
1. **Supabase og Upstash bruker EU-servere:** Data lagres i Frankfurt/Stockholm, ikke fysisk i USA
2. **Kryptering beskytter mot bulk-innhenting:** AES-256 kryptering gjør det vanskelig for overvåkningsmyndigheter å få tilgang til data uten spesifikk nøkkel
3. **Begrenset persondata:** Bluecrew samler ikke sensitive personopplysninger (etnisitet, politisk tilhørighet, helseopplysninger utover helseattest-bekreftelse)
4. **Dataminimering:** Kun nødvendig informasjon lagres (navn, e-post, CV, sertifikater, STCW-bekreftelse)
5. **Lav risiko for amerikansk interesse:** Bluecrew er en liten norsk bemanningsbedrift med maritime kandidater, ikke et høyrisiko-mål for overvåkning

**Konklusjon:** Vi vurderer risikoen som **lav** for at amerikanske myndigheter vil be om innsyn i kandidatdata fra Bluecrew. Kombinasjonen av SCC, kryptering, EU-baserte servere (Supabase/Upstash) og dataminimering gir tilstrekkelig beskyttelse i henhold til GDPR art 46 og Datatilsynets veiledning.

---

## 4. Konklusjon

✅ **Bluecrew AS har gjennomført Transfer Impact Assessment (TIA) for alle dataoverføringer til tredjeland.**

**Oppsummering:**
- Alle tredjelandsoverføringer er dekket av **Standard Contractual Clauses (SCC 2021)**
- Tilleggstiltak (kryptering, RLS, pseudonymisering, dataminimering) er implementert
- Risiko for ulovlig tilgang fra amerikanske myndigheter vurderes som **lav**
- Datatilsynets krav til dokumentasjon etter Schrems II er oppfylt

**Revisjonsplan:**
- TIA skal gjennomgås **årlig** eller ved vesentlige endringer i databehandlingen
- Ved nye leverandører i tredjeland skal ny TIA gjennomføres før bruk

**Kontakt for spørsmål:**
- Isak Simonsen, administrerende direktør
- E-post: isak@bluecrew.no
- Telefon: 923 28 850

---

## 5. Referanser

- **GDPR art. 46:** Overføring på grunnlag av hensiktsmessige beskyttelsestiltak
- **GDPR art. 5(1)(e):** Lagringsminimering
- **GDPR art. 32:** Sikkerhet ved behandling
- **C-311/18 Schrems II:** EU-domstolen, 16. juli 2020
- **Datatilsynets veiledning:** https://www.datatilsynet.no/regelverk-og-verktoy/veiledere/overforinger-av-personopplysninger-til-tredjeland/
- **EU Standard Contractual Clauses (SCC 2021):** https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en

---

**Signatur:**  
*Dokumentert av: Isak Simonsen*  
*Dato: 29. oktober 2025*  
*Godkjent av: Bluecrew AS styret*
