export const WORK: Record<string, string[]> = {
  "Servicefartøy mannskap": ["Skipper/Styrmann", "Matros", "Kokekyndig", "Annet"],
  Havbruk: ["Operativt", "Akvatekniker m/fagbrev", "Laseroperatør", "Fôringsoperatør", "Annet"],
  Fiskeri: ["Skipper/Styrmann", "Matros", "Annet"],
  Midlertidig: ["Korttidsoppdrag", "Sesong", "Annet"],
  Annet: ["Annet"],
};

export const STCW_MODULES = [
  "Sjøoverlevelse (PST)",
  "Brannvern (FPFF)",
  "Førstehjelp (EFA)",
  "PSSR",
];

export const HERO_POINTS = [
  {
    icon: "🚢",
    text: "Eiere med fartstid fra oppdrett, servicefartøy og fiskeri leder hvert oppdrag personlig.",
  },
  {
    icon: "🧾",
    text: "Sertifikater, referanser og tilgjengelighet verifiseres og dokumenteres før kandidat presenteres.",
  },
  {
    icon: "⚡",
    text: "Effektive prosesser gjør at vi løser akutte behov uten å gå på kompromiss med sikkerheten.",
  },
];

export const DELIVERY_STATS = [
  { value: "< 24 t", label: "Gj.sn. responstid" },
  { value: "250+", label: "Oppdrag levert" },
  { value: "98%", label: "Oppdrag fullført" },
];

export const BENEFITS = [
  {
    icon: "🧭",
    title: "Erfaring fra sjøen",
    text: "Vi har selv stått på broa og dekk – og vet hvilket mannskap som leverer stabilt over tid.",
  },
  {
    icon: "🪝",
    title: "Rask mobilisering",
    text: "Eget nettverk av sertifiserte sjøfolk gjør at vi mobiliserer på kort varsel over hele kysten.",
  },
  {
    icon: "🛡️",
    title: "Kvalitet og trygghet",
    text: "Strukturerte prosesser, HMS-fokus og kontinuerlig rapportering gir forutsigbare leveranser.",
  },
  {
    icon: "🤝",
    title: "Langsiktige partnerskap",
    text: "Vi lærer kunden å kjenne, bygger robuste team rundt fartøyet og følger opp gjennom hele oppdraget.",
  },
];

export const PROCESS_STEPS = [
  {
    title: "Behovsavklaring",
    text: "Felles gjennomgang av fartøy, oppdrag og kompetansekrav – inklusive sertifikater, turnus og HMS.",
  },
  {
    title: "Screening & verifisering",
    text: "Vi intervjuer, referansesjekker og kontrollerer dokumentasjon før kandidatene godkjennes.",
  },
  {
    title: "Presentasjon & oppstart",
    text: "Du får klare kandidatlister med tilgjengelighet, betingelser og tiltak. Vi koordinerer oppstarten.",
  },
  {
    title: "Oppfølging om bord",
    text: "Teamet vårt holder dialogen med skipper og mannskap og sikrer rapportering på det som er avtalt.",
  },
];

export const FAQS = [
  {
    q: "Hvordan registrerer jeg meg som kandidat?",
    a: "Bruk skjemaet under «For kandidater» og last opp CVen din. Vi kontakter deg når vi har et oppdrag som matcher erfaringen og sertifikatene dine.",
  },
  {
    q: "Hvor raskt kan dere levere personell?",
    a: "Behov som meldes inn på dagtid får normalt svar innen 24 timer. Ved akutte tilfeller er vi tilgjengelige på telefon hele døgnet og kan mobilisere direkte.",
  },
  {
    q: "Hvilke typer kontrakter tilbyr dere?",
    a: "Vi håndterer korttidsoppdrag, sesongbemanning og langsiktige engasjement. Løsningsforslagene tilpasses kundens struktur og avtaleverk.",
  },
  {
    q: "Hvordan ivaretas personvern?",
    a: "Alle søknader lagres sikkert og deles ikke med tredjepart uten samtykke. Vi følger GDPR og egne retningslinjer for datasikkerhet og tilgangsstyring.",
  },
];

export const CONTACT_POINTS = [
  { label: "Ring oss", value: "923 28 850", href: "tel:92328850" },
  { label: "Send e-post", value: "post@bluecrew.no", href: "mailto:post@bluecrew.no" },
  { label: "Besøk oss", value: "Østenbekkveien 43, 9011 Tromsø" },
];
