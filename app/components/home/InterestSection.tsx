import Link from "next/link";
import { sx } from "@/app/lib/styles";

export function InterestSection() {
  return (
    <section style={sx.section} aria-labelledby="interest-heading">
      <div style={sx.wrapNarrow}>
        <h2 id="interest-heading" style={sx.h2}>
          Bli en del av Bluecrew
        </h2>
        <p style={sx.leadSmall}>
          Vi er sjøfolk som bygger Bluecrew – et godkjent bemanningsforetak for
          hele den maritime sektoren. Registrer deg i vår kandidatbase, så tar vi
          kontakt når vi har oppdrag som passer din erfaring.
        </p>

        <div style={{ marginTop: 32, textAlign: "center" }}>
          <Link
            href="/jobbsoker/registrer/skjema"
            style={{
              display: "inline-block",
              padding: "16px 40px",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "#fff",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 18,
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
              transition: "all 0.2s ease",
            }}
          >
            Registrer deg som jobbsøker
          </Link>
          <p style={{ marginTop: 16, fontSize: 14, color: "#64748b" }}>
            Gratis og uforpliktende – vi kontakter deg når vi har noe som passer.
          </p>
        </div>
      </div>
    </section>
  );
}

export default InterestSection;
