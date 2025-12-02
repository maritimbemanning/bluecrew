"use client";

import { motion } from "framer-motion";
import Link from "next/link";
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
// DEMO 2 - Deep Ocean Maritime Color Scheme
// Colors: Deep Navy (#051e3e) + Teal (#0d9488) + Gold accent (#f59e0b)
// =============================================================================

export default function Demo2Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#051e3e]">
        {/* Ocean wave gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#051e3e] via-[#0a3055] to-[#0d4a6e]" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0d9488]/20 to-transparent" />
        </div>

        {/* Animated ocean glow */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/3 left-1/5 w-[500px] h-[500px] bg-teal-500 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/5 w-[400px] h-[400px] bg-cyan-600 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "1s" }} />
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
              {/* Badge */}
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 text-sm font-semibold tracking-wide">
                  <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                  Norges ledende maritime bemanningsbyrå
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={fadeInUp}
                className="text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight"
              >
                Mannskap
                <span className="block bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
                  som leverer
                </span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                variants={fadeInUp}
                className="text-xl text-slate-300 leading-relaxed max-w-lg"
              >
                STCW-sertifiserte kapteiner, styrmenn, matroser og maskinister.
                Rask mobilisering til havbruk, servicefartøy og offshore.
              </motion.p>

              {/* Stats row */}
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

              {/* CTAs */}
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

            {/* Right visual - Job Card */}
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
                {/* Status badge */}
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

                <motion.button
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  className="w-full mt-6 py-4 rounded-xl bg-teal-500 text-white font-bold hover:bg-teal-400 transition-colors"
                >
                  Se detaljer
                </motion.button>
              </motion.div>

              {/* Decorative elements */}
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

      {/* ===== TRUST SECTION ===== */}
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
              Trygg partner for<br />maritim bemanning
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
                description: "Alt mannskap er verifisert med gyldige sertifikater og helseerklæring.",
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
                description: "Dedikert kontaktperson som følger opp både kunde og kandidat.",
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

                {/* Hover gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeInLeft}
            >
              <p className="text-teal-600 font-semibold mb-4 uppercase tracking-wider text-sm">
                Våre tjenester
              </p>
              <h2 className="text-4xl font-black text-[#051e3e] mb-6">
                Komplett<br />bemanningsløsning
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Vi leverer skreddersydd bemanning til alle typer maritime operasjoner.
                Fra enkeltpersoner til hele mannskapsgrupper.
              </p>

              <div className="space-y-4">
                {[
                  "Havbruk og akvakultur",
                  "Servicefartøy og offshore",
                  "Brønnbåt og fiskeri",
                  "Spesialfartøy og rigg",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-800 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div whileHover={buttonHover} whileTap={buttonTap} className="mt-10">
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

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeInRight}
              className="relative"
            >
              {/* Ship illustration placeholder */}
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#051e3e] to-[#0a3055] p-8 flex items-center justify-center relative overflow-hidden">
                {/* Ocean waves */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-teal-500/30 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-48 h-48 text-teal-400/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.5 18.5L21 17l-1.5-6.5H19l-.5-3H16V6h-4v1.5H8.5L8 10.5H4.5L3 17l.5 1.5h17z" />
                    <path d="M2 20h20v2H2z" />
                  </svg>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl px-5 py-3 shadow-xl border border-slate-100"
              >
                <span className="text-3xl font-black text-teal-500">500+</span>
                <span className="block text-sm text-slate-500 font-medium">Kandidater</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-5 py-3 shadow-xl border border-slate-100"
              >
                <span className="text-3xl font-black text-amber-500">24t</span>
                <span className="block text-sm text-slate-500 font-medium">Responstid</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 bg-gradient-to-br from-[#051e3e] via-[#0a3055] to-[#051e3e] relative overflow-hidden">
        {/* Background elements */}
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
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
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

      {/* ===== FOOTER PREVIEW ===== */}
      <footer className="py-16 bg-[#020a14]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-slate-500 mb-4">
            Demo 2 - Deep Ocean Maritime Theme
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/demo" className="text-teal-400 hover:text-teal-300 transition-colors">
              ← Demo 1
            </Link>
            <span className="text-slate-700">|</span>
            <Link href="/" className="text-slate-400 hover:text-slate-300 transition-colors">
              Back to current site
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
