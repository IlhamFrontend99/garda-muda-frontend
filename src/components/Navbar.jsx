import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ShieldCheck, LogOut, Lock, Menu, X, Sun, Moon } from 'lucide-react';
import HutRi81Logo from './HutRi81Logo';

export default function Navbar({ view, setView, isAdminLoggedIn, setIsAdminLoggedIn, setShowLoginModal, isDarkMode, setIsDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 shadow-md ${
        isDarkMode
          ? 'bg-[#0b0f17]/90 border-slate-800/80 text-white'
          : 'bg-white/95 border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        
        {/* Brand Logo & Garuda Emblem */}
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => { setView('user'); setMobileMenuOpen(false); }}>
          
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-b from-red-600 via-rose-500 to-amber-500 p-0.5 shadow-lg shadow-red-600/30 flex items-center justify-center shrink-0">
            <div className={`w-full h-full rounded-[14px] flex items-center justify-center p-1 ${isDarkMode ? 'bg-[#0b0f17]' : 'bg-slate-900'}`}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/90/National_emblem_of_Indonesia_Garuda_Pancasila.svg"
                alt="Garuda Pancasila"
                className="w-6 h-6 object-contain"
                style={{ width: '24px', height: '24px', maxWidth: '24px', maxHeight: '24px' }}
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-black text-base sm:text-lg tracking-tight group-hover:text-red-600 transition-colors">
                  GARDA MUDA <span className="text-red-600">RT 06</span>
                </h1>
              </div>
              <p className={`text-[10px] sm:text-[11px] font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Portal Kemerdekaan & Perlombaan Warga
              </p>
            </div>

            {/* Logo HUT RI 81 dengan Dark Contrast Wrapper */}
            <div className="hidden sm:block pl-2 border-l border-slate-300 dark:border-slate-800">
              <HutRi81Logo size="sm" />
            </div>
          </div>
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center space-x-3">
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2.5 rounded-2xl border transition duration-200 flex items-center justify-center ${
              isDarkMode
                ? 'bg-slate-800/90 border-slate-700 text-amber-400 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
            }`}
            title={isDarkMode ? 'Beralih ke Light Mode' : 'Beralih ke Dark Mode'}
          >
            {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
          </motion.button>

          <button
            onClick={() => setView('user')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center space-x-2 ${
              view === 'user'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                : isDarkMode
                ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Trophy size={15} />
            <span>Beranda Warga</span>
          </button>

          {isAdminLoggedIn ? (
            <>
              <button
                onClick={() => setView('admin')}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center space-x-2 ${
                  view === 'admin'
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/30'
                    : isDarkMode
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ShieldCheck size={15} />
                <span>Dashboard Admin</span>
              </button>
              <button
                onClick={() => { setIsAdminLoggedIn(false); setView('user'); }}
                className={`p-2 rounded-xl transition ${isDarkMode ? 'text-slate-400 hover:text-red-400 hover:bg-slate-800' : 'text-slate-600 hover:text-red-600 hover:bg-slate-100'}`}
                title="Logout Admin"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className={`flex items-center space-x-2 border px-4 py-2 rounded-2xl text-xs font-bold transition shadow-sm ${
                isDarkMode
                  ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
              }`}
            >
              <Lock size={14} className="text-red-600" />
              <span>Login Admin</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger Controls */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-xl border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-slate-100 border-slate-300 text-slate-700'}`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-xl ${isDarkMode ? 'text-slate-300 hover:text-white bg-slate-800' : 'text-slate-700 hover:text-slate-900 bg-slate-100'}`}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`md:hidden border-t px-4 py-4 space-y-2 ${isDarkMode ? 'border-slate-800 bg-[#0b0f17]' : 'border-slate-200 bg-white'}`}
          >
            <button
              onClick={() => { setView('user'); setMobileMenuOpen(false); }}
              className={`w-full p-3 rounded-2xl text-xs font-bold flex items-center space-x-2 ${view === 'user' ? 'bg-red-600 text-white' : isDarkMode ? 'text-slate-400 bg-slate-900' : 'text-slate-700 bg-slate-100'}`}
            >
              <Trophy size={16} />
              <span>Beranda Warga</span>
            </button>

            {isAdminLoggedIn ? (
              <>
                <button
                  onClick={() => { setView('admin'); setMobileMenuOpen(false); }}
                  className={`w-full p-3 rounded-2xl text-xs font-bold flex items-center space-x-2 ${view === 'admin' ? 'bg-red-600 text-white' : isDarkMode ? 'text-slate-400 bg-slate-900' : 'text-slate-700 bg-slate-100'}`}
                >
                  <ShieldCheck size={16} />
                  <span>Dashboard Admin</span>
                </button>
                <button
                  onClick={() => { setIsAdminLoggedIn(false); setView('user'); setMobileMenuOpen(false); }}
                  className="w-full p-3 rounded-2xl text-xs font-bold flex items-center space-x-2 text-red-500 bg-red-950/20 border border-red-800/40"
                >
                  <LogOut size={16} />
                  <span>Logout Admin</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => { setShowLoginModal(true); setMobileMenuOpen(false); }}
                className={`w-full p-3 rounded-2xl text-xs font-bold flex items-center space-x-2 border ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-800'}`}
              >
                <Lock size={16} className="text-red-600" />
                <span>Login Admin</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
