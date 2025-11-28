"use client";

export default function Maintenance() {
  return (
    <main style={{
      minHeight: "100svh",
      display: "grid",
      placeItems: "center",
      background: "linear-gradient(180deg,#0B1F3A,#0A1B33)",
      color: "#fff",
      padding: 24,
      textAlign: "center",
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
    }}>
      <div style={{maxWidth: 560}}>
        <div style={{opacity:.9, fontWeight:900, letterSpacing:"-.02em", fontSize:32}}>Bluecrew</div>
        <h1 style={{fontSize:24, margin:"14px 0 6px"}}>Vi er straks tilbake</h1>
        <p style={{opacity:.9, lineHeight:1.6}}>
          Nettsiden er midlertidig utilgjengelig på grunn av vedlikehold.
          Prøv igjen om litt – eller kontakt oss på <a href="mailto:post@bluecrew.no" style={{color:"#fff", fontWeight:700}}>post@bluecrew.no</a> / <a href="tel:77029000" style={{color:"#fff", fontWeight:700}}>77 02 90 00</a>.
        </p>
      </div>
    </main>
  );
}

