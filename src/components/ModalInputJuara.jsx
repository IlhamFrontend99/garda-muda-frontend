import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Sparkles, Check, RefreshCw, Trophy, UserCheck } from 'lucide-react';

export default function ModalInputJuara({ lomba, pendaftars = [], onClose, onSubmit, isDarkMode }) {
  const [juara1, setJuara1] = useState(lomba?.juara_1 || '');
  const [juara2, setJuara2] = useState(lomba?.juara_2 || '');
  const [juara3, setJuara3] = useState(lomba?.juara_3 || '');
  const [status, setStatus] = useState(lomba?.status || 'Selesai');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter peserta khusus lomba ini
  const pesertaLomba = (Array.isArray(pendaftars) ? pendaftars : []).filter(
    (p) => String(p.lomba_id) === String(lomba?.id)
  );

  // Filter peserta yang sudah hadir
  const pesertaHadir = pesertaLomba.filter((p) => p.status_kehadiran === 'Hadir');

  // FITUR KEREN: AUTO PICK JUARA ACAK DARI PESERTA HADIR
  const handleAutoPick = () => {
    const listToPick = pesertaHadir.length > 0 ? pesertaHadir : pesertaLomba;
    if (listToPick.length === 0) {
      alert('Belum ada peserta terdaftar pada perlombaan ini untuk diacak!');
      return;
    }

    const shuffled = [...listToPick].sort(() => 0.5 - Math.random());
    if (shuffled[0]) setJuara1(shuffled[0].nama_peserta);
    if (shuffled[1]) setJuara2(shuffled[1].nama_peserta);
    if (shuffled[2]) setJuara3(shuffled[2].nama_peserta);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(lomba.id, {
      juara_1: juara1,
      juara_2: juara2,
      juara_3: juara3,
      status: status,
    });
    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border ${
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

          <div className="mb-5 flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-500 border border-amber-500/30">
              <Award size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight">Input Hasil Juara Lomba</h3>
              <p className="text-xs text-amber-500 font-bold">{lomba?.nama}</p>
            </div>
          </div>

          {/* TOMBOL AUTO PICK KEREN */}
          <div className="mb-5 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3">
            <div className="text-left">
              <p className="text-xs font-bold text-amber-500 flex items-center space-x-1">
                <Sparkles size={14} />
                <span>Fitur Pengacakan Otomatis</span>
              </p>
              <p className="text-[10px] text-slate-400">Pilih pemenang otomatis dari daftar peserta hadir</p>
            </div>
            <button
              type="button"
              onClick={handleAutoPick}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl shadow transition shrink-0 flex items-center space-x-1"
            >
              <RefreshCw size={13} />
              <span>⚡ Auto Pick Juara</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* JUARA 1 */}
            <div>
              <label className="text-xs font-bold block mb-1 text-amber-500 flex items-center justify-between">
                <span>🥇 Pemenang Juara 1</span>
                <span className="text-[10px] text-slate-400 font-normal">Pilih dari list / Ketik manual</span>
              </label>
              <div className="space-y-1.5">
                <select
                  onChange={(e) => e.target.value && setJuara1(e.target.value)}
                  className={`w-full border rounded-xl px-3 py-2 text-xs font-bold outline-none ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-amber-400' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="">-- Pilih dari Pendaftar Lomba --</option>
                  {pesertaLomba.map((p) => (
                    <option key={p.id} value={p.nama_peserta}>
                      {p.nama_peserta} ({p.rt} - {p.status_kehadiran})
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={juara1}
                  onChange={(e) => setJuara1(e.target.value)}
                  placeholder="Atau ketik nama pemenang manual..."
                  className={`w-full border rounded-xl px-3.5 py-2 text-xs outline-none ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* JUARA 2 */}
            <div>
              <label className="text-xs font-bold block mb-1 text-slate-400 flex items-center justify-between">
                <span>🥈 Pemenang Juara 2</span>
                <span className="text-[10px] text-slate-400 font-normal">Pilih dari list / Ketik manual</span>
              </label>
              <div className="space-y-1.5">
                <select
                  onChange={(e) => e.target.value && setJuara2(e.target.value)}
                  className={`w-full border rounded-xl px-3 py-2 text-xs font-bold outline-none ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="">-- Pilih dari Pendaftar Lomba --</option>
                  {pesertaLomba.map((p) => (
                    <option key={p.id} value={p.nama_peserta}>
                      {p.nama_peserta} ({p.rt} - {p.status_kehadiran})
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={juara2}
                  onChange={(e) => setJuara2(e.target.value)}
                  placeholder="Atau ketik nama pemenang manual..."
                  className={`w-full border rounded-xl px-3.5 py-2 text-xs outline-none ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* JUARA 3 */}
            <div>
              <label className="text-xs font-bold block mb-1 text-amber-700 flex items-center justify-between">
                <span>🥉 Pemenang Juara 3</span>
                <span className="text-[10px] text-slate-400 font-normal">Pilih dari list / Ketik manual</span>
              </label>
              <div className="space-y-1.5">
                <select
                  onChange={(e) => e.target.value && setJuara3(e.target.value)}
                  className={`w-full border rounded-xl px-3 py-2 text-xs font-bold outline-none ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-amber-600' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="">-- Pilih dari Pendaftar Lomba --</option>
                  {pesertaLomba.map((p) => (
                    <option key={p.id} value={p.nama_peserta}>
                      {p.nama_peserta} ({p.rt} - {p.status_kehadiran})
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={juara3}
                  onChange={(e) => setJuara3(e.target.value)}
                  placeholder="Atau ketik nama pemenang manual..."
                  className={`w-full border rounded-xl px-3.5 py-2 text-xs outline-none ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* STATUS LOMBA */}
            <div>
              <label className="text-xs font-bold block mb-1">Status Perlombaan</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={`w-full border rounded-xl px-3 py-2 text-xs font-bold outline-none ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <option value="Selesai">🏆 Selesai (Tampilkan Pemenang)</option>
                <option value="Aktif">⚡ Aktif (Sedang Berjalan)</option>
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold py-3.5 rounded-2xl text-xs shadow-lg transition flex items-center justify-center space-x-2 mt-2"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Check size={16} />
                  <span>Simpan Hasil Juara</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
