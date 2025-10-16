This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Hvordan ta i bruk endringene i ditt eget prosjekt

Under finner du en helt konkret oppskrift på hvordan du kan få inn den oppdaterte `app/page.tsx`-filen i ditt eget prosjekt – både med Git og ved ren kopiering.

### Alternativ 1 – bruk Git fra terminalen (anbefalt hvis du allerede bruker GitHub)
1. **Gå til prosjektet ditt** i terminalen (`cd /sti/til/prosjekt`).
2. **Sørg for at arbeidsmappen er ren** ved å committe eller stash-e egne endringer: `git status` skal vise ingen endringer før du fortsetter.
3. **Legg til dette repositoriet som midlertidig fjernkilde og hent innholdet:**
   ```bash
   git remote add bluecrew-temp https://github.com/<ditt-brukernavn>/bluecrew.git
   git fetch bluecrew-temp work
   ```
4. **Kopier filen du trenger** fra denne branchen inn i prosjektet ditt:
   ```bash
   git checkout bluecrew-temp/work -- app/page.tsx
   ```
5. **Se over og test lokalt:**
   ```bash
   npm install        # hopp over hvis avhengighetene allerede er installert
   npm run dev        # åpne http://localhost:3000 for å sjekke siden
   ```
6. **Committ og push til ditt eget repo:**
   ```bash
   git add app/page.tsx
   git commit -m "Oppdater landingssiden fra bluecrew"
   git push origin <din-branch>
   ```
7. **Fjern den midlertidige remoten** når du er ferdig, slik at Git-listen din holder seg ryddig:
   ```bash
   git remote remove bluecrew-temp
   ```

### Alternativ 2 – kopier filen manuelt (hvis du heller vil lime inn)
1. Åpne `app/page.tsx` her i repositoriet (enten i nettleseren på GitHub eller direkte i denne mappen).
2. Klikk på «Raw»-knappen (på GitHub) eller bruk teksteditoren her i prosjektet for å se **ren** kode uten `+`/`-` i starten av linjene.
3. Marker hele filen (Ctrl/Cmd + A) og kopier innholdet (Ctrl/Cmd + C).
4. Åpne `app/page.tsx` i ditt prosjekt og erstatt alt innholdet med det du kopierte (Ctrl/Cmd + A → Ctrl/Cmd + V).
5. Lagre filen og kjør `npm run dev` for å forsikre deg om at alt fungerer i din app.
6. Hvis du bruker GitHub, legg til, committ og push endringen slik:
   ```bash
   git add app/page.tsx
   git commit -m "Limt inn oppdatert landingsside"
   git push origin <din-branch>
   ```

Begge metodene gir samme sluttresultat – velg den som passer best for deg.

### Hva hvis jeg limer inn en «git apply»-patch og får 1000+ feil?

Det betyr at du har limt inn **selve diffen** (linjer som starter med `+`, `-` og `@@`) i stedet for den ferdige filen. Patch-formatet er laget for at Git skal tolke det, ikke for å limes direkte inn i VS Code. Gjør heller en av disse:

* **Kjør patchen i terminalen:**
  1. Lagre teksten du fikk som `bluecrew.patch` (for eksempel i prosjektroten din).
  2. Kjør `git apply bluecrew.patch` fra samme mappe. Da oppdaterer Git filene for deg uten at du trenger å åpne dem manuelt.
* **Kopier den ferdige filen:** Følg trinnene i «Alternativ 2» over – husk å bruke «Raw»-visningen slik at du kopierer ren kode.

Når du limer inn ren kode eller lar Git bruke patchen, skal TypeScript/ESLint-feilene forsvinne.

## Hva betyr `-392` i en diff?

Når du ser et tall som `-392` i en Git-diff (for eksempel i oversikten `-392 +968`), forteller minustegnet at 392 linjer ble fjernet i den aktuelle commiten. Pluss-tegnet viser hvor mange linjer som ble lagt til. Disse tallene brukes for å gi en rask oversikt over hvor omfattende endringene er.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
