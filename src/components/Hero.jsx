import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import HutRi81Logo from './HutRi81Logo';

export default function Hero({ settings = {}, onOpenRegistrasi, isDarkMode }) {
  const [logoUtamaError, setLogoUtamaError] = useState(false);
  const [logoHutError, setLogoHutError] = useState(false);

  const namaOrganisasi = settings?.nama_organisasi || 'GARDA MUDA RT 06';
  const rwDesa = settings?.rw_desa || 'RW 01 DESA WUNGU';
  const sloganUtama = settings?.slogan_utama || "KOBARKAN SEMANGAT\nPERSATUAN & KEMERDEKAAN!";
  const deskripsiHero = settings?.deskripsi_hero || 'Selamat datang di Portal Resmi Perlombaan 17 Agustus Garda Muda RT 06 / RW 01 Desa Wungu.';
  
  const logoUtamaUrl = settings?.logo_utama || 'https://upload.wikimedia.org/wikipedia/commons/9/90/National_emblem_of_Indonesia_Garuda_Pancasila.svg';
  const logoHutUrl = settings?.logo_hut;
  const logoGardaUrl = settings?.logo_garda;

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16">
      {/* Red Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-red-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
        
        {/* LOGO BADGES CONTAINER */}
        <div className="flex items-center justify-center space-x-4 sm:space-x-6 pt-2">
          
          {/* Logo 1: Garuda Pancasila */}
          <motion.div 
            whileHover={{ scale: 1.08, rotate: -2 }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900/90 border border-red-500/40 p-2.5 flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.3)] backdrop-blur-md"
          >
            {!logoUtamaError && logoUtamaUrl ? (
              <img 
                src={logoUtamaUrl} 
                alt="Garuda Pancasila" 
                onError={() => setLogoUtamaError(true)}
                className="w-full h-full object-contain drop-shadow"
              />
            ) : (
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/9/90/National_emblem_of_Indonesia_Garuda_Pancasila.svg" 
                alt="Garuda Pancasila Fallback" 
                className="w-full h-full object-contain"
              />
            )}
          </motion.div>

          {/* Logo 2: Emblem Resmi HUT RI 81 Vector SVG */}
          <motion.div 
            whileHover={{ scale: 1.08, rotate: 2 }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900/90 border border-amber-500/40 p-2 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)] backdrop-blur-md"
          >
            {logoHutUrl && !logoHutError && logoHutUrl !== '/logo-hutri81.png' ? (
              <img 
                src={logoHutUrl} 
                alt="HUT RI 81" 
                onError={() => setLogoHutError(true)}
                className="w-full h-full object-contain drop-shadow"
              />
            ) : (
              <HutRi81Logo className="w-full h-full" />
            )}
          </motion.div>

          {/* Logo 3: Logo Garda Muda (Opsional) */}
          {logoGardaUrl && (
            <motion.div 
              whileHover={{ scale: 1.08 }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900/90 border border-amber-500/40 p-2 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)] backdrop-blur-md"
            >
              <img src={logoGardaUrl} alt="Garda Muda" className="w-full h-full object-contain" />
            </motion.div>
          )}

        </div>

        {/* ORGANISASI BADGE */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/30 text-red-500 font-bold text-xs uppercase tracking-wider">
          <Sparkles size={14} className="animate-pulse" />
          <span>{namaOrganisasi} • {rwDesa}</span>
        </div>

        {/* MAIN HEADLINE */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight uppercase whitespace-pre-line bg-gradient-to-r from-red-500 via-white to-amber-400 bg-clip-text text-transparent">
          {sloganUtama}
        </h1>

        {/* SUBTITLE */}
        <p className={`max-w-2xl mx-auto text-sm sm:text-base ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          {deskripsiHero}
        </p>

        {/* CTA BUTTON */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenRegistrasi}
            className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold px-8 py-3.5 rounded-2xl shadow-[0_0_25px_rgba(220,38,38,0.5)] flex items-center justify-center space-x-2 text-sm tracking-wide transition"
          >
            <span>Daftar Lomba Sekarang</span>
            <ArrowRight size={18} />
          </motion.button>
        </div>

      </div>
    </section>
  );
}