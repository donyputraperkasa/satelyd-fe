"use client";

interface BankLogoProps {
  className?: string;
}

/**
 * Official Bank Central Asia (BCA) Logo Badge
 */
export function BcaLogo({ className = "h-7 w-auto" }: BankLogoProps) {
  return (
    <svg
      viewBox="0 0 100 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Logo Bank BCA"
    >
      {/* BCA Signature Blue Background */}
      <rect width="100" height="36" rx="8" fill="#005BAA" />
      {/* Decorative inner glow/frame line */}
      <rect x="2" y="2" width="96" height="32" rx="6" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="1" />
      {/* White BCA Lettermark */}
      <text
        x="50"
        y="25"
        fill="#FFFFFF"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="900"
        fontSize="19"
        letterSpacing="2.5"
        textAnchor="middle"
      >
        BCA
      </text>
    </svg>
  );
}

/**
 * Official Bank Mandiri Logo Badge with golden yellow wave
 */
export function MandiriLogo({ className = "h-7 w-auto" }: BankLogoProps) {
  return (
    <svg
      viewBox="0 0 115 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Logo Bank Mandiri"
    >
      {/* Mandiri Deep Navy Background */}
      <rect width="115" height="36" rx="8" fill="#002D62" />
      {/* Decorative inner glow/frame line */}
      <rect x="2" y="2" width="111" height="32" rx="6" stroke="#FFFFFF" strokeOpacity="0.2" strokeWidth="1" />
      {/* Golden Yellow Ribbon Curve */}
      <path
        d="M82 8C88 8 96 10 102 14C99 11 90 9 82 9C75 9 70 12 68 15C71 10 76 8 82 8Z"
        fill="#FFB81C"
      />
      <circle cx="94" cy="9" r="2.5" fill="#FFB81C" />
      {/* White Mandiri text */}
      <text
        x="50"
        y="24"
        fill="#FFFFFF"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="15"
        letterSpacing="0.5"
        textAnchor="middle"
      >
        mandırı
      </text>
    </svg>
  );
}
