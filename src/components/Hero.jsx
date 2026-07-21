import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Sparkles, Flame, CheckCircle2 } from 'lucide-react';
import HutRi81Logo from './HutRi81Logo';

export default function Hero({ settings, totalLomba, totalTerdaftar, totalKuota, persentaseTerisi, isDarkMode }) {
  const sloganLines = (settings?.slogan_utama || "KOBARKAN SEMANGAT\nPERSATUAN & KEMERDEKAAN!").split('\n');

  return (
    <div className={`relative overflow-hidden border-b transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-[#101726] via-[#0b0f17] to-[#0b0f17] border-slate-800/80' 
        : 'bg-gradient-to-b from-red-50/90 via-white to-slate-100 border-slate-200'
    }`}>
      
      {/* Background Ambient Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Section */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`inline-flex items-center space-x-3 px-4 py-2 rounded-2xl text-xs font-bold border shadow-md ${
                isDarkMode 
                  ? 'bg-red-950/70 border-red-800/60 text-red-400' 
                  : 'bg-red-100 border-red-300 text-red-700'
              }`}
            >
              <Flame size={16} className="text-red-500 animate-pulse shrink-0" />
              <span>HUT REPUBLIK INDONESIA KE-81 — {settings?.nama_organisasi || 'GARDA MUDA RT 06'}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
            >
              {sloganLines[0]} <br />
              <span className="bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
                {sloganLines[1] || 'PERSATUAN & KEMERDEKAAN!'}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-xs sm:text-sm max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium ${
                isDarkMode ? 'text-slate-400' : 'text-slate-700'
              }`}
            >
              {settings?.deskripsi_hero || 'Selamat datang di Portal Resmi Perlombaan 17 Agustus Garda Muda RT 06 / RW 01 Desa Wungu.'}
            </motion.p>

            {/* Quick Stat Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-1"
            >
              <div className={`p-4 rounded-2xl border flex items-center space-x-3 transition-transform hover:-translate-y-1 ${
                isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-md shadow-slate-200'
              }`}>
                <Trophy size={22} className="text-red-600 shrink-0" />
                <div className="text-left">
                  <p className={`text-[10px] font-bold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Perlombaan</p>
                  <p className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{totalLomba} Kategori</p>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border flex items-center space-x-3 transition-transform hover:-translate-y-1 ${
                isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-md shadow-slate-200'
              }`}>
                <Users size={22} className="text-red-600 shrink-0" />
                <div className="text-left">
                  <p className={`text-[10px] font-bold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Pendaftar</p>
                  <p className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{totalTerdaftar} Peserta</p>
                </div>
              </div>

              <div className={`col-span-2 sm:col-span-1 p-4 rounded-2xl border flex items-center space-x-3 transition-transform hover:-translate-y-1 ${
                isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-md shadow-slate-200'
              }`}>
                <Sparkles size={22} className="text-amber-500 shrink-0" />
                <div className="text-left">
                  <p className={`text-[10px] font-bold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Terisi</p>
                  <p className="text-sm font-black text-amber-500">{persentaseTerisi}% Kuota</p>
                </div>
              </div>
            </motion.div>

            {/* REAL-TIME PROGRESS BAR */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`p-4 rounded-3xl border space-y-2.5 shadow-lg ${
                isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-slate-200'
              }`}
            >
              <div className="flex justify-between items-center text-xs font-bold">
                <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>Progres Akumulasi Kuota Pendaftaran Warga</span>
                </div>
                <span className="text-amber-500 font-black font-mono">{persentaseTerisi}% Terisi</span>
              </div>

              <div className={`w-full h-3 rounded-full overflow-hidden p-0.5 border ${
                isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-300'
              }`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(persentaseTerisi, 100)}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="h-full rounded-full animate-shimmer shadow-md"
                />
              </div>

              <div className="flex justify-between items-center text-[11px] font-bold">
                <span className={isDarkMode ? 'text-slate-200' : 'text-slate-900 font-black'}>
                  {totalTerdaftar} Peserta Terdaftar
                </span>
                <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                  Target Maksimal: <strong className="text-amber-500 font-extrabold">{totalKuota} Kuota</strong>
                </span>
              </div>
            </motion.div>

          </div>

          {/* Right Hero 3D Badge Section */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`relative p-6 sm:p-8 rounded-3xl border text-center space-y-6 shadow-2xl backdrop-blur-md max-w-sm w-full overflow-hidden glow-card ${
                isDarkMode 
                  ? 'bg-gradient-to-b from-red-950/60 via-slate-900/95 to-slate-950 border-red-500/40 text-white' 
                  : 'bg-gradient-to-b from-red-50 via-white to-slate-50 border-red-300 text-slate-900 shadow-red-100'
              }`}
            >
              {/* 3D FLAG & GARUDA ARENA */}
              <div className="relative flex items-center justify-center space-x-3 py-2">
                <div className="w-16 h-20 rounded-2xl overflow-hidden border-2 border-amber-400/60 animate-flag-left shadow-xl shrink-0 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-300 to-amber-600 z-10" />
                  <div className="h-1/2 bg-gradient-to-r from-red-700 to-red-600" />
                  <div className="h-1/2 bg-gradient-to-r from-slate-100 to-white" />
                </div>

                {/* GARUDA TENGAH (RENDER JIKA TIDAK KOSONG) */}
                {settings?.logo_utama && (
                  <div className="relative z-10 animate-float-hero">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-b from-red-600 via-rose-600 to-amber-500 p-1 shadow-2xl shadow-red-600/50 flex items-center justify-center">
                      <div className={`w-full h-full rounded-[20px] flex items-center justify-center p-2.5 ${isDarkMode ? 'bg-[#0b0f17]' : 'bg-slate-900'}`}>
                        <img
                          src={settings.logo_utama}
                          alt="Garuda Pancasila 3D"
                          className="w-full h-full object-contain"
                          style={{ maxWidth: '64px', maxHeight: '64px' }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="w-16 h-20 rounded-2xl overflow-hidden border-2 border-amber-400/60 animate-flag-right shadow-xl shrink-0 relative">
                  <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-300 to-amber-600 z-10" />
                  <div className="h-1/2 bg-gradient-to-r from-red-600 to-red-700" />
                  <div className="h-1/2 bg-gradient-to-r from-white to-slate-100" />
                </div>
              </div>

              {/* LOGO HUT RI 81 DISPLAY (RENDER JIKA TERSEDIA) */}
              {settings?.logo_hut && (
                <div className={`pt-3 border-t flex flex-col items-center justify-center p-4 rounded-2xl border shadow-xl ${
                  isDarkMode ? 'bg-slate-900/80 border-red-500/30' : 'bg-white border-red-200'
                }`}>
                  <HutRi81Logo src={settings.logo_hut} size="xl" />
                </div>
              )}

              {/* LOGO GARDA MUDA TAMBAHAN (SAMPING/DISPLAY JIKA DILAMPIRKAN) */}
              {settings?.logo_garda && (
                <div className="pt-2 flex justify-center">
                  <img src={settings.logo_garda} alt="Logo Garda Muda" className="h-14 w-auto object-contain drop-shadow-md" />
                </div>
              )}

              {/* Organization Info */}
              <div className="space-y-1">
                <h3 className={`font-black text-2xl tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {settings?.nama_organisasi || 'GARDA MUDA RT 06'}
                </h3>
                <p className="text-xs text-amber-500 font-bold uppercase tracking-widest">
                  {settings?.rw_desa || 'RW 01 DESA WUNGU'}
                </p>
              </div>

              {/* Registration Badge */}
              <div className={`text-[11px] rounded-2xl py-2.5 px-3.5 font-bold flex items-center justify-center space-x-2 border shadow-inner ${
                isDarkMode 
                  ? 'bg-red-950/60 border-red-800/60 text-slate-200' 
                  : 'bg-red-100 border-red-200 text-slate-900'
              }`}>
                <span className="bg-red-600 text-white font-black px-2 py-0.5 rounded-lg text-[9px] uppercase tracking-wider">
                  REGISTRASI
                </span>
                <span>Terbuka Untuk Seluruh Warga RT 06 / RW 01</span>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
