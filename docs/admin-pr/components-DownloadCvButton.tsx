"use client";
import React from "react";

export function DownloadCvButton({ keyPath }: { keyPath: string }) {
  const [loading, setLoading] = React.useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/storage/sign?key=${encodeURIComponent(keyPath)}`);
      const json = await res.json();
      if (json?.ok && json?.url) {
        window.open(json.url, "_blank", "noopener,noreferrer");
      } else {
        alert(json?.error || "Kunne ikke hente filen");
      }
    } catch (e) {
      alert("Feil ved henting av fil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading} className="btn">
      {loading ? "Henter..." : "Last ned CV"}
    </button>
  );
}
