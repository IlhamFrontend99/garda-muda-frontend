import React from 'react';

export default function WavingFlag({ width = "w-32 sm:w-44", height = "h-20 sm:h-28" }) {
  return (
    <div className="relative inline-block select-none glow-fluid-flag">
      
      {/* Kain Bendera Merah Putih Ultra Smooth Wave */}
      <div className={`relative ${width} ${height} rounded-2xl overflow-hidden animate-fluid-flag border border-slate-700/60 shadow-2xl backdrop-blur-sm`}>
        
        {/* Lapisan Atas MERAH */}
        <div className="h-1/2 bg-gradient-to-r from-red-700 via-red-600 to-rose-600 w-full relative">
          <div className="absolute inset-0 fluid-ripple-layer opacity-70" />
        </div>

        {/* Lapisan Bawah PUTIH */}
        <div className="h-1/2 bg-gradient-to-r from-slate-200 via-white to-slate-100 w-full relative">
          <div className="absolute inset-0 fluid-ripple-layer opacity-40" />
        </div>

        {/* Bayangan Lipatan Kain Halus */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-black/15 via-transparent to-white/20" />
      </div>

    </div>
  );
}
