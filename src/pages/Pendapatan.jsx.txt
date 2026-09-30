import { useState } from 'react'
export default function Pendapatan() {
  const [tab, setTab] = useState('transaksi')
  return (
    <div className="p-4 space-y-4 bg-[#f6fdf6] min-h-screen">
      <h1 className="font-bold">Pendapatan</h1>
      <div className="flex gap-2"><button onClick={()=>setTab('transaksi')} className={`px-4 py-1 rounded-full text-xs ${tab==='transaksi'?'bg-white border font-bold':'bg-[#e8f5e9]'}`}>Transaksi</button><button onClick={()=>setTab('jenis')} className={`px-4 py-1 rounded-full text-xs ${tab==='jenis'?'bg-white border font-bold':'bg-[#e8f5e9]'}`}>Jenis Pendapatan</button></div>
      <div className="bg-white rounded-2xl p-4 border">
        <p className="text-xs text-gray-500">Total pendapatan bulan ini: Rp 0</p>
        <button className="mt-3 bg-[#1a7a4c] text-white rounded-full px-4 py-2 text-xs">⊕ Catat Pendapatan</button>
        <div className="mt-4 flex gap-2"><select className="border rounded-full px-3 py-1 text-xs"><option>September</option></select><select className="border rounded-full px-3 py-1 text-xs"><option>2026</option></select></div>
        <div className="grid grid-cols-4 text-[10px] text-gray-500 mt-4 border-b pb-2"><span>Tanggal</span><span>Jenis Pendapatan</span><span>Keterangan</span><span>Jumlah</span></div>
        <p className="text-xs text-gray-400 text-center py-8">Belum ada pendapatan tercatat.</p>
      </div>
    </div>
  )
}
