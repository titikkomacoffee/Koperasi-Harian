import { useState } from 'react'

export default function Angsuran() {
  const [tab, setTab] = useState('belum')
  const [bulan, setBulan] = useState('September')
  return (
    <div className="p-4 space-y-4 bg-[#f6fdf6] min-h-screen">
      <h1 className="font-bold">Status Angsuran</h1>
      <div className="flex gap-2"><select value={bulan} onChange={e=>setBulan(e.target.value)} className="border rounded-full px-3 py-1.5 text-xs"><option>September</option></select><select className="border rounded-full px-3 py-1.5 text-xs"><option>2026</option></select></div>
      <div className="flex bg-white rounded-full p-1 w-fit border">
        <button onClick={()=>setTab('belum')} className={`px-4 py-1.5 rounded-full text-xs ${tab==='belum'?'bg-[#e8f5e9] text-[#1a7a4c] font-bold':''}`}>Belum Membayar (0)</button>
        <button onClick={()=>setTab('sudah')} className={`px-4 py-1.5 rounded-full text-xs ${tab==='sudah'?'bg-[#e8f5e9] text-[#1a7a4c] font-bold':''}`}>Sudah Membayar (0)</button>
      </div>
      <div className="bg-white rounded-2xl p-4 border">
        <h3 className="font-bold text-sm">{tab==='belum'?'Daftar Tunggakan Angsuran':'Daftar Angsuran Lunas'}</h3>
        <p className="text-[11px] text-gray-500">{tab==='belum'?`Anggota belum membayar angsuran untuk periode ${bulan} 2026.`:'Daftar anggota yang sudah membayar angsuran untuk periode September 2026.'}</p>
        <div className="grid grid-cols-3 text-[10px] text-gray-500 mt-4 border-b pb-2"><span>Nama Anggota</span><span>{tab==='belum'?'Angsuran':'Tgl. Bayar'}</span><span>Aksi</span></div>
        <p className="text-xs text-gray-400 text-center py-8">{tab==='belum'?'Semua anggota telah membayar.':'Belum ada anggota yang membayar.'}</p>
      </div>
    </div>
  )
}
