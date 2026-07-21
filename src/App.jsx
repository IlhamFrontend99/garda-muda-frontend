import { API_BASE_URL } from './config/api';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Showcase3D from './components/Showcase3D';
import PanitiaAndDrive from './components/PanitiaAndDrive';
import LombaCard from './components/LombaCard';
import ModalPendaftaran from './components/ModalPendaftaran';
import TiketModal from './components/TiketModal';
import AdminDashboard from './components/AdminDashboard';
import LoginModal from './components/LoginModal';
import SplashScreen from './components/SplashScreen';
import Footer from './components/Footer';
import { Trophy, Search } from 'lucide-react';



export default function App() {
  const [view, setView] = useState('user');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const [lombas, setLombas] = useState([]);
  const [pendaftars, setPendaftars] = useState([]);
  const [settings, setSettings] = useState({});
  const [selectedLomba, setSelectedLomba] = useState(null);
  const [tiketPeserta, setTiketPeserta] = useState(null);
  
  const [selectedKategori, setSelectedKategori] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const fetchData = async () => {
    try {
      const resLomba = await axios.get(`${API_BASE_URL}/lombas`);
      setLombas(resLomba.data);

      const resPendaftar = await axios.get(`${API_BASE_URL}/pendaftars`);
      setPendaftars(resPendaftar.data);

      const resSettings = await axios.get(`${API_BASE_URL}/settings`);
      setSettings(resSettings.data?.data || {});
    } catch (err) {
      console.error('Gagal mengambil data dari backend:', err);
    } finally {
      setTimeout(() => setShowSplash(false), 1600);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveSettings = async (dataSettings) => {
    try {
      await axios.post(`${API_BASE_URL}/settings`, dataSettings);
      fetchData();
    } catch (err) {
      alert('Gagal menyimpan pengaturan CMS!');
    }
  };

  // CRUD LOMBA
  const handleTambahLomba = async (dataBaru) => {
    try {
      await axios.post(`${API_BASE_URL}/lombas`, dataBaru);
      alert('Berhasil menambah perlombaan baru!');
      fetchData();
    } catch (err) { alert('Gagal menambah perlombaan!'); }
  };

  const handleEditLomba = async (id, dataUpdated) => {
    try {
      await axios.put(`${API_BASE_URL}/lombas/${id}`, dataUpdated);
      alert('Berhasil memperbarui data perlombaan!');
      fetchData();
    } catch (err) { alert('Gagal memperbarui perlombaan!'); }
  };

  const handleHapusLomba = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/lombas/${id}`);
      alert('Perlombaan berhasil dihapus!');
      fetchData();
    } catch (err) { alert('Gagal menghapus perlombaan!'); }
  };

  // CRUD PENDAFTAR
  const handleDaftarWarga = async (formData) => {
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/pendaftars`, formData);
      setSelectedLomba(null);
      setTiketPeserta(res.data?.data);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal melakukan pendaftaran!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditPendaftar = async (id, dataUpdated) => {
    try {
      await axios.put(`${API_BASE_URL}/pendaftars/${id}`, dataUpdated);
      alert('Berhasil memperbarui data pendaftar!');
      fetchData();
    } catch (err) { alert('Gagal memperbarui pendaftar!'); }
  };

  const handleHapusPendaftar = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/pendaftars/${id}`);
      alert('Pendaftar berhasil dihapus!');
      fetchData();
    } catch (err) { alert('Gagal menghapus pendaftar!'); }
  };

  const handleUpdateJuara = async (id, dataJuara) => {
    try {
      await axios.post(`${API_BASE_URL}/lombas/${id}/juara`, dataJuara);
      alert('Hasil Juara Berhasil Diperbarui!');
      fetchData();
    } catch (err) { alert('Gagal memperbarui hasil juara!'); }
  };

  const handleScanCheckin = async (kodeTiket) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/pendaftars/scan`, { kode_tiket: kodeTiket });
      fetchData();
      return { success: true, data: res.data?.data };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Kode Tiket Tidak Valid!' };
    }
  };

  const handleGenerateAi = async (namaLomba) => {
    setIsGeneratingAi(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/lombas/ai-generate`, { nama_lomba: namaLomba });
      return res.data?.deskripsi;
    } catch (err) {
      return null;
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const filteredLombas = lombas.filter((l) => {
    if (selectedKategori === 'Ã°Å¸Ââ€  Hasil Juara') {
      return l.status === 'Selesai' || (l.juara_1 && l.juara_1 !== '');
    }
    const matchKategori = selectedKategori === 'Semua' || l.kategori === selectedKategori;
    const matchSearch = l.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        l.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchKategori && matchSearch;
  });

  const totalTerdaftar = pendaftars.length;
  const totalKuota = lombas.reduce((acc, curr) => acc + (parseInt(curr.kuota) || 0), 0);
  const persentaseTerisi = totalKuota > 0 ? Math.round((totalTerdaftar / totalKuota) * 100) : 0;

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans selection:bg-red-600 selection:text-white flex flex-col justify-between ${
      isDarkMode ? 'bg-[#0b0f17] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      
      {/* 3D Cinematic Opening Splash Screen */}
      <SplashScreen isVisible={showSplash} />

      <div>
        <Navbar
          view={view}
          setView={setView}
          isAdminLoggedIn={isAdminLoggedIn}
          setIsAdminLoggedIn={setIsAdminLoggedIn}
          setShowLoginModal={setShowLoginModal}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />

        {view === 'user' ? (
          <main>
            <Hero
              settings={settings}
              totalLomba={lombas.length}
              totalTerdaftar={totalTerdaftar}
              totalKuota={totalKuota}
              persentaseTerisi={persentaseTerisi}
              isDarkMode={isDarkMode}
            />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
              <div className={`flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-3xl border shadow-lg ${
                isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  {['Semua', 'Anak-Anak', 'Remaja', 'Dewasa', 'Umum', 'Ã°Å¸Ââ€  Hasil Juara'].map((kat) => (
                    <button
                      key={kat}
                      onClick={() => setSelectedKategori(kat)}
                      className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                        selectedKategori === kat
                          ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                          : isDarkMode
                          ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {kat}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-72">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari nama atau deskripsi..."
                    className={`w-full rounded-2xl pl-10 pr-4 py-2 text-xs outline-none border transition ${
                      isDarkMode
                        ? 'bg-slate-950 border-slate-800 text-white focus:border-red-500 placeholder:text-slate-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-red-600 placeholder:text-slate-400'
                    }`}
                  />
                </div>
              </div>

              {filteredLombas.length === 0 ? (
                <div className={`text-center py-16 rounded-3xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <Trophy size={48} className="mx-auto text-slate-500 mb-3" />
                  <h4 className="text-lg font-bold">Belum ada perlombaan yang ditemukan</h4>
                  <p className="text-slate-400 text-xs mt-1">Panitia sedang menyiapkan perlombaan baru. Silakan cek kembali!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLombas.map((lomba) => (
                    <LombaCard
                      key={lomba.id}
                      lomba={lomba}
                      onDaftar={(l) => setSelectedLomba(l)}
                      isDarkMode={isDarkMode}
                    />
                  ))}
                </div>
              )}

              {/* 3D GALERI SHOWCASE MULTIMEDIA */}
              <Showcase3D
                title={settings?.showcase_title}
                subtitle={settings?.showcase_subtitle}
                cards={settings?.showcase_cards || []}
                isDarkMode={isDarkMode}
              />

              {/* GOOGLE DRIVE DOKUMENTASI BANNER & TIM PANITIA GARDA MUDA */}
              <PanitiaAndDrive settings={settings} isDarkMode={isDarkMode} />

            </section>
          </main>
        ) : (
          <AdminDashboard
            lombas={lombas}
            pendaftars={pendaftars}
            settings={settings}
            onSaveSettings={handleSaveSettings}
            onTambahLomba={handleTambahLomba}
            onEditLomba={handleEditLomba}
            onHapusLomba={handleHapusLomba}
            onEditPendaftar={handleEditPendaftar}
            onHapusPendaftar={handleHapusPendaftar}
            onGenerateAi={handleGenerateAi}
            onUpdateJuara={handleUpdateJuara}
            onScanCheckin={handleScanCheckin}
            isGeneratingAi={isGeneratingAi}
            isDarkMode={isDarkMode}
          />
        )}
      </div>

      {/* Modals */}
      {selectedLomba && (
        <ModalPendaftaran
          lomba={selectedLomba}
          onClose={() => setSelectedLomba(null)}
          onSubmit={handleDaftarWarga}
          isSubmitting={isSubmitting}
          isDarkMode={isDarkMode}
        />
      )}

      {tiketPeserta && (
        <TiketModal
          pendaftar={tiketPeserta}
          onClose={() => setTiketPeserta(null)}
          isDarkMode={isDarkMode}
        />
      )}

      {showLoginModal && (
        <LoginModal
          settings={settings}
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={() => {
            setIsAdminLoggedIn(true);
            setShowLoginModal(false);
            setView('admin');
          }}
          isDarkMode={isDarkMode}
        />
      )}

      <Footer settings={settings} isDarkMode={isDarkMode} />

    </div>
  );
}
