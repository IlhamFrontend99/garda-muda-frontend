import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Edit3 } from 'lucide-react';
import CustomSelect from './CustomSelect';

export default function ModalEditLomba({ lomba, onClose, onSubmit, isDarkMode }) {
  const [formData, setFormData] = useState({
    nama: lomba?.nama || '',
    kategori: lomba?.kategori || 'Umum',
    tipe_peserta: lomba?.tipe_peserta || 'Individu',
    kuota: lomba?.kuota || 15,
    tanggal: lomba?.tanggal || '2026-08-17',
    lokasi: lomba?.lokasi || 'Lapangan Utama RT 06',
    deskripsi: lomba?.deskripsi || '',
    status: lomba?.status || 'Aktif',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const kategoriOptions = [
    { value: 'Anak-Anak', label: 'Anak-Anak' },
    { value: 'Remaja', label: 'Remaja' },
    { value: 'Dewasa', label: 'Dewasa' },
    { value: 'Umum', label: 'Umum' },
  ];

  const tipePesertaOptions = [
    { value: 'Individu', label: 'Individu (Perorangan)' },
    { value: 'Tim', label: 'Tim / Kelompok' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(lomba.id, formData);
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

          <div className="mb-6 flex items-center space-x-2">
            <div className="p-2.5 rounded-2xl bg-blue-600/15 border border-blue-500/30 text-blue-500">
              <Edit3 size={20} />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight">Edit Perlombaan</h3>
              <p className="text-xs text-slate-400">Perbarui detail data perlombaan</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold block mb-1">Nama Lomba</label>
              <input
                type="text"
                required
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                className={`w-full border rounded-2xl px-4 py-2.5 text-xs outline-none ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold block mb-1">Kategori Usia</label>
                <CustomSelect
                  options={kategoriOptions}
                  value={formData.kategori}
                  onChange={(val) => setFormData({ ...formData, kategori: val })}
                  isDarkMode={isDarkMode}
                />
              </div>
              <div>
                <label className="text-xs font-bold block mb-1">Tipe Peserta</label>
                <CustomSelect
                  options={tipePesertaOptions}
                  value={formData.tipe_peserta}
                  onChange={(val) => setFormData({ ...formData, tipe_peserta: val })}
                  isDarkMode={isDarkMode}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold block mb-1">Kuota Total</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.kuota}
                  onChange={(e) => setFormData({ ...formData, kuota: e.target.value })}
                  className={`w-full border rounded-2xl px-4 py-2.5 text-xs outline-none ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
              <div>
                <label className="text-xs font-bold block mb-1">Tanggal</label>
                <input
                  type="date"
                  required
                  value={formData.tanggal}
                  onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                  className={`w-full border rounded-2xl px-3 py-2 text-xs outline-none ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold block mb-1">Lokasi Lomba</label>
              <input
                type="text"
                required
                value={formData.lokasi}
                onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                className={`w-full border rounded-2xl px-4 py-2.5 text-xs outline-none ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="text-xs font-bold block mb-1">Deskripsi</label>
              <textarea
                rows="3"
                value={formData.deskripsi}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                className={`w-full border rounded-2xl p-3 text-xs outline-none resize-none ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-2xl text-xs shadow-lg transition flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={16} />
                  <span>Simpan Perubahan</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
