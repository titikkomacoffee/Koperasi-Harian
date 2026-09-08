# Koperasi Harian

Aplikasi manajemen simpan pinjam pribadi (PWA) — bisa diinstall sebagai app di Android maupun dibuka lewat browser. Dibangun sebagai file statis (tanpa server backend sendiri), memakai [Supabase](https://supabase.com) sebagai database + autentikasi.

🔗 **Live app:** `https://<username-kamu>.github.io/<nama-repo>/`

---

## ✨ Fitur

- **Login & Daftar Akun** lewat Supabase Auth (email + password), ganti password sendiri
- **Data Nasabah**: Nama, No HP/WA, NIK (validasi wajib 16 digit), alamat tinggal & kerja, catatan manual
- **Status Nasabah otomatis**: Lancar / Telat 1-3 Hari / Telat 4-7 Hari / Telat >7 Hari — dihitung dari riwayat pembayaran, bukan input manual
- **Paket Pinjaman siap pakai** (tenor & fee otomatis terisi saat dipilih):

  | Paket | Tenor | Fee |
  |---|---|---|
  | Paket Cepat | 24 hari | Rp100.000 |
  | Paket Cepat Hemat | 30 hari | Rp100.000 |
  | Paket Biasa | 45 hari | Rp130.000 |
  | Paket Hemat | 60 hari | Rp175.000 |
  | Paket Santai | 70 hari | Rp25.000 |

- **Jatuh tempo pintar**: otomatis skip hari Minggu + tanggal merah/cuti bersama yang diatur admin
- **Jadwal Angsuran per pinjaman** (tanggal ke-1 s/d selesai, status Bayar/Belum)
- **Form Input Pembayaran**: pilih nasabah aktif → nominal tagihan hari ini (angsuran + denda) otomatis terisi
- **Denda otomatis** dari hari/minggu telat × setting nominal di halaman Pengaturan
- **Kuitansi digital** + tombol cetak (print) setiap selesai bayar
- **Halaman Penagihan Hari Ini**: daftar tagihan hari ini/telat, tombol "Sudah Ditagih", catatan manual per nasabah
- **Dashboard**: Total Dana Keluar, Piutang Aktif, Jasa Diterima, Jumlah Telat, grafik jasa per bulan, ringkasan donat chart
- **4 jenis Laporan PDF**: Semua Data, Piutang Aktif, Jasa Masuk, Tunggakan, + Laporan Harian pembayaran
- **Backup ke CSV** (nasabah, pinjaman, pembayaran) — langsung terbuka di Excel/Google Sheets
- **Notifikasi WhatsApp** 3 template (Sopan/Tegas/Marketing) langsung buka `wa.me`
- **Realtime sync** antar perangkat (pakai Supabase Realtime)
- **PWA**: bisa diinstall ke homescreen, jalan offline untuk tampilan (data tetap butuh internet)

---

## 🗂️ Struktur File

```
├── index.html          # seluruh aplikasi (UI + logic), single file
├── manifest.json        # konfigurasi PWA
├── sw.js                 # service worker (cache offline untuk file statis)
├── icon-192.png          # ikon app 192x192
├── icon-512.png          # ikon app 512x512
├── maskable-512.png       # ikon adaptif Android
├── logo-full.png          # logo lengkap (dipakai di halaman login)
└── README.md              # dokumentasi ini
```

## 🧱 Tech Stack

- **Frontend**: HTML + TailwindCSS (CDN) + vanilla JavaScript (tanpa framework/build step)
- **Chart**: Chart.js
- **Export PDF**: jsPDF
- **Backend**: Supabase (Postgres + Auth + Realtime), diakses langsung dari browser lewat `@supabase/supabase-js`
- **Hosting**: GitHub Pages (static hosting, gratis)

---

## 🚀 Cara Setup dari Nol

### 1. Buat Project Supabase
1. Daftar/login di [supabase.com](https://supabase.com) → buat project baru.
2. Buka **Authentication → Providers**, pastikan **Email** aktif.
3. Buka **Project Settings → API**, salin **Project URL** dan **anon public key**.
4. Buka `index.html`, cari baris berikut dan ganti dengan milikmu:
   ```js
   const SUPABASE_URL = 'https://xxxxx.supabase.co'
   const SUPABASE_ANON_KEY = 'xxxxxxxxxxxxxxxx'
   ```

### 2. Setup Database
Buka **SQL Editor** di Supabase, jalankan skrip berikut (aman dijalankan berkali-kali, akan skip yang sudah ada):

```sql
-- ============================================
-- KOPERASI HARIAN — SETUP DATABASE LENGKAP
-- ============================================

-- 1. Nasabah
create table if not exists nasabah (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  nama text not null,
  nohp text,
  nik text not null,
  alamat_tinggal text,
  alamat_kerja text,
  catatan text,
  created_at timestamp default now()
);
alter table nasabah enable row level security;
drop policy if exists "Users can manage own nasabah" on nasabah;
create policy "Users can manage own nasabah" on nasabah
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 2. Pinjaman
create table if not exists pinjaman (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  nasabah_id uuid references nasabah(id),
  nama text not null,
  nohp text,
  paket text,
  tgl_pinjam date not null,
  jenis_tenor text not null,
  lama_tenor int not null,
  jumlah_pinjam bigint not null,
  jasa bigint not null default 0,
  total bigint not null,
  jatuh_tempo date not null,
  status text not null default 'Belum Lunas',
  dibayar_telat boolean default false,
  created_at timestamp default now()
);
alter table pinjaman enable row level security;
drop policy if exists "Users can manage own data" on pinjaman;
create policy "Users can manage own data" on pinjaman
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 3. Pembayaran (ledger angsuran)
create table if not exists pembayaran (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  pinjaman_id uuid references pinjaman(id) not null,
  tanggal_bayar date not null,
  jumlah_bayar bigint not null,
  denda_dibayar bigint default 0,
  created_at timestamp default now()
);
alter table pembayaran enable row level security;
drop policy if exists "Users can manage own pembayaran" on pembayaran;
create policy "Users can manage own pembayaran" on pembayaran
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 4. Hari Libur (tanggal merah)
create table if not exists hari_libur (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  tanggal date not null,
  keterangan text,
  created_at timestamp default now()
);
alter table hari_libur enable row level security;
drop policy if exists "Users can manage own hari_libur" on hari_libur;
create policy "Users can manage own hari_libur" on hari_libur
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 5. Pengaturan (denda)
create table if not exists pengaturan (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null unique,
  denda_per_hari bigint default 0,
  denda_per_minggu bigint default 0,
  created_at timestamp default now()
);
alter table pengaturan enable row level security;
drop policy if exists "Users can manage own pengaturan" on pengaturan;
create policy "Users can manage own pengaturan" on pengaturan
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 6. Penagihan Harian
create table if not exists penagihan_harian (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  pinjaman_id uuid references pinjaman(id) not null,
  tanggal date not null,
  sudah_ditagih boolean default false,
  catatan text,
  created_at timestamp default now(),
  unique (pinjaman_id, tanggal)
);
alter table penagihan_harian enable row level security;
drop policy if exists "Users can manage own penagihan_harian" on penagihan_harian;
create policy "Users can manage own penagihan_harian" on penagihan_harian
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

NOTIFY pgrst, 'reload schema';
```

> **Catatan:** dashboard dihitung langsung di sisi aplikasi (client-side) dari data `pinjaman` + `pembayaran`, jadi tidak butuh Supabase Function/RPC tambahan.

### 3. Deploy ke GitHub Pages
1. Buat repository baru di GitHub → upload semua file di atas.
2. **Settings → Pages** → Source: branch `main`, folder `/ (root)` → Save.
3. Tunggu 1-2 menit, buka URL yang muncul.

### 4. Hubungkan Supabase Auth ke domain GitHub Pages
Di Supabase: **Authentication → URL Configuration** → isi **Site URL** dan **Redirect URLs** dengan URL GitHub Pages kamu. Tanpa ini, link verifikasi email bisa salah arah.

---

## 📱 Cara Pakai (ringkas)

1. **Daftar akun** → verifikasi email → Masuk.
2. Menu **Data Nasabah** → tambah nasabah (Nama, No HP, NIK 16 digit, alamat).
3. Menu **Data Pinjaman** → "+ Tambah Pinjaman" → pilih nasabah → pilih paket → isi jumlah pinjaman → simpan.
4. Setiap hari, cek menu **Penagihan Hari Ini** atau pakai **"Input Pembayaran"** untuk mencatat angsuran masuk.
5. Pantau semuanya lewat **Dashboard**.

Panduan lebih detail (per menu, FAQ) tersedia langsung di dalam aplikasi lewat menu **Bantuan**.

---

## 🔄 Update Aplikasi

Setiap kali mengganti isi `index.html` atau `sw.js`, **naikkan angka versi** di baris pertama `sw.js`:
```js
const CACHE_NAME = 'koperasi-harian-vX'   // naikkan angkanya tiap update
```
Ini memaksa perangkat pengguna mengambil file terbaru, bukan versi lama dari cache. Setelah upload, disarankan clear cache browser / uninstall-install ulang PWA di HP untuk memastikan versi terbaru terpakai.

---

## ⚠️ Batasan Saat Ini

- **Single admin per akun** — belum ada role Admin/Penagih/Ketua dengan hak akses berbeda dalam satu tim (tiap akun Supabase Auth hanya melihat datanya sendiri).
- **Backup** hanya export (CSV), belum ada fitur import/restore otomatis.
- Tanggal merah nasional harus diinput manual di menu Pengaturan (tidak otomatis sinkron ke kalender pemerintah).
