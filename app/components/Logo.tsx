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
        <linearGradient id="logo-sky-new" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0c2d52" />
          <stop offset="100%" stopColor="#103a74" />
        </linearGradient>
        <linearGradient id="logo-wave-new" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
        <linearGradient id="logo-bow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#cbd5f5" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#logo-sky-new)" />
      <path
        d="M6 44c5.2 4 10.4 4 15.6 0s10.4-4 15.6 0 10.4 4 15.6 0 10.4-4 15.6 0v16H6z"
        fill="rgba(14,30,60,0.65)"
      />
      <path
        d="M4 48c6 3.4 12 3.4 18 0s12-3.4 18 0 12 3.4 18 0v12H4z"
        fill="url(#logo-wave-new)"
      />
      <path
        d="M45 14h8l-6.5 9.5c-2.9 4.3-4.1 6.4-4.1 9.4 0 5.1 3.6 9 9.3 10l-2.8 6.6c-8.9-0.7-15.6-7.6-15.6-16.6 0-3.6 1-6.6 3.1-9.9Z"
        fill="rgba(255,255,255,0.25)"
      />
      <path
        d="M19 18c7.6 0 13.8 5.7 13.8 14.2S26.6 46 19 46h-5l18.4-26.5C34.8 14.9 40.4 12 46.7 12h6.3l-4.9 6.7c-5.5 7.5-7.6 10.8-7.6 14.6 0 4.4 2.8 7.6 7.1 8.4l-3.2 7.3c-9.5-0.6-16.4-8.1-16.4-17.6 0-3.2 0.8-5.9 2.6-8.8l2.5-3.7c-2.6-1.8-5.7-2.9-8.1-2.9-4.2 0-7.9 1.7-10.8 5l-6.8-4.6C11.3 20 15 18 19 18Z"
        fill="url(#logo-bow)"
        stroke="rgba(226,238,255,0.75)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M22 34.5 28.7 42l13.5-17.3"
        stroke="#0ea5e9"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="48" cy="15" r="5" fill="#facc15" stroke="#f8fafc" strokeWidth="1.5" />
    </svg>
  );
}

export default Logo;
