import React from "react";

export function Logo({ size = 32 }: { size?: number }) {
  const s = size;
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 72 72"
      role="img"
      aria-label="Bluecrew AS logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-ocean" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0B1F3A" />
          <stop offset="55%" stopColor="#10325C" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient id="logo-crest" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
        <mask id="logo-wave-mask">
          <rect width="72" height="72" fill="white" />
          <path
            d="M4 44c6.5 0 10-7 16.5-7S38 44 44.5 44 55 37 61.5 37 72 44 72 44v28H4z"
            fill="black"
          />
        </mask>
      </defs>
      <circle cx="36" cy="36" r="34" fill="url(#logo-ocean)" />
      <g mask="url(#logo-wave-mask)">
        <path
          d="M-6 45c8.5 0 12.5-8 21-8s12.5 8 21 8 12.5-8 21-8 12.5 8 21 8v30H-6z"
          fill="url(#logo-crest)"
          opacity="0.85"
        />
      </g>
      <path
        d="M36 18c6.627 0 12 5.373 12 12v6c0 6.627-5.373 12-12 12s-12-5.373-12-12v-6c0-6.627 5.373-12 12-12Z"
        fill="none"
        stroke="#BFDBFE"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M36 18v33"
        stroke="#BFDBFE"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="36" cy="54" r="4" fill="#BFDBFE" />
      <path
        d="M26 36h20"
        stroke="#E0F2FE"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M31 26h10"
        stroke="#E0F2FE"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
