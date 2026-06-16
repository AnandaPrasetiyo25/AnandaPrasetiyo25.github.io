// src/mathFunctions.js

// 1. Algoritma Euclidean untuk pencarian FPB
export const hitungFPB = (a, b) => {
    a = Math.abs(a);
    b = Math.abs(b);
    if (b === 0) return a;
    return hitungFPB(b, a % b);
};

// 2. Kalkulasi KPK melalui hasil FPB
export const hitungKPK = (a, b) => {
    a = Math.abs(a);
    b = Math.abs(b);
    if (a === 0 || b === 0) return 0;
    return (a * b) / hitungFPB(a, b);
};

// 3. Algoritma dekomposisi Pohon Faktor (Faktorisasi Prima)
export const buatFaktorisasiPrima = (angka) => {
    // Perbaikan: Memberikan nilai awal berupa array kosong
    let himpunanFaktor = []; 
    let pembagiPrima = 2;
    while (angka >= 2) {
        if (angka % pembagiPrima === 0) {
            himpunanFaktor.push(pembagiPrima);
            angka = angka / pembagiPrima;
        } else {
            pembagiPrima++;
        }
    }
    return himpunanFaktor;
};

// 4. Formatter tampilan eksponensial (Contoh: 2^2 x 3)
export const formatTampilanFaktor = (faktorArray) => {
    if (faktorArray.length === 0) return "Tidak ada";
    const hitungKemunculan = {};
    faktorArray.forEach((angka) => {
        hitungKemunculan[angka] = (hitungKemunculan[angka] || 0) + 1;
    });
    const arrayFormat = Object.keys(hitungKemunculan).map(prima => {
        if (hitungKemunculan[prima] > 1) {
            return `${prima}^${hitungKemunculan[prima]}`;
        }
        return prima;
    });
    return arrayFormat.join(' x ');
};

// 5. Generator Kuis Otomatis Berwawasan Lingkungan
export const buatSoalCeritaLingkungan = () => {
    const angka1 = Math.floor(Math.random() * 10) + 4;
    const angka2 = Math.floor(Math.random() * 10) + 4;
    
    if (angka1 === angka2) return buatSoalCeritaLingkungan();

    const fpb = hitungFPB(angka1, angka2);
    const kpk = hitungKPK(angka1, angka2);

    // Perbaikan: Mengisi array bankSoal dengan objek data misi
    const bankSoal = [
        {
            tipe: 'Misi Pembagian (FPB)',
            narasi: `Kamu memimpin tim konservasi dengan ${angka1} bibit bakau dan ${angka2} bibit cemara laut. Jika kamu ingin membagikannya secara merata ke dalam beberapa zona tanam, berapa zona tanam terbanyak yang bisa dibuat?`,
            jawabanBenar: fpb,
            pembahasan: `Jumlah zona tanam terbanyak adalah FPB dari ${angka1} dan ${angka2}, yaitu ${fpb} zona.`
        },
        {
            tipe: 'Misi Jadwal (KPK)',
            narasi: `Tim patroli darat berkeliling hutan setiap ${angka1} hari sekali, sedangkan tim drone memantau dari udara setiap ${angka2} hari sekali. Jika hari ini mereka bertugas bersama, berapa hari lagi mereka akan bertugas bersamaan kembali?`,
            jawabanBenar: kpk,
            pembahasan: `Mereka akan bertemu lagi berdasarkan hitungan KPK dari ${angka1} dan ${angka2}, yaitu pada hari ke-${kpk}.`
        }
    ];
    
    // Perbaikan: Memilih satu soal secara acak menggunakan panjang array bankSoal
    const indexAcak = Math.floor(Math.random() * bankSoal.length);
    return bankSoal[indexAcak];
};