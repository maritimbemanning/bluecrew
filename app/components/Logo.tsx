import React from "react";

export function Logo({ size = 32 }: { size?: number }) {
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
        <linearGradient id="logo-sky" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0b1f3a" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="logo-wave" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
        <linearGradient id="logo-ribbon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <clipPath id="logo-clip">
          <circle cx="32" cy="32" r="30" />
        </clipPath>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#logo-sky)" />
      <g clipPath="url(#logo-clip)">
        <path
          d="M0 44c9 0 13-7 22-7s13 7 22 7 13-7 22-7 13 7 22 7v24H0z"
          fill="rgba(15,23,42,0.35)"
        />
        <path
          d="M0 48c9 0 13-5 22-5s13 5 22 5 13-5 22-5 13 5 22 5v20H0z"
          fill="url(#logo-wave)"
        />
        <path
          d="M20 18c10 0 18 8 18 18s-8 18-18 18h-6l24-36c2.5-3.9 6.4-6 11.7-6h6.3l-5 6.5c-5.2 6.6-7.3 9.7-7.3 13.5 0 4 2.5 6.9 6.6 7.5l-3.4 7.1c-8-.6-14-6.7-14-14 0-2.7.7-5 2.2-7.3l3.1-4.7c-2.4-1.7-5.3-2.6-8.8-2.6-4.6 0-8.4 1.8-11.6 5.5L12 22.8c3.3-3.3 7.7-4.8 12-4.8Z"
          fill="url(#logo-ribbon)"
          stroke="rgba(226,232,240,0.6)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </g>
      <circle cx="48" cy="16" r="5" fill="#fcd34d" stroke="#f8fafc" strokeWidth="1.5" />
    </svg>
  );
}

export default Logo;
