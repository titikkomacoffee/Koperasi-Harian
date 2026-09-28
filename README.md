# Koperasi Tri Putra Abadi - FINAL SECURE (Supabase + Pakasir)

## Struktur (sesuai request)
├── index.html          # seluruh aplikasi (UI + logic), single file
├── manifest.json       # konfigurasi PWA (icon bulat)
├── sw.js               # service worker + TEMPAT AMAN SUPABASE URL
├── icon-192.png        # ikon bulat 192
├── icon-512.png        # ikon bulat 512
├── maskable-512.png    # ikon adaptif Android (bulat)
├── logo-full.png       # logo HD bulat untuk login
├── icon-bulat-*.png    # varian bulat tambahan
└── supabase/functions/pakasir-qris/index.ts  # Edge Function agar API Key Pakasir aman

## Keamanan Baru (sesuai request "Pakasir dari Supabasenya agar aman")

1.  **URL Supabase TIDAK di index.html** lagi.
    - Ada di `sw.js` baris 3-4: `SUPABASE_URL` dan `SUPABASE_ANON_KEY`
    - Ganti di sana saja, lalu push. index.html akan otomatis minta via postMessage.

2.  **API Key Pakasir TIDAK di frontend / Github.**
    - Disimpan di tabel `pengaturan` kolom `pakasir_api_key` & `pakasir_qris_id`
    - ATAU lebih aman lagi: simpan di Supabase Vault + Edge Function (lihat /supabase/functions/pakasir-qris)
    - Frontend TIDAK pernah panggil api.pakasir.com langsung.
    - Frontend panggil: `supabase.functions.invoke('pakasir-qris', { body: { amount, pinjaman_id } })`
    - Edge Function yang akan baca api key dari Vault/pengaturan dan buat QRIS.

## Cara Deploy:

### A. Github Pages
1. Ganti `sw.js` line 3-4 dengan URL & ANON KEY project kamu (dari screenshot: Koperasi Pribadi / main PRODUCTION)
2. Upload semua file di folder ini ke repo `titikkomacoffee`
3. Aktifkan Pages: Settings > Pages > Branch main / root

### B. Supabase Edge Function (Wajib agar Pakasir aman)
1. Install Supabase CLI: `npm i supabase --save-dev`
2. `npx supabase login`
3. `npx supabase link --project-ref YOUR_PROJECT_ID`
4. `npx supabase functions deploy pakasir-qris --no-verify-jwt`
5. Set secret: `npx supabase secrets set PAKASIR_API_KEY=xxx PAKASIR_QRIS_ID=yyy`

### C. Tabel yang dipakai (sudah ada di screenshot kamu)
- koperasi, nasabah, pinjaman, penagihan_harian, pembayaran, qris_transaksi, pengaturan, hari_libur, profiles

Flow: Input Nasabah -> Pinjaman -> auto generate penagihan_harian -> di menu Tagihan Hari Ini klik Bayar QRIS -> panggil Edge Function -> QR muncul -> nasabah scan -> webhook Pakasir -> update qris_transaksi status=paid -> pembayaran tercatat.

## Kenapa aman?
- Github hanya lihat anon key (memang boleh public, dilindungi RLS)
- Pakasir secret key tidak pernah keluar di JS, hanya di server Supabase
- sw.js di-cache tapi tidak di-index Google, dan bisa di-replace via Edge Function jika perlu rotate key