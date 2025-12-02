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
  pulseGlow,
} from "../lib/animations";

// =============================================================================
// DEMO PAGE - Showcasing the new architecture
// =============================================================================

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[var(--color-navy-900)] via-[var(--color-navy-800)] to-[var(--color-navy-900)]">
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[128px] animate-pulse delay-1000" />
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
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-sm font-semibold tracking-wide">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Norges ledende maritime bemanningsbyrå
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={fadeInUp}
                className="text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight"
              >
                Maritim bemanning
                <span className="block bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                  som leverer
                </span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                variants={fadeInUp}
                className="text-xl text-slate-300 leading-relaxed max-w-lg"
              >
                STCW-sertifiserte kapteiner, styrmenn, matroser og maskinoffiserer.
                Rask mobilisering til havbruk, servicefartøy og offshore.
              </motion.p>

              {/* Stats */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-8 py-4"
              >
                {[
                  { value: "500+", label: "Kandidater" },
                  { value: "50+", label: "Kunder" },
                  { value: "24t", label: "Responstid" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-black text-white">{stat.value}</div>
                    <div className="text-sm text-slate-400 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                  <Link
                    href="/meld-interesse"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-400 text-slate-900 font-bold text-lg shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-shadow"
                  >
                    Registrer deg
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>

                <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                  <Link
                    href="/kunde"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-slate-600 text-white font-semibold hover:bg-white/5 transition-colors"
                  >
                    For bedrifter
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right visual - Floating card */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
              className="relative hidden lg:block"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700 shadow-2xl"
              >
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h3 className="text-xl font-bold text-white mb-6">Ny forespørsel</h3>

                <div className="space-y-4">
                  {[
                    { label: "Stilling", value: "Kaptein D5L" },
                    { label: "Lokasjon", value: "Troms" },
                    { label: "Oppstart", value: "Snarest" },
                    { label: "Varighet", value: "6 måneder" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center py-3 border-b border-slate-700">
                      <span className="text-slate-400">{item.label}</span>
                      <span className="text-white font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  className="w-full mt-6 py-4 rounded-xl bg-sky-500 text-white font-bold hover:bg-sky-400 transition-colors"
                >
                  Se detaljer
                </motion.button>
              </motion.div>
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
            className="w-6 h-10 rounded-full border-2 border-slate-500 flex justify-center pt-2"
          >
            <div className="w-1.5 h-3 bg-slate-400 rounded-full" />
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
            <motion.p variants={fadeInUp} className="text-sky-600 font-semibold mb-4 uppercase tracking-wider">
              Hvorfor velge oss
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl font-black text-slate-900">
              Trygg partner for maritim bemanning
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
                icon: "🛡️",
                title: "STCW-sertifisert",
                description: "Alt mannskap er verifisert med gyldige sertifikater og helseerklæring.",
              },
              {
                icon: "⚡",
                title: "Rask mobilisering",
                description: "Fra forespørsel til mannskap om bord på under 48 timer ved behov.",
              },
              {
                icon: "🤝",
                title: "Personlig oppfølging",
                description: "Dedikert kontaktperson som følger opp både kunde og kandidat.",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={cardHover}
                className="group relative bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-sky-200 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
                <p className="text-slate-600 leading-relaxed">{card.description}</p>

                {/* Hover gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
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
              <p className="text-sky-600 font-semibold mb-4 uppercase tracking-wider">
                Våre tjenester
              </p>
              <h2 className="text-4xl font-black text-slate-900 mb-6">
                Komplett bemanningsløsning
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
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div whileHover={buttonHover} whileTap={buttonTap} className="mt-8">
                <Link
                  href="/kunde"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
                >
                  Les mer om våre tjenester
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-sky-100 to-cyan-50 p-8 flex items-center justify-center">
                <div className="text-[200px] opacity-20">🚢</div>
              </div>
              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white rounded-xl px-4 py-2 shadow-lg border border-slate-100"
              >
                <span className="text-2xl font-black text-emerald-500">500+</span>
                <span className="text-sm text-slate-500 ml-2">Kandidater</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-2 shadow-lg border border-slate-100"
              >
                <span className="text-2xl font-black text-sky-500">24t</span>
                <span className="text-sm text-slate-500 ml-2">Responstid</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/20 rounded-full blur-[128px]" />

        <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            <motion.h2
              variants={scaleIn}
              className="text-4xl lg:text-5xl font-black text-white mb-6"
            >
              Klar for å komme i gang?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-slate-300 mb-10"
            >
              Registrer deg i dag og bli en del av Norges mest pålitelige maritime bemanningsnettverk.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 justify-center">
              <motion.div
                whileHover={buttonHover}
                whileTap={buttonTap}
                animate={pulseGlow.animate}
              >
                <Link
                  href="/meld-interesse"
                  className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-400 text-slate-900 font-bold text-lg"
                >
                  Registrer deg nå
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
              <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl border border-slate-600 text-white font-semibold hover:bg-white/5 transition-colors"
                >
                  Kontakt oss
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER PREVIEW ===== */}
      <footer className="py-12 bg-slate-950 text-center">
        <p className="text-slate-500">
          Demo page - New architecture preview
        </p>
        <Link href="/" className="text-sky-400 hover:underline mt-2 inline-block">
          ← Back to current site
        </Link>
      </footer>
    </main>
  );
}
