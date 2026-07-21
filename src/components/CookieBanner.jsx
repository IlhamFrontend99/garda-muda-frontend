import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, CheckCircle2, Shield } from 'lucide-react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('rt06_cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('rt06_cookie_consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('rt06_cookie_consent', 'declined');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-5 right-5 left-5 md:left-auto md:max-w-md z-50 bg-slate-900/95 border border-slate-700/80 p-5 rounded-3xl shadow-2xl backdrop-blur-xl space-y-3.5"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-red-500/10 border border-red-500/30 text-red-500 rounded-2xl">
                <Cookie size={20} />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white">Kebijakan Cookie & Sesi</h4>
                <p className="text-[11px] text-slate-400">Pengelolaan Sesi Login & Keamanan</p>
              </div>
            </div>
            <button onClick={handleDecline} className="text-slate-500 hover:text-white p-1">
              <X size={16} />
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Portal Garda Muda RT 06 menggunakan cookie & sesi penyimpanan lokal untuk menjaga status login Admin serta mempermudah pendaftaran lomba warga.
          </p>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-slate-500 flex items-center space-x-1">
              <Shield size={12} className="text-emerald-400" />
              <span>Data Tersimpan Aman</span>
            </span>

            <div className="flex space-x-2">
              <button
                onClick={handleDecline}
                className="px-3.5 py-1.5 border border-slate-700/80 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800 transition"
              >
                Tolak
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-1.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/30 flex items-center space-x-1.5 transition"
              >
                <CheckCircle2 size={13} />
                <span>Setujui</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
