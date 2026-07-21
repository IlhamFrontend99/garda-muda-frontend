import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode, CheckCircle2, AlertCircle, Search } from 'lucide-react';

export default function ScanModal({ onClose, onScanSuccess, isDarkMode }) {
  const [kodeInput, setKodeInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [scanError, setScanError] = useState('');

  const handleProcessScan = async (e) => {
    e.preventDefault();
    if (!kodeInput.trim()) return;

    setIsScanning(true);
    setScanError('');
    setScanResult(null);

    const res = await onScanSuccess(kodeInput.trim().toUpperCase());
    setIsScanning(false);

    if (res?.success) {
      setScanResult(res.data);
      setKodeInput('');
    } else {
      setScanError(res?.message || 'Kode Tiket tidak valid atau belum terdaftar!');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className={`relative w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border transition-colors ${
            isDarkMode ? 'bg-[#0f172a] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <button
            onClick={onClose}
            className={`absolute top-5 right-5 p-2 rounded-full transition ${
              isDarkMode ? 'text-slate-400 hover:text-white bg-slate-800' : 'text-slate-500 hover:text-slate-900 bg-slate-100'
            }`}
          >
            <X size={18} />
          </button>

          <div className="text-center space-y-2 mb-6">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-red-600/15 border border-red-500/30 text-red-600 flex items-center justify-center">
              <QrCode size={26} />
            </div>
            <h3 className="text-xl font-black tracking-tight">Scan QR / Check-In Tiket</h3>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Scan Barcode Warga atau Ketik Kode Tiket
            </p>
          </div>

          <form onSubmit={handleProcessScan} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                autoFocus
                required
                value={kodeInput}
                onChange={(e) => setKodeInput(e.target.value)}
                placeholder="Contoh: GM81-A9X2"
                className={`w-full rounded-2xl pl-4 pr-10 py-3 font-mono uppercase text-sm font-bold border outline-none transition ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-700 text-white focus:border-red-500'
                    : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-red-600'
                }`}
              />
              <button
                type="submit"
                disabled={isScanning}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 text-white p-2 rounded-xl"
              >
                <Search size={16} />
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isScanning}
              className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold py-3 rounded-2xl text-xs shadow-lg shadow-red-600/30 flex items-center justify-center space-x-2"
            >
              {isScanning ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Verifikasi Check-In Warga</span>
              )}
            </motion.button>
          </form>

          {/* Feedback Success */}
          {scanResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs space-y-1"
            >
              <div className="font-bold flex items-center space-x-1.5 text-emerald-400">
                <CheckCircle2 size={16} />
                <span>VERIFIKASI HADIR SUKSES!</span>
              </div>
              <p><b>Peserta:</b> {scanResult.nama_peserta}</p>
              <p><b>Lomba:</b> {scanResult.lomba?.nama}</p>
              <p><b>Domisili:</b> {scanResult.rt}</p>
            </motion.div>
          )}

          {/* Feedback Error */}
          {scanError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-2xl bg-red-950/60 border border-red-800/60 text-red-300 text-xs flex items-center space-x-2"
            >
              <AlertCircle size={18} className="text-red-500 shrink-0" />
              <span>{scanError}</span>
            </motion.div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
