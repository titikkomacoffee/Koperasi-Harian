# Koperasi Tri Putra Abadi - Koperasi Harian (Final Fix 2026)

> **Aplikasi koperasi harian modern - Fix total tambah/edit/hapus + tanggal merah + pengaturan koperasi**

Live: https://titikkomacoffee.github.io/Koperasi-Harian/  
Supabase: https://eiosyymlsfxxsdgnxqif.supabase.co

---

## ✅ Yang Sudah Diperbaiki (Dari Screenshot Kamu)

### 1. Dropdown Tabel Angsuran Hitam Jelek (Android)
- **Sebelum:** `select` native optgroup hitam di Android
- **Sekarang:** `ModernSelect.jsx` - putih, glassmorphism, tab Harian/Bulanan, search, animasi kekinian
- File: `src/components/common/ModernSelect.jsx`

### 2. Error Supabase `angsuran_per_periode` tidak ada
```sql
Error: Could not find the 'angsuran_per_periode' column of 'pinjaman' in the schema cache
```
- Fix: Pinjaman.jsx sekarang kirim hanya kolom yang ada: `jumlah, tenor, angsuran, tipe, status`
- Fallback minimal jika kolom belum ada + SQL migrasi di bawah

### 3. Semua Tombol Tambah/Edit/Hapus Tidak Jalan
Dibuat komponen universal:
- `src/components/common/KategoriManager.jsx` - bisa input, edit, hapus kategori
- Dipakai di:
  - **BiayaOperasional** → Tab Jenis Biaya (BBM Marketing, BBM Penagih, dll)
  - **Simpanan** → Tab Jenis Simpanan (Wajib, Pokok, Sukarela, Lebaran)
  - **KasBank** → Tambah/edit/hapus akun bank + kategori
  - **SimpananWajib** → Tambah/edit/hapus simpanan wajib per anggota
  - **Pinjaman** → Daftar pinjaman dengan edit status & hapus

Semua simpan ke Supabase + fallback localStorage agar tetap jalan walau RLS belum setting.

### 4. Pengaturan - Nama Koperasi, Alamat, Telpon, Logo Tidak Bisa Save
- **Sebelum:** `supabase.from('koperasi').update().eq('id', null)` gagal + bucket `logo-koperasi` private
- **Sekarang:** 
  - Load dari `koperasi` context OR `localStorage.getItem('koperasi_profile')` fallback
  - Save lokal dulu biar langsung terlihat, lalu coba update Supabase, jika belum ada koperasi → insert baru
  - Logo coba 4 bucket: `logo-koperasi`, `koperasi-assets`, `logos`, `koperasi` - jika semua private, fallback base64 lokal
  - Nama, Alamat, Telpon sekarang ada `*` required + alert sukses detail

### 5. Pengaturan - Tanggal Merah & Minggu Libur
- Input tanggal merah (date + keterangan), list, hapus
- Toggle **Minggu Libur** (default ON) → semua Minggu auto libur, tidak ada transaksi
- Toggle **Geser ke Senin** (default ON) → tagihan yang jatuh Minggu/tanggal merah otomatis geser ke Senin
- Logic `getNextKerja()` untuk hitung hari kerja berikutnya
- Simpan di `localStorage: tanggal_merah, libur_minggu, geser_senin`

### 6. Pengaturan - Ganti Password
- Ganti password sendiri via `supabase.auth.updateUser()`
- Reset password user lain (admin/penagih/nasabah) via `resetPasswordForEmail` - kirim link ke email user

---

## 🏗️ Struktur Terbaru (Clean - 2026-10-01)

```
koperasi-app/
├── index.html (Tailwind CDN + favicon + Plus Jakarta Sans)
├── vite.config.js (base: /Koperasi-Harian/ - fix blank page GitHub Pages)
├── package.json (React 18, Router 6, Supabase 2)
├── public/
│   ├── 404.html (SPA fallback GitHub Pages)
│   └── favicon.ico
├── supabase/
│   └── functions/
│       ├── pakasir-qris/index.ts
│       └── pakasir-webhook/index.ts
├── src/
│   ├── main.jsx
│   ├── App.jsx (Router + 14 routes + basename /Koperasi-Harian)
│   ├── index.css
│   ├── assets/images/logo.png
│   ├── config/
│   │   ├── supabase.js (URL: eiosyymlsfxxsdgnxqif.supabase.co)
│   │   ├── pakasir.js (QRIS config kasir-toko-saya)
│   │   └── midtrans.js
│   ├── context/
│   │   └── AuthContext.jsx (login, role owner/admin/penagih/nasabah)
│   ├── components/common/
│   │   ├── Navbar.jsx (hijau Koperku + profile dropdown)
│   │   ├── Sidebar.jsx (11 menu + role filter)
│   │   ├── ProtectedRoute.jsx
│   │   ├── ModernSelect.jsx [BARU - FIX DROPDOWN HITAM]
│   │   ├── KategoriManager.jsx [BARU - FIX CRUD KATEGORI]
│   │   └── ModalPayment.jsx
│   ├── components/ui/
│   │   ├── Button.jsx
│   │   └── BadgeStatus.jsx
│   ├── utils/
│   │   ├── tabelAngsuran.js (60 pilihan: Harian 24H-70H, Bulanan 3-15 Bln)
│   │   ├── formatCurrency.js
│   │   └── formatDate.js
│   ├── services/
│   │   ├── pinjamanService.js
│   │   ├── simpananService.js
│   │   └── paymentService.js
│   └── pages/
│       ├── Landing.jsx (Hero Koperku)
│       ├── NotFound.jsx
│       ├── KasBank.jsx [FIX - bisa tambah/edit/hapus akun]
│       ├── SimpananWajib.jsx [FIX - CRUD]
│       ├── Pendapatan.jsx
│       ├── BiayaOperasional.jsx [FIX - CRUD + Kategori]
│       ├── Anggota.jsx
│       ├── Laporan.jsx
│       ├── auth/
│       │   ├── Login.jsx (error merah sesuai video)
│       │   └── Register.jsx (kode KH-803EDF)
│       ├── anggota/
│       │   ├── Dashboard.jsx (4 kartu Rp 0, filter September 2026)
│       │   ├── Simpanan.jsx [FIX - CRUD + Kategori]
│       │   ├── Pinjaman.jsx [FIX - ModernSelect + CRUD daftar + fix angsuran_per_periode]
│       │   └── Angsuran.jsx (Belum/Sudah bayar)
│       └── pengurus/
│           ├── DashboardAdmin.jsx
│           ├── KelolaAnggota.jsx (Setujui/Tolak + notifikasi)
│           ├── VerifikasiPinjaman.jsx
│           ├── LaporanKeuangan.jsx
│           └── Pengaturan.jsx [FINAL FIX - Nama/Alamat/Telpon/Logo + Tanggal Merah + Password]
├── SUPABASE_FULL_SETUP_NEW_PROJECT.sql (setup awal project baru)
└── FIX_ERROR_23502.sql (fix error pengaturan user_id)
```

---

## 🔧 SQL Supabase Terbaru (Wajib Jalankan)

Jalankan di Supabase Dashboard > SQL Editor:

```sql
-- FIX KOPERASI - biar nama, alamat, telpon, logo_url bisa diupdate
ALTER TABLE koperasi ADD COLUMN IF NOT EXISTS nama_koperasi TEXT;
ALTER TABLE koperasi ADD COLUMN IF NOT EXISTS alamat TEXT;
ALTER TABLE koperasi ADD COLUMN IF NOT EXISTS telepon TEXT;
ALTER TABLE koperasi ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE koperasi ADD COLUMN IF NOT EXISTS kode_unik TEXT;

-- FIX PINJAMAN
ALTER TABLE pinjaman ADD COLUMN IF NOT EXISTS angsuran INT;
ALTER TABLE pinjaman ADD COLUMN IF NOT EXISTS tipe TEXT;
ALTER TABLE pinjaman ADD COLUMN IF NOT EXISTS label TEXT;
ALTER TABLE pinjaman ADD COLUMN IF NOT EXISTS angsuran_per_periode INT;
ALTER TABLE pinjaman ADD COLUMN IF NOT EXISTS tipe_angsuran TEXT;
ALTER TABLE pinjaman ADD COLUMN IF NOT EXISTS paket TEXT;
ALTER TABLE pinjaman ADD COLUMN IF NOT EXISTS koperasi_id UUID;
ALTER TABLE pinjaman ADD COLUMN IF NOT EXISTS nasabah_id UUID;

-- BUAT TABEL KATEGORI
CREATE TABLE IF NOT EXISTS jenis_biaya (id BIGSERIAL PRIMARY KEY, nama TEXT NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS jenis_simpanan (id BIGSERIAL PRIMARY KEY, nama TEXT NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS kategori_kas (id BIGSERIAL PRIMARY KEY, nama TEXT NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS simpanan (id BIGSERIAL PRIMARY KEY, nama_anggota TEXT, tipe TEXT, jenis TEXT, jumlah BIGINT, tanggal DATE, created_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS biaya_operasional (id BIGSERIAL PRIMARY KEY, tanggal DATE, jenis TEXT, jumlah BIGINT, keterangan TEXT, created_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS simpanan_wajib (id BIGSERIAL PRIMARY KEY, nama_anggota TEXT, bulan TEXT, tahun TEXT, jumlah BIGINT, status TEXT DEFAULT 'belum', created_at TIMESTAMPTZ DEFAULT NOW());

-- RLS ALLOW ALL (dev) - dari screenshot kamu masih block
ALTER TABLE koperasi ENABLE ROW LEVEL SECURITY;
ALTER TABLE pinjaman ENABLE ROW LEVEL SECURITY;
ALTER TABLE jenis_biaya ENABLE ROW LEVEL SECURITY;
ALTER TABLE jenis_simpanan ENABLE ROW LEVEL SECURITY;
ALTER TABLE kategori_kas ENABLE ROW LEVEL SECURITY;
ALTER TABLE simpanan ENABLE ROW LEVEL SECURITY;
ALTER TABLE biaya_operasional ENABLE ROW LEVEL SECURITY;
ALTER TABLE simpanan_wajib ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow all" ON koperasi FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow all" ON pinjaman FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow all" ON jenis_biaya FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow all" ON jenis_simpanan FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow all" ON kategori_kas FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow all" ON simpanan FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow all" ON biaya_operasional FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow all" ON simpanan_wajib FOR ALL USING (true) WITH CHECK (true);

-- STORAGE PUBLIC (screenshot kamu bucket logo-koperasi private)
INSERT INTO storage.buckets (id, name, public) VALUES ('logo-koperasi','logo-koperasi', true) ON CONFLICT (id) DO UPDATE SET public = true;
INSERT INTO storage.buckets (id, name, public) VALUES ('koperasi-assets','koperasi-assets', true) ON CONFLICT (id) DO UPDATE SET public = true;

CREATE POLICY "public read" ON storage.objects FOR SELECT USING (bucket_id IN ('logo-koperasi','koperasi-assets','logos'));
CREATE POLICY "allow upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id IN ('logo-koperasi','koperasi-assets','logos'));
CREATE POLICY "allow update" ON storage.objects FOR UPDATE USING (bucket_id IN ('logo-koperasi','koperasi-assets','logos'));
CREATE POLICY "allow delete" ON storage.objects FOR DELETE USING (bucket_id IN ('logo-koperasi','koperasi-assets','logos'));
```

---

## 🚀 Cara Deploy

```bash
npm install
npm run dev   # localhost:3000
npm run build # dist/
```

GitHub Pages: push ke main → Actions auto deploy → https://titikkomacoffee.github.io/Koperasi-Harian/?v=final

---

## 📱 Fitur Sesuai Video Koperku + Fix Tambahan

- 11 Menu sidebar persis video
- Dashboard 4 kartu Rp 0 September 2026
- Kas & Bank: Allo Bank 085142977371, BCA 3141923739, Kas Tunai
- Pinjaman: 60 pilihan tenor (tabel angsuran sesuai gambar)
- Pengaturan: Nama koperasi, alamat, telepon, logo, tanggal merah Minggu libur geser Senin, ganti password
- Kelola Pendaftaran: Kode KH-803EDF, Setujui/Tolak, Lihat KTP/Selfie

---

© 2026 KOPERASI TRI PUTRA ABADI • KH-803EDF • Surabaya
Final Fix: Dropdown kekinian + CRUD semua kategori + Pengaturan lengkap
