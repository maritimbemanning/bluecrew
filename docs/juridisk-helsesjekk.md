# JURIDISK HELSESJEKK – BLUECREW AS

**Dato:** 29. oktober 2025  
**Scope:** GDPR, Personopplysningsloven, Arbeidsmiljøloven Kap 14, Bemanningsforskriften, EU Bemanningsdirektiv 2008/104/EF, ePrivacy, Datatilsynet, Arbeidstilsynet, Sjøfartsdirektoratet, ILO MLC 2006, Diskriminerings- og tilgjengelighetsloven

---

## 🟢 EXECUTIVE SUMMARY

**Status:** Bluecrew er **totalt sett godt rustet** juridisk og overholder de viktigste kravene i norsk og EU-lovverk. Noen små **forbedringsområder** identifisert nedenfor, men ingen kritiske mangler.

**Hovedkonklusjoner:**
- ✅ GDPR/personvern: **Solid**. Artikkel 13-14 dekket, behandlingsgrunnlag dokumentert, samtykke frivillig.
- ✅ Cookies/ePrivacy: **Godt**. Samtykke implementert korrekt, ingen pre-ticked boxes.
- ✅ RLS & data security: **Meget bra**. Supabase-policies strenge, private storage, rate-limiting.
- ⚠️ Arbeidsmiljøloven/bemanning: **Akseptabelt**, men mangler noen formuleringer om forsikring/erstatningsansvar.
- ⚠️ Maritim compliance (STCW/MLC): **Bra**, men noen ytterligere disclaimers kan gjøre det tydeligere.
- ⚠️ Tilgjengelighet (WCAG): **Greit**, men kan forbedres (ikke lovpålagt for privat virksomhet).

**Anbefaling:** Implementer de **7 anbefalte tiltakene** nedenfor for fullstendig compliance og beste praksis.

---

## 1. GDPR OG PERSONOPPLYSNINGSLOVEN

### ✅ Hva er på plass

**app/personvern/page.tsx** dekker kravene i:
- **GDPR Artikkel 13-14** (informasjonsplikt til registrerte)
- **Personopplysningsloven §§ 12-14**
- **Datatilsynets veiledere** om behandlingsgrunnlag og rettigheter

**Sterke sider:**
1. **Behandlingsansvarlig** klart angitt (Bluecrew AS, Org.nr: 936 321 194).
2. **Formål og rettslig grunnlag** godt dokumentert:
   - Kundehenvendelser: berettiget interesse (GDPR art. 6(1)(f))
   - Rekruttering: samtykke (art. 6(1)(a)) + berettiget interesse
   - Nettstedsdrift/sikkerhet: berettiget interesse
   - Statistikk (Plausible): samtykke
3. **Kategorier av opplysninger** tydelig listet (kandidater: CV, sertifikater; kunder: behov).
4. **Lagringstider** spesifisert:
   - Kundehenvendelser: 6–12 måneder
   - Kandidater: 12–24 måneder (med mulighet for fornyelse/sletting)
   - Tekniske logger: inntil 90 dager
5. **Databehandlere** navngitt (Supabase, Resend, Upstash, Plausible) med henvisning til DPA og Standard Contractual Clauses (SCC) ved tredjelandsoverføringer.
6. **Registrertes rettigheter** tydelig listet: innsyn, retting, sletting, begrensning, dataportabilitet, protest, klage til Datatilsynet.
7. **Sikkerhetstiltak** beskrevet: tilgangsstyring, kryptering, rate-limiting, sikkerhets-headere.

### ⚠️ Forbedringsområder

1. **Transfer Impact Assessment (TIA)** for tredjeland (USA):
   - **Krav:** Ved overføringer til tredjeland (Resend, Upstash, potensielt Plausible) må behandlingsansvarlig dokumentere at overføringen er trygg etter Datatilsynets veiledning om Schrems II (C-311/18).
   - **Anbefaling:** Opprett et internt dokument som bekrefter:
     - At dere har databehandleravtaler (DPA) med SCC (EU Standard Contractual Clauses).
     - At leverandørene ikke gir amerikanske myndigheter tilgang uten rettssikkerhet.
     - At dere har vurdert tilleggstiltak (f.eks. kryptering, pseudonymisering).
   - **Risiko:** Lav (små mengder data, begrenset periode), men dokumentasjon styrker etterlevelse.

2. **Dato for siste oppdatering**:
   - **Observasjon:** Personvernsiden viser dynamisk dato (`new Date().toLocaleDateString("no-NO")`), som alltid viser dagens dato.
   - **Krav:** Datatilsynet anbefaler å vise *faktisk* siste endringsdato for transparens.
   - **Anbefaling:** Erstatt med hardkodet dato (f.eks. "Oppdatert: 28. oktober 2025") og oppdater manuelt når innhold endres.

3. **Dokumentere dataslettingsrutiner**:
   - **Observasjon:** Lagringstider er angitt, men ingen automatisk sletting implementert (må gjøres manuelt eller via Supabase-script).
   - **Krav:** GDPR art. 5(1)(e) krever at data ikke lagres lenger enn nødvendig.
   - **Anbefaling:** Implementer et Supabase Cron-script (eller GitHub Actions) som periodisk sletter utløpt kandidat-/kundedata basert på `submitted_at` + lagringstid. Dokumenter rutinen i personvernerklæringen.

---

## 2. COOKIES OG ePRIVACY (eKOM-LOVEN)

### ✅ Hva er på plass

**app/cookies/page.tsx** og **app/lib/consent.ts** følger:
- **ePrivacy-direktivet (2002/58/EF)** art. 5(3) (norsk eKom-loven § 2-7b)
- **Datatilsynets veiledere** om samtykke til cookies

**Sterke sider:**
1. **Samtykke før lasting av cookies**:
   - Plausible-skript lastes kun etter eksplisitt samtykke (via `app/components/PlausibleLoader.tsx` og cookie-banner).
   - Ingen pre-ticked boxes; brukeren må aktivt klikke "Godta statistikk".
2. **Klar kategorisering**:
   - Nødvendige: `bc_cookie_consent` (6 måneders varighet, korrekt).
   - Statistikk: Plausible (kun ved samtykke, link til Plausible data policy).
3. **Samtykke kan trekkes tilbake**: "Tilbakestill og vis banner" funksjon tilgjengelig på cookies-siden.
4. **Tabell over cookies**: Navn, leverandør, formål, varighet, kategori.

### ⚠️ Forbedringsområder

1. **Cookie-banner synlighet**:
   - **Observasjon:** Banner vises kun hvis samtykke ikke er gitt (`app/components/CookieBanner.tsx`).
   - **Krav:** Ingen – dette er korrekt implementert.
   - **Anbefaling:** Vurder å legge til en liten "Cookie-innstillinger" lenke i footer (ved siden av personvern/vilkår) slik at brukeren alltid kan justere samtykke uten å måtte slette cookies manuelt.

2. **Plausible data policy link**:
   - **Observasjon:** Link til Plausible data policy er inkludert i cookie-tabellen.
   - **Krav:** Godt. Datatilsynet anbefaler transparens om tredjeparter.

**Konklusjon:** Svært god ePrivacy-etterlevelse. Ingen kritiske mangler.

---

## 3. DATASIKKERHET OG RLS (GDPR ART. 32)

### ✅ Hva er på plass

**supabase/policies.sql** og **app/lib/server/supabase.ts** implementerer:
- **GDPR art. 32** (sikkerhet i behandlingen)
- **GDPR art. 25** (datavern ved design og ved innstilt beskyttelse)

**Sterke sider:**
1. **Row Level Security (RLS)** aktivert på `public.candidates` og `public.leads`:
   - Ingen åpne policies = ingen direkte klienttilgang.
   - Service role på server bypasser RLS (korrekt for API-ruter).
2. **Private storage bucket** (`candidates-private`):
   - CV og sertifikater lagres i privat bucket med RLS på `storage.objects`.
   - Signerte URL-er brukes for tilgang (med utløpstid).
3. **Rate-limiting** (Upstash):
   - `app/lib/server/rate-limit.ts` begrenser forespørsler per IP (beskytter mot spam/DDoS).
4. **Sikkerhets-headere** (`middleware.ts`):
   - CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy.
   - CORS-restriksjoner med Cross-Origin-Opener-Policy og Cross-Origin-Resource-Policy.
5. **Validering og sanitering**:
   - Zod-validering i `app/lib/validation.ts` før innsending.
   - Honeypot-felt (`honey`) for å fange bots.
6. **IP-logging for sikkerhet**:
   - `source_ip` lagres i candidates/leads for feilsøking og misbruksforebygging (lovlig under berettiget interesse GDPR art. 6(1)(f)).

### ⚠️ Forbedringsområder

1. **Dokumentere databehandleravtaler (DPA)**:
   - **Observasjon:** Personvernerklæringen sier "Vi har databehandleravtaler (DPA)", men ingen lenker til DPA-dokumenter.
   - **Krav:** GDPR art. 28 krever skriftlig DPA. Datatilsynet anbefaler å dokumentere dette.
   - **Anbefaling:** Last ned DPA fra Supabase, Resend, Upstash, Plausible og lagre i `docs/dpa/` (ikke public). Legg til en intern kommentar i koden om hvor disse ligger.

2. **Kryptering i transit og at rest**:
   - **Observasjon:** Supabase krypterer data at rest (bekreftet i Supabase-dokumentasjon). HTTPS brukes for all kommunikasjon (CSP upgrade-insecure-requests).
   - **Krav:** GDPR art. 32 krever kryptering der hensiktsmessig – dette er oppfylt.
   - **Anbefaling:** Dokumenter dette eksplisitt i personvernerklæringen under "Sikkerhet" (f.eks. "Data krypteres både i transit (HTTPS/TLS) og at rest i Supabase").

3. **Sletting av filer ved datasletting**:
   - **Observasjon:** Når kandidatdata slettes fra `public.candidates`, forblir CV/sertifikater i `candidates-private` bucket med mindre manuelt slettet.
   - **Krav:** GDPR art. 17 (rett til sletting) krever at alle personopplysninger slettes.
   - **Anbefaling:** Implementer en Supabase Edge Function eller API-route som også sletter tilhørende filer i Storage når en kandidat slettes. Legg til en `ON DELETE` trigger eller manuell rutine.

---

## 4. ARBEIDSMILJØLOVEN OG BEMANNINGSDIREKTIVET

### ✅ Hva er på plass

**app/vilkar/page.tsx** dekker generelle brukervilkår, men mangler spesifikke bemanning-relaterte klausuler.

**Relevant lovverk:**
- **Arbeidsmiljøloven (AML) Kap 14** (§§ 14-12 til 14-18) – Innleie og formidling
- **Bemanningsforskriften** (forskrift til AML Kap 14)
- **EU Bemanningsdirektiv 2008/104/EF** (implementert i norsk lov)
- **Arbeidstilsynet** – Tilsyn med innleie/bemanning

**Observasjoner:**
1. **Ingen formelle bemanning-vilkår på nettstedet**:
   - Vilkårsiden dekker nettstedets bruk (innhold, ansvar, IP), men ikke ansettelsesforhold eller innleie.
   - **Krav:** Bemanningsforetak må ha tydelige vilkår om:
     - Arbeidsgivers ansvar (Bluecrew eller innleiekunde).
     - Forsikring og erstatningsansvar.
     - HMS-ansvar og opplæring.
     - Likebehandlingsprinsippet (AML § 14-12a: innleid arbeidstaker skal ha minst like gode vilkår som kundebedriftens egne ansatte).
   - **Risiko:** Lav (dette håndteres trolig i separate **arbeidskontrakter** mellom Bluecrew og kandidater/kunder), men nettstedet bør henvise til dette.

2. **Likebehandling og lønn**:
   - **Observasjon:** FAQ og lønnsguide nevner "konkurransedyktig lønn over tariff".
   - **Krav:** AML § 14-12a krever likebehandling (lønn, arbeidstid, ferie, overtid).
   - **Anbefaling:** Legg til en formulering i vilkår/personvern eller i en **ny "Arbeidsvilkår"-side** som bekrefter at Bluecrew følger likebehandlingsprinsippet og norsk arbeidsmiljølov.

3. **Forsikring og erstatningsansvar**:
   - **Observasjon:** Vilkårsiden sier "ikke ansvarlig for indirekte tap", men ingen spesifikk bemanningsforsikring nevnt.
   - **Krav:** Bemanningsforetak bør ha yrkesskadeforsikring, ansvarsforsikring og eventuelt D&O-forsikring.
   - **Anbefaling:** Legg til en setning i vilkår eller en FAQ om at Bluecrew har nødvendig forsikring for innleid personell, og at kundebedriftens HMS-ansvar gjelder på arbeidssted.

### ⚠️ Forbedringsområder

**HØYESTE PRIORITET:**

1. **Opprett en "Arbeidsvilkår for bemanning"-side** (f.eks. `/vilkar/bemanning`):
   ```markdown
   ## Arbeidsvilkår for bemanning og innleie

   Bluecrew AS leverer bemanning i henhold til Arbeidsmiljøloven Kap 14 og Bemanningsforskriften.

   **Arbeidsgivers ansvar:**
   - Bluecrew AS er arbeidsgiver for innleid personell (vikar/midlertidig ansettelse).
   - Innleiekunde har HMS-ansvar på arbeidssted og skal gi nødvendig opplæring.

   **Likebehandling (AML § 14-12a):**
   - Innleid personell har rett til minst like gode arbeidsvilkår som innleiekundebedriftens egne ansatte (lønn, arbeidstid, ferie, overtid).

   **Forsikring:**
   - Bluecrew har yrkesskadeforsikring og ansvarsforsikring for innleid personell.
   - Innleiekunde må ha egen bedriftsforsikring for HMS-risiko på arbeidssted.

   **Oppsigelse og varighet:**
   - Innleie reguleres av arbeidskontrakt mellom Bluecrew og kandidat.
   - Innleiekunde kan si opp innleie etter avtale (normalt 1–4 uker).

   **Kontakt Arbeidstilsynet:**
   - Ved spørsmål om innleie, se [Arbeidstilsynet.no](https://www.arbeidstilsynet.no/).
   ```

2. **Legg til forsikringsbekreftelse i FAQ**:
   - Nytt spørsmål: "Hvilken forsikring har bemannet personell?"
   - Svar: "Bluecrew har yrkesskadeforsikring og ansvarsforsikring for alle våre ansatte. Innleiekunde har HMS-ansvar på arbeidssted og må ha egen bedriftsforsikring."

3. **Dokumenter likebehandling i kandidat-/klientavtaler**:
   - Sørg for at arbeidskontrakter med kandidater og innleieavtaler med kunder eksplisitt refererer til AML § 14-12a.

---

## 5. MARITIM COMPLIANCE (STCW, MLC, SJØFARTSDIREKTORATET)

### ✅ Hva er på plass

**Relevant lovverk:**
- **STCW-konvensjonen** (IMO Standards of Training, Certification and Watchkeeping)
- **ILO Maritime Labour Convention (MLC 2006)**
- **Sjøfartsdirektoratet** (norsk myndighet for maritime sertifikater)
- **Flaggstatskrav** (NOR/NIS-register)

**Observasjoner:**
1. **STCW-krav tydelig kommunisert**:
   - Kandidatskjema krever bekreftelse på at kandidaten "har eller vil skaffe STCW grunnleggende sikkerhetskurs og gyldig helseattest" (`stcw_confirm`).
   - FAQ og guider (hvordan-bli-skipsfører, matros, maskinoffiser) lister STCW-moduler (PST, FPFF, EFA, PSSR).
2. **Helseattest**:
   - Kandidatskjema nevner helseattest som påkrevd før oppdrag.
   - **Krav:** MLC 2006 Standard A1.2 krever gyldig legeundersøkelse for alle sjøfolk.
   - **Anbefaling:** Bekreft i FAQ at helseattest må være godkjent av Sjøfartsdirektoratet (eller annen godkjent lege).

3. **Fagbrev og dekksoffiser-sertifikater**:
   - Kandidatskjema spør om dekksoffiser-sertifikat (klasse 1–6).
   - **Krav:** Sjøfartsdirektoratet utsteder dekksoffiser- og maskinoffisersertifikater etter STCW.
   - **Observasjon:** Skjemaet samler inn denne informasjonen, men validerer ikke mot Sjøfartsdirektoratets register.
   - **Anbefaling:** Legg til en kommentar i FAQ om at Bluecrew verifiserer sertifikater mot offentlig register før oppdrag.

### ⚠️ Forbedringsområder

1. **Disclaimer om sertifikatgodkjenning**:
   - **Anbefaling:** Legg til en setning i kandidatskjemaet (under STCW/helseattest-bekreftelsen):
     > "Bluecrew verifiserer alle sertifikater mot Sjøfartsdirektoratets register før oppdragsoppstart. Falske eller utgåtte sertifikater medfører at kandidaten ikke kan tas i betraktning."

2. **MLC-samsvar (arbeidsvilkår til sjøs)**:
   - **Krav:** MLC 2006 stiller krav om:
     - Skriftlig arbeidsavtale (Standard A2.1).
     - Lønn (Standard A2.2): minstelønn etter tariff/flaggstat.
     - Hvile- og arbeidstid (Standard A2.3): max 14 timer/dag, 72 timer/uke.
     - Sosial sikkerhet (Standard A4.5).
   - **Observasjon:** Nettstedet nevner ikke MLC eksplisitt.
   - **Anbefaling:** Legg til en FAQ eller vilkårs-seksjon:
     > "Bluecrew følger ILO Maritime Labour Convention (MLC 2006) for alle offshore- og maritime oppdrag. Dette sikrer skriftlig kontrakt, minstelønn, hviletid og sosial sikkerhet."

3. **Flaggstatskrav (NOR vs NIS)**:
   - **Observasjon:** Lønnsguiden nevner NOR-register (høy lønn, høy skatt) vs NIS-register (lavere lønn, lavere skatt).
   - **Krav:** NOR-fartøy må ha norsk mannskap (eller EØS); NIS tillater internasjonal manning.
   - **Anbefaling:** Bekreft i FAQ at Bluecrew primært leverer mannskap til NOR-registrerte fartøy (eller spesifiser hvilke flaggstater dere dekker).

---

## 6. TILGJENGELIGHET (WCAG 2.1)

### ✅ Hva er på plass

**Relevant lovverk:**
- **Diskriminerings- og tilgjengelighetsloven (DTL) § 17** (krav til universell utforming av IKT)
- **EU Web Accessibility Directive (2016/2102)** (gjelder offentlig sektor; beste praksis for privat)
- **WCAG 2.1 Level AA** (anbefalt standard)

**Observasjoner:**
1. **Semantisk HTML**:
   - Bruk av `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>`.
   - Aria-labels på navigasjon (`aria-label="Hovedmeny"`, `aria-labelledby`, `role="menuitem"`).
2. **Keyboard-navigasjon**:
   - Desktop dropdown-meny støtter Arrow/Home/End/Escape (implementert i `SiteLayout.tsx`).
   - Mobile sheet har focus trap (Tab-felle).
3. **Focus-visible**:
   - `.focusVisible` CSS-klasse for keyboard-brukere.
4. **Contrast**:
   - Tekst/bakgrunn-kontrast ser akseptabel ut (ikke verifisert automatisk).

### ⚠️ Forbedringsområder

**Merk:** DTL § 17 gjelder primært **offentlige virksomheter** og **større private aktører**. Små private bedrifter har ikke lovplikt, men beste praksis anbefaler WCAG 2.1 AA.

1. **Automatisk tilgjengelighetstesting**:
   - **Anbefaling:** Kjør `npm run pa11y` (eller lignende verktøy) for å sjekke WCAG-brudd automatisk.
   - **Eksempel:** `pa11y https://bluecrew.no --standard WCAG2AA`

2. **Alt-tekst på bilder**:
   - **Observasjon:** ESLint-warning om `<img>` i guide (mangler `alt`-attributt).
   - **Anbefaling:** Erstatt `<img>` med Next.js `<Image>` og legg til beskrivende `alt`-tekst.

3. **Form-labels og error-messaging**:
   - **Observasjon:** FormControls (`Input`, `Select`, `Textarea`) har `<label>` og `aria-invalid`.
   - **Krav:** WCAG 2.1 Success Criterion 3.3.1 (Error Identification) – oppfylt.
   - **Anbefaling:** Vurder å legge til `aria-describedby` på input-felt som linker til feilmeldinger for enda bedre skjermleser-støtte.

4. **Skip-to-content lenke**:
   - **Observasjon:** Ingen "Skip to main content" lenke for keyboard-brukere.
   - **Anbefaling:** Legg til en skjult lenke øverst i `<body>` som hopper til `<main>` ved Tab-fokus.

**Konklusjon:** Tilgjengelighet er **akseptabel** for en privat bedrift. Anbefalte forbedringer er nice-to-have, ikke lovpålagt.

---

## 7. SAMMENDRAG AV ANBEFALTE TILTAK

### 🔴 Høy prioritet (lovpålagt / beste praksis)

1. **Opprett "Arbeidsvilkår for bemanning"-side** (`/vilkar/bemanning`):
   - Dekk AML Kap 14, likebehandling, forsikring, HMS-ansvar.
   - Lenk fra footer/vilkår.

2. **Dokumenter Transfer Impact Assessment (TIA)** for tredjelandsoverføringer:
   - Opprett internt dokument i `docs/dpa/tia.md` som bekrefter SCC og tilleggstiltak.

3. **Implementer automatisk datasletting** (GDPR art. 5(1)(e)):
   - Supabase Cron-script eller GitHub Actions som sletter utløpte kandidater/kunder.
   - Dokumenter rutinen i personvernerklæringen.

4. **Legg til MLC-samsvar i FAQ/vilkår**:
   - Bekreft at Bluecrew følger ILO MLC 2006 for maritime oppdrag.

### 🟡 Middels prioritet (forbedrer transparens)

5. **Hardkod "siste oppdatert"-dato** i personvern/vilkår/cookies:
   - Erstatt `new Date().toLocaleDateString()` med faktisk dato.

6. **Legg til "Cookie-innstillinger" lenke i footer**:
   - Gjør det enklere for brukere å endre samtykke uten å slette cookies.

7. **Dokumenter kryptering eksplisitt** i personvernerklæringen:
   - F.eks. "Data krypteres i transit (HTTPS/TLS) og at rest i Supabase."

### 🟢 Lav prioritet (nice-to-have)

8. **Kjør automatisk WCAG-test** (`pa11y` eller lignende):
   - Identifiser og fiks tilgjengelighetsbrudd.

9. **Legg til "Skip to main content" lenke**:
   - Forbedrer keyboard-navigasjon.

10. **Verifiser sertifikater mot Sjøfartsdirektoratet**:
    - Legg til API-integrasjon (hvis tilgjengelig) for å sjekke STCW-sertifikater automatisk.

---

## 8. JURIDISKE REFERANSER

### GDPR og personvern
- **GDPR** (Regulation (EU) 2016/679): Art. 5 (prinsipper), Art. 6 (behandlingsgrunnlag), Art. 13-14 (informasjonsplikt), Art. 17 (sletting), Art. 25 (datavern ved design), Art. 28 (databehandleravtaler), Art. 32 (sikkerhet).
- **Personopplysningsloven** (Norge): §§ 12-14 (informasjonsplikt), § 15 (innsyn), § 16 (retting/sletting).
- **Datatilsynet:** [Veiledere](https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/)
- **Schrems II** (C-311/18): Krav om Transfer Impact Assessment ved tredjelandsoverføringer.

### ePrivacy og cookies
- **ePrivacy-direktivet** (2002/58/EF): Art. 5(3) (samtykke til cookies).
- **eKom-loven** (Norge): § 2-7b (informasjon og samtykke ved lagring/tilgang til terminalutstyr).
- **Datatilsynet:** [Veileder om informasjonskapsler](https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/informasjonskapsler-cookies/)

### Arbeidsmiljølov og bemanning
- **Arbeidsmiljøloven (AML):** Kap 14 (§§ 14-12 til 14-18) – Innleie og formidling.
- **Bemanningsforskriften:** FOR-2013-04-26-405.
- **EU Bemanningsdirektiv:** 2008/104/EF (Agency Workers Directive).
- **Arbeidstilsynet:** [Veiledning om innleie](https://www.arbeidstilsynet.no/tema/innleie/)

### Maritim compliance
- **STCW-konvensjonen:** IMO Standards of Training, Certification and Watchkeeping for Seafarers (1978, amended 2010).
- **ILO MLC 2006:** Maritime Labour Convention (ratifisert av Norge 2013).
- **Sjøfartsdirektoratet:** [Sertifikater og kompetanse](https://www.sdir.no/sjofart/fartoy/sertifikater/)
- **Skipssikkerhetsloven:** LOV-2007-02-16-9.

### Tilgjengelighet
- **Diskriminerings- og tilgjengelighetsloven (DTL):** § 17 (universell utforming av IKT).
- **EU Web Accessibility Directive:** 2016/2102 (implementert i norsk lov via DTL).
- **WCAG 2.1:** [W3C Web Content Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 9. KONKLUSJON

Bluecrew AS har en **meget god juridisk grunnmur** og overholder de viktigste kravene i:
- ✅ GDPR/Personopplysningsloven
- ✅ ePrivacy/Cookies
- ✅ Datasikkerhet (RLS, kryptering, rate-limiting)
- ⚠️ Arbeidsmiljøloven/Bemanningsdirektivet (mangler noen formuleringer, men trolig dekket i arbeidskontrakter)
- ⚠️ STCW/MLC (god kommunikasjon, men kan presiseres ytterligere)
- ⚠️ Tilgjengelighet (akseptabelt, ikke lovpålagt)

**Anbefaling:**
1. Implementer de **4 høyprioritet-tiltakene** (bemanning-vilkår, TIA, datasletting, MLC-FAQ) innen 1–2 måneder.
2. Adresser **middels prioritet**-tiltakene (hardkod datoer, cookie-innstillinger, kryptering-dokumentasjon) ved neste oppdatering av legal-sider.
3. Vurder **lav prioritet**-tiltakene (WCAG-test, skip-to-content, sertifikatverifisering) som langsiktig forbedring.

**Helhetsvurdering:** 🟢 **Juridisk sunn bedrift** med kun små justeringer nødvendig for fullstendig compliance.

---

**Utarbeidet av:** GitHub Copilot (AI-assistent)  
**Disclaimer:** Dette dokumentet er veiledende og erstatter ikke juridisk rådgivning fra advokat. Bluecrew AS bør konsultere advokat spesialisert på arbeidsrett, personvern og maritim rett for formell juridisk validering.
