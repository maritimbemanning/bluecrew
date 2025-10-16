const footerStyles = {
  footer: {
    marginTop: 80,
    background: "#0B1F3A",
    color: "#E2E8F0",
    padding: "36px 0",
  },
  wrap: {
    width: "min(1100px, 92vw)",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column" as const,
    gap: 12,
    fontSize: 14,
    lineHeight: 1.6,
  },
  strong: {
    fontWeight: 700,
  },
  subtle: {
    color: "rgba(226, 232, 240, 0.78)",
  },
};

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer style={footerStyles.footer}>
      <div style={footerStyles.wrap}>
        <div>© {year} Bluecrew AS — Bemanning til sjøs</div>
        <div style={footerStyles.subtle}>
          <span style={footerStyles.strong}>Adresse:</span> Østenbekkveien 43, 9403 Harstad ·
          <span style={{ marginLeft: 6 }}>
            <span style={footerStyles.strong}>Org.nr:</span> 936 321 194
          </span>
        </div>
      </div>
    </footer>
  );
}
