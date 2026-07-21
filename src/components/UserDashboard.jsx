import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Radio, Calendar, MapPin, UserPlus, Trophy, Clock, X } from 'lucide-react';

export default function UserDashboard({
  lombaList, loading, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory,
  setSelectedLombaForReg, selectedLombaForReg, handleRegister, formDaftar, setFormDaftar
}) {
  const categories = ['Semua', 'Anak-Anak', 'Remaja', 'Dewasa', 'Umum'];

  const filteredLomba = lombaList.filter(l => {
    const matchesSearch = l.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || l.kategori === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Controls Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          <Filter size={16} className="text-red-500 hidden sm:block mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            placeholder="Cari nama atau deskripsi lomba..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition shadow-inner"
          />
        </div>
      </div>

      {/* Grid Lomba Cards */}
      {loading ? (
        <div className="text-center py-20 space-y-4">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400 font-medium">Memuat data perlombaan dari server...</p>
        </div>
      ) : filteredLomba.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-4">
          <Trophy size={48} className="mx-auto text-slate-700" />
          <div className="space-y-1">
            <h4 className="text-base font-bold text-slate-300">Belum ada perlombaan yang ditemukan</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Panitia Garda Muda RT 06 sedang menyiapkan daftar lomba baru. Silakan cek kembali nanti!
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLomba.map((lomba) => {
            const sisa = lomba.kuota - lomba.terdaftar;
            const isFull = sisa <= 0;
            const progressPercent = Math.min(100, Math.round((lomba.terdaftar / lomba.kuota) * 100));

            return (
              <motion.div
                key={lomba.id}
                whileHover={{ y: -6 }}
                className="bg-gradient-to-b from-slate-900/90 to-slate-900/40 rounded-3xl border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-950/30 transition-all duration-300 group"
              >
                <div className="p-6 space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-extrabold px-3 py-1 rounded-xl uppercase tracking-wider">
                      {lomba.kategori}
                    </span>
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-xl border flex items-center space-x-1 ${
                      isFull ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    }`}>
                      <Radio size={10} className="animate-ping mr-1" />
                      <span>{isFull ? 'Kuota Penuh' : `Sisa ${sisa} Tempat`}</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white group-hover:text-red-400 transition-colors duration-200 mb-2">
                      {lomba.nama}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 font-normal">
                      {lomba.deskripsi}
                    </p>
                  </div>

                  <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
                    <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                      <span>Pendaftar: <strong className="text-white">{lomba.terdaftar}</strong></span>
                      <span>Target: <strong className="text-slate-300">{lomba.kuota}</strong></span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${isFull ? 'bg-red-500' : 'bg-gradient-to-r from-red-600 via-rose-500 to-amber-400'}`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 space-y-2 text-xs text-slate-400 border-t border-slate-800/60">
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} className="text-red-500" />
                      <span>{lomba.tanggal}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={14} className="text-red-500" />
                      <span>{lomba.lokasi}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950/80 border-t border-slate-800/80">
                  <button
                    disabled={isFull}
                    onClick={() => setSelectedLombaForReg(lomba)}
                    className={`w-full py-3 rounded-2xl font-bold text-xs transition flex items-center justify-center space-x-2 ${
                      isFull
                        ? 'bg-slate-800/80 text-slate-500 cursor-not-allowed border border-slate-700/50'
                        : 'bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/25'
                    }`}
                  >
                    <UserPlus size={16} />
                    <span>{isFull ? 'Pendaftaran Ditutup' : 'Daftar Sekarang'}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Modal Form Pendaftaran */}
      <AnimatePresence>
        {selectedLombaForReg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5 relative"
            >
              <button
                onClick={() => setSelectedLombaForReg(null)}
                className="absolute top-5 right-5 text-slate-500 hover:text-white bg-slate-800 p-1.5 rounded-full transition"
              >
                <X size={16} />
              </button>

              <div className="border-b border-slate-800 pb-4">
                <span className="text-[10px] font-extrabold text-red-500 uppercase tracking-widest">Form Pendaftaran Warga</span>
                <h3 className="font-black text-xl text-white mt-1">{selectedLombaForReg.nama}</h3>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Peserta / Nama Tim</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso / Tim Gang Melati"
                    value={formDaftar.namaPeserta}
                    onChange={e => setFormDaftar({ ...formDaftar, namaPeserta: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nomor WhatsApp (Aktif)</label>
                  <input
                    type="tel"
                    required
                    placeholder="08123456789"
                    value={formDaftar.noHp}
                    onChange={e => setFormDaftar({ ...formDaftar, noHp: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">RT / RW</label>
                  <input
                    type="text"
                    required
                    value={formDaftar.rt}
                    onChange={e => setFormDaftar({ ...formDaftar, rt: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setSelectedLombaForReg(null)}
                    className="px-4 py-2.5 border border-slate-700/80 rounded-2xl text-xs font-semibold text-slate-400 hover:bg-slate-800"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-red-600/30"
                  >
                    Kirim Pendaftaran
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
