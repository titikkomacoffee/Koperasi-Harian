export default function LaporanKeuangan() {
  return (
    <div className="p-4 lg:p-6">
      <div className="card p-5">
        <h2 className="font-bold">Laporan Keuangan - Laporan / Export</h2>
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="bg-gray-50 rounded-xl p-4 text-center"><p className="text-xs">Total Perputaran</p><p className="font-bold">Rp 2.060.003</p></div>
          <div className="bg-gray-50 rounded-xl p-4 text-center"><p className="text-xs">Jasa Terkumpul</p><p className="font-bold">Rp 60.003</p></div>
          <div className="bg-gray-50 rounded-xl p-4 text-center"><p className="text-xs">Dana Keluar</p><p className="font-bold">Rp 2.000.000</p></div>
        </div>
      </div>
    </div>
  )
}
