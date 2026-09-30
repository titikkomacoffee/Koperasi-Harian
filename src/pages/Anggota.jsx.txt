import { useEffect, useState } from 'react'
import { supabase } from '../../config/supabase.js'

export default function Anggota() {
  const [anggota, setAnggota] = useState([])
  useEffect(()=>{ supabase.from('profiles').select('*').then(({data})=>setAnggota(data||[])) },[])

  return (
    <div className="p-4 space-y-4 bg-[#f6fdf6] min-h-screen">
      <h1 className="font-bold">Manajemen Anggota</h1>
      <div className="flex gap-2"><button className="border rounded-full px-4 py-1.5 text-xs bg-white">📊 Export Excel</button><button className="bg-[#1a7a4c] text-white rounded-full px-4 py-1.5 text-xs">⊕ Tambah Anggota</button></div>
      <div className="bg-white rounded-2xl p-4 border">
        <h3 className="font-bold text-sm">Daftar Anggota</h3>
        <input placeholder="Cari nama anggota..." className="w-full mt-3 border rounded-full px-4 py-2 text-xs bg-[#f6fdf6]" />
        <div className="grid grid-cols-5 text-[10px] text-gray-500 mt-4 border-b pb-2"><span>Jenis Kelamin</span><span>Nomor Telepon</span><span>Status</span><span>Aksi</span><span>Pul</span></div>
        {anggota.length===0 ? <p className="text-xs text-gray-400 text-center py-8">Belum ada anggota terdaftar.</p> : anggota.map(a=><div key={a.id} className="grid grid-cols-5 py-2 border-b text-xs"><span>{a.nama||a.email}</span><span>{a.no_hp||'-'}</span><span>{a.status}</span><span>...</span></div>)}
      </div>
    </div>
  )
}
