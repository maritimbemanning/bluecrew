import React from "react";

type LogoProps = {
  size?: number;
};

export default function Logo({ size = 28 }: LogoProps) {
  const s = size;
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Bluecrew logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bluecrew-waves" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B1F3A" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#bluecrew-waves)" />
      <path
        d="M12 28c6 0 9-6 16-6s10 6 16 6 10-6 12-6"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M12 38c6 0 9-6 16-6s10 6 16 6 10-6 12-6"
        fill="none"
        stroke="#60A5FA"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M12 48c6 0 9-6 16-6s10 6 16 6 10-6 12-6"
        fill="none"
        stroke="#93C5FD"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
