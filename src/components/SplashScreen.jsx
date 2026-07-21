import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, ShieldAlert } from 'lucide-react';

export default function SplashScreen({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070a11] text-white p-4 overflow-hidden select-none"
        >
          {/* Background Ambient Beams */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-red-600/30 via-rose-500/20 to-amber-500/30 rounded-full blur-[140px] pointer-events-none animate-pulse" />

          {/* Particle Dots Simulation */}
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 flex flex-col items-center space-y-8 text-center max-w-md w-full">
            
            {/* 3D Rotating Garuda Ring */}
            <motion.div
              initial={{ scale: 0.3, rotateY: 180, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              transition={{ duration: 1, type: "spring", stiffness: 150, damping: 15 }}
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-b from-red-600 via-rose-600 to-amber-500 p-1 shadow-[0_0_50px_rgba(225,29,72,0.6)] flex items-center justify-center preserve-3d"
            >
              <div className="absolute -inset-2 rounded-3xl border border-red-500/50 animate-ping opacity-30" />
              <div className="w-full h-full rounded-[22px] bg-[#0b0f17] flex items-center justify-center p-3.5 shadow-inner">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/90/National_emblem_of_Indonesia_Garuda_Pancasila.svg"
                  alt="Garuda Emblem 3D"
                  className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]"
                />
              </div>
            </motion.div>

            {/* Title & Subtitle Entrance */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-2"
            >
              <div className="inline-flex items-center space-x-2 text-red-400 text-xs font-black bg-red-950/80 border border-red-800/80 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-red-600/30">
                <Flame size={15} className="animate-bounce text-amber-400" />
                <span>HUT REPUBLIK INDONESIA KE-81</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-none pt-1">
                GARDA MUDA <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-400 bg-clip-text text-transparent">RT 06</span>
              </h1>

              <p className="text-xs text-amber-400 font-bold tracking-widest uppercase">RW 01 DESA WUNGU</p>
            </motion.div>

            {/* High-Tech Loader Bar */}
            <div className="w-full space-y-2">
              <div className="w-full h-2 bg-slate-900 border border-slate-800 rounded-full overflow-hidden p-0.5 shadow-inner">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-400 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.8)]"
                />
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase animate-pulse">
                INITIALIZING PORTAL KEMERDEKAAN 3D...
              </p>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
