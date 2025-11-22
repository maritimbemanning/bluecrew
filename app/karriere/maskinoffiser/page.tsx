import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteLayout from "../../components/SiteLayout";
import { sx } from "../../lib/styles";

export const metadata: Metadata = {
  title:
    "Hvordan bli maskinoffiser - Utdanning, sertifikater M1-M4 og karrierevei 2025",
  description:
    "Komplett guide til maskinoffiser: M1-M4 sertifikater, maritim maskinteknikk-utdanning, fartstidskrav, lønn og veien fra vakthavende til maskinsjef.",
  keywords: [
    "hvordan bli maskinoffiser",
    "maskinoffiser utdanning",
    "M1 M2 M3 M4 sertifikat",
    "maritim maskinteknikk",
    "maskinoffiser lønn",
    "maskinsjef",
    "1 maskinist",
    "2 maskinist",
    "vakthavende maskinoffiser",
    "STCW III/1 III/2 III/3",
    "maskinist karriere",
  ],
  openGraph: {
    title: "Hvordan bli maskinoffiser - Komplett guide 2025 | Bluecrew AS",
    description:
      "Alt du trenger å vite om maskinoffiser: Utdanning, M1-M4 sertifikater, fartstidskrav, lønn og karrierevei til maskinsjef.",
    type: "article",
  },
  alternates: {
    canonical: "/karriere/hvordan-bli-maskinoffiser",
  },
};

export default function Page() {
  return (
    <SiteLayout active="jobbsoker">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <div
            style={{
              marginBottom: 32,
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              position: "relative",
              height: 400,
            }}
          >
            <Image
              src="/guides/Maskinoffiser-maskinrom.jpeg"
              alt="Maskinoffiser inspiserer teknisk utstyr og motorer i maskinrom på brønnbåt - maritime tekniske operasjoner"
              width={1200}
              height={675}
              priority
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>

          <div
            style={{
              fontSize: 14,
              color: "#64748b",
              marginBottom: 8,
              fontWeight: 500,
            }}
          >
            Sist oppdatert: 7. november 2025
          </div>
          <h1 style={sx.h2}>Hvordan bli maskinoffiser i Norge</h1>
          <p style={sx.leadSmall}>
            Komplett guide til å bli maskinoffiser: Maritim
            maskinteknikk-utdanning, M1-M4 sertifikater, fartstidskrav, lønn og
            karrierevei fra vakthavende maskinoffiser til maskinsjef. Oppdatert
            2025 basert på Kvalifikasjonsforskriften og STCW.
          </p>

          <div
            style={{
              background: "#e0f2fe",
              border: "2px solid #0ea5e9",
              borderRadius: 12,
              padding: 20,
              marginTop: 32,
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#0c4a6e",
                fontSize: 16,
                lineHeight: 1.6,
              }}
            >
              <strong>Kort oppsummert:</strong> For å bli maskinoffiser trenger
              du <strong>bachelor i maritim maskinteknikk (3 år)</strong>
              eller <strong>fagbrev + yrkeserfaring</strong>, samt{" "}
              <strong>12-24 måneders fartstid</strong> og{" "}
              <strong>M1-M4 sertifikat</strong>
              avhengig av nivå. Lønn fra 450 000 kr til 1 100 000+ kr/år.
              Karrierevei: Vakthavende → 2. maskinist → 1. maskinist →
              Maskinsjef.
            </p>
          </div>

          {/* Hva er en maskinoffiser */}
          <div style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>
              Hva er en maskinoffiser?
            </h2>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17 }}>
              En maskinoffiser er ansvarlig for drift, vedlikehold og reparasjon
              av skipets maskineri og tekniske systemer. Maskinoffiserer jobber
              i maskinrommet og har ansvar for:
            </p>
            <ul
              style={{
                margin: "16px 0",
                paddingLeft: 24,
                color: "#334155",
                lineHeight: 1.7,
                fontSize: 16,
                display: "grid",
                gap: 8,
              }}
            >
              <li>Hovedmotor, hjelpemotorer og fremdriftssystemer</li>
              <li>Elektriske systemer og generatorer</li>
              <li>Hydraulikk, pumper og rørsystemer</li>
              <li>Kjøle- og ventilasjonsanlegg</li>
              <li>Automatisering og styringssystemer</li>
              <li>Vedlikehold, feilsøking og reparasjon</li>
              <li>Sikkerhet og HMS i maskinrom</li>
            </ul>
            <p style={{ color: "#475569", lineHeight: 1.7, fontSize: 17 }}>
              Maskinoffiserer er ryggraden i skipets drift. Uten fungerende
              maskineri står skipet stille – derfor er dette en høyt verdsatt og
              godt betalt rolle.
            </p>
          </div>

          {/* M1-M4 klasser */}
          <div style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>
              M1, M2, M3, M4 - Hva er forskjellen?
            </h2>
            <p
              style={{
                color: "#475569",
                lineHeight: 1.7,
                fontSize: 17,
                marginBottom: 24,
              }}
            >
              Maskinoffiser-sertifikater er delt inn i 4 klasser (M1-M4) basert
              på motoreffekt og fartøystørrelse:
            </p>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 15,
                  background: "#ffffff",
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              >
                <thead>
                  <tr style={{ background: "#0f172a", color: "#ffffff" }}>
                    <th
                      style={{
                        padding: "14px 16px",
                        textAlign: "left",
                        fontWeight: 700,
                      }}
                    >
                      Sertifikat
                    </th>
                    <th
                      style={{
                        padding: "14px 16px",
                        textAlign: "left",
                        fontWeight: 700,
                      }}
                    >
                      STCW
                    </th>
                    <th
                      style={{
                        padding: "14px 16px",
                        textAlign: "left",
                        fontWeight: 700,
                      }}
                    >
                      Motoreffekt
                    </th>
                    <th
                      style={{
                        padding: "14px 16px",
                        textAlign: "left",
                        fontWeight: 700,
                      }}
                    >
                      Fartøy
                    </th>
                    <th
                      style={{
                        padding: "14px 16px",
                        textAlign: "left",
                        fontWeight: 700,
                      }}
                    >
                      Rolle
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td
                      style={{
                        padding: "14px 16px",
                        fontWeight: 700,
                        color: "#0ea5e9",
                      }}
                    >
                      M1
                    </td>
                    <td style={{ padding: "14px 16px" }}>III/2</td>
                    <td style={{ padding: "14px 16px" }}>{">"} 3000 kW</td>
                    <td style={{ padding: "14px 16px" }}>Alle fartøy</td>
                    <td style={{ padding: "14px 16px" }}>
                      Maskinsjef / 1. maskinist
                    </td>
                  </tr>
                  <tr
                    style={{
                      borderBottom: "1px solid #e2e8f0",
                      background: "#f8fafc",
                    }}
                  >
                    <td
                      style={{
                        padding: "14px 16px",
                        fontWeight: 700,
                        color: "#0ea5e9",
                      }}
                    >
                      M2
                    </td>
                    <td style={{ padding: "14px 16px" }}>III/2 (beg.)</td>
                    <td style={{ padding: "14px 16px" }}>750-3000 kW</td>
                    <td style={{ padding: "14px 16px" }}>Mindre fartøy</td>
                    <td style={{ padding: "14px 16px" }}>
                      Maskinsjef / 2. maskinist
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td
                      style={{
                        padding: "14px 16px",
                        fontWeight: 700,
                        color: "#0ea5e9",
                      }}
                    >
                      M3
                    </td>
                    <td style={{ padding: "14px 16px" }}>III/1</td>
                    <td style={{ padding: "14px 16px" }}>{">"} 3000 kW</td>
                    <td style={{ padding: "14px 16px" }}>Alle fartøy</td>
                    <td style={{ padding: "14px 16px" }}>
                      Vakthavende maskinoffiser
                    </td>
                  </tr>
                  <tr style={{ background: "#f8fafc" }}>
                    <td
                      style={{
                        padding: "14px 16px",
                        fontWeight: 700,
                        color: "#0ea5e9",
                      }}
                    >
                      M4
                    </td>
                    <td style={{ padding: "14px 16px" }}>III/1 (beg.)</td>
                    <td style={{ padding: "14px 16px" }}>{"<"} 3000 kW</td>
                    <td style={{ padding: "14px 16px" }}>Mindre fartøy</td>
                    <td style={{ padding: "14px 16px" }}>
                      Vakthavende maskinoffiser
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p
              style={{
                marginTop: 20,
                fontSize: 15,
                color: "#64748b",
                fontStyle: "italic",
              }}
            >
              <strong>Enkel forklaring:</strong> M1 og M2 er sjefsroller (Chief
              Engineer / 1st Engineer), mens M3 og M4 er vakthavende roller
              (Watch Keeping Engineer). M1 og M3 gjelder alle fartøy, M2 og M4
              bare mindre fartøy.
            </p>
          </div>

          {/* Utdanningsveier */}
          <div style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>
              Utdanningsveier til maskinoffiser
            </h2>
            <p
              style={{
                color: "#475569",
                lineHeight: 1.7,
                fontSize: 17,
                marginBottom: 24,
              }}
            >
              Det finnes to hovedveier til maskinoffiser: Bachelor-studium eller
              yrkesutdanning med fagbrev.
            </p>

            <div style={{ display: "grid", gap: 24 }}>
              {/* Bachelor */}
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: 16,
                  padding: 32,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 16px 0",
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  Alternativ 1: Bachelor i maritim maskinteknikk (3 år)
                </h3>
                <p
                  style={{
                    margin: "0 0 16px 0",
                    color: "#475569",
                    lineHeight: 1.7,
                    fontSize: 16,
                  }}
                >
                  Dette er den vanligste veien. Bachelor gir bred kunnskap innen
                  maskinteknikk, automatisering, elektro og skipsdrift.
                </p>

                <div
                  style={{
                    background: "#f0f9ff",
                    borderRadius: 12,
                    padding: 20,
                    marginBottom: 16,
                  }}
                >
                  <h4
                    style={{
                      margin: "0 0 12px 0",
                      fontSize: 17,
                      fontWeight: 700,
                      color: "#0c4a6e",
                    }}
                  >
                    Studiesteder i Norge:
                  </h4>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: 20,
                      color: "#334155",
                      lineHeight: 1.7,
                    }}
                  >
                    <li>NTNU Ålesund (Maritim Maskin)</li>
                    <li>Høgskulen på Vestlandet (Bergen)</li>
                    <li>Universitetet i Sørøst-Norge (Vestfold)</li>
                  </ul>
                </div>

                <div
                  style={{
                    background: "#fff7ed",
                    borderRadius: 12,
                    padding: 20,
                  }}
                >
                  <h4
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: 17,
                      fontWeight: 700,
                      color: "#9a3412",
                    }}
                  >
                    Krav etter bachelor:
                  </h4>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: 20,
                      color: "#334155",
                      lineHeight: 1.7,
                    }}
                  >
                    <li>
                      <strong>12 måneders fartstid</strong> (maskinvakt) for M3
                      (vakthavende)
                    </li>
                    <li>
                      <strong>24 måneders fartstid</strong> (hvorav 12 mnd som
                      M3) for M1 (maskinsjef)
                    </li>
                    <li>Grunnleggende sikkerhet (VI/1)</li>
                    <li>Avansert brannbekjempelse (VI/3)</li>
                  </ul>
                </div>
              </div>

              {/* Yrkesutdanning */}
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: 16,
                  padding: 32,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 16px 0",
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  Alternativ 2: Fagbrev + yrkeserfaring
                </h3>
                <p
                  style={{
                    margin: "0 0 16px 0",
                    color: "#475569",
                    lineHeight: 1.7,
                    fontSize: 16,
                  }}
                >
                  Hvis du har fagbrev som mekaniker, industrimekaniker eller
                  tilsvarende, kan du gå direkte til sjøs og bygge erfaring.
                </p>

                <div
                  style={{
                    background: "#f0fdf4",
                    borderRadius: 12,
                    padding: 20,
                    marginBottom: 16,
                  }}
                >
                  <h4
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: 17,
                      fontWeight: 700,
                      color: "#14532d",
                    }}
                  >
                    Krav for fagbrev-veien:
                  </h4>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: 20,
                      color: "#334155",
                      lineHeight: 1.7,
                    }}
                  >
                    <li>
                      <strong>36 måneders fartstid</strong> i maskinrom for M3
                      (vakthavende)
                    </li>
                    <li>
                      <strong>48 måneders fartstid</strong> (hvorav 24 mnd som
                      ansvarlig) for M1 (maskinsjef)
                    </li>
                    <li>Grunnleggende sikkerhet (VI/1)</li>
                    <li>Vaktholdskurs for maskinoffiser</li>
                  </ul>
                </div>

                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    color: "#64748b",
                    fontStyle: "italic",
                  }}
                >
                  <strong>Tips:</strong> Fagbrev-veien tar lengre tid (36 mnd vs
                  12 mnd fartstid), men du tjener penger underveis. Bachelor gir
                  bredere kompetanse og bedre grunnlag for offisersrollen.
                </p>
              </div>
            </div>
          </div>

          {/* Karrierevei */}
          <div style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>
              Karrierevei som maskinoffiser
            </h2>
            <p
              style={{
                color: "#475569",
                lineHeight: 1.7,
                fontSize: 17,
                marginBottom: 24,
              }}
            >
              Fra ferdig utdanning til maskinsjef tar det typisk 5-10 år. Her er
              en typisk karrierevei:
            </p>

            <div
              style={{
                position: "relative",
                paddingLeft: 40,
                borderLeft: "3px solid #6366f1",
              }}
            >
              <div style={{ marginBottom: 32 }}>
                <div
                  style={{
                    position: "absolute",
                    left: -12,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#6366f1",
                    border: "3px solid #ffffff",
                  }}
                ></div>
                <h3
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: 19,
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  År 0-3: Bachelor i maritim maskinteknikk
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  3 års studier ved maritim høgskole. Lærer maskinteknikk,
                  elektro, automatisering, HMS. Praksis om bord i sommerferier.
                </p>
              </div>

              <div style={{ marginBottom: 32 }}>
                <div
                  style={{
                    position: "absolute",
                    left: -12,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#6366f1",
                    border: "3px solid #ffffff",
                  }}
                ></div>
                <h3
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: 19,
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  År 3-4: Kadet / Junior maskinoffiser (M4/M3)
                </h3>
                <p
                  style={{
                    margin: "0 0 8px 0",
                    color: "#475569",
                    lineHeight: 1.7,
                  }}
                >
                  Etter bachelor + 12 mnd fartstid får du M3 (vakthavende).
                  Jobber på maskinvakt under veiledning av erfarne offiserer.
                  Ansvar for drift og vedlikehold i vaktperioder.
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    color: "#64748b",
                    fontWeight: 600,
                  }}
                >
                  💰 Lønn: 450 000 - 600 000 kr/år (avhengig av sektor)
                </p>
              </div>

              <div style={{ marginBottom: 32 }}>
                <div
                  style={{
                    position: "absolute",
                    left: -12,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#6366f1",
                    border: "3px solid #ffffff",
                  }}
                ></div>
                <h3
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: 19,
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  År 5-7: 2. maskinist (M3 med erfaring)
                </h3>
                <p
                  style={{
                    margin: "0 0 8px 0",
                    color: "#475569",
                    lineHeight: 1.7,
                  }}
                >
                  Etter 2-3 år som vakthavende blir du 2. maskinist. Ansvar for
                  spesifikke systemer (elektrisk, hydraulikk, kjøling).
                  Assisterer 1. maskinist og maskinsjef. Planlegger vedlikehold.
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    color: "#64748b",
                    fontWeight: 600,
                  }}
                >
                  💰 Lønn: 600 000 - 800 000 kr/år
                </p>
              </div>

              <div style={{ marginBottom: 32 }}>
                <div
                  style={{
                    position: "absolute",
                    left: -12,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#6366f1",
                    border: "3px solid #ffffff",
                  }}
                ></div>
                <h3
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: 19,
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  År 7-10: 1. maskinist (M1)
                </h3>
                <p
                  style={{
                    margin: "0 0 8px 0",
                    color: "#475569",
                    lineHeight: 1.7,
                  }}
                >
                  Etter M1-sertifikat (24 mnd fartstid) blir du 1. maskinist.
                  Nestkommanderende i maskinrom. Ansvar for større prosjekter,
                  dockinger, teknisk planlegging. Stedfortreder for maskinsjef.
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    color: "#64748b",
                    fontWeight: 600,
                  }}
                >
                  💰 Lønn: 700 000 - 950 000 kr/år
                </p>
              </div>

              <div>
                <div
                  style={{
                    position: "absolute",
                    left: -12,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#6366f1",
                    border: "3px solid #ffffff",
                  }}
                ></div>
                <h3
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: 19,
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  År 10+: Maskinsjef (Chief Engineer)
                </h3>
                <p
                  style={{
                    margin: "0 0 8px 0",
                    color: "#475569",
                    lineHeight: 1.7,
                  }}
                >
                  Øverste ansvarlig for alt maskineri og tekniske systemer.
                  Rapporterer direkte til skipsfører. Budsjettansvar,
                  personalledelse, strategisk vedlikeholdsplanlegging. Krever M1
                  + mange års erfaring.
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    color: "#64748b",
                    fontWeight: 600,
                  }}
                >
                  💰 Lønn: 850 000 - 1 100 000+ kr/år (offshore høyest)
                </p>
              </div>
            </div>
          </div>

          {/* Lønn */}
          <div style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>
              Lønn som maskinoffiser
            </h2>
            <p
              style={{
                color: "#475569",
                lineHeight: 1.7,
                fontSize: 17,
                marginBottom: 24,
              }}
            >
              Lønnen varierer betydelig med rolle, sektor og erfaring:
            </p>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 15,
                  background: "#ffffff",
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              >
                <thead>
                  <tr style={{ background: "#0f172a", color: "#ffffff" }}>
                    <th
                      style={{
                        padding: "14px 16px",
                        textAlign: "left",
                        fontWeight: 700,
                      }}
                    >
                      Rolle
                    </th>
                    <th
                      style={{
                        padding: "14px 16px",
                        textAlign: "left",
                        fontWeight: 700,
                      }}
                    >
                      Offshore
                    </th>
                    <th
                      style={{
                        padding: "14px 16px",
                        textAlign: "left",
                        fontWeight: 700,
                      }}
                    >
                      Cruise/Havbruk
                    </th>
                    <th
                      style={{
                        padding: "14px 16px",
                        textAlign: "left",
                        fontWeight: 700,
                      }}
                    >
                      Kyst/Ferge
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>
                      Maskinsjef (M1)
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      850 000 - 1 100 000 kr
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      700 000 - 900 000 kr
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      650 000 - 800 000 kr
                    </td>
                  </tr>
                  <tr
                    style={{
                      borderBottom: "1px solid #e2e8f0",
                      background: "#f8fafc",
                    }}
                  >
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>
                      1. maskinist (M1)
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      750 000 - 950 000 kr
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      650 000 - 800 000 kr
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      600 000 - 750 000 kr
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>
                      2. maskinist (M3)
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      650 000 - 800 000 kr
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      550 000 - 700 000 kr
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      500 000 - 650 000 kr
                    </td>
                  </tr>
                  <tr style={{ background: "#f8fafc" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>
                      Junior maskinoffiser (M3/M4)
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      550 000 - 700 000 kr
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      450 000 - 600 000 kr
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      450 000 - 550 000 kr
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p
              style={{
                marginTop: 20,
                fontSize: 15,
                color: "#64748b",
                fontStyle: "italic",
              }}
            >
              <strong>Tips:</strong> Offshore gir høyest lønn (30-50% mer enn
              kyst), men også mest intensivt arbeid. Cruise og havbruk ligger
              midt på treet med god work-life balance. Se{" "}
              <Link
                href="/lonn/oversikt"
                style={{ color: "#0ea5e9", fontWeight: 600 }}
              >
                lønnsguiden
              </Link>{" "}
              for detaljer om turnusordninger og totale pakker.
            </p>
          </div>

          {/* Spesialisering */}
          <div style={{ marginTop: 48 }}>
            <h2 style={{ ...sx.h2, fontSize: 28, marginBottom: 16 }}>
              Spesialisering og videre muligheter
            </h2>
            <p
              style={{
                color: "#475569",
                lineHeight: 1.7,
                fontSize: 17,
                marginBottom: 24,
              }}
            >
              Som maskinoffiser kan du spesialisere deg innen:
            </p>

            <div style={{ display: "grid", gap: 20 }}>
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: 12,
                  padding: 24,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: 19,
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  Elektrooffiser (ETO)
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Spesialist på elektriske systemer, automatisering og
                  elektronikk. Krever tilleggskurs og elektronikk-kompetanse.
                  Høyt etterspurt på moderne skip med avanserte systemer. Lønn:
                  +10-20% over ordinær maskinoffiser.
                </p>
              </div>

              <div
                style={{ background: "#f8fafc", borderRadius: 12, padding: 24 }}
              >
                <h3
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: 19,
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  LNG/LPG spesialist
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Spesialisering på tankfartøy med flytende gass. Krever
                  tank-kurs (V/1-1 for LNG) og særlig kompetanse. Høyest lønn i
                  bransjen (20-30% mer enn standard offshore). Stort behov
                  fremover pga. LNG-satsing.
                </p>
              </div>

              <div
                style={{
                  background: "#ffffff",
                  borderRadius: 12,
                  padding: 24,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: 19,
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  Miljø- og hybridteknologi
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Spesialist på hybrid-fremdrift, batterisystemer og
                  miljøteknologi. Voksende område med grønt skifte i maritim
                  næring. Fremtidens maskinoffiserer må kunne både tradisjonell
                  og ny teknologi.
                </p>
              </div>

              <div
                style={{ background: "#f8fafc", borderRadius: 12, padding: 24 }}
              >
                <h3
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: 19,
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  Landbaserte roller
                </h3>
                <p style={{ margin: 0, color: "#475569", lineHeight: 1.7 }}>
                  Teknisk sjef i rederiet, superintendent, Fleet Manager,
                  teknisk konsulent, klasseselskap (DNV GL), verft. Krever mange
                  års erfaring til sjøs. Lavere lønn enn til sjøs, men mer
                  forutsigbart liv.
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div
            style={{
              marginTop: 48,
              background: "#fff3cd",
              border: "2px solid #ffc107",
              borderRadius: 16,
              padding: 32,
            }}
          >
            <h2
              style={{
                margin: "0 0 16px 0",
                fontSize: 24,
                fontWeight: 800,
                color: "#856404",
              }}
            >
              Tips for å lykkes som maskinoffiser
            </h2>
            <ul
              style={{
                margin: 0,
                paddingLeft: 24,
                color: "#856404",
                lineHeight: 1.8,
                display: "grid",
                gap: 10,
              }}
            >
              <li>
                <strong>Lær både teori og prakti:</strong> Maskinrom krever
                hands-on erfaring. Ikke vær redd for å bli skitten.
              </li>
              <li>
                <strong>Hold deg oppdatert:</strong> Skipsteknologi utvikler seg
                raskt (hybrid, automatisering, LNG). Ta kurs jevnlig.
              </li>
              <li>
                <strong>HMS er kritisk:</strong> Maskinrom er høyrisikoområde.
                Følg prosedyrer, bruk verneutstyr, meld fra om feil.
              </li>
              <li>
                <strong>Bygg nettverk:</strong> Maritime miljøer er små. Gode
                relasjoner åpner dører til bedre jobber.
              </li>
              <li>
                <strong>Vurder spesialisering tidlig:</strong> ETO, LNG,
                automatisering – disse gir 10-30% høyere lønn.
              </li>
              <li>
                <strong>Dokumenter alt:</strong> Fartstid, kurs, sertifikater –
                alt må dokumenteres for oppgradering til M1.
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div
            style={{
              marginTop: 48,
              background: "#6366f1",
              color: "#ffffff",
              borderRadius: 20,
              padding: 40,
              textAlign: "center" as const,
            }}
          >
            <h2 style={{ margin: "0 0 16px 0", fontSize: 28, fontWeight: 800 }}>
              Klar til å bli maskinoffiser?
            </h2>
            <p
              style={{
                margin: "0 0 28px 0",
                fontSize: 18,
                lineHeight: 1.6,
                maxWidth: 600,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Bluecrew hjelper deg med å finne oppdrag som maskinoffiser i
              offshore, havbruk, cruise og kystfart. Vi har kontakt med rederier
              som søker både junior og erfarne offiserer.
            </p>
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap" as const,
              }}
            >
              <Link
                href="/jobbsoker/registrer"
                style={{
                  display: "inline-block",
                  background: "#ffffff",
                  color: "#6366f1",
                  padding: "16px 32px",
                  borderRadius: 12,
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: 17,
                }}
              >
                Registrer deg som kandidat
              </Link>
              <Link
                href="/jobbsoker/oppdrag"
                style={{
                  display: "inline-block",
                  background: "rgba(255,255,255,0.15)",
                  color: "#ffffff",
                  padding: "16px 32px",
                  borderRadius: 12,
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: 17,
                  border: "2px solid rgba(255,255,255,0.3)",
                }}
              >
                Se ledige oppdrag
              </Link>
            </div>
          </div>

          {/* Relaterte guider */}
          <div style={{ marginTop: 48 }}>
            <h3
              style={{
                margin: "0 0 16px 0",
                fontSize: 20,
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              Relaterte guider
            </h3>
            <div style={{ display: "grid", gap: 12 }}>
              <Link
                href="/karriere/skipsforer"
                style={{
                  color: "#0ea5e9",
                  textDecoration: "none",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                → Hvordan bli skipsfører
              </Link>
              <Link
                href="/karriere/matros"
                style={{
                  color: "#0ea5e9",
                  textDecoration: "none",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                → Hvordan bli matros
              </Link>
              <Link
                href="/lonn/oversikt"
                style={{
                  color: "#0ea5e9",
                  textDecoration: "none",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                → Lønnsguide maritime stillinger 2025
              </Link>
              <Link
                href="/lonn/oversikt"
                style={{
                  color: "#0ea5e9",
                  textDecoration: "none",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                → Maritime lønnsoversikt
              </Link>
              <Link
                href="/faq"
                style={{
                  color: "#0ea5e9",
                  textDecoration: "none",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                → Ofte stilte spørsmål
              </Link>
            </div>
          </div>

          {/* Kilder */}
          <div
            style={{
              marginTop: 32,
              background: "#f8fafc",
              borderRadius: 12,
              padding: 20,
              fontSize: 14,
            }}
          >
            <h4
              style={{
                margin: "0 0 10px 0",
                fontSize: 15,
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              Kilder
            </h4>
            <ul
              style={{
                margin: 0,
                paddingLeft: 20,
                color: "#64748b",
                lineHeight: 1.7,
                display: "grid",
                gap: 4,
              }}
            >
              <li>
                Kvalifikasjonsforskriften (FOR-2011-12-22-1523) - Kap. III
              </li>
              <li>
                Sjøfartsdirektoratet (sdir.no) - Maskinoffiser-sertifikater
                M1-M4
              </li>
              <li>STCW Convention III/1, III/2, III/3</li>
              <li>NTNU Ålesund, HVL, USN - Maritime utdanningsprogram</li>
              <li>Maskinistforbundet lønnsstatistikk</li>
            </ul>
            <p
              style={{
                margin: "12px 0 0 0",
                fontSize: 13,
                color: "#94a3b8",
                fontStyle: "italic",
              }}
            >
              Sist oppdatert: 7. november 2025
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
