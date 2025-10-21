# Vercel redeploy checklist

Denne sjekklisten beskriver hvordan du sikrer at den nyeste koden er aktiv i Vercel, og hvordan du verifiserer at e-postene sendes med HTML-innhold.

## 1. Tving en ny deploy
1. Åpne prosjektet i Vercel og gå til **Deployments**.
2. Klikk **Redeploy** på siste deployment.
3. Velg **Clear build cache & Redeploy** for å sørge for at bygget ikke gjenbruker gammelt innhold.

## 2. Bekreft at riktig kode kjører
1. Etter at deploymenten er ferdig, åpne **Function Logs**.
2. Send inn et skjema (kunde eller jobbsøker) fra nettsiden.
3. Sjekk loggene og se etter en av disse linjene:
   - `[Resend] sendNotificationEmail payload ... htmlLen: ... hasHtml: true`
   - `[Resend] sendContactToTeam payload ... htmlLen: ...`
4. Hvis loggene mangler disse linjene:
   - Klikk **View Source** i deploymenten og åpne `app/lib/server/email.ts`.
   - Verifiser at filen inneholder loggtekstene. Hvis ikke, redeploy med «Clear build cache» igjen og bekreft at endringen er pushet til `main`.

## 3. Utfør en rask API-test
Kjør disse kommandoene mot produksjons- eller preview-urlen (erstatt `<din-vercel-url>`):

**Jobbsøker**
```powershell
$body = @{
  name="Test"; email="test@example.com"; phone="123"; company="Test AS"; position="Matros"; message="Hei!"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://<din-vercel-url>/api/submit-candidate" -Method POST -ContentType "application/json" -Body $body
```

**Kunde**
```powershell
$body = @{
  name="Test Kunde"; email="kunde@example.com"; phone="456"; company="Rederi AS"; needs="Bemanning"; message="Trenger vikarer"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://<din-vercel-url>/api/submit-client" -Method POST -ContentType "application/json" -Body $body
```

## 4. Kontroller Resend-loggene
1. Gå til **Resend → Emails** og åpne den siste requesten.
2. Bekreft at du ser et `html`-felt i «Request Body».
3. Hvis `reply_to` vises i `snake_case`, er det forventet – Resend normaliserer feltet i loggen.

## 5. Hurtigsjekk av miljøvariabler
I Vercel-prosjektet under **Settings → Environment Variables (Production)**, kontroller at følgende nøkler er satt:

- `RESEND_API_KEY        = re_...`
- `RESEND_FROM_EMAIL     = no-reply@send.bluecrew.no`
- `RESEND_TO_EMAILS      = isak@bluecrew.no,SanderBerg@bluecrew.no`
- `NEXT_PUBLIC_SITE_URL  = https://bluecrew.no`

Hvis du gjør endringer i miljøvariablene, kjør et nytt redeploy med «Clear build cache».

## 6. Hvis Resend viser “Missing html or text”
1. Søk i koden etter resterende kall som ikke bruker `sendNotificationEmail` riktig:
   - `resend.emails.send(`
   - `sendNotificationEmail(`
2. Oppdater koden slik at den alltid kaller:
   ```ts
   await sendNotificationEmail({ subject, html, replyTo: ... })
   ```
   eller fjern utdaterte kall.
3. Deploy på nytt og verifiser at loggene viser `htmlLen` og at Resend-loggen inneholder `html`.

Når loggene viser `htmlLen: <et tall>` og Resend har `html` i requesten, er e-postutsendingen bekreftet.
