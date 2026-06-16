// src/App.jsx
import React, { useState, useEffect } from 'react';
import { hitungFPB, hitungKPK, buatFaktorisasiPrima, formatTampilanFaktor } from './mathFunctions';
import './style.css';

// --- IMPORT GAMBAR PROFIL ---
// Pastikan gambar AnandaPrasetiyo.png dan dosen.png sudah ada di dalam folder src/assets/
import fotoAnanda from './assets/AnandaPrasetiyo.png';
import fotoDosen from './assets/dosen.png';

// --- KOMPONEN POP-UP (MODAL) ---
const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-konten" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{title}</h3>
                    <button className="tombol-tutup" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

// --- KOMPONEN NAVBAR DENGAN HAMBURGER MENU ---
const Navbar = ({ tabAktif, setTabAktif, bukaPetunjuk, bukaTujuan }) => {
    const daftarMenu = ['Home', 'Materi', 'Vidio', 'Game', 'Quiz', 'Profil'];
    const [isMenuTerbuka, setIsMenuTerbuka] = useState(false);

    const navigasiKe = (menu) => {
        setTabAktif(menu);
        setIsMenuTerbuka(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-identitas">🌿 EcoMath SMP</div>
            
            <button className="hamburger-tombol" onClick={() => setIsMenuTerbuka(!isMenuTerbuka)}>
                {isMenuTerbuka ? '✕' : '☰'}
            </button>

            <ul className={`navbar-menu ${isMenuTerbuka ? 'buka' : ''}`}>
                {daftarMenu.map(menu => (
                    <li key={menu} className={`navbar-item ${tabAktif === menu ? 'aktif' : ''}`} onClick={() => navigasiKe(menu)}>
                        {menu}
                    </li>
                ))}
                <li className="navbar-item-aksi-mobile">
                    <button className="tombol-info" onClick={() => { bukaPetunjuk(); setIsMenuTerbuka(false); }}>📋 Petunjuk</button>
                    <button className="tombol-info" onClick={() => { bukaTujuan(); setIsMenuTerbuka(false); }}>🎯 Tujuan</button>
                </li>
            </ul>

            <div className="navbar-aksi">
                <button className="tombol-info" onClick={bukaPetunjuk}>📋 Petunjuk</button>
                <button className="tombol-info" onClick={bukaTujuan}>🎯 Tujuan</button>
            </div>
        </nav>
    );
};

// --- SEKSI HOME ---
const SeksiHome = ({ bukaPetunjuk, bukaTujuan }) => (
    <section className="seksi-konten">
        <div className="spanduk-pahlawan">
            <h1>Misi Conservation Bumi</h1>
            <p>Kuasai KPK dan FPB untuk membantu merencanakan pelestarian alam dan penjadwalan reboisasi.</p>
            <div className="grup-tombol-home">
                <button className="tombol-aksen" onClick={bukaPetunjuk}>Baca Petunjuk Penggunaan</button>
                <button className="tombol-aksen" onClick={bukaTujuan}>Lihat Tujuan Pembelajaran</button>
            </div>
        </div>
        <div className="grid-informasi">
            <div className="kartu-info">
                <h3>🌍 Mengapa Matematika?</h3>
                <p>Tanpa perhitungan yang tepat, kita tidak bisa membagi bibit pohon secara adil atau menyusun jadwal patroli hutan hujan tropis.</p>
            </div>
            <div className="kartu-info">
                <h3>🚀 Mulai Belajar</h3>
                <p>Klik menu <b>Materi</b> untuk simulasi, <b>Vidio</b> untuk penjelasan visual, dan <b>Game</b> untuk menguji kemampuanmu!</p>
            </div>
        </div>
    </section>
);

// --- SEKSI MATERI & FLIPBOOK ---
const SeksiMateri = () => {
    const [angkaSatu, setAngkaSatu] = useState('');
    const [angkaDua, setAngkaDua] = useState('');
    const [hasil, setHasil] = useState(null);

    const prosesKalkulasi = () => {
        const val1 = parseInt(angkaSatu);
        const val2 = parseInt(angkaDua);
        if (isNaN(val1) || isNaN(val2) || val1 <= 0 || val2 <= 0) return alert("Masukkan bilangan bulat positif!");
        
        setHasil({
            fpb: hitungFPB(val1, val2),
            kpk: hitungKPK(val1, val2),
            faktor1: formatTampilanFaktor(buatFaktorisasiPrima(val1)),
            faktor2: formatTampilanFaktor(buatFaktorisasiPrima(val2))
        });
    };

    return (
        <section className="seksi-konten">
            <h2>Materi Pembelajaran: KPK & FPB</h2>
            <div className="artikel-materi">
                <div className="blok-bacaan">
                    <h3>1. Faktor Persekutuan Terbesar (FPB)</h3>
                    <p>FPB adalah bilangan bulat positif terbesar yang membagi habis dua bilangan. Berguna untuk membagi bibit tanaman ke berbagai panti alam secara adil dan merata.</p>
                </div>
                <div className="blok-bacaan">
                    <h3>2. Kelipatan Persekutuan Terkecil (KPK)</h3>
                    <p>KPK adalah bilangan kelipatan terkecil yang sama dari dua bilangan. Digunakan untuk menentukan waktu pertemuan berkala, seperti jadwal patroli hutan.</p>
                </div>
            </div>

            <div className="kontainer-flipbook">
                <h3>📚 E-Book / Flipbook Interaktif</h3>
                <p>Silakan baca buku modul digital di bawah ini:</p>
                <div className="bingkai-flipbook-wrapper">
                    <iframe src="https://heyzine.com/flip-book/embed-placeholder-link" title="Flipbook Matematika EcoMath" className="iframe-flipbook" allowFullScreen={true}></iframe>
                </div>
            </div>

            <h3 className="judul-simulasi">🧮 Alat Analisis & Simulasi Angka</h3>
            <div className="panel-kalkulator">
                <input type="number" placeholder="Angka Pertama" value={angkaSatu} onChange={e => setAngkaSatu(e.target.value)} />
                <input type="number" placeholder="Angka Kedua" value={angkaDua} onChange={e => setAngkaDua(e.target.value)} />
                <button className="tombol-utama" onClick={prosesKalkulasi}>Jalankan Analisis</button>
            </div>
            {hasil && (
                <div className="panel-hasil">
                    <div className="grid-hasil">
                        <div className="kotak-hasil"><h4>Nilai KPK</h4><span className="angka-raksasa">{hasil.kpk}</span></div>
                        <div className="kotak-hasil"><h4>Nilai FPB</h4><span className="angka-raksasa">{hasil.fpb}</span></div>
                    </div>
                    <div className="detail-faktor">
                        <p>Faktor Prima dari {angkaSatu} = <strong>{hasil.faktor1}</strong></p>
                        <p>Faktor Prima dari {angkaDua} = <strong>{hasil.faktor2}</strong></p>
                    </div>
                </div>
            )}
        </section>
    );
};

// --- SEKSI VIDIO PEMBELAJARAN ---
const SeksiVidio = () => (
    <section className="seksi-konten">
        <h2>Pustaka Video Belajar</h2>
        <div className="grid-video">
            <div className="bingkai-video"><div className="ikon-play">▶</div><p>Metode Sengkedan & FPB</p></div>
            <div className="bingkai-video"><div className="ikon-play">▶</div><p>Konsep Pohon Faktor & KPK</p></div>
        </div>
    </section>
);

// --- SEKSI GAME ---
const SeksiGame = () => (
    <section className="seksi-konten">
        <h2>Misi Game Konservasi</h2>
        <div className="kartu-game-tautan">
            <div className="ikon-game-besar">🎮</div>
            <h3>Siap Memulai Petualangan Lingkungan?</h3>
            <a href="https://GANTI_DENGAN_LINK_GAME_KAMU.com" target="_blank" rel="noopener noreferrer" className="tombol-game-link">Mainkan Game Sekarang 🚀</a>
        </div>
    </section>
);

// --- SEKSI QUIZ DENGAN TIMER ---
const SeksiQuiz = () => {
    const bankSoal = [
        { id: 1, tanya: "Berapakah FPB dari bilangan 12 dan 18?", opsi: [2, 3, 6, 9], benar: 6 },
        { id: 2, tanya: "Berapakah KPK dari bilangan 8 dan 12?", opsi: [12, 16, 24, 48], benar: 24 },
        { id: 3, tanya: "Berapakah FPB dari bilangan 20 dan 30?", opsi: [5, 10, 15, 60], benar: 10 },
        { id: 4, tanya: "Berapakah KPK dari bilangan 4 dan 5?", opsi: [9, 10, 15, 20], benar: 20 },
        { id: 5, tanya: "Lampu A menyala tiap 4 detik, Lampu B tiap 6 detik. Kapan menyala bersamaan? (KPK)", opsi: [10, 12, 24, 48], benar: 12 },
        { id: 6, tanya: "Berapakah FPB dari 36 dan 48?", opsi: [6, 8, 12, 24], benar: 12 },
        { id: 7, tanya: "Berapakah KPK dari bilangan 15 dan 20?", opsi: [30, 45, 60, 120], benar: 60 },
        { id: 8, tanya: "Tali 16m dan 24m dipotong sama panjang dengan ukuran terbesar. Berapa ukurannya? (FPB)", opsi: [2, 4, 6, 8], benar: 8 },
        { id: 9, tanya: "Berapakah FPB dari bilangan 15 dan 25?", opsi: [3, 5, 10, 15], benar: 5 },
        { id: 10, tanya: "Berapakah KPK dari bilangan 6 dan 9?", opsi: [12, 15, 18, 36], benar: 18 }
    ];

    const WAKTU_PER_SOAL = 20;

    const [soalAktifIndex, setSoalAktifIndex] = useState(0);
    const [skorBenar, setSkorBenar] = useState(0);
    const [waktuSisa, setWaktuSisa] = useState(WAKTU_PER_SOAL);
    const [kuisSelesai, setKuisSelesai] = useState(false);

    useEffect(() => {
        if (kuisSelesai) return;

        if (waktuSisa <= 0) {
            lanjutKeSoalBerikutnya();
            return;
        }

        const timer = setInterval(() => {
            setWaktuSisa(prevWaktu => prevWaktu - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [waktuSisa, kuisSelesai]);

    const lanjutKeSoalBerikutnya = (jawabanDipilih = null) => {
        if (jawabanDipilih !== null && jawabanDipilih === bankSoal[soalAktifIndex].benar) {
            setSkorBenar(prev => prev + 1);
        }

        if (soalAktifIndex + 1 < bankSoal.length) {
            setSoalAktifIndex(prev => prev + 1);
            setWaktuSisa(WAKTU_PER_SOAL); 
        } else {
            setKuisSelesai(true); 
        }
    };

    const restartKuis = () => {
        setSoalAktifIndex(0);
        setSkorBenar(0);
        setWaktuSisa(WAKTU_PER_SOAL);
        setKuisSelesai(false);
    };

    if (kuisSelesai) {
        const skorAkhir = (skorBenar / bankSoal.length) * 100;
        return (
            <section className="seksi-konten teks-tengah">
                <h2>🎉 Evaluasi Selesai!</h2>
                <div className="panel-skor-quiz">
                    <h3>Nilai Kamu:</h3>
                    <span className="skor-besar">{skorAkhir}</span>
                    <p>{skorAkhir >= 70 ? "Hebat! Kamu pahlawan lingkungan." : "Jangan menyerah, teruslah berlatih!"}</p>
                    <button className="tombol-utama mt-10" onClick={restartKuis}>Coba Lagi</button>
                </div>
            </section>
        );
    }

    const soalSekarang = bankSoal[soalAktifIndex];

    return (
        <section className="seksi-konten">
            <div className="header-evaluasi">
                <h2>Evaluasi Mandiri</h2>
                <div className={`indikator-waktu ${waktuSisa <= 5 ? 'waktu-kritis' : ''}`}>
                    ⏳ Sisa Waktu: {waktuSisa} detik
                </div>
            </div>
            
            <div className="kartu-soal kuis-tengah">
                <p className="teks-abu-bawah">Soal {soalAktifIndex + 1} dari {bankSoal.length}</p>
                <h3 className="teks-soal-besar mb-20">{soalSekarang.tanya}</h3>
                
                <div className="grid-pilihan-kuis">
                    {soalSekarang.opsi.map(o => (
                        <button key={o} className="tombol-opsi-kuis" onClick={() => lanjutKeSoalBerikutnya(o)}>
                            {o}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- SEKSI PROFIL ---
const SeksiProfil = () => {
    return (
        <section className="seksi-konten">
            <h2>Tentang Kami</h2>
            <p className="sub-judul">Tim di balik pengembangan aplikasi EcoMath SMP</p>
            
            <div className="grid-profil">
                {/* Profil Kamu (Pengembang) */}
                <div className="kartu-profil">
                    <div className="bingkai-foto-profil">
                        {/* Menggunakan variabel fotoAnanda hasil import */}
                        <img src={AnandaPrasetiyo.png} alt="Profil Pengembang" />
                    </div>
                    <div className="info-profil">
                        <h3>Ananda Prasetiyo</h3>
                        <p className="peran-profil">Pengembang Aplikasi & Mahasiswa</p>
                        <p className="deskripsi-profil">Bertanggung jawab merancang antarmuka interaktif dan algoritma FPB/KPK berbasis pendidikan lingkungan hidup untuk meningkatkan kualitas pembelajaran matematika di tingkat SMP.</p>
                    </div>
                </div>

                {/* Profil Dosen Pengampu */}
                <div className="kartu-profil">
                    <div className="bingkai-foto-profil">
                        {/* Menggunakan variabel fotoDosen hasil import */}
                        <img src={dosen.png} alt="Profil Dosen" />
                    </div>
                    <div className="info-profil">
                        <h3>[Nama Dosen Pengampu]</h3>
                        <p className="peran-profil">Dosen Pengampu Mata Kuliah</p>
                        <p className="deskripsi-profil">Memberikan bimbingan, validasi materi pedagogik, serta arahan akademis dalam pengembangan proyek akhir teknologi pembelajaran ini.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- KOMPONEN UTAMA (APP) ---
export default function App() {
    const [tabAktif, setTabAktif] = useState('Home');
    const [isPetunjukOpen, setIsPetunjukOpen] = useState(false);
    const [isTujuanOpen, setIsTujuanOpen] = useState(false);
    
    const renderKonten = () => {
        switch(tabAktif) {
            case 'Materi': return <SeksiMateri />;
            case 'Vidio': return <SeksiVidio />;
            case 'Game': return <SeksiGame />;
            case 'Quiz': return <SeksiQuiz />;
            case 'Profil': return <SeksiProfil />;
            default: return <SeksiHome bukaPetunjuk={() => setIsPetunjukOpen(true)} bukaTujuan={() => setIsTujuanOpen(true)} />;
        }
    };
    
    return (
        <div className="wadah-aplikasi">
            <Navbar 
                tabAktif={tabAktif} 
                setTabAktif={setTabAktif} 
                bukaPetunjuk={() => setIsPetunjukOpen(true)}
                bukaTujuan={() => setIsTujuanOpen(true)}
            />
            <main className="ruang-utama">{renderKonten()}</main>

            <Modal isOpen={isPetunjukOpen} onClose={() => setIsPetunjukOpen(false)} title="📋 Petunjuk Penggunaan">
                <ol className="daftar-modal">
                    <li>Gunakan menu atas untuk bernavigasi.</li>
                    <li>Baca materi dan masukkan angka untuk simulasi.</li>
                    <li>Kerjakan Kuis secepat mungkin karena berbatas waktu!</li>
                </ol>
            </Modal>

            <Modal isOpen={isTujuanOpen} onClose={() => setIsTujuanOpen(false)} title="🎯 Tujuan Pembelajaran">
                <ul className="daftar-modal">
                    <li>Siswa mampu menentukan KPK dan FPB dengan percaya diri.</li>
                </ul>
            </Modal>
        </div>
    );
}