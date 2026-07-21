import { API_BASE_URL } from '../config/api';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Users, Sparkles, Check, RefreshCw, BarChart3, Layers, FileText, Award, QrCode, Filter, Edit, Trash2, Settings, Upload, Save, Sliders, XCircle, Share2, FolderDown, Key, UserCheck, Image as ImageIcon, Printer } from 'lucide-react';
import axios from 'axios';
import CustomSelect from './CustomSelect';
import ModalInputJuara from './ModalInputJuara';
import ScanModal from './ScanModal';
import ModalEditLomba from './ModalEditLomba';
import ModalEditPendaftar from './ModalEditPendaftar';



export default function AdminDashboard({ 
  lombas = [], 
  pendaftars = [], 
  settings = {},
  onSaveSettings,
  onTambahLomba, 
  onEditLomba,
  onHapusLomba,
  onEditPendaftar,
  onHapusPendaftar,
  onGenerateAi, 
  onUpdateJuara,
  onScanCheckin,
  isGeneratingAi,
  isDarkMode 
}) {
  const safeLombas = Array.isArray(lombas) ? lombas : [];
  const safePendaftars = Array.isArray(pendaftars) ? pendaftars : [];

  const [activeTab, setActiveTab] = useState('lomba');
  const [isUploading, setIsUploading] = useState(false);

  // CMS State
  const [cmsForm, setCmsForm] = useState({
    nama_organisasi: settings?.nama_organisasi || 'GARDA MUDA RT 06',
    rw_desa: settings?.rw_desa || 'RW 01 DESA WUNGU',
    slogan_utama: settings?.slogan_utama || "KOBARKAN SEMANGAT\nPERSATUAN & KEMERDEKAAN!",
    deskripsi_hero: settings?.deskripsi_hero || 'Selamat datang di Portal Resmi Perlombaan 17 Agustus Garda Muda RT 06 / RW 01 Desa Wungu.',
    logo_utama: settings?.logo_utama || 'https://upload.wikimedia.org/wikipedia/commons/9/90/National_emblem_of_Indonesia_Garuda_Pancasila.svg',
    logo_hut: settings?.logo_hut || '/logo-hutri81.png',
    logo_garda: settings?.logo_garda || '',
    showcase_title: settings?.showcase_title ?? 'Keseruan & Gelora Kemerdekaan',
    showcase_subtitle: settings?.showcase_subtitle ?? 'Visualisasi dan dokumentasi momen terbaik dari perlombaan Garda Muda',
    drive_link: settings?.drive_link || '',
    instagram: settings?.instagram || '',
    tiktok: settings?.tiktok || '',
    youtube: settings?.youtube || '',
    whatsapp: settings?.whatsapp || '',
    admin_username: settings?.admin_username || 'admin',
    admin_password: settings?.admin_password || 'admin123',
    showcase_cards: Array.isArray(settings?.showcase_cards) ? settings.showcase_cards : [],
    panitia_group_photo: settings?.panitia_group_photo || '',
    panitia_list: Array.isArray(settings?.panitia_list) ? settings.panitia_list : []
  });

  const [isSavingCms, setIsSavingCms] = useState(false);
  const [newCard, setNewCard] = useState({ title: '', subtitle: '', tag: 'Ã°Å¸Â¥â€¡ Foto Juara', image: '' });
  const [newPanitia, setNewPanitia] = useState({ name: '', role: '', photo: '' });

  const [formData, setFormData] = useState({
    nama: '',
    kategori: 'Umum',
    tipe_peserta: 'Individu',
    kuota: 15,
    tanggal: '2026-08-17',
    lokasi: 'Lapangan Utama RT 06',
    deskripsi: '',
  });

  const [selectedLombaJuara, setSelectedLombaJuara] = useState(null);
  const [selectedLombaEdit, setSelectedLombaEdit] = useState(null);
  const [selectedPendaftarEdit, setSelectedPendaftarEdit] = useState(null);
  const [showScanModal, setShowScanModal] = useState(false);
  const [filterLombaId, setFilterLombaId] = useState('Semua');

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

  const filteredPendaftars = filterLombaId === 'Semua'
    ? safePendaftars
    : safePendaftars.filter(p => String(p.lomba_id) === String(filterLombaId));

  // 1. CETAK ABSENSI KHUSUS PER PERLOMBAAN (DENGAN BARIS KOSONG PESERTA SUSULAN TULIS TANGAN)
  const handleCetakAbsensiPerLomba = (lombaTarget) => {
    const pesertaLomba = safePendaftars.filter(p => String(p.lomba_id) === String(lombaTarget.id));
    const printWindow = window.open('', '_blank');

    let tableRows = pesertaLomba.map((p, i) => `
      <tr>
        <td style="text-align:center;">${i + 1}</td>
        <td style="text-align:center; font-family:monospace; font-weight:bold; color:#dc2626;">${p.kode_tiket || '-'}</td>
        <td><b>${p.nama_peserta}</b></td>
        <td style="text-align:center;">${p.rt || 'RT 06 / RW 01'}</td>
        <td>${p.no_hp || '-'}</td>
        <td style="text-align:center;">
          <span style="font-weight:bold; color:${p.status_kehadiran === 'Hadir' ? '#16a34a' : '#d97706'};">
            ${p.status_kehadiran || 'Belum Hadir'}
          </span>
        </td>
        <td style="text-align:center; font-size:14px;">[ &nbsp; ]</td>
        <td style="text-align:center; font-size:10px; color:#94a3b8;">( ............... )</td>
      </tr>
    `).join('');

    // Tambahkan 3 Baris Kosong Khusus Pendaftaran Manual / Tulis Tangan Lapangan
    for (let extra = 1; extra <= 3; extra++) {
      const idx = pesertaLomba.length + extra;
      tableRows += `
        <tr style="height: 32px;">
          <td style="text-align:center; color:#94a3b8;">${idx}</td>
          <td style="text-align:center; font-family:monospace; color:#cbd5e1;">(Manual)</td>
          <td style="color:#cbd5e1;">............................................................</td>
          <td style="text-align:center; color:#cbd5e1;">RT .....</td>
          <td style="color:#cbd5e1;">........................</td>
          <td style="text-align:center; color:#cbd5e1;">Manual</td>
          <td style="text-align:center; font-size:14px;">[ &nbsp; ]</td>
          <td style="text-align:center; font-size:10px; color:#cbd5e1;">( ............... )</td>
        </tr>
      `;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>LEMBAR ABSENSI - ${lombaTarget.nama.toUpperCase()}</title>
          <style>
            @page { size: A4 portrait; margin: 0; }
            body { font-family: Arial, Helvetica, sans-serif; padding: 15mm; color: #0f172a; line-height: 1.4; }
            .header { text-align: center; border-bottom: 3px double #000; padding-bottom: 8px; margin-bottom: 15px; }
            .header h2 { margin: 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; }
            .header h3 { margin: 2px 0; font-size: 14px; text-transform: uppercase; color: #dc2626; }
            .header p { margin: 2px 0; font-size: 10px; color: #475569; }
            
            .meta-box { background: #f8fafc; border: 1px solid #cbd5e1; padding: 10px 15px; border-radius: 8px; margin-bottom: 15px; font-size: 11px; }
            .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
            
            table { width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 25px; }
            th, td { border: 1px solid #475569; padding: 6px 8px; }
            th { background-color: #f1f5f9; text-transform: uppercase; font-size: 10px; }
            
            .signature-section { margin-top: 35px; display: flex; justify-content: space-between; text-align: center; font-size: 11px; page-break-inside: avoid; }
            .sig-box { width: 30%; }
            .sig-space { height: 60px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>PANITIA KEMERDEKAAN HUT RI KE-81</h2>
            <h3>${cmsForm.nama_organisasi} / ${cmsForm.rw_desa}</h3>
            <p>Portal Resmi Registrasi & Lembar Absensi Pertandingan Lapangan</p>
          </div>

          <div class="meta-box">
            <div class="meta-grid">
              <div><b>Nama Lomba:</b> ${lombaTarget.nama}</div>
              <div><b>Kategori Usia:</b> ${lombaTarget.kategori}</div>
              <div><b>Tipe Peserta:</b> ${lombaTarget.tipe_peserta}</div>
              <div><b>Tanggal Pelaksanaan:</b> ${lombaTarget.tanggal}</div>
              <div><b>Lokasi Pertandingan:</b> ${lombaTarget.lokasi}</div>
              <div><b>Total Pendaftar:</b> ${pesertaLomba.length} / ${lombaTarget.kuota} Peserta</div>
            </div>
          </div>

          <h4 style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; text-align: center;">
            DAFTAR PRESENSI & CHEKLIST PEMANGGILAN PESERTA
          </h4>

          <table>
            <thead>
              <tr>
                <th style="width:25px;">No</th>
                <th style="width:80px;">Kode Tiket</th>
                <th>Nama Peserta / Tim</th>
                <th style="width:75px;">Domisili</th>
                <th style="width:90px;">No. WhatsApp</th>
                <th style="width:80px;">Web Checkin</th>
                <th style="width:50px;">Ceklist</th>
                <th style="width:80px;">Paraf</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>

          <div class="signature-section">
            <div class="sig-box">
              <p>Koordinator Lomba,</p>
              <div class="sig-space"></div>
              <p><b>( .................................... )</b></p>
            </div>
            <div class="sig-box">
              <p>Ketua Panitia Garda Muda,</p>
              <div class="sig-space"></div>
              <p><b>( .................................... )</b></p>
            </div>
            <div class="sig-box">
              <p>Mengetahui,<br/>Ketua RT 06 / RW 01</p>
              <div class="sig-space"></div>
              <p><b>( .................................... )</b></p>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // 2. CETAK REKAP SEMUA LOMBA (OPSI TULIS TANGAN UNTUK PEMENANG YANG BELUM DIPILIH)
  const handleCetakRekapLomba = () => {
    const printWindow = window.open('', '_blank');

    const tableRows = safeLombas.map((l, i) => `
      <tr>
        <td style="text-align:center;">${i + 1}</td>
        <td><b>${l.nama}</b></td>
        <td>${l.kategori}</td>
        <td>${l.tipe_peserta}</td>
        <td style="text-align:center;">${l.terdaftar} / ${l.kuota}</td>
        <td style="text-align:center;"><b>${l.status || 'Aktif'}</b></td>
        <td style="min-width:110px;">${l.juara_1 ? '<b>' + l.juara_1 + '</b>' : '<span style="color:#cbd5e1;">........................................</span>'}</td>
        <td style="min-width:110px;">${l.juara_2 ? '<b>' + l.juara_2 + '</b>' : '<span style="color:#cbd5e1;">........................................</span>'}</td>
        <td style="min-width:110px;">${l.juara_3 ? '<b>' + l.juara_3 + '</b>' : '<span style="color:#cbd5e1;">........................................</span>'}</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>REKAP DAFTAR PERLOMBAAN HUT RI KE-81</title>
          <style>
            @page { size: A4 landscape; margin: 0; }
            body { font-family: Arial, sans-serif; padding: 15mm; color: #0f172a; line-height: 1.4; }
            .header { text-align: center; border-bottom: 3px double #000; padding-bottom: 8px; margin-bottom: 15px; }
            .header h2 { margin: 0; font-size: 16px; text-transform: uppercase; }
            .header h3 { margin: 2px 0; font-size: 14px; text-transform: uppercase; color: #dc2626; }
            table { width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 25px; }
            th, td { border: 1px solid #475569; padding: 7px 8px; }
            th { background-color: #f1f5f9; text-transform: uppercase; font-size: 10px; }
            .signature-section { margin-top: 35px; display: flex; justify-content: space-between; text-align: center; font-size: 11px; page-break-inside: avoid; }
            .sig-box { width: 30%; }
            .sig-space { height: 60px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>PANITIA KEMERDEKAAN HUT RI KE-81</h2>
            <h3>${cmsForm.nama_organisasi} / ${cmsForm.rw_desa}</h3>
            <p>Rekapitulasi Seluruh Perlombaan & Hasil Pemenang Juara</p>
          </div>

          <table>
            <thead>
              <tr>
                <th style="width:30px;">No</th>
                <th>Nama Lomba</th>
                <th>Kategori</th>
                <th>Tipe</th>
                <th style="width:80px;">Pendaftar</th>
                <th style="width:70px;">Status</th>
                <th>Juara 1</th>
                <th>Juara 2</th>
                <th>Juara 3</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>

          <div class="signature-section">
            <div class="sig-box">
              <p>Koordinator Lomba,</p>
              <div class="sig-space"></div>
              <p><b>( .................................... )</b></p>
            </div>
            <div class="sig-box">
              <p>Ketua Panitia Garda Muda,</p>
              <div class="sig-space"></div>
              <p><b>( .................................... )</b></p>
            </div>
            <div class="sig-box">
              <p>Mengetahui,<br/>Ketua RT 06 / RW 01</p>
              <div class="sig-space"></div>
              <p><b>( .................................... )</b></p>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleFileUpload = async (e, fieldTarget, isCard = false, isPanitia = false) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('file', file);

    setIsUploading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/upload`, uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data?.success) {
        const uploadedUrl = res.data.url;
        if (isCard) {
          setNewCard((prev) => ({ ...prev, image: uploadedUrl }));
        } else if (isPanitia) {
          setNewPanitia((prev) => ({ ...prev, photo: uploadedUrl }));
        } else {
          setCmsForm((prev) => ({ ...prev, [fieldTarget]: uploadedUrl }));
        }
        alert('File berhasil diunggah!');
      }
    } catch (err) {
      alert('Gagal mengunggah file!');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClearLogo = (fieldTarget) => {
    setCmsForm((prev) => ({ ...prev, [fieldTarget]: '' }));
  };

  const handleAddCard = () => {
    if (!newCard.title || !newCard.image) {
      alert('Harap isi Judul dan Upload File Foto/Video untuk Card 3D!');
      return;
    }
    const updatedCards = [...cmsForm.showcase_cards, newCard];
    setCmsForm({ ...cmsForm, showcase_cards: updatedCards });
    setNewCard({ title: '', subtitle: '', tag: 'Ã°Å¸Â¥â€¡ Foto Juara', image: '' });
  };

  const handleRemoveCard = (index) => {
    const updatedCards = cmsForm.showcase_cards.filter((_, i) => i !== index);
    setCmsForm({ ...cmsForm, showcase_cards: updatedCards });
  };

  const handleAddPanitia = () => {
    if (!newPanitia.name || !newPanitia.role) {
      alert('Harap isi Nama dan Jabatan Panitia!');
      return;
    }
    const updatedPanitia = [...cmsForm.panitia_list, newPanitia];
    setCmsForm({ ...cmsForm, panitia_list: updatedPanitia });
    setNewPanitia({ name: '', role: '', photo: '' });
  };

  const handleRemovePanitia = (index) => {
    const updatedPanitia = cmsForm.panitia_list.filter((_, i) => i !== index);
    setCmsForm({ ...cmsForm, panitia_list: updatedPanitia });
  };

  const handleCmsSubmit = async (e) => {
    e.preventDefault();
    setIsSavingCms(true);
    await onSaveSettings(cmsForm);
    setIsSavingCms(false);
    alert('Pengaturan CMS berhasil disimpan!');
  };

  const handleExportWord = () => {
    const selectedLombaObj = safeLombas.find(l => String(l.id) === String(filterLombaId));
    const docTitle = activeTab === 'lomba' 
      ? 'REKAP_DAFTAR_PERLOMBAAN_HUT_RI_81' 
      : selectedLombaObj 
      ? `ABSENSI_${selectedLombaObj.nama.toUpperCase().replace(/\s+/g, '_')}`
      : 'REKAP_DATA_PENDAFTARAN_WARGA';

    let tableHeader = activeTab === 'lomba'
      ? `<tr><th>No</th><th>Nama Lomba</th><th>Kategori</th><th>Tipe</th><th>Pendaftar</th><th>Status</th></tr>`
      : `<tr><th>No</th><th>Kode Tiket</th><th>Nama Peserta</th><th>Lomba</th><th>WhatsApp</th><th>RT</th><th>Kehadiran</th></tr>`;

    let tableBody = activeTab === 'lomba'
      ? safeLombas.map((l, i) => `<tr><td>${i+1}</td><td><b>${l.nama}</b></td><td>${l.kategori}</td><td>${l.tipe_peserta}</td><td>${l.terdaftar}/${l.kuota}</td><td>${l.status||'Aktif'}</td></tr>`).join('')
      : filteredPendaftars.map((p, i) => `<tr><td>${i+1}</td><td>${p.kode_tiket||'-'}</td><td><b>${p.nama_peserta}</b></td><td>${p.lomba?.nama||'-'}</td><td>${p.no_hp}</td><td>${p.rt}</td><td>${p.status_kehadiran||'Belum Hadir'}</td></tr>`).join('');

    const htmlContent = `
      <html>
      <head><meta charset="utf-8"><title>${docTitle}</title></head>
      <body>
        <h2 style="text-align:center;">PANITIA KEMERDEKAAN HUT RI KE-81</h2>
        <h3 style="text-align:center;">${cmsForm.nama_organisasi} / ${cmsForm.rw_desa}</h3>
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
          <thead>${tableHeader}</thead>
          <tbody>${tableBody}</tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docTitle}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleAiClick = async () => {
    if (!formData.nama) { alert('Isi Nama Lomba dahulu!'); return; }
    const aiDesc = await onGenerateAi(formData.nama);
    if (aiDesc) setFormData((prev) => ({ ...prev, deskripsi: aiDesc }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onTambahLomba) onTambahLomba(formData);
    setFormData({ nama: '', kategori: 'Umum', tipe_peserta: 'Individu', kuota: 15, tanggal: '2026-08-17', lokasi: 'Lapangan Utama RT 06', deskripsi: '' });
  };

  const totalLomba = safeLombas.length;
  const totalWarga = safePendaftars.length;
  const totalKuota = safeLombas.reduce((acc, curr) => acc + (parseInt(curr.kuota) || 0), 0);
  const persentase = totalKuota > 0 ? Math.round((totalWarga / totalKuota) * 100) : 0;

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      
      {/* MODAL INPUT JUARA */}
      {selectedLombaJuara && (
        <ModalInputJuara
          lomba={selectedLombaJuara}
          pendaftars={safePendaftars}
          onClose={() => setSelectedLombaJuara(null)}
          onSubmit={async (id, dataJuara) => {
            await onUpdateJuara(id, dataJuara);
            setSelectedLombaJuara(null);
          }}
          isDarkMode={isDarkMode}
        />
      )}

      {selectedLombaEdit && (
        <ModalEditLomba lomba={selectedLombaEdit} onClose={() => setSelectedLombaEdit(null)} onSubmit={async (id, dataUpdated) => { await onEditLomba(id, dataUpdated); setSelectedLombaEdit(null); }} isDarkMode={isDarkMode} />
      )}
      {selectedPendaftarEdit && (
        <ModalEditPendaftar pendaftar={selectedPendaftarEdit} onClose={() => setSelectedPendaftarEdit(null)} onSubmit={async (id, dataUpdated) => { await onEditPendaftar(id, dataUpdated); setSelectedPendaftarEdit(null); }} isDarkMode={isDarkMode} />
      )}
      {showScanModal && (
        <ScanModal onClose={() => setShowScanModal(false)} onScanSuccess={onScanCheckin} isDarkMode={isDarkMode} />
      )}

      {/* Header Dashboard & Action Buttons */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5 border-slate-300 dark:border-slate-800">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Dashboard Admin Panel</h2>
            <p className={`text-xs sm:text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Pusat Kendali Perlombaan & Pengaturan Tampilan {cmsForm.nama_organisasi}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setShowScanModal(true)} className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-3.5 py-2.5 rounded-2xl flex items-center space-x-2 shadow-md">
              <QrCode size={15} />
              <span>Scan QR / Check-In</span>
            </motion.button>

            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleExportWord} className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3.5 py-2.5 rounded-2xl flex items-center space-x-2 shadow-md">
              <FileText size={15} />
              <span>Export Word (.doc)</span>
            </motion.button>

            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleCetakRekapLomba} className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-3.5 py-2.5 rounded-2xl flex items-center space-x-2 shadow-md">
              <Printer size={15} />
              <span>Cetak Rekap PDF</span>
            </motion.button>

            <div className={`flex p-1 rounded-2xl border ml-1 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-300'}`}>
              <button onClick={() => setActiveTab('lomba')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${activeTab === 'lomba' ? 'bg-red-600 text-white shadow' : 'text-slate-600 dark:text-slate-400'}`}>Lomba ({totalLomba})</button>
              <button onClick={() => setActiveTab('pendaftar')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${activeTab === 'pendaftar' ? 'bg-red-600 text-white shadow' : 'text-slate-600 dark:text-slate-400'}`}>Warga ({totalWarga})</button>
              <button onClick={() => setActiveTab('cms')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1 ${activeTab === 'cms' ? 'bg-amber-500 text-slate-950 shadow' : 'text-amber-600 font-extrabold'}`}>
                <Sliders size={13} />
                <span>CMS Tampilan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className={`p-5 rounded-3xl border flex items-center space-x-4 ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-md'}`}>
            <div className="w-12 h-12 rounded-2xl bg-red-600/15 border border-red-500/30 text-red-600 flex items-center justify-center shrink-0">
              <Layers size={22} />
            </div>
            <div>
              <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Total Lomba</p>
              <p className="text-2xl font-black">{totalLomba}</p>
            </div>
          </div>

          <div className={`p-5 rounded-3xl border flex items-center space-x-4 ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-md'}`}>
            <div className="w-12 h-12 rounded-2xl bg-red-600/15 border border-red-500/30 text-red-600 flex items-center justify-center shrink-0">
              <Users size={22} />
            </div>
            <div>
              <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Pendaftar Warga</p>
              <p className="text-2xl font-black">{totalWarga}</p>
            </div>
          </div>

          <div className={`p-5 rounded-3xl border flex items-center space-x-4 ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-md'}`}>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-500 flex items-center justify-center shrink-0">
              <BarChart3 size={22} />
            </div>
            <div>
              <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Kuota Terisi</p>
              <p className="text-2xl font-black text-amber-500">{persentase}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* TAB CONTENT 1: CMS SETTINGS */}
      {activeTab === 'cms' ? (
        <div className={`border rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center space-x-3 border-b pb-4 border-slate-200 dark:border-slate-800">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <Settings size={22} />
            </div>
            <div>
              <h3 className="text-xl font-black">CMS Admin: Kelola Tampilan Website & Panitia</h3>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Atur logo, akun login, link Drive, foto bersama, serta susunan panitia</p>
            </div>
          </div>

          <form onSubmit={handleCmsSubmit} className="space-y-6">
            
            {/* KREDENSIAL LOGIN ADMIN */}
            <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 space-y-3">
              <h4 className="font-bold text-xs flex items-center space-x-2 text-amber-500 uppercase tracking-wider">
                <Key size={15} />
                <span>Pengaturan Akun Login Admin (Ganti Kredensial)</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold block mb-1">Username Admin Baru</label>
                  <input type="text" required value={cmsForm.admin_username} onChange={(e) => setCmsForm({ ...cmsForm, admin_username: e.target.value })} className={`w-full border rounded-2xl px-4 py-2 text-xs outline-none font-bold ${isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`} />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Password Admin Baru</label>
                  <input type="text" required value={cmsForm.admin_password} onChange={(e) => setCmsForm({ ...cmsForm, admin_password: e.target.value })} className={`w-full border rounded-2xl px-4 py-2 text-xs outline-none font-bold ${isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`} />
                </div>
              </div>
            </div>

            {/* ORGANISASI & REGIONAL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-bold block mb-1">Nama Organisasi / RT</label>
                <input type="text" required value={cmsForm.nama_organisasi} onChange={(e) => setCmsForm({ ...cmsForm, nama_organisasi: e.target.value })} className={`w-full border rounded-2xl px-4 py-2.5 text-xs outline-none ${isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`} />
              </div>
              <div>
                <label className="text-xs font-bold block mb-1">RW & Desa</label>
                <input type="text" required value={cmsForm.rw_desa} onChange={(e) => setCmsForm({ ...cmsForm, rw_desa: e.target.value })} className={`w-full border rounded-2xl px-4 py-2.5 text-xs outline-none ${isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`} />
              </div>
            </div>

            {/* GOOGLE DRIVE LINK DOKUMENTASI */}
            <div className="p-4 rounded-2xl border border-blue-500/30 bg-blue-600/10 space-y-2">
              <label className="text-xs font-bold block text-blue-400 flex items-center space-x-2">
                <FolderDown size={16} />
                <span>URL Link Google Drive (Kosongkan Jika Belum Ada)</span>
              </label>
              <input
                type="text"
                value={cmsForm.drive_link}
                onChange={(e) => setCmsForm({ ...cmsForm, drive_link: e.target.value })}
                placeholder="Contoh: https://drive.google.com/drive/folders/..."
                className={`w-full border rounded-2xl px-4 py-2.5 text-xs outline-none ${isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
              />
            </div>

            {/* 3 UPLOAD LOGO SLOTS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="space-y-2">
                <label className="text-xs font-bold block">Logo Utama (Garuda)</label>
                <div className="flex items-center space-x-2">
                  <label className="cursor-pointer bg-red-600 hover:bg-red-500 text-white px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-1.5 shadow shrink-0">
                    <Upload size={14} />
                    <span>Pilih PNG</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'logo_utama')} className="hidden" />
                  </label>
                  {cmsForm.logo_utama && (
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-[#0b0f17] border border-red-500/40 rounded-2xl p-1 flex items-center justify-center shrink-0">
                        <img src={cmsForm.logo_utama} alt="Garuda" className="w-full h-full object-contain" />
                      </div>
                      <button type="button" onClick={() => handleClearLogo('logo_utama')} className="p-2 rounded-xl bg-red-950/40 text-red-400 hover:bg-red-600 hover:text-white transition"><XCircle size={15} /></button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold block">Logo HUT RI 81</label>
                <div className="flex items-center space-x-2">
                  <label className="cursor-pointer bg-red-600 hover:bg-red-500 text-white px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-1.5 shadow shrink-0">
                    <Upload size={14} />
                    <span>Pilih PNG</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'logo_hut')} className="hidden" />
                  </label>
                  {cmsForm.logo_hut && (
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-[#0b0f17] border border-red-500/40 rounded-2xl p-1 flex items-center justify-center shrink-0">
                        <img src={cmsForm.logo_hut} alt="HUT RI" className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(225,29,72,0.8)]" />
                      </div>
                      <button type="button" onClick={() => handleClearLogo('logo_hut')} className="p-2 rounded-xl bg-red-950/40 text-red-400 hover:bg-red-600 hover:text-white transition"><XCircle size={15} /></button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold block">Logo Garda Muda</label>
                <div className="flex items-center space-x-2">
                  <label className="cursor-pointer bg-amber-500 hover:bg-amber-400 text-slate-950 px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-1.5 shadow shrink-0">
                    <Upload size={14} />
                    <span>Pilih PNG</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'logo_garda')} className="hidden" />
                  </label>
                  {cmsForm.logo_garda && (
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-[#0b0f17] border border-amber-500/40 rounded-2xl p-1 flex items-center justify-center shrink-0">
                        <img src={cmsForm.logo_garda} alt="Garda Muda" className="w-full h-full object-contain" />
                      </div>
                      <button type="button" onClick={() => handleClearLogo('logo_garda')} className="p-2 rounded-xl bg-red-950/40 text-red-400 hover:bg-red-600 hover:text-white transition"><XCircle size={15} /></button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* UPLOAD FOTO BERSAMA SELURUH PANITIA */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <label className="text-xs font-bold block flex items-center space-x-2 text-amber-500">
                <ImageIcon size={16} />
                <span>Upload Foto Bersama Seluruh Panitia (Tampil di atas daftar anggota)</span>
              </label>

              <div className="flex items-center space-x-3">
                <label className="cursor-pointer bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2.5 rounded-2xl text-xs flex items-center space-x-2 shadow shrink-0">
                  <Upload size={14} />
                  <span>Upload Foto Bersama (PNG/JPG)</span>
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'panitia_group_photo')} className="hidden" />
                </label>

                {cmsForm.panitia_group_photo && (
                  <div className="flex items-center space-x-2">
                    <div className="h-12 w-24 bg-slate-950 rounded-xl overflow-hidden border border-amber-500/40 shrink-0">
                      <img src={cmsForm.panitia_group_photo} alt="Preview Foto Bersama" className="w-full h-full object-cover" />
                    </div>
                    <button type="button" onClick={() => handleClearLogo('panitia_group_photo')} title="Hapus Foto Bersama" className="p-2 rounded-xl bg-red-950/40 text-red-400 hover:bg-red-600 hover:text-white transition"><XCircle size={15} /></button>
                  </div>
                )}
              </div>
            </div>

            {/* KELOLA TIM ANGGOTA PANITIA */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm flex items-center space-x-2 text-red-500">
                  <UserCheck size={16} />
                  <span>Tambah Anggota Panitia (Tanpa Batas Jumlah)</span>
                </h4>
                <span className="text-xs text-amber-500 font-bold">{cmsForm.panitia_list.length} Anggota Terdaftar</span>
              </div>

              <div className={`p-4 rounded-2xl border space-y-3 ${isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-300'}`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Nama Anggota (Misal: Ilham Eka Saputra)"
                    value={newPanitia.name}
                    onChange={(e) => setNewPanitia({ ...newPanitia, name: e.target.value })}
                    className={`rounded-xl px-3 py-2 text-xs border outline-none ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                  />
                  <input
                    type="text"
                    placeholder="Jabatan (Misal: Ketua Panitia Garda Muda)"
                    value={newPanitia.role}
                    onChange={(e) => setNewPanitia({ ...newPanitia, role: e.target.value })}
                    className={`rounded-xl px-3 py-2 text-xs border outline-none ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <label className="cursor-pointer bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-2 shadow">
                    <Upload size={14} />
                    <span>Upload Foto Profil Anggota (Opsional)</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, null, false, true)} className="hidden" />
                  </label>

                  {newPanitia.photo && (
                    <span className="text-[11px] text-emerald-500 font-bold truncate">
                      Ã¢Å“â€¦ Foto Perorangan Terunggah
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleAddPanitia}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 rounded-xl text-xs transition shadow"
                >
                  + Tambahkan Anggota Panitia Ini
                </button>
              </div>

              {/* List Panitia */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                {cmsForm.panitia_list.map((p, idx) => (
                  <div key={idx} className={`p-3 rounded-2xl border flex items-center justify-between ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="truncate pr-2">
                      <p className="font-bold text-xs truncate">{p.name}</p>
                      <p className="text-[10px] text-red-500 font-bold truncate">{p.role}</p>
                    </div>
                    <button type="button" onClick={() => handleRemovePanitia(idx)} title="Hapus Panitia Ini" className="p-1.5 rounded-lg bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white transition">
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* MANAGING 3D SHOWCASE CARDS */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm flex items-center space-x-2">
                  <Sparkles size={16} className="text-amber-500" />
                  <span>Upload Kartu 3D (Foto Juara, Dokumentasi / Video MP4)</span>
                </h4>
                <span className="text-xs text-amber-500 font-bold">{cmsForm.showcase_cards.length} Kartu Aktif</span>
              </div>

              <div className={`p-4 rounded-2xl border space-y-3 ${isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-300'}`}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Judul Kartu (Misal: Juara 1 Balap Karung)"
                    value={newCard.title}
                    onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
                    className={`rounded-xl px-3 py-2 text-xs border outline-none ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                  />
                  <input
                    type="text"
                    placeholder="Sub-Judul (Misal: Ahmad & Tim RT 06)"
                    value={newCard.subtitle}
                    onChange={(e) => setNewCard({ ...newCard, subtitle: e.target.value })}
                    className={`rounded-xl px-3 py-2 text-xs border outline-none ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                  />
                  <select
                    value={newCard.tag || 'Ã°Å¸Â¥â€¡ Foto Juara'}
                    onChange={(e) => setNewCard({ ...newCard, tag: e.target.value })}
                    className={`rounded-xl px-3 py-2 text-xs border outline-none font-bold ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
                  >
                    <option value="Ã°Å¸Â¥â€¡ Foto Juara">Ã°Å¸Â¥â€¡ Foto Juara</option>
                    <option value="Ã°Å¸â€Â¥ Momen Seru">Ã°Å¸â€Â¥ Momen Seru</option>
                    <option value="Ã°Å¸â€œÂ¸ Dokumentasi">Ã°Å¸â€œÂ¸ Dokumentasi</option>
                    <option value="Ã°Å¸Å½Â¥ Video Dokumen">Ã°Å¸Å½Â¥ Video Dokumen</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3">
                  <label className="cursor-pointer bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-2 shadow">
                    <Upload size={14} />
                    <span>Upload Foto (PNG/JPG) / Video (MP4)</span>
                    <input type="file" accept="image/*,video/mp4,video/webm" onChange={(e) => handleFileUpload(e, null, true)} className="hidden" />
                  </label>

                  {newCard.image && (
                    <span className="text-[11px] text-emerald-500 font-bold truncate max-w-xs">
                      Ã¢Å“â€¦ Terunggah: {newCard.image.split('/').pop()}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleAddCard}
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded-xl text-xs transition shadow"
                >
                  + Tambahkan Kartu 3D Ini
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                {cmsForm.showcase_cards.map((c, idx) => (
                  <div key={idx} className={`p-3 rounded-2xl border flex items-center justify-between ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="truncate pr-2">
                      <p className="font-bold text-xs truncate">{c.title}</p>
                      <p className="text-[10px] text-amber-500 truncate">{c.tag || '3D SHOWCASE'} Ã¢â‚¬Â¢ {c.subtitle}</p>
                    </div>
                    <button type="button" onClick={() => handleRemoveCard(idx)} title="Hapus Kartu Ini" className="p-1.5 rounded-lg bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white transition">
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* INTEGRASI MEDIA SOSIAL */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <h4 className="font-bold text-sm flex items-center space-x-2 text-rose-500">
                <Share2 size={16} />
                <span>Media Sosial Organisasi (Hanya Tampil Jika Diisi)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-bold block mb-1">Instagram</label>
                  <input type="text" value={cmsForm.instagram} onChange={(e) => setCmsForm({ ...cmsForm, instagram: e.target.value })} placeholder="Kosong (Misal: @gardamuda_rt06)" className={`w-full border rounded-2xl px-3 py-2 text-xs outline-none ${isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`} />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">TikTok</label>
                  <input type="text" value={cmsForm.tiktok} onChange={(e) => setCmsForm({ ...cmsForm, tiktok: e.target.value })} placeholder="Kosong (Misal: @gardamuda06)" className={`w-full border rounded-2xl px-3 py-2 text-xs outline-none ${isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`} />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">YouTube Channel</label>
                  <input type="text" value={cmsForm.youtube} onChange={(e) => setCmsForm({ ...cmsForm, youtube: e.target.value })} placeholder="Kosong (Misal: Garda Muda RT 06)" className={`w-full border rounded-2xl px-3 py-2 text-xs outline-none ${isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`} />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">WhatsApp Panitia</label>
                  <input type="text" value={cmsForm.whatsapp} onChange={(e) => setCmsForm({ ...cmsForm, whatsapp: e.target.value })} placeholder="Kosong (Misal: 081234567890)" className={`w-full border rounded-2xl px-3 py-2 text-xs outline-none ${isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`} />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSavingCms || isUploading}
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black py-3.5 rounded-2xl text-xs shadow-lg transition flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isSavingCms ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
              <span>Simpan Seluruh Pengaturan CMS, Drive, Panitia & Sosmed</span>
            </motion.button>
          </form>
        </div>
      ) : activeTab === 'lomba' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Buat Lomba */}
          <div className={`border rounded-3xl p-6 shadow-xl space-y-5 h-fit ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center space-x-2 font-bold border-b pb-3 border-slate-300 dark:border-slate-800">
              <Plus size={18} className="text-red-600" />
              <span>Tambah Perlombaan Baru</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold block mb-1">Nama Lomba</label>
                <input type="text" required value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} placeholder="Contoh: Balap Karung Helm" className={`w-full border rounded-2xl px-4 py-2.5 text-xs outline-none ${isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold block mb-1">Kategori</label>
                  <CustomSelect options={kategoriOptions} value={formData.kategori} onChange={(val) => setFormData({ ...formData, kategori: val })} isDarkMode={isDarkMode} />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Tipe Peserta</label>
                  <CustomSelect options={tipePesertaOptions} value={formData.tipe_peserta} onChange={(val) => setFormData({ ...formData, tipe_peserta: val })} isDarkMode={isDarkMode} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold block mb-1">Kuota Total</label>
                  <input type="number" min="1" required value={formData.kuota} onChange={(e) => setFormData({ ...formData, kuota: e.target.value })} className={`w-full border rounded-2xl px-4 py-2.5 text-xs outline-none ${isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`} />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Tanggal</label>
                  <input type="date" required value={formData.tanggal} onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })} className={`w-full border rounded-2xl px-3 py-2 text-xs outline-none ${isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`} />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold block mb-1">Lokasi Lomba</label>
                <input type="text" required value={formData.lokasi} onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })} className={`w-full border rounded-2xl px-4 py-2.5 text-xs outline-none ${isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`} />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold">Deskripsi Lomba</label>
                  <button type="button" onClick={handleAiClick} disabled={isGeneratingAi} className="text-[10px] bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black px-2.5 py-1 rounded-lg flex items-center space-x-1 shadow-md">
                    {isGeneratingAi ? <RefreshCw size={12} className="animate-spin" /> : <Sparkles size={12} />}
                    <span>Draft AI Gemini</span>
                  </button>
                </div>
                <textarea rows="3" value={formData.deskripsi} onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })} className={`w-full border rounded-2xl p-3 text-xs outline-none resize-none ${isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`} />
              </div>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-2xl text-xs transition shadow-lg flex items-center justify-center space-x-2">
                <Check size={16} />
                <span>Publikasikan Lomba</span>
              </motion.button>
            </form>
          </div>

          {/* Table List Lomba */}
          <div className={`lg:col-span-2 border rounded-3xl p-6 shadow-xl overflow-x-auto ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h3 className="text-base font-bold mb-4">Daftar Perlombaan Aktif & Hasil Juara</h3>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className={`border-b ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
                  <th className="pb-3">Nama Lomba</th>
                  <th className="pb-3">Tipe</th>
                  <th className="pb-3">Pendaftar</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-center">Aksi Lomba</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800/60' : 'divide-slate-100'}`}>
                {safeLombas.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 font-bold">{item.nama}</td>
                    <td className="py-3">{item.tipe_peserta}</td>
                    <td className="py-3 text-amber-500 font-bold">{item.terdaftar} / {item.kuota}</td>
                    <td className="py-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-500/40 text-emerald-500">{item.status || 'Aktif'}</span></td>
                    <td className="py-3 text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        
                        {/* TOMBOL CETAK ABSENSI PER LOMBA */}
                        <button
                          onClick={() => handleCetakAbsensiPerLomba(item)}
                          title="Cetak Lembar Absensi Lomba Ini"
                          className="p-2 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white transition"
                        >
                          <Printer size={14} />
                        </button>

                        <button onClick={() => setSelectedLombaJuara(item)} title="Input Pemenang Juara" className="p-2 rounded-xl bg-amber-500/20 text-amber-500 hover:bg-amber-500 hover:text-slate-950 transition"><Award size={14} /></button>
                        <button onClick={() => setSelectedLombaEdit(item)} title="Edit Lomba" className="p-2 rounded-xl bg-blue-600/20 text-blue-500 hover:bg-blue-600 hover:text-white transition"><Edit size={14} /></button>
                        <button onClick={() => onHapusLomba(item.id)} title="Hapus Lomba" className="p-2 rounded-xl bg-rose-950/40 text-rose-500 hover:bg-red-600 hover:text-white transition"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      ) : (
        /* Table List Pendaftar Warga */
        <div className={`border rounded-3xl p-6 shadow-xl space-y-4 ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold">Data Pendaftaran Warga</h3>
            
            <div className="flex items-center space-x-2">
              <Filter size={15} className="text-red-500" />
              <select value={filterLombaId} onChange={(e) => setFilterLombaId(e.target.value)} className={`rounded-xl px-3 py-1.5 text-xs font-bold border outline-none ${isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`}>
                <option value="Semua">Semua Lomba ({safePendaftars.length})</option>
                {safeLombas.map((l) => (<option key={l.id} value={l.id}>{l.nama}</option>))}
              </select>

              {/* SHORTCUT CETAK ABSENSI LOMBA TERPILIH */}
              {filterLombaId !== 'Semua' && (
                <button
                  onClick={() => {
                    const lObj = safeLombas.find(l => String(l.id) === String(filterLombaId));
                    if (lObj) handleCetakAbsensiPerLomba(lObj);
                  }}
                  className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl flex items-center space-x-1.5 shadow"
                >
                  <Printer size={13} />
                  <span>Cetak Absensi Lomba Ini</span>
                </button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className={`border-b ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
                  <th className="pb-3">Kode Tiket</th>
                  <th className="pb-3">Nama Peserta / Tim</th>
                  <th className="pb-3">Lomba</th>
                  <th className="pb-3">WhatsApp</th>
                  <th className="pb-3">Domisili</th>
                  <th className="pb-3">Kehadiran</th>
                  <th className="pb-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800/60' : 'divide-slate-100'}`}>
                {filteredPendaftars.map((p) => (
                  <tr key={p.id}>
                    <td className="py-3 font-mono text-red-600 font-bold">{p.kode_tiket || '-'}</td>
                    <td className="py-3 font-bold">{p.nama_peserta}</td>
                    <td className="py-3">{p.lomba?.nama || '-'}</td>
                    <td className="py-3">{p.no_hp}</td>
                    <td className="py-3">{p.rt}</td>
                    <td className="py-3"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-500/40 text-emerald-500">{p.status_kehadiran || 'Belum Hadir'}</span></td>
                    <td className="py-3 text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        <button onClick={() => setSelectedPendaftarEdit(p)} className="p-1.5 rounded-xl bg-blue-600/20 text-blue-500"><Edit size={13} /></button>
                        <button onClick={() => onHapusPendaftar(p.id)} className="p-1.5 rounded-xl bg-rose-950/40 text-rose-500"><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
