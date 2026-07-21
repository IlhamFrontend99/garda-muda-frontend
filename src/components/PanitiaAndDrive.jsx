import React from 'react';
import { motion } from 'framer-motion';
import { FolderDown, Users, ExternalLink, ShieldCheck, Sparkles, Camera } from 'lucide-react';

export default function PanitiaAndDrive({ settings, isDarkMode }) {
  const driveUrl = settings?.drive_link;
  const panitiaGroupPhoto = settings?.panitia_group_photo;
  const panitiaList = Array.isArray(settings?.panitia_list) ? settings.panitia_list : [];

  const hasPanitiaContent = panitiaGroupPhoto || panitiaList.length > 0;

  if (!driveUrl && !hasPanitiaContent) return null;

  return (
    <div className="space-y-12 my-12">
      
      {/* BANNER GOOGLE DRIVE DOKUMENTASI & FOTO HD */}
      {driveUrl && (
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-slate-900 via-slate-950 to-red-950/40 border-red-500/30' 
              : 'bg-gradient-to-r from-red-50 via-white to-amber-50 border-red-200 shadow-slate-200'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-blue-600 to-emerald-500 p-0.5 shadow-lg shrink-0 flex items-center justify-center">
              <div className="w-full h-full rounded-[14px] bg-[#0b0f17] flex items-center justify-center text-emerald-400">
                <FolderDown size={28} />
              </div>
            </div>

            <div className="space-y-1 text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                AKSES GOOGLE DRIVE RESMI
              </span>
              <h3 className={`text-xl sm:text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Dokumentasi & Foto HD Kemerdekaan
              </h3>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Download seluruh koleksi foto beresolusi tinggi, video mentah, dan arsip acara warga
              </p>
            </div>
          </div>

          <a
            href={driveUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs px-6 py-3.5 rounded-2xl flex items-center space-x-2 shadow-lg shrink-0 transition"
          >
            <span>Buka Google Drive</span>
            <ExternalLink size={15} />
          </a>
        </motion.div>
      )}

      {/* SHOWCASE TIM PANITIA GARDA MUDA */}
      {hasPanitiaContent && (
        <div className="space-y-8 text-center">
          
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-amber-500/15 border border-amber-500/30 text-amber-500 px-3.5 py-1 rounded-full text-xs font-bold">
              <Users size={14} />
              <span>SUSUNAN PANITIA PELAKSANA</span>
            </div>
            <h3 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Garda Muda RT 06 / RW 01
            </h3>
            <p className={`text-xs sm:text-sm max-w-md mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Penggerak utama dan penanggung jawab kelancaran Semarak Kemerdekaan RI ke-81
            </p>
          </div>

          {/* FOTO BERSAMA SELURUH PANITIA (BESAR & ELEGANT) */}
          {panitiaGroupPhoto && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-3xl border max-w-4xl mx-auto shadow-2xl relative overflow-hidden ${
                isDarkMode ? 'bg-slate-900/90 border-red-500/30' : 'bg-white border-slate-200'
              }`}
            >
              <div className="relative rounded-2xl overflow-hidden border border-slate-800/60 max-h-[450px]">
                <img
                  src={panitiaGroupPhoto}
                  alt="Foto Bersama Seluruh Panitia Garda Muda"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-bold px-2">
                  <span className="flex items-center space-x-1.5 bg-red-600/80 backdrop-blur-md px-3 py-1 rounded-full border border-red-500/40">
                    <Camera size={13} />
                    <span>FOTO BERSAMA PANITIA PELAKSANA</span>
                  </span>
                  <span className="text-[11px] text-amber-400 hidden sm:inline-block">Garda Muda RT 06 / RW 01</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* DAFTAR ANGGOTA PANITIA (UNLIMITED FLEXIBLE GRID) */}
          {panitiaList.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
              {panitiaList.map((p, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  className={`p-5 rounded-3xl border text-center space-y-3 shadow-xl transition relative overflow-hidden ${
                    isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden border-2 border-red-500/40 bg-slate-950 flex items-center justify-center shadow-lg">
                    {p.photo ? (
                      <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      <ShieldCheck size={32} className="text-amber-500" />
                    )}
                  </div>

                  <div>
                    <h4 className={`font-black text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{p.name}</h4>
                    <p className="text-xs text-red-500 font-bold mt-0.5">{p.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
