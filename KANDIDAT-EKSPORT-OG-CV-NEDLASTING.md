# Kandidat Eksport og CV-nedlasting - Implementasjon

**Dato:** 20. november 2025
**Oppgave:** Eksportere alle kandidater + legge til CV-nedlasting i admin-portal

---

## ✅ Gjennomført

### 1. Fullstendig Kandidateksport (306 kandidater)

**Genererte filer i bluecrew-mappen:**

- **ALLE-KANDIDATER-KOMPLETT.csv** - Excel-fil med alle 306 kandidater
  - 242 interesse-registreringer (uten CV)
  - 64 fulle søknader (med CV og sertifikater)
  - Inkluderer CV-filstier for nedlasting

- **KOMPLETT-KANDIDATRAPPORT.txt** - Detaljert statistikk og oppsummering
  - Totaloversikt
  - Status fordeling
  - Arbeidsområder
  - Datakvalitet

- **candidates-export.json** - Rådata (interesse-registreringer)
- **candidates-with-cvs-export.json** - Rådata (fulle søknader)

**Statistikk:**
- 306 totale kandidater
- 54 nye siste 7 dager
- 62 CV-filer lagret
- 52 sertifikatfiler lagret

### 2. CV-nedlasting i Admin-portal

**Implementert:**

#### A. Ny API-rute for filnedlasting
**Fil:** `C:\dev\bluecrew-admin\app\api\storage\download\route.ts`

```typescript
GET /api/storage/download?key=cv/abc123.pdf&bucket=candidates-private
```

**Funksjonalitet:**
- Genererer signede URLs for private filer i Supabase Storage
- 1 times utløpstid på signerte URLer
- Støtter både CV og sertifikater
- Sikker server-side autentisering med service role

#### B. Oppdatert CandidatePipelineView
**Fil:** `C:\dev\bluecrew-admin\components\views\CandidatePipelineView.tsx`

**Endringer:**
1. Ny `downloadFile()` funksjon som:
   - Henter signet URL fra API
   - Åpner fil i nytt vindu
   - Viser toast-melding ved suksess/feil

2. Oppdatert fil-visning i kandidatdetaljer:
   - "Last ned" knapp ved CV (hvis tilgjengelig)
   - "Last ned" knapp ved sertifikater (hvis tilgjengelig)
   - Visuell indikator med grønn farge for tilgjengelige filer

**UI-forbedringer:**
- Download-ikon på knapper
- Bedre layout med justify-between
- Konsistent spacing (space-y-3)

---

## 📊 Kandidatoversikt

### Interesse-registreringer (242 stk)
- **Top roller:**
  - Annet maritimt: 57
  - Matros: 53
  - Dekksarbeider: 39
  - Skipper/kyst: 27
  - Styrmann: 26

- **Status:**
  - Interesse: 214
  - Avslått: 27
  - Godkjent: 1

### Fulle søknader med CV (64 stk)
- **Top arbeidsområder:**
  - Servicefartøy mannskap (Matros): 30
  - Logistikk og støtte (Offshore service): 20
  - Supply: 19
  - Fiskeri (Matros): 19
  - Skipper/Styrmann: 17

- **Status:**
  - Pending: 50
  - Avslått: 10
  - Godkjent: 4

- **Tilgjengelighet:**
  - Ønsker vikararbeid: 58
  - Har/vil skaffe STCW: 62

---

## 🔧 Teknisk Implementasjon

### Storage Bucket Struktur

**candidates-private** (privat bucket med RLS):
- `cv/{hash}.pdf` - Kandidat CVer
- `cert/{hash}/certificate.pdf` - Sertifikater

**Sikkerhet:**
- Kun service role har tilgang
- Signede URLs utløper etter 1 time
- Ingen direkte tilgang fra klient

### API Endpoint

```typescript
// Request
GET /api/storage/download?key=cv/abc123.pdf&bucket=candidates-private

// Response
{
  "success": true,
  "url": "https://...supabase.co/storage/v1/object/sign/..."
}
```

### Frontend Integrasjon

```typescript
const downloadFile = async (fileKey: string, fileName: string) => {
  const response = await fetch(
    `/api/storage/download?key=${encodeURIComponent(fileKey)}&bucket=candidates-private`
  );
  const data = await response.json();

  if (data.success && data.url) {
    window.open(data.url, "_blank");
    showToast("✅ Fil lastet ned!");
  }
};
```

---

## 📍 Hvor finner du hva?

### Eksporterte filer (lokalt)
```
C:\dev\bluecrew-public\bluecrew\
├── ALLE-KANDIDATER-KOMPLETT.csv       (Åpnes i Excel)
├── KOMPLETT-KANDIDATRAPPORT.txt       (Oversikt)
├── kandidater-alle.csv                 (Interesse-kandidater)
├── kandidater-oppsummering.txt        (Statistikk)
├── candidates-export.json             (Rådata interesse)
└── candidates-with-cvs-export.json    (Rådata med CV)
```

### Admin-portal
```
https://admincrew.no/?view=pipeline
```

**Slik laster du ned CV:**
1. Gå til Pipeline-visning
2. Klikk på en kandidat med CV (grønn indikator)
3. Se "Filer"-seksjonen i detaljer
4. Klikk "Last ned" ved CV eller Sertifikater

---

## 🚀 Deployment

### For å deploye endringene:

1. **Admin-portalen (bluecrew-admin):**
   ```bash
   cd C:\dev\bluecrew-admin
   git add .
   git commit -m "feat: Add CV download functionality to pipeline view"
   git push
   ```

2. **Verifiser at Vercel environment variables er satt:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

3. **Test i produksjon:**
   - Gå til https://admincrew.no/?view=pipeline
   - Åpne en kandidat med CV
   - Test nedlasting

---

## 🔐 Sikkerhet

### Implementert:
✅ Service role autentisering (server-side)
✅ Signede URLs med utløpstid (1 time)
✅ Privat storage bucket (RLS aktivert)
✅ Ingen direkte fileksponering
✅ Input validering (file key og bucket)

### Ikke implementert (fremtidig):
- Audit logging av nedlastinger
- Brukerspesifikk tilgangskontroll
- Bulk download funksjonalitet

---

## 📝 E-post Problem (opprinnelig issue)

### Problem:
Du mottar ikke e-post når kandidater melder interesse (selv om 242 registreringer er i database).

### Årsak:
**Production environment variables i Vercel er sannsynligvis feil konfigurert.**

### Løsning:
1. Gå til Vercel Dashboard → bluecrew → Settings → Environment Variables
2. Verifiser/oppdater:
   - `RESEND_API_KEY` = `re_UetGDqjU_5odz3FHpqrFBnGun919C9ETk`
   - `RESEND_FROM_EMAIL` = `no-reply@send.bluecrew.no`
   - `RESEND_TO_EMAILS` = `isak@bluecrew.no,tf@bluecrew.no`
3. Redeploy applikasjonen
4. Test med ny interesseregistrering

**Lokal .env.local er allerede oppdatert** med korrekte verdier.

---

## 📞 Support

For spørsmål eller problemer, kontakt:
- Isak: isak@bluecrew.no
- TF: tf@bluecrew.no

---

**Oppdatert:** 2025-11-20 16:00
**Status:** ✅ Ferdig implementert og klar for deployment
