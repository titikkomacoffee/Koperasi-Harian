import { useEffect, useState } from 'react'
import { supabase } from '../../config/supabase.js'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Dashboard() {
  const { koperasi } = useAuth()
  const [bulan, setBulan] = useState('September')
  const [tahun, setTahun] = useState('2026')
  const [stats, setStats] = useState({ pendapatan:0, simpanan:0, biaya:0, laba:0 })

  useEffect(()=>{
    // Fetch real stats jika ada, fallback 0 seperti video
    supabase.from('pinjaman').select('jumlah').then(({data})=>{
      const total = (data||[]).reduce((a,b)=>a+(b.jumlah||0),0)
      setStats(s=>({...s, pendapatan: total}))
    })
  },[])

  return (
    <div className="p-4 space-y-4 bg-[#f6fdf6] min-h-screen">
      <div className="flex items-center justify-between">
        <div><h1 className="font-bold text-lg text-[#0f2a3a]">Selamat Datang</h1><p className="text-[11px] text-gray-500">Login Berhasil - Selamat datang kembali!</p></div>
        <div className="flex gap-2"><select value={bulan} onChange={e=>setBulan(e.target.value)} className="border rounded-full px-3 py-1.5 text-xs"><option>September</option><option>Agustus</option></select><select value={tahun} onChange={e=>setTahun(e.target.value)} className="border rounded-full px-3 py-1.5 text-xs"><option>2026</option><option>2025</option></select></div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-4 border"><div className="flex justify-between"><p className="text-xs">Total Pendapatan (Bulanan)</p><span>↗</span></div><p className="font-bold mt-2">Rp {stats.pendapatan.toLocaleString('id-ID')}</p><p className="text-[10px] text-gray-400">Pendapatan di bulan {bulan}</p></div>
        <div className="bg-white rounded-2xl p-4 border"><div className="flex justify-between"><p className="text-xs">Total Saldo Simpanan (Bulanan)</p><span>📅</span></div><p className="font-bold mt-2">Rp {stats.simpanan.toLocaleString('id-ID')}</p><p className="text-[10px] text-gray-400">Total simpanan di bulan {bulan}</p></div>
        <div className="bg-white rounded-2xl p-4 border"><div className="flex justify-between"><p className="text-xs">Total Biaya (Bulanan)</p><span>🧾</span></div><p className="font-bold mt-2">Rp {stats.biaya.toLocaleString('id-ID')}</p><p className="text-[10px] text-gray-400">Biaya di bulan {bulan}</p></div>
        <div className="bg-white rounded-2xl p-4 border"><div className="flex justify-between"><p className="text-xs">Laba/Rugi (Bulanan)</p><span>💰</span></div><p className="font-bold mt-2 text-[#1a7a4c]">Rp {stats.laba.toLocaleString('id-ID')}</p><p className="text-[10px] text-gray-400">Rp 0 (pendapatan) - Rp 0 (biaya)</p></div>
      </div>

      <div className="bg-white rounded-2xl p-4 border">
        <h3 className="font-bold text-sm">Aktivitas 6 Bulan Terakhir</h3>
        <p className="text-[10px] text-gray-500">Perbandingan total simpanan masuk dan pinjaman cair setiap bulan.</p>
        <div className="mt-6 h-[120px] bg-[#f6fdf6] rounded-xl grid place-items-center text-[11px] text-gray-400">Grafik aktivitas (coming soon)</div>
      </div>
    </div>
  )
}
