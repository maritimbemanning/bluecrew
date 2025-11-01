"use client";

import { sx } from "@/app/lib/styles";

type Props = {
  url?: string;
  text?: string;
};

export default function ShareRow({ url, text }: Props) {
  const shareUrl = url || `${process.env.NEXT_PUBLIC_SITE_URL || "https://bluecrew.no"}/meld-interesse`;
  const shareText =
    text ||
    "Bluecrew – bemanning for havbruk og kystfart. Meld interesse uforpliktende; vi tar kontakt når noe passer.";

  const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  const onClick = (network: string) => {
    try {
      if (typeof window !== "undefined" && (window as any).plausible) {
        (window as any).plausible("Share Click", { props: { network, page: "/meld-interesse" } });
      }
    } catch {}
  };

  return (
    <div style={{ ...sx.wrapNarrow, marginTop: 12 }}>
      <div style={{ ...sx.ctaRow, justifyContent: "center" }}>
        <a
          href={liUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => onClick("LinkedIn")}
          style={sx.btnOutline}
          aria-label="Del på LinkedIn"
        >
          Del på LinkedIn
        </a>
        <a
          href={fbUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => onClick("Facebook")}
          style={sx.btnSecondaryVariant}
          aria-label="Del på Facebook"
        >
          Del på Facebook
        </a>
      </div>
    </div>
  );
}
