# 🔗 BLUECREW.NO → ADMIN INTEGRATION

*Instruksjoner for hva bluecrew.no må sende til Supabase*

---

## 📊 **DATAFLYT OVERSIKT**

bluecrew.no har **2 forskjellige søknadsskjema** som sender data til Supabase:

### **1. FULL KANDIDATSØKNAD (med CV + sertifikater)**
- Skjema: `/jobbsoker/registrer`
- API: `/api/submit-candidate`
- OBLIGATORISK: CV upload (PDF, maks 10 MB)
- OBLIGATORISK: Sertifikater/Helseattest upload (PDF/ZIP/DOC/DOCX, maks 10 MB)
- Går til: `candidates` table
- Status: `"pending"` (venter godkjenning i Import Management) ✅ **IMPLEMENTERT**

### **2. INTERESSESKJEMA (enkel, rask)**
- Skjema: `/meld-interesse`
- API: `/api/submit-interest`
- INGEN fil-upload
- Går til: `candidate_interest` table
- Status: Ingen status-felt (bruker `archived_at` for filtrering)

---

## 🔧 **STATUS: ALLEREDE IMPLEMENTERT! ✅**

**bluecrew.no sender allerede `status: "pending"` for alle nye kandidater!**

Koden i `/api/submit-candidate` ble oppdatert 7. november 2025 og inkluderer nå:

```typescript
await insertSupabaseRow({
  table: "candidates",
  payload: {
    name: data.name,
    email: data.email,
    phone: data.phone,
    // ... andre felter ...
    status: "pending", // ✅ ALLEREDE IMPLEMENTERT!
  },
});
```

**Hva som skjer nå:**
- ✅ Nye kandidatsøknader får automatisk `status: "pending"`
- ✅ Vises i Import Management med 📋 FULL SØKNAD badge (blå)
- ✅ Admin kan godkjenne → status endres til "godkjent"
- ✅ Interesseskjemaet fungerer perfekt (ingen endringer nødvendig)

---

## 🔧 **HVA SOM BLE ENDRET (For referanse):**

### **Før (gammel kode):**
```typescript
// ❌ FEIL - sender ikke status
const { data, error } = await supabase
  .from('candidates')
  .insert([{
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    cv_key: cvPath,
    certs_key: certsPath,
    // ... andre felt
  }]);
```

#### **Etter (implementert 7. nov 2025):**
```typescript
// ✅ IMPLEMENTERT - sender status: "pending"
const { data, error } = await supabase
  .from('candidates')
  .insert([{
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    cv_key: cvPath,
    certs_key: certsPath,
    status: "pending",       // ✅ DENNE ER NÅ MED!
    // ... andre felt
  }]);
```

---

## 📋 **SQL SOM MÅ KJØRES I SUPABASE (hvis ikke gjort):**

**Kjør denne SQL i Supabase SQL Editor for å legge til status kolonne:**

```sql
-- Legg til status kolonne i candidates table
ALTER TABLE candidates 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- Legg til index for rask filtering
CREATE INDEX IF NOT EXISTS idx_candidates_status ON candidates(status);

-- Oppdater eksisterende kandidater til "godkjent" (de som allerede er inne)
UPDATE candidates 
SET status = 'godkjent' 
WHERE status IS NULL;

-- Kommentar
COMMENT ON COLUMN candidates.status IS 'Status: pending (venter godkjenning), godkjent (kvalitetssikret), ansatt (har oppdrag)';
```

---

## 🎯 **STATUSVERDIER:**

### **For `candidates` table:**

| Status | Betydning | Hvor vises de? |
|--------|-----------|----------------|
| `"pending"` | Venter godkjenning fra admin | Import Management |
| `"godkjent"` | Kvalitetssikret, klar til oppdrag | Hovedsystem → Kandidater |
| `"ansatt"` | Har fått oppdrag/assignment | Hovedsystem → Aktive oppdrag |
| `"avslått"` | Ikke kvalifisert (spam/duplikat) | Arkivert |

### **For `candidate_interest` table:**

- Ingen status-felt (bruker `archived_at` i stedet)
- `archived_at = NULL` → vises i Import Management
- `archived_at != NULL` → avslått/arkivert

---

## 📧 **EMAIL NOTIFICATIONS:**

**Ingen endringer nødvendig!** 

Admin får fortsatt email når kandidat søker (både full søknad og interesse). Email-logikken fungerer som før.

---

## ✅ **SJEKKLISTE FOR BLUECREW.NO UTVIKLER:**

- [x] ~~Legg til `status: "pending"` når kandidat opprettes~~ ✅ **FERDIG (7. nov 2025)**
- [x] ~~Gjør sertifikater/helseattest obligatorisk~~ ✅ **FERDIG (7. nov 2025)**
- [ ] Kjør SQL i Supabase (legg til `status` kolonne hvis den ikke eksisterer)
- [ ] Test: Send inn en søknad fra bluecrew.no
- [ ] Verifiser: Se at kandidaten vises i Import Management (admin.bluecrew.no)
- [ ] Test: Admin godkjenner → kandidat vises i hovedsystemet

---

## 🐛 **TROUBLESHOOTING:**

### **Problem: Kandidater vises ikke i Import Management**
**Løsning:** Sjekk at `status` er satt til `"pending"` i Supabase

```sql
-- Sjekk status for siste kandidater
SELECT name, email, status, created_at 
FROM candidates 
ORDER BY created_at DESC 
LIMIT 10;
```

### **Problem: Gamle kandidater forsvinner fra hovedsystemet**
**Løsning:** De skal ikke forsvinne! Kjør UPDATE-query over for å sette dem til "godkjent"

---

## 📞 **KONTAKT:**

Spørsmål? Kontakt Isak:
- Email: isak@bluecrew.no
- Telefon: 923 28 850

---

**VIKTIG:** Disse endringene påvirker KUN nye søknader. Eksisterende kandidater i systemet forblir uendret.
