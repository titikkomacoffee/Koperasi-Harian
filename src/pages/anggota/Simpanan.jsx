import { useState } from 'react'

export default function Simpanan() {
  const [tab, setTab] = useState('transaksi')
  return (
    <div className="p-4 space-y-4 bg-[#f6fdf6] min-h-screen">
      <h1 className="font-bold">Manajemen Simpanan</h1>
      <div className="flex gap-2"><button onClick={()=>setTab('transaksi')} className={`px-4 py-1.5 rounded-full text-xs ${tab==='transaksi'?'bg-white border font-bold':'bg-[#e8f5e9]'}`}>Transaksi</button><button onClick={()=>setTab('jenis')} className={`px-4 py-1.5 rounded-full text-xs ${tab==='jenis'?'bg-white border font-bold':'bg-[#e8f5e9]'}`}>Jenis Simpanan</button></div>
      <div className="bg-white rounded-2xl p-4 border">
        <div className="flex justify-between items-center"><h3 className="font-bold text-sm">Data Transaksi Simpanan</h3><span className="text-[10px] text-gray-500">Total 0 transaksi untuk periode ini.</span></div>
        <button className="mt-3 bg-[#1a7a4c] text-white rounded-full px-4 py-2 text-xs">⊕ Tambah Transaksi</button>
        <div className="mt-4 flex gap-2"><select className="border rounded-full px-3 py-1 text-xs"><option>September</option></select><select className="border rounded-full px-3 py-1 text-xs"><option>2026</option></select></div>
        <div className="grid grid-cols-5 text-[10px] text-gray-500 mt-4 border-b pb-2"><span>Nama Anggota</span><span>Tipe</span><span>Jenis Simpanan</span><span>Jumlah</span><span>Tanggal</span></div>
        <p className="text-xs text-gray-400 text-center py-8">Memuat data...</p>
        <div className="flex justify-between text-[11px] text-gray-500 mt-4"><span>Halaman 1 dari 0</span><div className="flex gap-2"><button className="border rounded-full px-3 py-1">Sebelumnya</button><button className="border rounded-full px-3 py-1">Berikutnya</button></div></div>
      </div>
    </div>
  )
}
