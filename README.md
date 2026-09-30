# Koperasi Tri Putra Abadi - Koperasi Harian (Koperku Clone)

> Melayani Pinjaman Dengan Tenor Yang Sesuai Dengan Keadaan Dan suku Bunga Yang Rendah dan Sangat ringan untuk semua

Aplikasi web koperasi harian modern, clone dari **Koperku** (video reference), dengan fitur lengkap untuk mengelola anggota, simpanan, pinjaman, angsuran, kas & bank, pendapatan, biaya operasional, dan laporan.

**Live Demo:** https://titikkomacoffee.github.io/Koperasi-Harian/  
**Repo:** https://github.com/titikkomacoffee/Koperasi-Harian

---

## ✨ Fitur Sesuai Video Koperku

### Landing Page (Koperku Style)
- Hero: "Kelola Koperasi Anda dengan Mudah"
- Fitur Unggulan: Manajemen Anggota, Simpanan & Kas, Pinjaman, Laporan Keuangan
- Tentang Koperku

### Auth
- Login: `Masuk ke Akun Anda` - Email `koperasitriputraabadi@gmail.com`
- Error handling: `Login Gagal Email atau kata sandi salah.` (sesuai video)
- Register dengan Kode Koperasi `KH-803EDF`

### Dashboard
- Filter: Bulan `September` + Tahun `2026`
- 4 Kartu Rp 0 (sesuai video):
  - Total Pendapatan (Bulanan)
  - Total Saldo Simpanan (Bulanan)
  - Total Biaya (Bulanan)
  - Laba/Rugi (Bulanan)
- Aktivitas 6 Bulan Terakhir

### Menu Sidebar (11 Menu - Persis Video)
1. **Dashboard** - `/`
2. **Kas & Bank** - `/kas-bank` - Transfer Dana, Akun Baru, Kas Allo Bank `085142977371`, Kas BCA `3141923739`, Kas Tunai, Mutasi
3. **Simpanan Wajib** - `/simpanan-wajib` - Daftar Tunggakan (0)
4. **Simpanan** - `/anggota/simpanan` - Manajemen Simpanan, Transaksi, Jenis Simpanan, Tambah Transaksi
5. **Angsuran** - `/anggota/angsuran` - Status Angsuran, Belum Membayar (0), Sudah Membayar (0), Daftar Tunggakan
6. **Pendapatan** - `/pendapatan` - Transaksi, Jenis Pendapatan, Catat Pendapatan
7. **Biaya Operasional** - `/biaya-operasional` - Transaksi, Jenis Biaya, Catat Biaya, BBM Marketing, BBM Penagih
8. **Pinjaman** - `/anggota/pinjaman` - Manajemen Pinjaman, Daftar Pinjaman, Master Kategori, Tambah Pinjaman + **Tabel Angsuran 60 Pilihan**
9. **Anggota** - `/anggota` - Manajemen Anggota, Export Excel, Tambah Anggota
10. **Laporan** - `/laporan` - Operasional (Simpanan Anggota, Arus Kas, Neraca, Laba Rugi, Pinjaman Beredar, Riwayat Transaksi) + Analisis Tahunan (Jumlah Anggota, Neraca Perbandingan, SHU)
11. **Kelola Pendaftaran** - `/pengurus/anggota` - Kode Koperasi `KH-803EDF Salin`, Pendaftaran Penagih, Pendaftaran Nasabah (Lihat KTP, Selfie, Setujui, Tolak), Semua Anggota Tim
12. **Pengaturan** - `/pengurus/pengaturan` - Profil Koperasi, Logo (FIX tidak bisa diklik)

### Tabel Angsuran (Sesuai Gambar)
**Harian:** 24 Hari, 30 Hari, 45 Hari, 60 Hari, 70 Hari
- Rp200rb → 13rb/24H, 10rb/30H
- Rp500rb → 25rb/24H, 20rb/30H, 15rb/45H
- Rp700rb → 35rb/24H, 30rb/30H, 20rb/45H, 15rb/60H, 13rb/70H
- Rp1jt → 50rb/24H, 40rb/30H, 30rb/45H, 20rb/60H, 10rb/70H

**Bulanan:** 3 Bulan, 6 Bulan, 9 Bulan, 12 Bulan, 15 Bulan
- Rp500rb - Rp5jt: Rp200rb-55rb (3-15 Bln) s/d Rp1.720.000-360rb

Total 60 pilihan di `src/utils/tabelAngsuran.js`

---

## 🏗️ Struktur Folder (Clean)

```
Koperasi-Harian/
├── index.html                      # Entry + favicon /Koperasi-Harian/ + Tailwind CDN
├── vite.config.js                  # base: '/Koperasi-Harian/' (FIX blank page)
├── package.json                    # React 18, Router 6, Supabase 2
├── public/
│   ├── 404.html                    # SPA fallback GitHub Pages
│   └── favicon.ico
├── .github/
│   └── workflows/deploy.yml        # Auto deploy ke gh-pages
├── src/
│   ├── main.jsx                    # ReactDOM root
│   ├── App.jsx                     # Router basename /Koperasi-Harian + 14 routes
│   ├── index.css
│   ├── assets/
│   │   └── images/logo.png
│   ├── config/
│   │   ├── supabase.js             # https://eiosyymlsfxxsdgnxqif.supabase.co (project baru)
│   │   └── pakasir.js              # Pakasir QRIS config
│   ├── context/
│   │   └── AuthContext.jsx         # Login, role, koperasi
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx          # Navbar hijau Koperku
│   │   │   ├── Sidebar.jsx         # Sidebar 11 menu Koperku
│   │   │   └── ProtectedRoute.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       └── BadgeStatus.jsx
│   ├── utils/
│   │   ├── tabelAngsuran.js        # 60 pilihan tenor sesuai gambar (BARU)
│   │   └── formatCurrency.js
│   ├── services/
│   │   ├── pinjamanService.js
│   │   └── simpananService.js
│   └── pages/
│       ├── Landing.jsx             # Landing Koperku (BARU)
│       ├── NotFound.jsx
│       ├── KasBank.jsx             # Kas & Bank - 3 akun Rp 0 (BARU)
│       ├── SimpananWajib.jsx       # Simpanan Wajib (BARU)
│       ├── Pendapatan.jsx          # Pendapatan (BARU)
│       ├── BiayaOperasional.jsx    # Biaya Operasional + Jenis Biaya (BARU)
│       ├── Anggota.jsx             # Manajemen Anggota (BARU)
│       ├── Laporan.jsx             # Laporan Operasional + Tahunan (BARU)
│       ├── auth/
│       │   ├── Login.jsx           # Login hijau + error merah (FIX)
│       │   └── Register.jsx
│       ├── anggota/
│       │   ├── Dashboard.jsx       # Dashboard Rp 0 September 2026 (FIX)
│       │   ├── Simpanan.jsx        # Manajemen Simpanan (FIX)
│       │   ├── Pinjaman.jsx        # Manajemen Pinjaman + tabel 60 (FIX)
│       │   └── Angsuran.jsx        # Status Angsuran Belum/Sudah (FIX)
│       └── pengurus/
│           ├── DashboardAdmin.jsx
│           ├── KelolaAnggota.jsx    # Pendaftaran Penagih/Nasabah + Notifikasi (FIX)
│           ├── VerifikasiPinjaman.jsx
│           ├── LaporanKeuangan.jsx
│           └── Pengaturan.jsx      # Logo upload FIX tidak bisa diklik (BARU)
└── supabase/
    └── functions/
        ├── pakasir-qris/index.ts    # Edge function QRIS slug kasir-toko-saya
        └── pakasir-webhook/index.ts
```

---

## 🚀 Cara Upload ke GitHub (HP - Sesuai Screenshot)

Screenshot kamu: `github.com/titikkomacoffee/Koperasi-Harian` dark mode, baru ada 4 PNG.

1. **Download ZIP** (sudah include struktur bersih di atas)
2. Buka repo di Chrome HP > klik `...` > `Upload files`
3. Drag folder `src`, `public`, file `index.html`, `vite.config.js`, `package.json`, `.github`
4. Commit: `Update Koperku full fitur + tabel angsuran + fix logo`
5. Tunggu Actions hijau
6. Buka https://titikkomacoffee.github.io/Koperasi-Harian/ > Hard refresh Ctrl+Shift+R

**Via Git:**
```bash
git clone https://github.com/titikkomacoffee/Koperasi-Harian.git
cd Koperasi-Harian
# copy file Koperku ke sini
npm install
npm run build
git add .
git commit -m "Koperku full fitur"
git push origin main
```

---

## 🔑 Supabase Project Baru

- URL: `https://eiosyymlsfxxsdgnxqif.supabase.co`
- Anon Key: `eyJhbGci...7vACrpdn8...`
- File: `src/config/supabase.js`
- Tables: `profiles`, `nasabah`, `pinjaman`, `koperasi`, `notifikasi`, `qris_transaksi`

**Fix Login Gagal:** Buat user di Dashboard > Authentication > Users > Add user > `koperasitriputraabadi@gmail.com` + Auto Confirm

---

## 🎨 Tema

- Primary: `#1a7a4c` (hijau Koperku)
- Background: `#f6fdf6`
- Card: `rounded-2xl border`
- Button: `rounded-full`

---

## 📦 Build

```bash
npm install
npm run dev      # localhost:3000
npm run build    # dist/
```

---

© 2026 KOPERASI TRI PUTRA ABADI • KH-803EDF • Jl. Sesawi No.22 Surabaya
