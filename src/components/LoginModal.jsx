import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, KeyRound, X, ShieldAlert, ArrowRight } from 'lucide-react';

export default function LoginModal({ settings, onClose, onLoginSuccess, isDarkMode }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const validUsername = settings?.admin_username || 'admin';
  const validPassword = settings?.admin_password || 'admin123';

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() === validUsername && password === validPassword) {
      setErrorMsg('');
      onLoginSuccess();
    } else {
      setErrorMsg('Username atau Password yang Anda masukkan salah!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`relative w-full max-w-md rounded-3xl p-6 sm:p-8 border shadow-2xl ${
          isDarkMode ? 'bg-[#0f172a] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/40 hover:bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X size={18} />
        </button>

        <div className="text-center space-y-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-red-600 to-amber-500 p-0.5 mx-auto shadow-lg shadow-red-600/30 flex items-center justify-center">
            <div className="w-full h-full rounded-[14px] bg-[#0b0f17] flex items-center justify-center">
              <Lock size={26} className="text-amber-400" />
            </div>
          </div>
          <h3 className="text-xl font-black tracking-tight">Otentikasi Admin</h3>
          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Masukkan kredensial resmi untuk mengakses Dashboard Garda Muda
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-2xl bg-red-950/60 border border-red-800/60 text-red-400 text-xs font-bold flex items-center space-x-2">
            <ShieldAlert size={16} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold block mb-1.5">Username Admin</label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username..."
                className={`w-full rounded-2xl pl-10 pr-4 py-2.5 text-xs border outline-none font-bold ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-red-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-red-600'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold block mb-1.5">Password</label>
            <div className="relative">
              <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password..."
                className={`w-full rounded-2xl pl-10 pr-4 py-2.5 text-xs border outline-none font-bold ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-white focus:border-red-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-red-600'
                }`}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold py-3 rounded-2xl text-xs transition shadow-lg shadow-red-600/30 flex items-center justify-center space-x-2 mt-2"
          >
            <span>Masuk Ke Dashboard</span>
            <ArrowRight size={15} />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
