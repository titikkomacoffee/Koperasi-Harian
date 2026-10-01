import { useState } from 'react'
export default function BiayaOperasional(){
  const [tab,setTab]=useState('transaksi')
  return (
    <div className="p-4 space-y-3">
      <h1 className="font-bold">Biaya Operasional</h1>
      <div className="flex gap-2"><button onClick={()=>setTab('transaksi')} className={`px-3 py-1 rounded-full text-xs ${tab==='transaksi'?'bg-white border':''}`}>Transaksi</button><button onClick={()=>setTab('jenis')} className={`px-3 py-1 rounded-full text-xs ${tab==='jenis'?'bg-white border':''}`}>Jenis Biaya</button></div>
      <div className="bg-white rounded-2xl p-4 border text-xs text-gray-400">Belum ada biaya operasional</div>
    </div>
  )
}
