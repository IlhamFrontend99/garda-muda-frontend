import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Users, Phone, MapPin, CheckCircle2, Sparkles } from 'lucide-react';
import CustomSelect from './CustomSelect';

export default function ModalPendaftaran({ lomba, onClose, onSubmit, isSubmitting, isDarkMode }) {
  const isTeam = lomba?.tipe_peserta === 'Tim';

  const [formData, setFormData] = useState({
    lomba_id: lomba?.id || '',
    nama_peserta: '',
    no_hp: '',
    rt: 'RT 06 / RW 01',
  });

  const rtOptions = [
    { value: 'RT 06 / RW 01', label: 'RT 06 / RW 01 (Warga Utama)' },
    { value: 'RT 01 / RW 01', label: 'RT 01 / RW 01' },
    { value: 'RT 02 / RW 01', label: 'RT 02 / RW 01' },
    { value: 'RT 03 / RW 01', label: 'RT 03 / RW 01' },
    { value: 'RT 04 / RW 01', label: 'RT 04 / RW 01' },
    { value: 'RT 05 / RW 01', label: 'RT 05 / RW 01' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border transition-colors ${
            isDarkMode
              ? 'bg-[#0f172a] border-slate-800 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Top Red Glow Accent Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 rounded-b-full shadow-[0_0_15px_rgba(225,29,72,0.6)]" />

          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className={`absolute top-5 right-5 p-2 rounded-full transition ${
              isDarkMode ? 'text-slate-400 hover:text-white bg-slate-800/80' : 'text-slate-500 hover:text-slate-900 bg-slate-100'
            }`}
          >
            <X size={18} />
          </motion.button>

          {/* Header Info */}
          <div className="mb-6 space-y-2">
            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold ${
              isDarkMode ? 'bg-red-950/60 border border-red-800/50 text-red-400' : 'bg-red-50 border border-red-200 text-red-600'
            }`}>
              <Sparkles size={13} className="text-amber-500" />
              <span>Formulir Pendaftaran Warga</span>
            </div>
            
            <h3 className="text-2xl font-black tracking-tight">
              {lomba?.nama}
            </h3>

            {/* Badge Indicator Individu / Tim */}
            <div className="flex items-center space-x-2 text-xs">
              <span className={`px-2.5 py-0.5 rounded-full font-bold flex items-center space-x-1 border ${
                isDarkMode 
                  ? 'bg-slate-800 text-slate-200 border-slate-700' 
                  : 'bg-slate-100 text-slate-700 border-slate-300'
              }`}>
                {isTeam ? <Users size={13} className="mr-1 text-red-500" /> : <User size={13} className="mr-1 text-red-500" />}
                <span>{isTeam ? 'Kategori Tim / Kelompok' : 'Kategori Perorangan'}</span>
              </span>
              <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>• Lokasi: {lomba?.lokasi}</span>
            </div>
          </div>

          {/* Form Inputs */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Field Nama */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold flex items-center justify-between">
                <span>{isTeam ? 'Nama Tim / Nama Ketua & Anggota' : 'Nama Lengkap Peserta'}</span>
                <span className="text-red-500 text-[10px]">*Wajib</span>
              </label>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  {isTeam ? <Users size={16} /> : <User size={16} />}
                </div>
                <input
                  type="text"
                  required
                  value={formData.nama_peserta}
                  onChange={(e) => setFormData({ ...formData, nama_peserta: e.target.value })}
                  placeholder={isTeam ? 'Contoh: Tim Garda 06 (Ketua: Budi)' : 'Contoh: Ahmad Subagyo'}
                  className={`w-full rounded-2xl pl-10 pr-4 py-3 text-xs outline-none transition border ${
                    isDarkMode
                      ? 'bg-slate-900/90 border-slate-700/80 focus:border-red-500 text-slate-100 placeholder:text-slate-500'
                      : 'bg-slate-50 border-slate-300 focus:border-red-600 text-slate-900 placeholder:text-slate-400'
                  }`}
                />
              </div>
            </div>

            {/* Field WhatsApp */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold flex items-center justify-between">
                <span>Nomor WhatsApp (Aktif)</span>
                <span className="text-red-500 text-[10px]">*Wajib</span>
              </label>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone size={16} />
                </div>
                <input
                  type="text"
                  required
                  value={formData.no_hp}
                  onChange={(e) => setFormData({ ...formData, no_hp: e.target.value })}
                  placeholder="Contoh: 081234567890"
                  className={`w-full rounded-2xl pl-10 pr-4 py-3 text-xs outline-none transition border ${
                    isDarkMode
                      ? 'bg-slate-900/90 border-slate-700/80 focus:border-red-500 text-slate-100 placeholder:text-slate-500'
                      : 'bg-slate-50 border-slate-300 focus:border-red-600 text-slate-900 placeholder:text-slate-400'
                  }`}
                />
              </div>
            </div>

            {/* Field Custom Dropdown RT / RW */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold">Domisili RT / RW</label>
              <CustomSelect
                options={rtOptions}
                value={formData.rt}
                onChange={(val) => setFormData({ ...formData, rt: val })}
                icon={MapPin}
                isDarkMode={isDarkMode}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 text-xs"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 size={17} />
                    <span>Konfirmasi & Daftar Lomba</span>
                  </>
                )}
              </motion.button>
            </div>

          </form>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
