import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, setToast }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="text-emerald-400" size={20} />,
    error: <XCircle className="text-red-400" size={20} />,
    warning: <AlertTriangle className="text-amber-400" size={20} />,
    info: <Info className="text-blue-400" size={20} />
  };

  const borders = {
    success: 'border-emerald-500/40 bg-emerald-950/80',
    error: 'border-red-500/40 bg-red-950/80',
    warning: 'border-amber-500/40 bg-amber-950/80',
    info: 'border-blue-500/40 bg-blue-950/80'
  };

  return (
    <AnimatePresence>
      <div className="fixed top-5 right-5 left-5 md:left-auto md:max-w-sm z-50 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className={`pointer-events-auto p-4 rounded-2xl border shadow-2xl backdrop-blur-xl flex items-start space-x-3 text-white ${borders[toast.type || 'info']}`}
        >
          <div className="mt-0.5">{icons[toast.type || 'info']}</div>
          <div className="flex-1 pr-2">
            <h5 className="font-bold text-xs uppercase tracking-wider text-slate-200">{toast.title || 'Pemberitahuan'}</h5>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
          </div>
          <button onClick={() => setToast(null)} className="text-slate-400 hover:text-white p-1">
            <X size={14} />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
