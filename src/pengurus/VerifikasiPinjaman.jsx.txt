import { useEffect, useState } from 'react'
import { supabase } from '../../config/supabase.js'
import { formatRupiah } from '../../utils/formatCurrency.js'

export default function VerifikasiPinjaman() {
  const [list,setList]=useState([])
  useEffect(()=>{ supabase.from('pinjaman').select('*').eq('status','menunggu').then(({data})=>setList(data||[])) },[])
  const verif = async (id, status) => { await supabase.from('pinjaman').update({status}).eq('id',id); setList(l=>l.filter(x=>x.id!==id)) }
  return (
    <div className="p-4 lg:p-6">
      <div className="card p-5">
        <h2 className="font-bold">Verifikasi Pinjaman</h2>
        <div className="mt-4 space-y-3">
          {list.map(p=><div key={p.id} className="border rounded-xl p-4 flex justify-between items-center"><div><p className="font-bold">{formatRupiah(p.jumlah)} - {p.paket}</p><p className="text-xs text-gray-500">{p.id.slice(0,8)}</p></div><div className="flex gap-2"><button onClick={()=>verif(p.id,'lancar')} className="bg-green-600 text-white px-3 py-1.5 rounded-xl text-xs">Setujui</button><button onClick={()=>verif(p.id,'ditolak')} className="bg-red-100 text-red-600 px-3 py-1.5 rounded-xl text-xs">Tolak</button></div></div>)}
          {list.length===0 && <p className="text-sm text-gray-500 text-center py-10">Tidak ada pengajuan menunggu</p>}
        </div>
      </div>
    </div>
  )
}
