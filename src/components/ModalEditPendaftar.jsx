import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, UserCheck } from 'lucide-react';
import CustomSelect from './CustomSelect';

export default function ModalEditPendaftar({ pendaftar, onClose, onSubmit, isDarkMode }) {
  const [formData, setFormData] = useState({
    nama_peserta: pendaftar?.nama_peserta || '',
    no_hp: pendaftar?.no_hp || '',
    rt: pendaftar?.rt || 'RT 06 / RW 01',
    status_kehadiran: pendaftar?.status_kehadiran || 'Belum Hadir',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const rtOptions = [
    { value: 'RT 06 / RW 01', label: 'RT 06 / RW 01 (Warga Utama)' },
    { value: 'RT 01 / RW 01', label: 'RT 01 / RW 01' },
    { value: 'RT 02 / RW 01', label: 'RT 02 / RW 01' },
    { value: 'RT 03 / RW 01', label: 'RT 03 / RW 01' },
    { value: 'RT 04 / RW 01', label: 'RT 04 / RW 01' },
    { value: 'RT 05 / RW 01', label: 'RT 05 / RW 01' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(pendaftar.id, formData);
    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className={`relative w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border ${
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
              <UserCheck size={20} />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight">Edit Data Peserta</h3>
              <p className="text-xs text-slate-400">Ubah informasi pendaftar warga</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold block mb-1">Nama Peserta / Tim</label>
              <input
                type="text"
                required
                value={formData.nama_peserta}
                onChange={(e) => setFormData({ ...formData, nama_peserta: e.target.value })}
                className={`w-full border rounded-2xl px-4 py-2.5 text-xs outline-none ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="text-xs font-bold block mb-1">Nomor WhatsApp</label>
              <input
                type="text"
                required
                value={formData.no_hp}
                onChange={(e) => setFormData({ ...formData, no_hp: e.target.value })}
                className={`w-full border rounded-2xl px-4 py-2.5 text-xs outline-none ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="text-xs font-bold block mb-1">Domisili RT / RW</label>
              <CustomSelect
                options={rtOptions}
                value={formData.rt}
                onChange={(val) => setFormData({ ...formData, rt: val })}
                isDarkMode={isDarkMode}
              />
            </div>

            <div>
              <label className="text-xs font-bold block mb-1">Status Kehadiran Hari-H</label>
              <select
                value={formData.status_kehadiran}
                onChange={(e) => setFormData({ ...formData, status_kehadiran: e.target.value })}
                className={`w-full border rounded-2xl px-3 py-2.5 text-xs outline-none font-bold ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <option value="Belum Hadir">⏳ Belum Hadir</option>
                <option value="Hadir">✅ Hadir (Terverifikasi)</option>
              </select>
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
