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

Hvis du ønsker å hente inn oppdateringene på landingssiden (seksjonene for fordeler, prosess, FAQ, osv.) i ditt eget prosjekt, har du to enkle måter å gjøre det på:

### Alternativ 1 – via Git
1. Legg til dette repositoriet som en midlertidig fjern-remote i prosjektet ditt:
   ```bash
   git remote add bluecrew-temp https://github.com/<ditt-brukernavn>/bluecrew.git
   git fetch bluecrew-temp
   ```
2. Sjekk ut branchen `work` (eller hent den inn i din egen branch) og ta inn filene du ønsker. For eksempel:
   ```bash
   git checkout bluecrew-temp/work -- app/page.tsx
   ```
3. Tilpass eventuelle tekster eller data til ditt miljø, test lokalt med `npm run dev`, og committ.
4. Fjern den midlertidige remoten når du er ferdig:
   ```bash
   git remote remove bluecrew-temp
   ```

### Alternativ 2 – kopier filene manuelt
1. Åpne `app/page.tsx` i dette repositoriet og kopier komponentene/objektene du trenger (seksjonene ligger samlet i filen).
2. Lim dem inn i din egen `app/page.tsx` (eller tilsvarende side) og sørg for at eventuelle hjelpekomponenter nederst i filen også blir med.
3. Start utviklingsserveren din (`npm run dev`) og kontroller at siden fungerer som forventet.
4. Oppdater tekstinnhold og lenker etter behov.

Begge metodene gir deg samme sluttresultat – velg den som passer best for arbeidsflyten din.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

For en praktisk sjekkliste over hvordan du tvinger frem en ny deploy, bekrefter at riktig kode kjører og tester e-postflyten, se [docs/vercel-redeploy.md](docs/vercel-redeploy.md).

## Analytics og mål (Plausible)

Nettstedet sender allerede samtykkebaserte hendelser for viktige handlinger (klikk på «Meld interesse», Vipps-verifisering, telefonklikk, leads). For å sette opp konverteringsmål og et lite dashboard i Plausible, se guiden: [docs/plausible-goals.md](docs/plausible-goals.md).
