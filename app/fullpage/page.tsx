"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerItem,
  scaleIn,
  buttonHover,
  buttonTap,
  cardHover,
  viewportOnce,
} from "../lib/animations";

// =============================================================================
// FULLPAGE DEMO - Complete site in one page
// Deep Ocean Theme: #051e3e + Teal #0d9488 + Amber #f59e0b
// =============================================================================

const FAQS_PREVIEW = [
  {
    q: "Hvilke sertifikater trenger jeg?",
    a: "Minimum STCW grunnleggende sikkerhetskurs (PST, FPFF, EFA) og gyldig helseattest. Avhengig av stilling kan du trenge fagbrev, dekksoffiser- eller maskinoffisersertifikater.",
  },
  {
    q: "Hvor raskt kan dere levere personell?",
    a: "Behov som meldes inn på dagtid får normalt svar innen 24 timer. Ved akutte tilfeller kan vi ofte mobilisere på 48-72 timer takket være vårt nettverk.",
  },
  {
    q: "Hvordan sikrer dere kvaliteten på mannskapet?",
    a: "Alle kandidater gjennomgår intervju, referansesjekk og dokumentkontroll før godkjenning. Vi verifiserer sertifikater, helseattest og arbeidserfaring.",
  },
  {
    q: "Hva er forskjellen på bemanning og rekruttering?",
    a: "Bemanning er når vi leverer personell ansatt hos oss, rekruttering er når vi finner kandidater til fast ansettelse hos deg. Bemanning gir fleksibilitet, rekruttering gir kontinuitet.",
  },
];

export default function FullPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ===== NAVIGATION ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#051e3e]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black text-white">
            BLUE<span className="text-teal-400">CREW</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#tjenester" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Tjenester</a>
            <a href="#om-oss" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Om oss</a>
            <a href="#faq" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">FAQ</a>
            <a href="#kontakt" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Kontakt</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/kunde"
              className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              For bedrifter
            </Link>
            <Link
              href="/meld-interesse"
              className="px-4 py-2 rounded-lg bg-teal-500 text-white text-sm font-bold hover:bg-teal-400 transition-colors"
            >
              Registrer deg
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#051e3e] pt-16">
        {/* Ocean gradient layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#051e3e] via-[#0a3055] to-[#0d4a6e]" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-teal-600/20 to-transparent" />
        </div>

        {/* Animated glow */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/3 left-1/5 w-[600px] h-[600px] bg-teal-500 rounded-full blur-[180px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/5 w-[500px] h-[500px] bg-cyan-600 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 text-sm font-semibold tracking-wide">
                  <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                  Norges ledende maritime bemanningsbyrå
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight"
              >
                Maritim
                <span className="block bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
                  bemanning
                </span>
                som leverer
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-slate-300 leading-relaxed max-w-lg"
              >
                STCW-sertifiserte kapteiner, styrmenn, matroser og maskinister.
                Rask mobilisering til havbruk, servicefartøy og offshore.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-10 py-6 border-t border-b border-slate-700/50"
              >
                {[
                  { value: "500+", label: "Kandidater" },
                  { value: "50+", label: "Kunder" },
                  { value: "24t", label: "Responstid" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-4xl font-black text-white">{stat.value}</div>
                    <div className="text-sm text-teal-400 uppercase tracking-wider font-medium">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                  <Link
                    href="/meld-interesse"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-white font-bold text-lg shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-shadow"
                  >
                    Registrer deg
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>
                <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                  <Link
                    href="/kunde"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-slate-500/50 text-white font-semibold hover:bg-white/5 hover:border-slate-400 transition-all"
                  >
                    For bedrifter
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right visual */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
              className="relative hidden lg:block"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl"
              >
                <div className="absolute -top-4 -right-4 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-400 rounded-xl flex items-center gap-2 shadow-lg shadow-amber-500/30">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-sm font-bold text-slate-900">Aktiv</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  Ny forespørsel
                </h3>

                <div className="space-y-4">
                  {[
                    { label: "Stilling", value: "Kaptein D5L" },
                    { label: "Lokasjon", value: "Troms" },
                    { label: "Oppstart", value: "Snarest" },
                    { label: "Varighet", value: "6 måneder" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-slate-400">{item.label}</span>
                      <span className="text-white font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 py-4 rounded-xl bg-teal-500 text-white font-bold hover:bg-teal-400 transition-colors">
                  Se detaljer
                </button>
              </motion.div>

              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-teal-500/20 rounded-full" />
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-teal-500/10 rounded-full" />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-teal-400/50 flex justify-center pt-2"
          >
            <div className="w-1.5 h-3 bg-teal-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== TRUST / WHY US SECTION ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeInUp} className="text-teal-600 font-semibold mb-4 uppercase tracking-wider text-sm">
              Hvorfor velge oss
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-black text-[#051e3e]">
              Trygg partner for<br className="hidden sm:block" /> maritim bemanning
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "STCW-sertifisert",
                description: "Alt mannskap er verifisert med gyldige sertifikater og helseerklæring før oppdrag.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Rask mobilisering",
                description: "Fra forespørsel til mannskap om bord på under 48 timer ved behov.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Personlig oppfølging",
                description: "Dedikert kontaktperson som følger opp både kunde og kandidat gjennom hele oppdraget.",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={cardHover}
                className="group relative bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-teal-500/20">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-[#051e3e] mb-3">{card.title}</h3>
                <p className="text-slate-600 leading-relaxed">{card.description}</p>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section id="tjenester" className="py-24 bg-slate-50 scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p variants={fadeInUp} className="text-teal-600 font-semibold mb-4 uppercase tracking-wider text-sm">
              Våre tjenester
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-black text-[#051e3e]">
              Komplett bemanningsløsning
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
              Vi leverer skreddersydd bemanning til alle typer maritime operasjoner.
              Fra enkeltpersoner til hele mannskapsgrupper.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                title: "Havbruk & Akvakultur",
                description: "Brønnbåt, servicefartøy, røkter og driftspersonell til oppdrettsnæringen.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "Servicefartøy",
                description: "Mannskap til offshore support, supply og spesialfartøy langs hele kysten.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
              {
                title: "Fiskeri",
                description: "Erfarne fiskere og mannskap til kyst- og havfiske, fra skipper til dekksmann.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                ),
              },
              {
                title: "Offshore",
                description: "Rigger og plattformer, supply og beredskap. Alt mannskap med offshore-sertifikater.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={cardHover}
                className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-teal-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center mb-4 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-[#051e3e] mb-2">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeInUp}
            className="text-center mt-12"
          >
            <motion.div whileHover={buttonHover} whileTap={buttonTap} className="inline-block">
              <Link
                href="/kunde"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#051e3e] text-white font-bold hover:bg-[#0a3055] transition-colors"
              >
                Les mer om våre tjenester
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== ABOUT / HOW WE WORK ===== */}
      <section id="om-oss" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeInLeft}
            >
              <p className="text-teal-600 font-semibold mb-4 uppercase tracking-wider text-sm">
                Om Bluecrew
              </p>
              <h2 className="text-4xl font-black text-[#051e3e] mb-6">
                Drevet av sjøfolk,<br />for sjøfolk
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Bluecrew AS er et norsk bemannings- og rekrutteringsselskap spesialisert på maritim næring.
                Vi vet hva som kreves om bord, fordi vi selv har stått på broa og dekk.
              </p>

              <div className="space-y-4">
                {[
                  "Grundig screening og referansesjekk",
                  "Verifisering av alle sertifikater",
                  "Tett oppfølging gjennom hele oppdraget",
                  "MLC 2006-sertifisert arbeidsgiver",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeInRight}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#051e3e] to-[#0a3055] rounded-3xl p-8 lg:p-10">
                <h3 className="text-2xl font-bold text-white mb-6">Slik jobber vi</h3>
                <div className="space-y-6">
                  {[
                    { step: "01", title: "Behovsavklaring", desc: "Vi kartlegger fartøy, oppdrag og kompetansekrav." },
                    { step: "02", title: "Screening", desc: "Intervju, referansesjekk og dokumentkontroll." },
                    { step: "03", title: "Presentasjon", desc: "Klare kandidatforslag med tilgjengelighet." },
                    { step: "04", title: "Oppfølging", desc: "Tett dialog gjennom hele oppdraget." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-sm shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{item.title}</h4>
                        <p className="text-slate-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section id="faq" className="py-24 bg-slate-50 scroll-mt-20">
        <div className="max-w-[800px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-teal-600 font-semibold mb-4 uppercase tracking-wider text-sm">
              Ofte stilte spørsmål
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl font-black text-[#051e3e]">
              Har du spørsmål?
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className="space-y-4"
          >
            {FAQS_PREVIEW.map((faq, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-[#051e3e] pr-4">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-slate-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeInUp}
            className="text-center mt-8"
          >
            <Link href="/faq" className="text-teal-600 font-semibold hover:text-teal-700 transition-colors">
              Se alle spørsmål og svar →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 bg-gradient-to-br from-[#051e3e] via-[#0a3055] to-[#051e3e] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[150px]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            <motion.div
              variants={scaleIn}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 text-sm font-semibold mb-8"
            >
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              Bli med i dag
            </motion.div>

            <motion.h2
              variants={scaleIn}
              className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight"
            >
              Klar for å
              <span className="block bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                komme i gang?
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto"
            >
              Registrer deg i dag og bli en del av Norges mest pålitelige maritime bemanningsnettverk.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/meld-interesse"
                  className="inline-flex items-center gap-3 px-12 py-5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 text-white font-bold text-lg shadow-xl shadow-teal-500/30 hover:shadow-teal-500/50 transition-shadow"
                >
                  Registrer deg nå
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
              <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 px-12 py-5 rounded-xl border-2 border-slate-500/50 text-white font-semibold hover:bg-white/5 hover:border-slate-400 transition-all"
                >
                  Kontakt oss
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="kontakt" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeInLeft}
            >
              <p className="text-teal-600 font-semibold mb-4 uppercase tracking-wider text-sm">
                Kontakt
              </p>
              <h2 className="text-4xl font-black text-[#051e3e] mb-6">
                Ta kontakt med oss
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Vi svarer raskt og følger opp alle henvendelser personlig.
                Ring, send e-post, eller besøk oss i Harstad.
              </p>

              <div className="space-y-6">
                <a href="tel:77029000" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Telefon</div>
                    <div className="text-lg font-semibold text-[#051e3e] group-hover:text-teal-600 transition-colors">77 02 90 00</div>
                  </div>
                </a>

                <a href="mailto:post@bluecrew.no" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">E-post</div>
                    <div className="text-lg font-semibold text-[#051e3e] group-hover:text-teal-600 transition-colors">post@bluecrew.no</div>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Besøksadresse</div>
                    <div className="text-lg font-semibold text-[#051e3e]">Ervikveien 110, 9402 Harstad</div>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-200">
                <h3 className="font-semibold text-[#051e3e] mb-4">Følg oss</h3>
                <div className="flex gap-3">
                  {[
                    { label: "LinkedIn", href: "https://www.linkedin.com/company/bluecrewas" },
                    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61582845493676" },
                    { label: "Instagram", href: "https://www.instagram.com/bluecrew.no/" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 font-medium text-sm hover:bg-teal-500 hover:text-white transition-colors"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeInRight}
            >
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <h3 className="text-xl font-bold text-[#051e3e] mb-2">Juridisk informasjon</h3>
                <div className="space-y-3 text-slate-600">
                  <p><strong>Selskap:</strong> Bluecrew AS</p>
                  <p><strong>Org.nr:</strong> 936 463 843</p>
                  <p className="text-sm pt-4 border-t border-slate-200">
                    Persondata behandles i henhold til GDPR. Alle søknader lagres sikkert og deles ikke med tredjepart uten samtykke.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/personvern" className="text-sm text-teal-600 hover:underline">
                    Personvernerklæring
                  </Link>
                  <span className="text-slate-300">|</span>
                  <Link href="/vilkar" className="text-sm text-teal-600 hover:underline">
                    Vilkår
                  </Link>
                  <span className="text-slate-300">|</span>
                  <Link href="/cookies" className="text-sm text-teal-600 hover:underline">
                    Cookies
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-12 bg-[#020a14] border-t border-slate-800">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-2xl font-black text-white">
              BLUE<span className="text-teal-400">CREW</span>
            </div>
            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} Bluecrew AS. Alle rettigheter forbeholdt.
            </p>
            <div className="flex gap-4">
              <Link href="/" className="text-slate-400 hover:text-teal-400 transition-colors text-sm">
                Tilbake til nåværende side
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
