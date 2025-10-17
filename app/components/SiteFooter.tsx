import React from "react";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        background: "#0B1F3A",
        color: "rgba(226,232,240,0.9)",
        padding: "28px 20px",
        marginTop: 64,
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontWeight: 700 }}>© {year} Bluecrew AS</div>
        <div style={{ fontSize: 14, color: "rgba(226,232,240,0.7)", maxWidth: 520 }}>
          Maritim bemanning for havbruk, fiskeri og servicefartøy. Vi leverer sertifisert mannskap på rett sted til rett tid.
        </div>
      </div>
    </footer>
  );
}
