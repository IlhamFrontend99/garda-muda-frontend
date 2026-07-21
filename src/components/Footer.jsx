import React from 'react';
import { Phone, Globe } from 'lucide-react';

export default function Footer({ settings, isDarkMode }) {
  const ig = settings?.instagram;
  const tiktok = settings?.tiktok;
  const yt = settings?.youtube;
  const wa = settings?.whatsapp;

  return (
    <footer className={`border-t py-10 mt-16 transition-colors ${
      isDarkMode ? 'border-slate-800/80 bg-[#070a11] text-slate-400' : 'border-slate-200 bg-white text-slate-700'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="text-center md:text-left space-y-1">
          <h4 className={`font-black text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {settings?.nama_organisasi || 'GARDA MUDA RT 06'}
          </h4>
          <p className="text-xs">{settings?.rw_desa || 'RW 01 DESA WUNGU'} — Semarak Kemerdekaan RI ke-81</p>
        </div>

        {/* SOSMED LINKS DISPLAY WITH INLINE SVG (ANTI IMPORT ERROR) */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {ig && (
            <a
              href={ig.startsWith('http') ? ig : `https://instagram.com/${ig.replace('@','')}`}
              target="_blank"
              rel="noreferrer"
              className="bg-red-600/15 border border-red-500/30 text-red-500 hover:bg-red-600 hover:text-white transition px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center space-x-2 shadow"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              <span>{ig}</span>
            </a>
          )}

          {tiktok && (
            <a
              href={tiktok.startsWith('http') ? tiktok : `https://tiktok.com/${tiktok.startsWith('@') ? tiktok : '@'+tiktok}`}
              target="_blank"
              rel="noreferrer"
              className="bg-amber-500/15 border border-amber-500/30 text-amber-500 hover:bg-amber-500 hover:text-slate-950 transition px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center space-x-2 shadow"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.96-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.57-1.31 1.56-1.3 2.56.01 1.01.55 1.97 1.39 2.51.91.58 2.1.66 3.08.23.95-.4 1.61-1.31 1.71-2.33.09-2.37.04-4.75.04-7.12V.02z"/></svg>
              <span>{tiktok}</span>
            </a>
          )}

          {yt && (
            <a
              href={yt.startsWith('http') ? yt : `https://youtube.com/results?search_query=${encodeURIComponent(yt)}`}
              target="_blank"
              rel="noreferrer"
              className="bg-rose-600/15 border border-rose-500/30 text-rose-500 hover:bg-rose-600 hover:text-white transition px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center space-x-2 shadow"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              <span>{yt}</span>
            </a>
          )}

          {wa && (
            <a
              href={wa.startsWith('http') ? wa : `https://wa.me/${wa.replace(/[^0-9]/g,'')}`}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600/15 border border-emerald-500/30 text-emerald-500 hover:bg-emerald-600 hover:text-white transition px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center space-x-2 shadow"
            >
              <Phone size={15} />
              <span>{wa}</span>
            </a>
          )}
        </div>

      </div>

      <div className="text-center text-[11px] text-slate-500 pt-6 mt-6 border-t border-slate-800/40">
        © 2026 {settings?.nama_organisasi || 'Garda Muda RT 06'}. Seluruh Hak Cipta Dilindungi.
      </div>
    </footer>
  );
}
