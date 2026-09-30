import { useState } from 'react'
export default function BiayaOperasional() {
  const [tab, setTab] = useState('transaksi')
  return (
    <div className="p-4 space-y-4 bg-[#f6fdf6] min-h-screen">
      <h1 className="font-bold">Biaya Operasional</h1>
      <div className="flex gap-2"><button onClick={()=>setTab('transaksi')} className={`px-4 py-1 rounded-full text-xs ${tab==='transaksi'?'bg-white border font-bold':'bg-[#e8f5e9]'}`}>Transaksi</button><button onClick={()=>setTab('jenis')} className={`px-4 py-1 rounded-full text-xs ${tab==='jenis'?'bg-white border font-bold':'bg-[#e8f5e9]'}`}>Jenis Biaya</button></div>
      <div className="bg-white rounded-2xl p-4 border">
        <p className="text-xs">Total biaya bulan ini: Rp 0</p>
        <button className="mt-3 bg-[#1a7a4c] text-white rounded-full px-4 py-2 text-xs">⊕ Catat Biaya</button>
        <div className="mt-4 flex gap-2"><select className="border rounded-full px-3 py-1 text-xs"><option>September</option></select><select className="border rounded-full px-3 py-1 text-xs"><option>2026</option></select></div>
        <div className="grid grid-cols-3 text-[10px] text-gray-500 mt-4 border-b pb-2"><span>Tanggal</span><span>Jenis Biaya</span><span>Jumlah</span></div>
        <p className="text-xs text-gray-400 text-center py-8">Belum ada biaya tercatat.</p>
        <div className="mt-6"><p className="text-xs font-bold">Jenis Biaya</p><p className="text-[11px] text-gray-500">Kelola master data untuk kategori biaya operasional.</p>
          <button className="mt-2 bg-[#1a7a4c] text-white rounded-full px-4 py-2 text-xs">⊕ Tambah Jenis</button>
          <div className="mt-3 space-y-2 text-xs"><div className="flex justify-between border-b py-2"><span>BBM Marketing</span><span>...</span></div><div className="flex justify-between border-b py-2"><span>BBM Penagih</span><span>...</span></div><div className="flex justify-between border-b py-2"><span>Perjalanan Dinas Luar</span><span>...</span></div></div>
        </div>
      </div>
    </div>
  )
}
