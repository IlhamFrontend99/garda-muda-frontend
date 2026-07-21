import React from 'react';
import { motion } from 'framer-motion';
import { Printer, X, FileText } from 'lucide-react';

export default function AbsensiModal({ lomba, pendaftarList, onClose }) {
  if (!lomba) return null;

  const pesertaLomba = pendaftarList.filter(p => p.lomba_id === lomba.id || p.lomba?.id === lomba.id);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-4 sm:p-8 shadow-2xl space-y-6 my-8 text-slate-100"
      >
        {/* Header Action (Diabaikan saat print) */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4 print:hidden">
          <div className="flex items-center space-x-2">
            <FileText className="text-red-500" size={20} />
            <h3 className="font-bold text-sm sm:text-base text-white">Preview Lembar Absensi Peserta</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-lg shadow-red-600/30 transition"
            >
              <Printer size={14} />
              <span>Cetak / Download PDF</span>
            </button>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* DOKUMEN CETAK FORMAL (Kop, Tabel, TTD) */}
        <div className="bg-white text-slate-900 p-6 sm:p-10 rounded-2xl print:p-0 print:bg-transparent print:text-black space-y-6 font-sans">
          
          {/* Kop Surat */}
          <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-wider">PANITIA PERLOMBAAN KEMERDEKAAN RI KE-81</h2>
            <h3 className="text-base sm:text-lg font-bold text-red-600">KARANG TARUNA GARDA MUDA RT 06 / RW 02</h3>
            <p className="text-[11px] text-slate-600">Sekretariat: Balai Warga RT 06, Madiun | Kontak Panitia: 0812-3456-7890</p>
          </div>

          {/* Informasi Lomba */}
          <div className="text-xs space-y-1 bg-slate-100 print:bg-slate-50 p-3 rounded-lg border border-slate-300">
            <div className="flex justify-between">
              <span><strong>Nama Perlombaan:</strong> {lomba.nama}</span>
              <span><strong>Kategori:</strong> {lomba.kategori}</span>
            </div>
            <div className="flex justify-between">
              <span><strong>Tanggal Pelaksanaan:</strong> {lomba.tanggal}</span>
              <span><strong>Lokasi:</strong> {lomba.lokasi}</span>
            </div>
          </div>

          {/* Tabel Presensi */}
          <div>
            <h4 className="text-xs font-bold uppercase mb-2">Daftar Hadir Peserta ({pesertaLomba.length} Terdaftar):</h4>
            <table className="w-full text-xs text-left border-collapse border border-slate-400">
              <thead>
                <tr className="bg-slate-200 print:bg-slate-300 text-slate-900">
                  <th className="border border-slate-400 px-3 py-2 text-center w-8">No</th>
                  <th className="border border-slate-400 px-3 py-2">Nama Peserta / Tim</th>
                  <th className="border border-slate-400 px-3 py-2">No. WhatsApp</th>
                  <th className="border border-slate-400 px-3 py-2 text-center">RT/RW</th>
                  <th className="border border-slate-400 px-3 py-2 text-center w-32">Tanda Tangan</th>
                </tr>
              </thead>
              <tbody>
                {pesertaLomba.map((item, idx) => (
                  <tr key={item.id || idx} className="border-b border-slate-300">
                    <td className="border border-slate-400 px-3 py-2 text-center">{idx + 1}</td>
                    <td className="border border-slate-400 px-3 py-2 font-semibold">{item.nama_peserta}</td>
                    <td className="border border-slate-400 px-3 py-2">{item.no_hp}</td>
                    <td className="border border-slate-400 px-3 py-2 text-center">{item.rt}</td>
                    <td className="border border-slate-400 px-3 py-2 text-left text-[10px] text-slate-400">
                      {idx % 2 === 0 ? `${idx + 1}. .........` : `\u00A0\u00A0\u00A0\u00A0${idx + 1}. .........`}
                    </td>
                  </tr>
                ))}
                {pesertaLomba.length === 0 && (
                  <tr>
                    <td colSpan="5" className="border border-slate-400 px-3 py-6 text-center text-slate-500">
                      Belum ada peserta yang mendaftar pada lomba ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Kolom Tanda Tangan Formal */}
          <div className="pt-8 flex justify-between text-xs text-center">
            <div className="space-y-12">
              <p>Mengetahui,<br /><strong>Ketua RT 06</strong></p>
              <p className="font-bold underline pt-4">( .................................... )</p>
            </div>
            <div className="space-y-12">
              <p>Madiun, {lomba.tanggal}<br /><strong>Koordinator Lomba</strong></p>
              <p className="font-bold underline pt-4">( .................................... )</p>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
