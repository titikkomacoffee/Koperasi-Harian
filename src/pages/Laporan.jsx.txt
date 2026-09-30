export default function Laporan() {
  const laporanList = [
    { title: 'Laporan Simpanan Anggota', desc: 'Rincian total simpanan per anggota.', op: 'Operasional' },
    { title: 'Laporan Arus Kas', desc: 'Melacak pergerakan kas masuk dan keluar dari koperasi.', op: 'Operasional' },
    { title: 'Laporan Neraca', desc: 'Ringkasan posisi keuangan koperasi pada tanggal tertentu.', op: 'Operasional' },
    { title: 'Laporan Laba Rugi', desc: 'Menunjukkan pendapatan dan pengeluaran koperasi dalam periode tertentu.', op: 'Operasional' },
    { title: 'Laporan Pinjaman Beredar', desc: 'Daftar semua pinjaman yang masih aktif beserta rinciannya.', op: 'Operasional' },
    { title: 'Riwayat Transaksi', desc: 'Buku kas digital yang mencatat semua transaksi keuangan.', op: 'Operasional' },
    { title: 'Laporan Jumlah Anggota Tahunan', desc: 'Grafik pertumbuhan jumlah anggota baru dari tahun ke tahun.', op: 'Analisis Tahunan' },
    { title: 'Laporan Neraca Perbandingan', desc: 'Bandingan posisi keuangan koperasi dari tahun ke tahun.', op: 'Analisis Tahunan' },
    { title: 'Laporan SHU per Anggota', desc: 'Perhitungan Sisa Hasil Usaha yang akan dibagikan kepada anggota.', op: 'Analisis Tahunan' },
  ]

  return (
    <div className="p-4 space-y-4 bg-[#f6fdf6] min-h-screen">
      <h1 className="font-bold">Laporan Operasional</h1>
      <p className="text-[11px] text-gray-500">Laporan yang dapat difilter berdasarkan periode bulan dan tahun.</p>
      {laporanList.filter(l=>l.op==='Operasional').map(l=>(
        <div key={l.title} className="bg-white rounded-2xl p-4 border">
          <p className="font-bold text-sm">{l.title}</p>
          <p className="text-[11px] text-gray-500 mt-1">{l.desc}</p>
          <button className="mt-3 bg-[#1a7a4c] text-white rounded-full px-4 py-2 text-xs">Lihat Laporan →</button>
        </div>
      ))}
      <h1 className="font-bold mt-6">Laporan Analisis Tahunan</h1>
      <p className="text-[11px] text-gray-500">Laporan untuk analisis tren dan perbandingan dari waktu ke waktu.</p>
      {laporanList.filter(l=>l.op==='Analisis Tahunan').map(l=>(
        <div key={l.title} className="bg-white rounded-2xl p-4 border">
          <p className="font-bold text-sm">{l.title}</p>
          <p className="text-[11px] text-gray-500 mt-1">{l.desc}</p>
          <button className="mt-3 bg-[#1a7a4c] text-white rounded-full px-4 py-2 text-xs">Lihat Laporan →</button>
        </div>
      ))}
    </div>
  )
}
