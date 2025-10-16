export function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-labelledby="logo-title"
    >
      <title id="logo-title">Bluecrew logo</title>
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B1F3A" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#logo-gradient)" />
      <path
        fill="#ffffff"
        d="M18 18h18c8.4 0 13.5 4.6 13.5 11.8 0 4.9-2.4 8.4-6.6 10.2l7.6 12H39l-6.4-10.4h-6.6V52H18V18zm18 16.2c3.5 0 5.6-1.7 5.6-4.5 0-2.9-2-4.5-5.6-4.5H28v9h8z"
      />
      <path
        fill="#60A5FA"
        d="M20 46h10.8c6.9 0 11 3.4 11 9.4V52c0-4.7-3.1-7-9.6-7H20v1z"
      />
    </svg>
  );
}
