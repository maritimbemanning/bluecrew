import SiteLayout from "../components/SiteLayout";
import { sx } from "../lib/styles";

export default function Page() {
  return (
    <SiteLayout active="om-oss">
      <section style={sx.sectionAlt}>
        <div style={sx.wrapNarrow}>
          <h1 style={sx.h2}>Om Bluecrew AS</h1>
          <p style={sx.leadSmall}>
            Bluecrew AS er et norsk bemannings- og rekrutteringsselskap spesialisert på maritim næring. Vi leverer kvalifisert personell til havbruk, fiskeri og servicefartøy langs hele kysten.
          </p>
          <div style={{ display: "grid", gap: 20, marginTop: 28 }}>
            <p style={sx.leadSmall}>
              Selskapet drives av sjøfolk med erfaring fra norsk kystfart og oppdrettsnæring. Vi vet hva som kreves om bord, og hvor viktig det er med rett kompetanse til rett tid.
            </p>
            <p style={sx.leadSmall}>
              Vi jobber tett med både mannskap og rederier. Gjennom grundig verifisering av kompetanse, sertifikater og referanser leverer vi trygge og fleksible bemanningsløsninger.
            </p>
            <div style={{ marginTop: 8, padding: 18, borderLeft: "4px solid #0B1F3A", background: "#fff", borderRadius: 8 }}>
              <p style={{ margin: 0, fontSize: 15, color: "#0B1F3A" }}>
                <strong>Vår filosofi:</strong> Rett kompetanse, på rett sted, til rett tid.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
