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
        <linearGradient id="bluecrew-shell" x1="8%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor="#072042" />
          <stop offset="52%" stopColor="#0F3A6D" />
          <stop offset="100%" stopColor="#1E62C9" />
        </linearGradient>
        <linearGradient id="bluecrew-crest" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9deafe" />
          <stop offset="100%" stopColor="#3bc8f2" />
        </linearGradient>
        <linearGradient id="bluecrew-wave" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="18" fill="url(#bluecrew-shell)" />
      <path
        d="M20 16a8 8 0 0 1 8-8h8c8.284 0 15 6.268 15 14s-6.716 14-15 14H24v-6h11c4.418 0 8-3.358 8-8s-3.582-8-8-8h-3c-3.314 0-6-2.686-6-6Z"
        fill="rgba(148, 197, 255, 0.28)"
      />
      <path
        d="M20 30h16c8.284 0 15 6.268 15 14s-6.716 14-15 14H26c-3.314 0-6-2.686-6-6V30Z"
        fill="url(#bluecrew-crest)"
        opacity="0.9"
      />
      <path
        d="M8 40c7.2 0 10.8-6 18-6s10.8 6 18 6 10.8-6 18-6 10.8 6 18 6v18H8z"
        fill="rgba(15,23,42,0.25)"
      />
      <path
        d="M8 44c7.2 0 10.8-4 18-4s10.8 4 18 4 10.8-4 18-4 10.8 4 18 4v14H8z"
        fill="url(#bluecrew-wave)"
      />
      <path
        d="M32 20c5.246 0 9.5 4.254 9.5 9.5S37.246 39 32 39s-9.5-4.254-9.5-9.5S26.754 20 32 20Z"
        fill="none"
        stroke="rgba(226,238,255,0.7)"
        strokeWidth="3"
      />
      <circle cx="44" cy="18" r="5" fill="#facc15" stroke="#f8fafc" strokeWidth="1.5" />
    </svg>
  );
}

export default Logo;
