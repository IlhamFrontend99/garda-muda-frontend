import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomSelect({ options, value, onChange, placeholder = "Pilih...", icon: Icon, isDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full select-none" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-semibold border transition duration-200 ${
          isDarkMode
            ? 'bg-slate-900/90 border-slate-700/80 text-white hover:border-red-500/60'
            : 'bg-white border-slate-300 text-slate-800 hover:border-red-500 shadow-sm'
        }`}
      >
        <div className="flex items-center space-x-2 truncate">
          {Icon && <Icon size={15} className="text-red-500 shrink-0" />}
          <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        </div>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-red-500' : ''}`}
        />
      </button>

      {/* Floating Dropdown List */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 left-0 right-0 max-h-56 overflow-y-auto rounded-2xl border shadow-2xl p-1.5 backdrop-blur-xl ${
              isDarkMode
                ? 'bg-[#0f172a]/95 border-slate-700 text-slate-200 shadow-red-950/20'
                : 'bg-white/95 border-slate-200 text-slate-800 shadow-slate-300'
            }`}
          >
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <div
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition ${
                    isSelected
                      ? isDarkMode
                        ? 'bg-red-600/20 text-red-400 font-bold'
                        : 'bg-red-50 text-red-600 font-bold'
                      : isDarkMode
                      ? 'hover:bg-slate-800/80 hover:text-white'
                      : 'hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check size={14} className="text-red-500" />}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
