import { useState } from 'react'
export default function Dashboard(){
  const [bulan]=useState('September'); const [tahun]=useState('2026')
  return (
    <div className="p-4 space-y-4">
      <h1 className="font-bold">Selamat Datang</h1>
      <div className="grid md:grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-4 border"><p className="text-xs">Total Pendapatan (Bulanan)</p><p className="font-bold mt-2">Rp 0</p><p className="text-[10px] text-gray-400">Pendapatan di bulan {bulan} {tahun}</p></div>
        <div className="bg-white rounded-2xl p-4 border"><p className="text-xs">Total Saldo Simpanan</p><p className="font-bold mt-2">Rp 0</p></div>
        <div className="bg-white rounded-2xl p-4 border"><p className="text-xs">Total Biaya</p><p className="font-bold mt-2">Rp 0</p></div>
        <div className="bg-white rounded-2xl p-4 border"><p className="text-xs">Laba/Rugi</p><p className="font-bold mt-2 text-[#1a7a4c]">Rp 0</p></div>
      </div>
    </div>
  )
}
