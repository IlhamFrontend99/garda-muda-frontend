import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, CheckCircle2, QrCode } from 'lucide-react';

export default function TiketModal({ pendaftar, onClose, isDarkMode }) {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!pendaftar) return null;

  const { nama_peserta, no_hp, rt, kode_tiket, lomba } = pendaftar;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${kode_tiket || 'GM81-TEST'}&color=220-38-38`;

  // HANDLER UTAMA DOWNLOAD LANGSUNG FORMAT PNG (TANPA POPUP PRINT)
  const handleDownloadPNG = () => {
    setIsDownloading(true);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 650;
    canvas.height = 860;

    // 1. Background Kartu Tiket
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border Putus-Putus Merah
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 5;
    ctx.setLineDash([12, 8]);
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    ctx.setLineDash([]);

    // 2. Header Banner Merah Kemerdekaan
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(35, 35, canvas.width - 70, 95);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('GARDA MUDA RT 06 / RW 01', canvas.width / 2, 75);

    ctx.font = 'bold 13px Arial, sans-serif';
    ctx.fillText('DESA WUNGU — PASS REGISTRASI LOMBA HUT RI KE-81', canvas.width / 2, 103);

    // 3. Detail Peserta
    ctx.textAlign = 'left';
    let startY = 175;
    const lineGap = 36;

    ctx.font = 'bold 14px Arial, sans-serif';
    ctx.fillStyle = '#dc2626';
    ctx.fillText('NAMA PESERTA / TIM:', 55, startY);
    ctx.fillStyle = '#0f172a';
    ctx.font = '16px Arial, sans-serif';
    ctx.fillText(nama_peserta || '-', 250, startY);

    startY += lineGap;
    ctx.font = 'bold 14px Arial, sans-serif';
    ctx.fillStyle = '#dc2626';
    ctx.fillText('LOMBA DIIKUTI:', 55, startY);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 16px Arial, sans-serif';
    ctx.fillText(lomba?.nama || 'Perlombaan 17 Agustus', 250, startY);

    startY += lineGap;
    ctx.font = 'bold 14px Arial, sans-serif';
    ctx.fillStyle = '#dc2626';
    ctx.fillText('DOMISILI RT / RW:', 55, startY);
    ctx.fillStyle = '#0f172a';
    ctx.font = '16px Arial, sans-serif';
    ctx.fillText(rt || 'RT 06 / RW 01', 250, startY);

    startY += lineGap;
    ctx.font = 'bold 14px Arial, sans-serif';
    ctx.fillStyle = '#dc2626';
    ctx.fillText('NO. WHATSAPP:', 55, startY);
    ctx.fillStyle = '#0f172a';
    ctx.font = '16px Arial, sans-serif';
    ctx.fillText(no_hp || '-', 250, startY);

    startY += lineGap;
    ctx.font = 'bold 14px Arial, sans-serif';
    ctx.fillStyle = '#dc2626';
    ctx.fillText('WAKTU & LOKASI:', 55, startY);
    ctx.fillStyle = '#0f172a';
    ctx.font = '16px Arial, sans-serif';
    ctx.fillText(`${lomba?.tanggal || '17 Agustus 2026'} (${lomba?.lokasi || 'RT 06'})`, 250, startY);

    // Garis Pemisah
    startY += 25;
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(55, startY);
    ctx.lineTo(canvas.width - 55, startY);
    ctx.stroke();

    // 4. Render Gambar QR Code
    const qrImage = new Image();
    qrImage.crossOrigin = 'Anonymous';
    qrImage.src = qrUrl;

    qrImage.onload = () => {
      const qrSize = 220;
      const qrX = (canvas.width - qrSize) / 2;
      const qrY = startY + 25;

      // Box Latar QR Code
      ctx.fillStyle = '#fef2f2';
      ctx.fillRect(qrX - 15, qrY - 15, qrSize + 30, qrSize + 70);
      ctx.strokeStyle = '#fca5a5';
      ctx.lineWidth = 2;
      ctx.strokeRect(qrX - 15, qrY - 15, qrSize + 30, qrSize + 70);

      // Draw QR Image
      ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);

      // Teks Kode Tiket
      ctx.textAlign = 'center';
      ctx.font = 'bold 22px monospace';
      ctx.fillStyle = '#dc2626';
      ctx.fillText(kode_tiket || 'GM81-XXXX', canvas.width / 2, qrY + qrSize + 40);

      // Catatan Kaki Tiket
      ctx.font = 'italic 12px Arial, sans-serif';
      ctx.fillStyle = '#64748b';
      ctx.fillText('*Tunjukkan gambar tiket ini kepada Panitia saat registrasi ulang hari-H.', canvas.width / 2, canvas.height - 45);

      // Automatic Trigger Download PNG
      const imageURI = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `Tiket_${nama_peserta.replace(/\s+/g, '_')}_${kode_tiket || 'GM81'}.png`;
      link.href = imageURI;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsDownloading(false);
    };

    qrImage.onerror = () => {
      alert('Gagal memuat QR Code gambar. Silakan coba lagi.');
      setIsDownloading(false);
    };
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className={`relative w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border transition-colors ${
            isDarkMode ? 'bg-[#0f172a] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Accent Line Red Top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-amber-400 rounded-b-full shadow-[0_0_15px_rgba(225,29,72,0.8)]" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-5 right-5 p-2 rounded-full transition ${
              isDarkMode ? 'text-slate-400 hover:text-white bg-slate-800' : 'text-slate-500 hover:text-slate-900 bg-slate-100'
            }`}
          >
            <X size={18} />
          </button>

          {/* Header Pop-up */}
          <div className="text-center space-y-2 mb-5">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 flex items-center justify-center shadow-inner">
              <CheckCircle2 size={26} />
            </div>
            <h3 className="text-xl font-black tracking-tight">Pendaftaran Berhasil!</h3>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Klik tombol di bawah untuk langsung menyimpan gambar Tiket (PNG)
            </p>
          </div>

          {/* Ticket Card Preview */}
          <div className={`p-5 rounded-2xl border-2 border-dashed space-y-4 ${
            isDarkMode ? 'bg-slate-900/90 border-red-500/50' : 'bg-red-50/50 border-red-300'
          }`}>
            <div className="flex justify-between items-start border-b pb-3 border-slate-700/40">
              <div>
                <span className="text-[10px] font-bold uppercase text-red-500 tracking-wider">Pass Kemerdekaan RT 06 / RW 01</span>
                <h4 className="text-base font-bold leading-snug">{lomba?.nama}</h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Kode Tiket</span>
                <span className="font-mono text-xs font-black text-red-500">{kode_tiket}</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>Peserta:</span>
                <span className="font-bold">{nama_peserta}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>Domisili / HP:</span>
                <span className="font-medium">{rt} ({no_hp})</span>
              </div>
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>Waktu & Tempat:</span>
                <span className="font-medium">{lomba?.tanggal} ({lomba?.lokasi})</span>
              </div>
            </div>

            {/* QR Code Container */}
            <div className="pt-2 flex flex-col items-center justify-center bg-white p-3 rounded-xl shadow-inner">
              <img src={qrUrl} alt="QR Code Tiket" className="w-32 h-32" />
              <span className="font-mono text-xs font-bold text-slate-800 tracking-widest mt-1">{kode_tiket}</span>
            </div>
          </div>

          <p className="text-[10px] text-center text-slate-400 mt-3">
            💡 File gambar PNG dapat Anda tunjukkan langsung kepada Panitia untuk scan QR check-in saat hari-H.
          </p>

          {/* Single Simple PNG Download Button */}
          <div className="pt-4 flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadPNG}
              disabled={isDownloading}
              className="flex-1 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-bold py-3.5 px-4 rounded-2xl text-xs shadow-lg shadow-red-600/30 flex items-center justify-center space-x-2"
            >
              {isDownloading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Download size={16} />
                  <span>Download Tiket (PNG)</span>
                </>
              )}
            </motion.button>

            <button
              onClick={onClose}
              className={`px-4 py-3.5 rounded-2xl text-xs font-bold border transition ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'
              }`}
            >
              Tutup
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
