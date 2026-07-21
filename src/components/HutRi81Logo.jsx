import React from 'react';

export default function HutRi81Logo({ src = "/logo-hutri81.png", size = "md", className = "" }) {
  if (!src) return null;

  const sizeClasses = {
    sm: "h-7 sm:h-8",
    md: "h-10 sm:h-12",
    lg: "h-14 sm:h-16",
    xl: "h-20 sm:h-24",
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      <div className="bg-[#0b0f17] border border-red-500/40 rounded-2xl p-2 shadow-lg shadow-red-950/40 flex items-center justify-center shrink-0">
        <img
          src={src}
          alt="Logo HUT RI ke-81"
          className={`${selectedSize} w-auto object-contain drop-shadow-[0_0_10px_rgba(225,29,72,0.6)]`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
          }}
        />
      </div>
    </div>
  );
}
