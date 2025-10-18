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
    text: "Oppdragene ledes av eiere med fartstid fra oppdrett, servicefartøy og fiskeri.",
  },
  {
    icon: "🧾",
    text: "Sertifikater, referanser og tilgjengelighet verifiseres før kandidat presenteres.",
  },
  {
    icon: "⚡",
    text: "Effektive prosedyrer løser akutte behov uten å gå på kompromiss med sikkerheten.",
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
    text: "Våre rådgivere har selv stått på bro og dekk og kjenner kravene til robust drift.",
  },
  {
    icon: "🪝",
    title: "Rask mobilisering",
    text: "Forhåndsplanlagte vaktlag og sertifiserte kandidater gjør at vi kan mobilisere på kort varsel.",
  },
  {
    icon: "🛡️",
    title: "Kvalitet og trygghet",
    text: "Strukturerte prosesser, HMS-fokus og systematisk rapportering gir forutsigbare leveranser.",
  },
  {
    icon: "🤝",
    title: "Langsiktige partnerskap",
    text: "Vi lærer kunden å kjenne, bygger stabile team rundt fartøyet og følger opp gjennom hele oppdraget.",
  },
];

export const QUALITY_PILLARS = [
  {
    icon: "📑",
    title: "Dokumentert etterlevelse",
    text: "Standardiserte sjekklister for STCW, fartøyssertifikat og referanser før hver utsendelse.",
  },
  {
    icon: "🧭",
    title: "Dedikert bemanningsleder",
    text: "En kontaktperson styrer planlegging, rapportering og logistikk gjennom hele oppdraget.",
  },
  {
    icon: "🛟",
    title: "Sikker onboarding",
    text: "Vi koordinerer reise, verneutstyr og sikkerhetsbrief slik at mannskapet møter klart til vakt.",
  },
];

export const PROCESS_STEPS = [
  {
    title: "Behovsanalyse",
    text: "Briefing av fartøy, oppdrag og kompetansekrav – inkludert sertifikater, turnus og HMS-forhold.",
  },
  {
    title: "Screening & verifisering",
    text: "Vi intervjuer, referansesjekker og kontrollerer dokumentasjon før kandidatene godkjennes.",
  },
  {
    title: "Presentasjon & oppstart",
    text: "Du får tydelige kandidatprofiler med tilgjengelighet. Vi koordinerer oppstarten.",
  },
  {
    title: "Oppfølging om bord",
    text: "Teamet vårt holder dialogen med skipper og mannskap og sikrer at alt fungerer som avtalt.",
  },
];

export const FAQS = [
  {
    q: "Hvordan registrerer jeg meg som kandidat?",
    a: "Bruk skjemaet under «For kandidater» og last opp CV-en din. Vi kontakter deg når vi har et oppdrag som matcher erfaringen din.",
  },
  {
    q: "Hvor raskt kan dere levere personell?",
    a: "Behov som meldes inn på dagtid får normalt svar innen 24 timer. Ved akutte tilfeller er vi tilgjengelige på telefon hele døgnet.",
  },
  {
    q: "Hvilke typer kontrakter tilbyr dere?",
    a: "Vi håndterer korttidsoppdrag, sesongbemanning og langsiktige engasjement og tilpasser oss kundens struktur.",
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
  { label: "Åpningstider", value: "Mandag–fredag 08:00–16:00" },
];
