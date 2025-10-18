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
    text: "Operativ ledelse fra folk som selv har stått med ansvar på bro og dekk.",
  },
  {
    icon: "🧾",
    text: "Komplette kandidatmapper med verifiserte sertifikater, referanser og tilgjengelighet.",
  },
  {
    icon: "⚡",
    text: "24/7-beredskap og faste prosedyrer for å håndtere hasteoppdrag uten friksjon.",
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
    text: "Vi har selv stått på broa og dekk – og vet hvilket mannskap som tåler tempoet.",
  },
  {
    icon: "🪝",
    title: "Rask mobilisering",
    text: "Eget nettverk av sertifiserte sjøfolk gjør at vi kan mobilisere på kort varsel over hele kysten.",
  },
  {
    icon: "🛡️",
    title: "Kvalitet og trygghet",
    text: "Strukturerte prosesser, HMS-fokus og tett oppfølging gir forutsigbare leveranser.",
  },
  {
    icon: "🤝",
    title: "Langsiktige partnerskap",
    text: "Vi lærer kunden å kjenne, bygger team rundt fartøyet og følger opp gjennom hele oppdraget.",
  },
];

export const PROCESS_STEPS = [
  {
    title: "Behovsavklaring",
    text: "Samtale om fartøy, oppdrag og kompetansekrav – inklusive sertifikater og turnus.",
  },
  {
    title: "Screening & verifisering",
    text: "Vi intervjuer, referansesjekker og kontrollerer dokumentasjon før kandidatene godkjennes.",
  },
  {
    title: "Presentasjon & oppstart",
    text: "Du får klare forslag med tilgjengelighet og løsningsforslag. Vi koordinerer oppstarten.",
  },
  {
    title: "Oppfølging om bord",
    text: "Teamet vårt holder dialogen med skipper og mannskap og sikrer at alt fungerer som avtalt.",
  },
];

export const FAQS = [
  {
    q: "Hvordan registrerer jeg meg som kandidat?",
    a: "Bruk skjemaet under «For kandidater» og last opp CVen din. Vi kontakter deg når vi har et oppdrag som matcher erfaringen din.",
  },
  {
    q: "Hvor raskt kan dere levere personell?",
    a: "Behov som meldes inn på dagtid får normalt svar innen 24 timer. Ved akutte tilfeller er vi tilgjengelige på telefon hele døgnet.",
  },
  {
    q: "Hvilke typer kontrakter tilbyr dere?",
    a: "Vi håndterer korttidsoppdrag, sesongbemanning og langsiktige engasjement. Vi tilpasser oss kundens struktur.",
  },
  {
    q: "Hvordan ivaretas personvern?",
    a: "Alle søknader lagres sikkert og deles ikke med tredjepart uten samtykke. Vi følger GDPR og interne retningslinjer for datasikkerhet.",
  },
];

export const CONTACT_POINTS = [
  { label: "Ring oss", value: "923 28 850", href: "tel:92328850" },
  { label: "Send e-post", value: "isak@bluecrew.no", href: "mailto:isak@bluecrew.no" },
  { label: "Besøk oss", value: "Østenbekkveien 43, 9011 Tromsø" },
];

export const QUALITY_PILLARS = [
  {
    icon: "🛡️",
    title: "Kontroll på compliance",
    text: "Standardiserte kontroller sikrer at alle sertifikater, helseattester og sikkerhetskurs er gyldige før ombordstigning.",
  },
  {
    icon: "🤝",
    title: "Dedikert kontaktperson",
    text: "Én bemanningsleder følger opp hele leveransen, fra planlegging av vaktlister til rapportering etter avsluttet oppdrag.",
  },
  {
    icon: "📊",
    title: "Proaktiv rapportering",
    text: "Vi deler statusoppdateringer, timelister og læringspunkter slik at du alltid har kontroll på bemanningssituasjonen.",
  },
];

export const CASE_POINTS = [
  "Mannskap på plass i Finnmark 48 timer etter forespørsel midt i februar.",
  "Plan for overlapping og overlevering dokumentert til reder og driftssjef.",
  "Kontinuerlig rapportering på HMS og vedlikehold gjennom hele prosjektet.",
];

export const CASE_STATS = [
  { value: "48 t", label: "Fra forespørsel til avreise" },
  { value: "6", label: "Sertifiserte sjøfolk mobilisert" },
  { value: "0", label: "Avvik registrert" },
];

export const CREDENTIALS = [
  {
    badge: "Achilles JQS",
    description: "Prekvalifisert leverandør – dokumentert kvalitetssystem og HMS-prosedyrer for energi- og maritim sektor.",
  },
  {
    badge: "ISPS- og sikkerhetskurs",
    description: "Alle i operativ leveranse har oppdaterte kurs innen sikkerhet, førstehjelp og beredskap.",
  },
  {
    badge: "GDPR-tilpassede prosesser",
    description: "Persondata håndteres i sikre systemer med tydelige slette- og samtykkerutiner.",
  },
];
