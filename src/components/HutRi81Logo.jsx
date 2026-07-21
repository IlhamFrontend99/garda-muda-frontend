import React from 'react';

export default function HutRi81Logo({ className = "w-16 h-16" }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_12px_rgba(220,38,38,0.7)]"
      >
        <defs>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="whiteGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
        </defs>

        <!-- Outer Ring Badge -->
        <circle cx="100" cy="100" r="92" fill="#090d16" stroke="url(#goldGradient)" strokeWidth="4" />
        <circle cx="100" cy="100" r="84" fill="none" stroke="url(#redGradient)" strokeWidth="2" strokeDasharray="6 4" />

        <!-- Red & White Merah Putih Ribbon Background -->
        <path d="M25,75 C60,45 140,45 175,75 L175,125 C140,155 60,155 25,125 Z" fill="url(#redGradient)" />
        <path d="M25,100 C60,120 140,120 175,100 L175,125 C140,155 60,155 25,125 Z" fill="url(#whiteGradient)" />

        <!-- Header Text: HUT RI -->
        <text
          x="100"
          y="48"
          textAnchor="middle"
          fill="url(#goldGradient)"
          fontSize="18"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="2"
        >
          HUT RI
        </text>

        <!-- Bold 81 Emblem Text -->
        <text
          x="100"
          y="118"
          textAnchor="middle"
          fill="url(#whiteGradient)"
          fontSize="68"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="-2"
          stroke="#7f1d1d"
          strokeWidth="3"
          paintOrder="stroke fill"
        >
          81
        </text>

        <!-- Subtext Year -->
        <text
          x="100"
          y="162"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="11"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="1.5"
        >
          1945 - 2026
        </text>

        <!-- Star Top Ornament -->
        <path d="M100,22 L103,28 L109,29 L104,33 L106,39 L100,36 L94,39 L96,33 L91,29 L97,28 Z" fill="url(#goldGradient)" />
      </svg>
    </div>
  );
}