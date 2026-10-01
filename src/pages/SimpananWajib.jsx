
import { useState, useEffect } from 'react'
import { supabase } from '../config/supabase.js'

export default function SimpananWajib() {
  const [list, setList] = useState([])
  const [form, setForm] = useState({ nama_anggota:'', bulan:'September', tahun:'2026', jumlah:'50000', status:'belum' })
  const [editId, setEditId] = useState(null)

  const fetchData = async () => {
    const { data } = await supabase.from('simpanan_wajib').select('*').order('created_at',{ascending:false}).limit(100)
    if (data && data.length>0) setList(data)
    else {
      const saved = localStorage.getItem('simpanan_wajib')
      if (saved) setList(JSON.parse(saved))
    }
  }
  useEffect(()=>{fetchData()},[])

  const saveLocal = (l) => localStorage.setItem('simpanan_wajib', JSON.stringify(l))

  const handleSimpan = async () => {
    if(!form.nama_anggota) return alert('Nama wajib')
    const payload = { ...form, jumlah: Number(form.jumlah) }
    if (editId) {
      const newList = list.map(x=> x.id===editId ? {...x, ...payload} : x)
      setList(newList); saveLocal(newList); setEditId(null)
    } else {
      const { data, error } = await supabase.from('simpanan_wajib').insert(payload).select()
      if (error) {
        const newItem = { id: Date.now(), ...payload }
        const newList = [newItem, ...list]
        setList(newList); saveLocal(newList)
      } else setList([data[0], ...list])
    }
    setForm({ nama_anggota:'', bulan:'September', tahun:'2026', jumlah:'50000', status:'belum' })
  }

  const handleHapus = async (id) => {
    if(!confirm('Hapus?')) return
    await supabase.from('simpanan_wajib').delete().eq('id', id)
    const newList = list.filter(x=>x.id!==id)
    setList(newList); saveLocal(newList)
  }

  return (
    <div className="p-4 space-y-4 bg-[#f6fdf6] min-h-screen pb-24">
      <h1 className="font-bold text-lg text-[#0f2a3a]">Simpanan Wajib</h1>
      
      <div className="bg-white rounded-[20px] p-5 border shadow-sm">
        <h3 className="font-bold text-sm">{editId?'Edit':'Tambah'} Simpanan Wajib</h3>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <input value={form.nama_anggota} onChange={e=>setForm({...form, nama_anggota:e.target.value})} placeholder="Nama Anggota" className="border-2 border-gray-100 rounded-full px-4 py-2.5 text-xs" />
          <input type="number" value={form.jumlah} onChange={e=>setForm({...form, jumlah:e.target.value})} placeholder="Jumlah" className="border-2 border-gray-100 rounded-full px-4 py-2.5 text-xs" />
          <select value={form.bulan} onChange={e=>setForm({...form, bulan:e.target.value})} className="border-2 border-gray-100 rounded-full px-4 py-2.5 text-xs">
            {['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'].map(b=><option key={b} value={b}>{b}</option>)}
          </select>
          <select value={form.status} onChange={e=>setForm({...form, status:e.target.value})} className="border-2 border-gray-100 rounded-full px-4 py-2.5 text-xs"><option value="belum">Belum</option><option value="lunas">Lunas</option></select>
        </div>
        <div className="flex gap-2 mt-3">
          <button onClick={handleSimpan} className="flex-1 bg-[#1a7a4c] text-white rounded-full py-3 text-xs font-bold">{editId?'Update':'⊕ Simpan'}</button>
          {editId && <button onClick={()=>setEditId(null)} className="border rounded-full px-5 py-3 text-xs">Batal</button>}
        </div>
      </div>

      <div className="bg-white rounded-[20px] p-4 border">
        <p className="text-[11px] text-gray-500 mb-3">{list.length} data • Tap edit/hapus</p>
        <div className="space-y-2">
          {list.length===0 ? <p className="text-center text-xs text-gray-400 py-8">Belum ada data. Tambah di atas.</p> :
           list.map(it=>(
            <div key={it.id} className="border rounded-2xl px-4 py-3 flex justify-between items-center group hover:border-[#0f2a3a]">
              <div><p className="text-xs font-bold">{it.nama_anggota} • Rp{Number(it.jumlah).toLocaleString('id-ID')}</p><p className="text-[11px] text-gray-500">{it.bulan} {it.tahun} • {it.status}</p></div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                <button onClick={()=>{setEditId(it.id); setForm({ nama_anggota:it.nama_anggota, bulan:it.bulan, tahun:it.tahun, jumlah:String(it.jumlah), status:it.status })}} className="w-7 h-7 rounded-full bg-[#f6fdf6] grid place-items-center text-[11px]">✏️</button>
                <button onClick={()=>handleHapus(it.id)} className="w-7 h-7 rounded-full bg-red-50 grid place-items-center text-[11px]">🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
