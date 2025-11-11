"use client";

import Link from "next/link";
import { Calculator, TrendingUp, ArrowRight } from "lucide-react";

export function SalaryCalculatorCTA() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-blue-100 dark:border-slate-700 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left side - Text content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4 w-fit">
                <TrendingUp size={16} />
                Populært verktøy
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                📊 Lønnsoversikt Maritim 2025
              </h2>

              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                Se typiske lønninger for maritime stillinger i Norge. Sammenlign
                matros, styrmann, kaptein og maskinoffiser basert på reelle tall
                fra bransjen.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 text-sm">
                      ✓
                    </span>
                  </div>
                  <span className="text-slate-600 dark:text-slate-300">
                    Basert på bransjesnitt fra 2025
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 text-sm">
                      ✓
                    </span>
                  </div>
                  <span className="text-slate-600 dark:text-slate-300">
                    Sammenlign havbruk, offshore og servicefartøy
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 text-sm">
                      ✓
                    </span>
                  </div>
                  <span className="text-slate-600 dark:text-slate-300">
                    Juster for erfaring og stilling
                  </span>
                </li>
              </ul>

              <Link
                href="/lonn/kalkulator"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg w-fit group"
                style={{ color: "#ffffff" }}
              >
                <Calculator size={20} />
                <span style={{ color: "#ffffff" }}>Se lønnsoversikt</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
                * Tallene er veiledende. Faktisk lønn avhenger av arbeidsgiver
                og avtale.
              </p>
            </div>

            {/* Right side - Visual */}
            <div className="relative bg-gradient-to-br from-blue-500 to-blue-700 p-8 md:p-12 flex items-center justify-center">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-2xl rotate-12 blur-sm"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-2xl -rotate-12 blur-sm"></div>

                {/* Main icon */}
                <div className="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl">
                  <Calculator
                    size={80}
                    className="text-blue-600 dark:text-blue-400 mx-auto mb-4"
                  />
                  <div className="text-center">
                    <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1">
                      Hva tjener du?
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      Sjekk din lønn nå
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-8 right-0 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-bounce">
                  +15% erfaring
                </div>
                <div className="absolute -bottom-6 left-0 bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  5 stillinger
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
