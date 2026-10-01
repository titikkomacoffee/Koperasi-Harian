
import { useState, useEffect } from 'react'
import { supabase } from '../config/supabase.js'
import KategoriManager from '../components/common/KategoriManager.jsx'

export default function Simpanan() {
  const [tab, setTab] = useState('transaksi')
  const [list, setList] = useState([])
  const [form, setForm] = useState({ nama_anggota:'', tipe:'setoran', jenis:'Simpanan Wajib', jumlah:'', tanggal: new Date().toISOString().split('T')[0] })
  const [editId, setEditId] = useState(null)

  const fetchData = async () => {
    const { data } = await supabase.from('simpanan').select('*').order('tanggal', { ascending:false }).limit(100)
    if (data && data.length>0) setList(data)
    else {
      const saved = localStorage.getItem('simpanan_transaksi')
      if (saved) setList(JSON.parse(saved))
    }
  }
  useEffect(()=>{fetchData()},[])

  const saveLocal = (l) => localStorage.setItem('simpanan_transaksi', JSON.stringify(l))

  const handleSimpan = async () => {
    if(!form.nama_anggota || !form.jumlah) return alert('Nama & jumlah wajib')
    const payload = { ...form, jumlah: Number(form.jumlah) }
    if (editId) {
      const { error } = await supabase.from('simpanan').update(payload).eq('id', editId)
      const newList = list.map(x=> x.id===editId ? {...x, ...payload} : x)
      setList(newList); saveLocal(newList)
      setEditId(null)
    } else {
      const { data, error } = await supabase.from('simpanan').insert(payload).select()
      if (error) {
        const newItem = { id: Date.now(), ...payload }
        const newList = [newItem, ...list]
        setList(newList); saveLocal(newList)
      } else setList([data[0], ...list])
    }
    setForm({ nama_anggota:'', tipe:'setoran', jenis:'Simpanan Wajib', jumlah:'', tanggal: new Date().toISOString().split('T')[0] })
  }

  const handleHapus = async (id) => {
    if(!confirm('Hapus transaksi ini?')) return
    await supabase.from('simpanan').delete().eq('id', id)
    const newList = list.filter(x=>x.id!==id)
    setList(newList); saveLocal(newList)
  }

  return (
    <div className="p-4 space-y-4 bg-[#f6fdf6] min-h-screen pb-24">
      <h1 className="font-bold text-lg text-[#0f2a3a]">Manajemen Simpanan</h1>
      <div className="flex gap-2">
        <button onClick={()=>setTab('transaksi')} className={`px-4 py-2 rounded-full text-xs font-bold ${tab==='transaksi'?'bg-[#0f2a3a] text-white':'bg-white border'}`}>💰 Transaksi</button>
        <button onClick={()=>setTab('jenis')} className={`px-4 py-2 rounded-full text-xs font-bold ${tab==='jenis'?'bg-[#0f2a3a] text-white':'bg-white border'}`}>🏷️ Jenis Simpanan</button>
      </div>

      {tab==='transaksi' ? (
        <div className="space-y-4">
          <div className="bg-white rounded-[20px] p-5 border shadow-sm">
            <h3 className="font-bold text-sm">{editId?'Edit':'Tambah'} Transaksi Simpanan</h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <input value={form.nama_anggota} onChange={e=>setForm({...form, nama_anggota:e.target.value})} placeholder="Nama Anggota" className="border-2 border-gray-100 rounded-full px-4 py-2.5 text-xs" />
              <select value={form.tipe} onChange={e=>setForm({...form, tipe:e.target.value})} className="border-2 border-gray-100 rounded-full px-4 py-2.5 text-xs"><option value="setoran">Setoran</option><option value="penarikan">Penarikan</option></select>
              <input value={form.jenis} onChange={e=>setForm({...form, jenis:e.target.value})} placeholder="Jenis (Wajib/Pokok/Sukarela)" className="border-2 border-gray-100 rounded-full px-4 py-2.5 text-xs" />
              <input type="date" value={form.tanggal} onChange={e=>setForm({...form, tanggal:e.target.value})} className="border-2 border-gray-100 rounded-full px-4 py-2.5 text-xs" />
            </div>
            <input type="number" value={form.jumlah} onChange={e=>setForm({...form, jumlah:e.target.value})} placeholder="Jumlah Rp" className="w-full mt-3 border-2 border-gray-100 rounded-full px-4 py-2.5 text-xs" />
            <div className="flex gap-2 mt-3">
              <button onClick={handleSimpan} className="flex-1 bg-[#1a7a4c] text-white rounded-full py-3 text-xs font-bold">{editId?'Update':'⊕ Simpan'}</button>
              {editId && <button onClick={()=>{setEditId(null); setForm({ nama_anggota:'', tipe:'setoran', jenis:'Simpanan Wajib', jumlah:'', tanggal: new Date().toISOString().split('T')[0] })}} className="border rounded-full px-5 py-3 text-xs">Batal</button>}
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-4 border">
            <p className="text-[11px] text-gray-500 mb-3">Total {list.length} transaksi • {list.filter(x=>x.tipe==='setoran').length} setoran</p>
            <div className="space-y-2 max-h-[400px] overflow-auto">
              {list.length===0 ? <p className="text-center text-xs text-gray-400 py-8">Belum ada data, silakan tambah</p> :
               list.map(it=>(
                <div key={it.id} className="border rounded-2xl px-4 py-3 flex justify-between items-center group hover:border-[#0f2a3a]">
                  <div><p className="text-xs font-bold">{it.nama_anggota} • {it.jenis}</p><p className="text-[11px] text-gray-500">{it.tanggal} • {it.tipe} • Rp{Number(it.jumlah).toLocaleString('id-ID')}</p></div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                    <button onClick={()=>{setEditId(it.id); setForm({ nama_anggota:it.nama_anggota, tipe:it.tipe, jenis:it.jenis, jumlah:String(it.jumlah), tanggal:it.tanggal })}} className="w-7 h-7 rounded-full bg-[#f6fdf6] grid place-items-center text-[11px]">✏️</button>
                    <button onClick={()=>handleHapus(it.id)} className="w-7 h-7 rounded-full bg-red-50 grid place-items-center text-[11px]">🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <KategoriManager table="jenis_simpanan" title="Jenis Simpanan" placeholder="Contoh: Simpanan Wajib, Pokok, Sukarela..." defaultItems={['Simpanan Wajib','Simpanan Pokok','Simpanan Sukarela','Simpanan Lebaran']} />
      )}
    </div>
  )
}
