import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, User, ArrowRight, Trophy, Medal } from 'lucide-react';

export default function LombaCard({ lomba, onDaftar, isDarkMode }) {
  const isFull = lomba.terdaftar >= lomba.kuota;
  const isTeam = lomba.tipe_peserta === 'Tim';
  const isFinished = lomba.status === 'Selesai' || (lomba.juara_1 && lomba.juara_1 !== '');

  return (
    <motion.div
      whileHover={{ y: -8, rotateX: -3, rotateY: 3, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`border rounded-3xl p-5 sm:p-6 flex flex-col justify-between space-y-4 transition-all shadow-xl group relative overflow-hidden ${
        isDarkMode 
          ? 'bg-slate-900/90 border-slate-800 text-white hover:border-red-500/60' 
          : 'bg-white border-slate-200 text-slate-900 hover:border-red-500 shadow-slate-200'
      }`}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="bg-red-600/15 border border-red-500/30 text-red-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
            {lomba.kategori}
          </span>

          {isFinished ? (
            <span className="bg-amber-500/20 border border-amber-500/40 text-amber-500 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1">
              <Trophy size={12} className="mr-1" />
              <span>Selesai</span>
            </span>
          ) : (
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border flex items-center space-x-1 ${
              isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-800'
            }`}>
              {isTeam ? <Users size={12} className="mr-1 text-red-600" /> : <User size={12} className="mr-1 text-red-600" />}
              <span>{isTeam ? 'Tim' : 'Individu'}</span>
            </span>
          )}
        </div>

        <h3 className={`text-xl font-bold group-hover:text-red-600 transition-colors leading-snug ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {lomba.nama}
        </h3>

        <p className={`text-xs mt-2 line-clamp-2 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>
          {lomba.deskripsi || 'Saksikan dan ikuti kemeriahan perlombaan 17 Agustus Garda Muda RT 06 / RW 01 Desa Wungu!'}
        </p>

        {isFinished ? (
          <div className={`mt-4 p-3 rounded-2xl border space-y-1.5 text-xs ${
            isDarkMode ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-300 text-slate-900'
          }`}>
            <div className="font-bold text-amber-600 flex items-center space-x-1.5 mb-2 border-b border-amber-500/20 pb-1">
              <Medal size={15} />
              <span>Pemenang Resmi Lomba</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="font-bold text-amber-600">🥇 Juara 1:</span>
              <span className="font-semibold truncate max-w-[160px]">{lomba.juara_1 || '-'}</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="font-bold text-slate-600">🥈 Juara 2:</span>
              <span className="font-semibold truncate max-w-[160px]">{lomba.juara_2 || '-'}</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="font-bold text-amber-800">🥉 Juara 3:</span>
              <span className="font-semibold truncate max-w-[160px]">{lomba.juara_3 || '-'}</span>
            </div>
          </div>
        ) : (
          <div className={`mt-4 space-y-2 text-xs font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            <div className="flex items-center space-x-2">
              <Calendar size={14} className="text-red-600" />
              <span>{lomba.tanggal}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={14} className="text-red-600" />
              <span>{lomba.lokasi}</span>
            </div>
          </div>
        )}
      </div>

      <div className={`pt-3 border-t space-y-3 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
        {!isFinished && (
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-medium">
              <span className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Pendaftar</span>
              <span className={isFull ? 'text-red-600 font-bold' : 'font-bold text-slate-900'}>
                {lomba.terdaftar} / {lomba.kuota} {isTeam ? 'Tim' : 'Warga'}
              </span>
            </div>
            <div className={`w-full h-2 rounded-full overflow-hidden p-0.5 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isFull ? 'bg-red-600' : 'bg-gradient-to-r from-red-600 to-amber-500'
                }`}
                style={{ width: `${Math.min(100, (lomba.terdaftar / lomba.kuota) * 100)}%` }}
              />
            </div>
          </div>
        )}

        <motion.button
          whileHover={{ scale: (isFull || isFinished) ? 1 : 1.02 }}
          whileTap={{ scale: (isFull || isFinished) ? 1 : 0.95 }}
          onClick={() => (!isFull && !isFinished) && onDaftar(lomba)}
          disabled={isFull || isFinished}
          className={`w-full py-3 px-4 rounded-2xl text-xs font-bold transition flex items-center justify-center space-x-2 ${
            isFinished
              ? 'bg-amber-500/20 text-amber-600 border border-amber-400/40 cursor-default'
              : isFull
              ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/30'
          }`}
        >
          <span>{isFinished ? 'Lomba Telah Selesai' : isFull ? 'Kuota Penuh' : 'Daftar Sekarang'}</span>
          {(!isFull && !isFinished) && <ArrowRight size={15} />}
        </motion.button>
      </div>
    </motion.div>
  );
}
