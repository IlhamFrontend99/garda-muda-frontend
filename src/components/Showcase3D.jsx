import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Video, Image, Layers, Trophy } from 'lucide-react';

export default function Showcase3D({ title, subtitle, cards = [], isDarkMode }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextCard = () => {
    if (cards.length > 0) setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    if (cards.length > 0) setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const isVideo = (url) => {
    if (!url) return false;
    return url.match(/\.(mp4|webm|ogg)$/i) || (url.includes('/uploads/') && (url.endsWith('.mp4') || url.endsWith('.webm')));
  };

  const sectionTitle = title ?? 'Keseruan & Gelora Kemerdekaan';
  const sectionSubtitle = subtitle ?? 'Visualisasi dan dokumentasi momen terbaik dari perlombaan Garda Muda';

  return (
    <div className={`my-16 py-12 rounded-3xl border relative overflow-hidden backdrop-blur-xl transition-colors ${
      isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xl'
    }`}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-8">
        
        {(sectionTitle || sectionSubtitle) && (
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-red-600/15 border border-red-500/30 text-red-500 px-3.5 py-1 rounded-full text-xs font-bold">
              <Sparkles size={14} className="animate-spin" />
              <span>3D SHOWCASE & GALERI MULTIMEDIA</span>
            </div>
            {sectionTitle && (
              <h3 className={`text-2xl sm:text-4xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {sectionTitle}
              </h3>
            )}
            {sectionSubtitle && (
              <p className={`text-xs sm:text-sm max-w-xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {sectionSubtitle}
              </p>
            )}
          </div>
        )}

        {cards.length === 0 ? (
          <div className={`p-8 rounded-3xl border border-dashed text-center max-w-xs mx-auto space-y-2 ${
            isDarkMode ? 'bg-slate-950/40 border-slate-800 text-slate-500' : 'bg-slate-50 border-slate-300 text-slate-400'
          }`}>
            <Layers size={32} className="mx-auto text-amber-500 opacity-60" />
            <p className="font-bold text-xs uppercase tracking-wider">3D Showcase Masih Kosong</p>
          </div>
        ) : (
          <>
            <div className="relative h-[360px] sm:h-[420px] flex items-center justify-center perspective-[1200px]">
              <AnimatePresence mode="popLayout">
                {cards.map((card, idx) => {
                  const offset = (idx - activeIndex + cards.length) % cards.length;
                  let position = 'center';
                  if (offset === 1 || offset === -(cards.length - 1)) position = 'right';
                  if (offset === cards.length - 1 || offset === -1) position = 'left';

                  const isCenter = position === 'center';
                  const isLeft = position === 'left';
                  const isRight = position === 'right';

                  if (!isCenter && !isLeft && !isRight) return null;

                  const hasVideo = isVideo(card.image);
                  const badgeLabel = card.tag || (hasVideo ? 'VIDEO MP4' : '3D SHOWCASE');

                  return (
                    <motion.div
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: isCenter ? 1 : 0.55,
                        scale: isCenter ? 1.05 : 0.82,
                        x: isCenter ? 0 : isLeft ? -220 : 220,
                        rotateY: isCenter ? 0 : isLeft ? 25 : -25,
                        z: isCenter ? 100 : -100,
                      }}
                      transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 25 }}
                      className={`absolute w-64 sm:w-80 h-80 sm:h-96 rounded-3xl p-4 cursor-pointer border shadow-2xl flex flex-col justify-between overflow-hidden group ${
                        isCenter
                          ? 'border-red-500/80 bg-slate-900/90 shadow-red-600/30 z-30'
                          : 'border-slate-700/60 bg-slate-950/70 blur-[1px] z-10'
                      }`}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div className="relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden border border-slate-800 bg-black flex items-center justify-center">
                        {hasVideo ? (
                          <video
                            src={card.image}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={card.image || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80'}
                            alt={card.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                        
                        <span className="absolute top-3 left-3 bg-red-600 text-white font-black text-[9px] px-2.5 py-1 rounded-full uppercase tracking-widest shadow flex items-center space-x-1">
                          {badgeLabel.includes('Juara') ? <Trophy size={11} className="mr-1 text-amber-400" /> : hasVideo ? <Video size={10} className="mr-1" /> : <Image size={10} className="mr-1" />}
                          <span>{badgeLabel}</span>
                        </span>
                      </div>

                      <div className="text-left space-y-1 pt-2">
                        <h4 className="font-black text-sm sm:text-base text-white tracking-tight truncate">
                          {card.title || 'Momen Perlombaan'}
                        </h4>
                        <p className="text-xs text-amber-400 font-medium truncate">
                          {card.subtitle || 'Garda Muda RT 06'}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevCard}
                className={`p-3 rounded-2xl border transition shadow-lg ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700' : 'bg-white border-slate-300 text-slate-800'
                }`}
              >
                <ChevronLeft size={20} />
              </motion.button>

              <div className="flex space-x-2">
                {cards.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      activeIndex === i ? 'w-8 bg-red-600' : 'w-2.5 bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextCard}
                className={`p-3 rounded-2xl border transition shadow-lg ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700' : 'bg-white border-slate-300 text-slate-800'
                }`}
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
