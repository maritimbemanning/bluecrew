# INCIDENT RESPONSE PLAN - PERSONVERNBRUDD

**Bluecrew AS - Beredskapsplan for personvernbrudd**  
**Hjemmel:** GDPR Art. 33 (Varsling til tilsynsmyndighet) + Art. 34 (Varsling til registrerte)  
**Dato:** 30. oktober 2025  
**Sist oppdatert:** 30. oktober 2025

---

## 🚨 DEFINISJON AV PERSONVERNBRUDD

Et personvernbrudd er et sikkerhetsbrudd som medfører at personopplysninger blir:
- **Utilsiktet eller ulovlig tilintetgjort**
- **Tapt, endret eller utilgjengeliggjort**
- **Uberettiget utlevert eller gjort tilgjengelig**

### Eksempler på personvernbrudd hos Bluecrew:
- 🔓 Uautorisert tilgang til kandidatdatabase (Supabase)
- 💾 Utilsiktet sletting av CV/sertifikater fra Storage
- 📧 E-post med kandidatinfo sendt til feil mottaker
- 🔑 Tap av krypteringsnøkler (AES-256, SHA-256 salt)
- 🐛 SQL-injection, XSS eller andre sikkerhetsangrep
- 📱 Tapt/stjålet laptop med tilgang til admin-portalen
- ☁️ Datainnbrudd hos underleverandør (Supabase, Resend, Upstash)

---

## ⏱️ TIDSLINJE & FRISTER

| Fase | Tidsfrist | Ansvarlig |
|------|-----------|-----------|
| **1. Oppdagelse & isolering** | Umiddelbart | IT-ansvarlig / CEO |
| **2. Intern varsling** | Innen 1 time | IT-ansvarlig |
| **3. Loggføring & dokumentasjon** | Innen 1 time | CEO |
| **4. Varsling til Datatilsynet** | Innen 72 timer | CEO |
| **5. Varsling til berørte personer** | Uten unødig opphold (hvis høy risiko) | CEO |
| **6. Post-incident review** | Innen 7 dager | CEO + IT |

---

## 🔴 FASE 1: UMIDDELBAR RESPONS (INNEN 1 TIME)

### 1.1 Isoler systemet
- [ ] **Ta offline hvis nødvendig:** Hvis aktivt angrep pågår, deaktiver API-routes eller hele applikasjonen
- [ ] **Stans dataflyt:** Sett rate-limit til 0 eller blokkér IP-adresser
- [ ] **Revokér API-nøkler:** Hvis Supabase/Resend/Upstash-nøkler er kompromittert, generer nye umiddelbart
- [ ] **Endre passord:** Admin-bruker, Vercel, GitHub, Supabase

### 1.2 Dokumenter hendelsen
Opprett øyeblikkelig en incident log med:
```markdown
**Incident ID:** INC-2025-001
**Tidspunkt for oppdagelse:** 2025-10-30 14:32 CET
**Oppdaget av:** Isak (CEO) / Automatisk overvåkning
**Type brudd:** Uautorisert tilgang / Datalekkasje / Sletting
**Omfang:** [Antall berørte kandidater/kunder]
**Berørte data:** [CV, fødselsnummer, e-post, telefon, sertifikater]
**Angrepsmåte:** [SQL-injection, XSS, kompromittert API-nøkkel, phishing]
**Status:** Pågående / Isolert / Løst
```

### 1.3 Varsle nøkkelpersoner
- [ ] **CEO (Isak):** isak@bluecrew.no / 923 28 850
- [ ] **IT-ansvarlig:** [Navn/kontaktinfo hvis annen enn CEO]
- [ ] **Juridisk rådgiver:** [Advokat hvis nødvendig]

---

## 🟠 FASE 2: RISIKOVURDERING (INNEN 2 TIMER)

### 2.1 Klassifiser alvorlighetsgrad

| Alvorlighet | Kriterier | Eksempel |
|-------------|-----------|----------|
| **🔴 KRITISK** | Fødselsnummer i klartekst lekket, eller >100 berørte | Database dump lekket til darkweb |
| **🟠 HØY** | CV/sertifikater lekket, eller 10-100 berørte | Uautorisert tilgang til Supabase Storage |
| **🟡 MEDIUM** | E-post/telefon lekket, eller 1-10 berørte | E-post sendt til feil mottaker |
| **🟢 LAV** | Kun teknisk data (IP, timestamp), ingen PII | Rate-limit database eksponert |

### 2.2 Vurder risiko for de registrerte
Spørsmål å stille:
- **Finansiell risiko?** Kan brudd føre til økonomisk tap (f.eks. identitetstyveri)?
- **Diskriminering?** Kan data brukes til diskriminering eller stigmatisering?
- **Omdømme?** Kan brudd skade kandidatens omdømme eller karriere?
- **Fysisk sikkerhet?** Kan data brukes til stalking eller trusler?

**Hvis JA på noen av disse:** Varsle til berørte personer umiddelbart (GDPR Art. 34)

---

## 📞 FASE 3: VARSLING TIL DATATILSYNET (INNEN 72 TIMER)

### 3.1 Hvem skal varsle?
**Behandlingsansvarlig:** Bluecrew AS v/Isak (CEO)

### 3.2 Hvordan melde?
**Metode:** Via Datatilsynets nettskjema  
**URL:** https://www.datatilsynet.no/om-datatilsynet/meld-ifra-til-datatilsynet/meld-personvernbrudd/  
**Telefon (ved hastesaker):** 22 39 69 00

### 3.3 Hva skal meldes?
GDPR Art. 33(3) krever følgende informasjon:

#### A) Beskrivelse av bruddet
```
Eksempel:
"Den 30. oktober 2025 kl. 14:32 oppdaget vi uautorisert tilgang til 
Bluecrew AS sin kandidatdatabase (Supabase PostgreSQL). En API-nøkkel 
med service_role-tilgang ble utilsiktet commitet til GitHub repository 
og var offentlig tilgjengelig i 4 timer før vi oppdaget feilen."
```

#### B) Kategorier og antall berørte
```
- **Berørte personer:** 23 kandidater (maritime arbeidstakere)
- **Berørte opplysninger:** 
  - Navn, e-post, telefon (alle 23)
  - SHA-256 hash av fødselsnummer (alle 23)
  - CV (PDF-filer, 18 av 23)
  - STCW-sertifikater (PDF-filer, 15 av 23)
```

#### C) Personvernombud (hvis aktuelt)
```
Bluecrew AS har ikke utnevnt personvernombud (DPO) siden vi er et lite 
foretak med <10 ansatte. Kontaktperson: Isak (CEO), isak@bluecrew.no
```

#### D) Sannsynlige konsekvenser
```
- **Risiko for identitetstyveri:** LAV (fødselsnummer er hashet med SHA-256)
- **Risiko for spam/phishing:** MEDIUM (e-post/telefon er eksponert)
- **Risiko for diskriminering:** LAV (ingen sensitive kategorier er lekket)
- **Samlet vurdering:** MEDIUM RISIKO
```

#### E) Tiltak iverksatt
```
1. API-nøkkel revokert umiddelbart (kl. 14:45)
2. Ny API-nøkkel generert med begrenset tilgang (RLS aktivert)
3. GitHub repository gjort privat
4. Git commit history rewritten for å fjerne nøkkel
5. Alle kandidater varslet via e-post (kl. 16:00)
6. Implementert pre-commit hook for å detektere secrets
```

### 3.4 Unntak fra varsling
Varsling til Datatilsynet kan utelates hvis:
- **Lav risiko:** Teknisk data (IP, timestamp), ingen PII
- **Kryptering:** Data er kryptert (AES-256) og nøkkel er sikret
- **Allerede kjent:** Datatilsynet er allerede informert via annen kanal

**⚠️ VIKTIG:** Ved tvil, meld alltid til Datatilsynet. Det er bedre å overvarsle enn undervarsle.

---

## 📧 FASE 4: VARSLING TIL BERØRTE PERSONER

### 4.1 Når skal vi varsle?
**Varsling er PÅKREVD hvis:**
- Bruddet kan medføre **høy risiko** for personens rettigheter og friheter
- Eksempler: Fødselsnummer lekket, finansiell info, helsedata, diskriminerende data

**Varsling er VALGFRITT hvis:**
- Lav risiko (kun e-post/telefon lekket, ingen økonomisk skade)
- Data er kryptert (AES-256) og nøkkel er sikret
- Tiltak iverksatt for å minimere risiko (f.eks. revokert API-nøkkel)

### 4.2 Hvordan varsle?
**Metode:** E-post til alle berørte kandidater/kunder  
**Avsender:** isak@bluecrew.no  
**Emne:** "Viktig melding om personvernbrudd - Bluecrew AS"

### 4.3 Mal for varsling
```
Kjære [Navn],

Vi skriver til deg fordi Bluecrew AS har opplevd et personvernbrudd 
som kan påvirke dine personopplysninger.

**Hva har skjedd?**
Den 30. oktober 2025 oppdaget vi at en API-nøkkel til vår database 
utilsiktet ble gjort offentlig tilgjengelig via GitHub. Nøkkelen ga 
tilgang til kandidatdatabasen i 4 timer før vi oppdaget feilen.

**Hvilke opplysninger er berørt?**
- Navn, e-post, telefon
- CV og STCW-sertifikater (PDF-filer)
- Fødselsnummer (hashet med SHA-256, ikke i klartekst)

**Hva er risikoen?**
Vi vurderer risikoen som MEDIUM. Fødselsnummer er ikke lekket i klartekst, 
men e-post og telefon kan potensielt brukes til phishing-angrep.

**Hva har vi gjort?**
1. Revokert API-nøkkel umiddelbart
2. Generert ny API-nøkkel med begrenset tilgang
3. Gjennomført sikkerheitsgjennomgang av alle systemer
4. Meldt hendelsen til Datatilsynet
5. Implementert bedre sikkerhetstiltak (pre-commit hooks)

**Hva bør du gjøre?**
- Vær ekstra oppmerksom på phishing-e-poster og mistenkelige telefoner
- Ikke klikk på lenker fra ukjente avsendere
- Kontakt oss hvis du opplever mistenkelig aktivitet

**Dine rettigheter:**
Du har rett til å klage til Datatilsynet (datatilsynet.no, tlf 22 39 69 00) 
hvis du mener vi ikke har håndtert dine personopplysninger korrekt.

**Kontakt oss:**
Isak (CEO)
E-post: isak@bluecrew.no
Telefon: 923 28 850

Vi beklager på det sterkeste denne hendelsen og tar ansvar for å sikre 
at lignende situasjoner ikke oppstår igjen.

Med vennlig hilsen,
Isak
CEO, Bluecrew AS
```

---

## 🔍 FASE 5: ETTERFORSKNING & ROOT CAUSE ANALYSIS

### 5.1 Identifiser rot-årsak
Spørsmål å stille:
- **Hvordan skjedde bruddet?** (Teknisk analyse)
- **Hvorfor ble det ikke oppdaget tidligere?** (Overvåkning)
- **Hvilke systemer var involvert?** (Supabase, Vercel, GitHub)
- **Var det menneskelig feil?** (Commit til Git, feil config)
- **Var det teknisk svakhet?** (SQL-injection, XSS, manglende validering)

### 5.2 Dokumenter funn
```markdown
**ROOT CAUSE ANALYSIS - INC-2025-001**

**Dato:** 30. oktober 2025
**Analysert av:** Isak (CEO) + IT-konsulent

**Teknisk årsak:**
Supabase service_role API-nøkkel ble commitet til Git i .env-fil.
GitHub repository var offentlig i 4 timer før vi oppdaget feilen.

**Menneskelig feil:**
- .env-fil var ikke i .gitignore
- Pre-commit hook for secrets detection var ikke installert
- Manglende code review før push til main branch

**Systemisk svakhet:**
- Ingen automatisk scanning av secrets i Git
- Ingen alerting ved uvanlig API-bruk (Supabase)
- Ingen IP-whitelist på Supabase API

**Løsning:**
1. .env-fil lagt til .gitignore
2. Installert Husky + lint-staged for pre-commit hooks
3. Implementert GitHub Secret Scanning (Advanced Security)
4. Aktivert Supabase API logging + Slack-varsling
5. IP-whitelist på Supabase (kun Vercel + Bluecrew kontor)
```

---

## 🛠️ FASE 6: TILTAK FOR Å FORHINDRE GJENTAKELSE

### 6.1 Tekniske tiltak
- [ ] **Secrets management:** Bruk Vercel Environment Variables (ikke .env i Git)
- [ ] **Pre-commit hooks:** Husky + lint-staged for å detektere API-nøkler
- [ ] **GitHub Secret Scanning:** Aktiver Advanced Security
- [ ] **IP-whitelist:** Begrens Supabase API til kun Vercel + kontor
- [ ] **Row Level Security (RLS):** Aktivert på alle Supabase-tabeller
- [ ] **Rate-limiting:** Upstash Redis begrenser til 5 req/hour per IP
- [ ] **Logging & monitoring:** Supabase logs + Slack-varsling ved anomalier
- [ ] **2FA:** Aktivert på alle kritiske kontoer (Supabase, Vercel, GitHub)

### 6.2 Organisatoriske tiltak
- [ ] **Sikkerhetstrening:** Alle ansatte får GDPR + sikkerhetskurs
- [ ] **Code review:** Alle Git commits til main krever review
- [ ] **Incident drills:** Årlig gjennomgang av denne planen
- [ ] **Databehandleravtaler (DPA):** Sørg for at alle underleverandører har signert DPA
- [ ] **Backup-rutiner:** Daglig backup av Supabase database + Storage

### 6.3 Dokumentasjon
- [ ] Oppdater `docs/gdpr/behandlingsoversikt.md` med nye tiltak
- [ ] Oppdater `docs/FULL-HEALTH-CHECK-2025.md` med incident detaljer
- [ ] Oppdater `README.md` med sikkerhetsprosedyrer

---

## 📝 LOGGFØRING

Alle personvernbrudd skal logges i `docs/gdpr/incidents-log.md`:

```markdown
| Incident ID | Dato | Type | Berørte | Alvorlighet | Meldt til Datatilsynet | Status |
|-------------|------|------|---------|-------------|------------------------|--------|
| INC-2025-001 | 30.10.2025 | API-nøkkel lekket | 23 kandidater | 🟠 HØY | Ja (01.11.2025) | Løst |
| - | - | - | - | - | - | - |
```

---

## 📞 KONTAKTINFORMASJON

### Bluecrew AS (Behandlingsansvarlig)
**CEO:** Isak  
**E-post:** isak@bluecrew.no  
**Telefon:** 923 28 850  
**Adresse:** Østenbekkveien 43, 9403 Harstad

### Datatilsynet
**URL:** https://www.datatilsynet.no  
**Meld personvernbrudd:** https://www.datatilsynet.no/meld-personvernbrudd  
**Telefon:** 22 39 69 00  
**Åpningstider:** Mandag-fredag 09:00-15:00

### Nødkontakter (Underleverandører)
- **Supabase Support:** support@supabase.io (kritiske saker)
- **Vercel Support:** vercel.com/support (via dashboard)
- **GitHub Security:** https://github.com/security

---

## 🔄 OPPDATERINGSHISTORIKK

| Dato | Endring | Utført av |
|------|---------|-----------|
| 30. oktober 2025 | Opprettet incident response plan (GDPR Art. 33) | Isak (CEO) |
| - | - | - |

**Neste review:** Q2 2026 (eller umiddelbart ved personvernbrudd)

---

**🔒 INTERNT DOKUMENT - IKKE PUBLISER PÅ NETTSTEDET**

_Denne planen skal gjennomgås årlig og oppdateres ved endringer i systemer, prosesser eller lovverk._
