// src/App.jsx
import React, { useState, useEffect } from 'react';
import { hitungFPB, hitungKPK, buatFaktorisasiPrima, formatTampilanFaktor } from './mathFunctions';
import './style.css';

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

// --- KOMPONEN NAVBAR ---
const Navbar = ({ tabAktif, setTabAktif, bukaPetunjuk, bukaTujuan }) => {
    const daftarMenu = ['Home', 'Materi', 'Vidio', 'Game', 'Quiz'];
    return (
        <nav className="navbar">
            <div className="navbar-identitas">🌿 EcoMath SMP</div>
            <ul className="navbar-menu">
                {daftarMenu.map(menu => (
                    <li key={menu} className={`navbar-item ${tabAktif === menu ? 'aktif' : ''}`} onClick={() => setTabAktif(menu)}>
                        {menu}
                    </li>
                ))}
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
            <h1>Misi Konservasi Bumi</h1>
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

// --- SEKSI MATERI & SIMULASI ---
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
            <h2>Materi: Simulasi Pohon Faktor & Aritmetika</h2>
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
        <p className="sub-judul">Tonton penjelasan konsep matematika lingkungan di bawah ini:</p>
        <div className="grid-video">
            <div className="bingkai-video">
                <div className="ikon-play">▶</div>
                <p>Metode Sengkedan & FPB</p>
            </div>
            <div className="bingkai-video">
                <div className="ikon-play">▶</div>
                <p>Konsep Pohon Faktor & KPK</p>
            </div>
        </div>
    </section>
);

// --- SEKSI GAME (SECTION PLACEHOLDER LINK) ---
const SeksiGame = () => {
    return (
        <section className="seksi-konten">
            <h2>Misi Game Konservasi</h2>
            <div className="kartu-game-tautan">
                <div className="ikon-game-besar">🎮</div>
                <h3>Siap Memulai Petualangan Lingkungan?</h3>
                <p>Kamu akan diarahkan ke halaman game interaktif eksternal untuk menguji pemahaman KPK & FPB dalam pelestarian hutan.</p>
                {/* SILAKAN MASUKKAN LINK GAME KAMU DI MASING-MASING HREF DI BAWAH INI */}
                <a href="https://GANTI_DENGAN_LINK_GAME_KAMU.com" target="_blank" rel="noopener noreferrer" className="tombol-game-link">
                    Mainkan Game Sekarang 🚀
                </a>
            </div>
        </section>
    );
};

// --- SEKSI QUIZ INTERAKTIF ---
const SeksiQuiz = () => {
    const bankSoal = [
        { id: 1, tanya: "Berapakah FPB dari bilangan 12 dan 18?", opsi: [2, 3, 6, 9], benar: 6 },
        { id: 2, tanya: "Berapakah KPK dari bilangan 8 dan 12?", opsi: [12, 16, 24, 48], benar: 24 }
    ];

    const [jawabanTerpilih, setJawabanTerpilih] = useState({});
    const [skor, setSkor] = useState(null);

    const pilihJawaban = (soalId, nilai) => {
        setJawabanTerpilih({ ...jawabanTerpilih, [soalId]: nilai });
    };

    const hitungSkorQuiz = () => {
        let nilaiBenar = 0;
        bankSoal.forEach(soal => {
            if (jawabanTerpilih[soal.id] === soal.benar) nilaiBenar++;
        });
        setSkor((nilaiBenar / bankSoal.length) * 100);
    };

    return (
        <section className="seksi-konten">
            <h2>Evaluasi Mandiri: Kuis FPB & KPK</h2>
            <div className="daftar-soal">
                {bankSoal.map((soal, index) => (
                    <div key={soal.id} className="kartu-soal">
                        <p className="teks-soal"><b>Soal {index + 1}:</b> {soal.tanya}</p>
                        <div className="pilihan-jawaban">
                            {soal.opsi.map(o => (
                                <button key={o} className={`tombol-opsi ${jawabanTerpilih[soal.id] === o ? 'terpilih' : ''}`} onClick={() => pilihJawaban(soal.id, o)}>
                                    {o}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <button className="tombol-utama" onClick={hitungSkorQuiz} style={{ marginTop: '1.5rem' }}>Kirim Jawaban</button>
            
            {skor !== null && (
                <div className="panel-skor-quiz">
                    <h3>Hasil Evaluasi Kamu:</h3>
                    <span className="skor-besar">{skor} / 100</span>
                    <p>{skor >= 70 ? "🎉 Luar biasa! Kamu telah menguasai misi ini." : "💪 Jangan menyerah, ayo pelajari lagi materinya!"}</p>
                </div>
            )}
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

            {/* POPUP NOTIFICATION (MODALS) */}
            <Modal isOpen={isPetunjukOpen} onClose={() => setIsPetunjukOpen(false)} title="📋 Petunjuk Penggunaan Aplikasi">
                <ol style={{ paddingLeft: '1.2rem', lineHeight: '1.8' }}>
                    <li>Gunakan <b>Navbar (Menu Navigasi)</b> di bagian atas untuk berpindah halaman sesuai keinginanmu.</li>
                    <li>Di halaman <b>Materi</b>, masukkan dua angka bulat positif untuk melihat simulasi Pohon Faktor secara otomatis.</li>
                    <li>Halaman <b>Vidio</b> berisi kumpulan materi visual, klik video untuk mulai menonton.</li>
                    <li>Buka menu <b>Game</b> untuk mengakses tautan luar permainan konservasi alam.</li>
                    <li>Uji kemampuanmu secara menyeluruh di menu <b>Quiz</b> dengan memilih salah satu jawaban yang paling tepat.</li>
                </ol>
            </Modal>

            <Modal isOpen={isTujuanOpen} onClose={() => setIsTujuanOpen(false)} title="🎯 Tujuan Pembelajaran">
                <ul style={{ paddingLeft: '1.2rem', lineHeight: '1.8' }}>
                    <li>Siswa mampu menentukan kelipatan persekutuan terkecil (KPK) dari dua bilangan dengan tepat.</li>
                    <li>Siswa mampu menganalisis faktor persekutuan terbesar (FPB) dari dua bilangan secara mandiri.</li>
                    <li>Siswa dapat mengaitkan pemanfaatan matematika dalam kehidupan nyata, khususnya dalam pembagian adil logistik lingkungan serta penjadwalan reboisasi hutan.</li>
                </ul>
            </Modal>
        </div>
    );
}