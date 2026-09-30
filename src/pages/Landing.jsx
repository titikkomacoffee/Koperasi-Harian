export default function Landing({ onStart }) {
  return (
    <div className="min-h-screen bg-[#f6fdf6] p-4">
      <header className="flex justify-between items-center bg-white rounded-full px-4 py-2 shadow-sm max-w-5xl mx-auto">
        <div className="flex items-center gap-2"><div className="w-7 h-7 bg-[#1a7a4c] rounded-lg grid place-items-center text-white text-xs">✓</div><span className="font-bold">Koperku</span></div>
        <div className="flex gap-2"><button onClick={onStart} className="text-xs px-3 py-1.5">Masuk</button><button onClick={onStart} className="text-xs bg-[#1a7a4c] text-white px-4 py-1.5 rounded-full">Daftar</button></div>
      </header>
      <div className="max-w-5xl mx-auto mt-8">
        <div className="bg-white rounded-[24px] p-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-[#0f2a3a] leading-tight">Kelola Koperasi Anda<br/>dengan Mudah</h1>
          <p className="text-xs text-gray-500 mt-3 max-w-md mx-auto">Koperasi, Kas, dan Tabungan Modern: Koperku adalah solusi digital untuk mengelola operasional, tingkatkan akurasi, dan berdayakan anggota Anda dengan sistem yang profesional dan mudah digunakan.</p>
          <button onClick={onStart} className="mt-6 bg-[#1a7a4c] text-white px-6 py-2.5 rounded-full text-sm font-semibold">Mulai Sekarang →</button>
        </div>
        <div className="mt-6">
          <h2 className="font-bold text-[#0f2a3a]">Fitur Unggulan Koperku</h2>
          <p className="text-[11px] text-gray-500">Semua yang Anda butuhkan untuk menjalankan koperasi yang sukses dalam satu aplikasi.</p>
          <div className="grid md:grid-cols-2 gap-3 mt-4">
            {[
              { title: 'Manajemen Anggota', desc: 'Kelola data anggota, pendaftaran, dan status keanggotaan dengan mudah dan terpusat.' },
              { title: 'Manajemen Simpanan & Kas', desc: 'Catat semua jenis simpanan, pantau saldo anggota, dan kelola arus masuk-keluar dengan akurat.' },
              { title: 'Manajemen Pinjaman', desc: 'Administrasikan siklus pinjaman secara lengkap, mulai dari pencairan, angsuran, hingga pelunasan.' },
              { title: 'Laporan Keuangan', desc: 'Hasilkan laporan neraca, laba rugi, dan arus kas secara otomatis untuk analisis keuangan.' },
            ].map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-5 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e8f5e9] grid place-items-center text-[#1a7a4c]">📋</div>
                <div><p className="font-semibold text-sm text-[#0f2a3a]">{f.title}</p><p className="text-[11px] text-gray-500 mt-1">{f.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 bg-white rounded-2xl p-5">
          <h2 className="font-bold">Tentang Koperku</h2>
          <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">Koperku dibangun dengan misi untuk memberdayakan koperasi di seluruh Indonesia melalui teknologi yang handal. Dengan alat yang tepat, setiap koperasi dapat mencapai potensi penuhnya, meningkatkan kesejahteraan anggota, dan memberikan dampak positif bagi komunitasnya. Tim kami terdiri dari para ahli di bidang keuangan dan teknologi yang berdedikasi untuk menciptakan solusi yang tidak hanya canggih, tetapi juga mudah digunakan dan diakses oleh semua kalangan.</p>
        </div>
      </div>
    </div>
  )
}
