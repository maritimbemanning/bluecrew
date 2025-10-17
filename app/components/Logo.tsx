import React from "react";

export function Logo({ size = 36 }: { size?: number }) {
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
        <linearGradient id="bc-ring" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4cc9f0" />
          <stop offset="45%" stopColor="#3a7bd5" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="bc-core" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#0f1f3d" />
          <stop offset="100%" stopColor="#1d3e80" />
        </linearGradient>
        <linearGradient id="bc-wave" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#bc-core)" stroke="url(#bc-ring)" strokeWidth="4" />
      <path
        d="M21 16h12.5c8.4 0 14.5 4.9 14.5 12 0 6.4-4.3 10.7-11.1 11.7 3.9.9 6.1 3.4 6.1 7.2 0 5.8-4.6 9.9-11.6 9.9H21V16Zm11.4 17.3c4.7 0 7.8-2.5 7.8-6.2 0-3.9-3.1-6.1-8.3-6.1H27v12.3h5.4Zm-.7 17.9c4.8 0 7.9-2.2 7.9-6 0-3.8-3-5.9-8.6-5.9H27v11.9h4.7Z"
        fill="#e2ecff"
        opacity="0.92"
      />
      <path
        d="M10 42c5.5-2.8 12.8-4.6 19.5-4.6 7.2 0 13.2 1.9 18.3 4.6 3.6 2 9.1 2.3 12.2.2-3.3 6.8-11.7 10.8-21.8 10.8-10.6 0-20.8-4.6-28.2-11z"
        fill="url(#bc-wave)"
        opacity="0.85"
      />
      <circle cx="47" cy="15.5" r="4.2" fill="#facc15" stroke="#f8fafc" strokeWidth="1.5" />
    </svg>
  );
}

export default Logo;
