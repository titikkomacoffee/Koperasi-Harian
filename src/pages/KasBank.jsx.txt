import { useState, useEffect } from 'react'
import { supabase } from '../../config/supabase.js'

export default function KasBank() {
  const [akun, setAkun] = useState([
    { nama: 'Kas Allo Bank', no: '085142977371', saldo: 0 },
    { nama: 'Kas BCA', no: '3141923739', saldo: 0 },
    { nama: 'Kas Tunai', no: 'Kas tunai', saldo: 0 },
  ])
  const [tab, setTab] = useState('akun')

  return (
    <div className="p-4 space-y-4 bg-[#f6fdf6] min-h-screen">
      <h1 className="font-bold text-lg">Kas & Bank</h1>
      <div className="flex gap-2">
        <button className="border rounded-full px-4 py-2 text-xs bg-white">↔ Transfer Dana</button>
        <button className="bg-[#1a7a4c] text-white rounded-full px-4 py-2 text-xs">⊕ Akun Baru</button>
      </div>
      <div className="flex gap-2">
        <button onClick={()=>setTab('akun')} className={`px-4 py-2 rounded-full text-xs ${tab==='akun'?'bg-[#e8f5e9] text-[#1a7a4c] font-bold':'bg-white'}`}>🏦 Akun</button>
        <button onClick={()=>setTab('mutasi')} className={`px-4 py-2 rounded-full text-xs ${tab==='mutasi'?'bg-[#e8f5e9]':'bg-white'}`}>⇄ Mutasi</button>
      </div>

      {tab==='akun' ? (
        <div className="space-y-3">
          {akun.map(a=>(
            <div key={a.nama} className="bg-white rounded-2xl p-4 border">
              <p className="text-xs font-bold">🏦 {a.nama}</p>
              <p className="text-[11px] text-gray-500">{a.no}</p>
              <p className="text-[10px] text-gray-400 mt-2">Saldo Awal:</p>
              <p className="font-bold">Rp {a.saldo}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-4 border">
          <h3 className="font-bold text-sm">Riwayat Pemindahan Dana</h3>
          <p className="text-[11px] text-gray-500">Lacak semua riwayat pemindah dana.</p>
          <div className="grid grid-cols-4 text-[10px] text-gray-500 mt-4 border-b pb-2"><span>Tanggal</span><span>Dari</span><span>Ke</span><span>Jumlah</span></div>
          <p className="text-xs text-gray-400 text-center py-8">Belum ada data</p>
        </div>
      )}
    </div>
  )
}
