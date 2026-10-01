
import { useState, useEffect } from 'react'
import { supabase } from '../config/supabase.js'
import KategoriManager from '../components/common/KategoriManager.jsx'

export default function BiayaOperasional() {
  const [tab, setTab] = useState('transaksi')
  const [biaya, setBiaya] = useState([])
  const [jenisList, setJenisList] = useState([])
  const [form, setForm] = useState({ tanggal: new Date().toISOString().split('T')[0], jenis: '', jumlah: '', keterangan: '' })
  const [editId, setEditId] = useState(null)
  const [filterBulan, setFilterBulan] = useState('Semua')

  const fetchAll = async () => {
    const { data } = await supabase.from('biaya_operasional').select('*').order('tanggal', { ascending: false }).limit(100)
    if (data) setBiaya(data)
    else {
      const saved = localStorage.getItem('biaya_operasional')
      if (saved) setBiaya(JSON.parse(saved))
    }
    const { data: jenis } = await supabase.from('jenis_biaya').select('*')
    if (jenis && jenis.length>0) setJenisList(jenis)
    else {
      const saved = localStorage.getItem('kategori_jenis_biaya')
      if (saved) setJenisList(JSON.parse(saved))
      else setJenisList([{id:1,nama:'BBM Marketing'},{id:2,nama:'BBM Penagih'},{id:3,nama:'Perjalanan Dinas Luar'}])
    }
  }
  useEffect(()=>{fetchAll()},[])

  const saveLocal = (list) => localStorage.setItem('biaya_operasional', JSON.stringify(list))

  const handleSimpan = async () => {
    if(!form.jenis || !form.jumlah) return alert('Jenis & jumlah wajib')
    const payload = { ...form, jumlah: Number(form.jumlah), created_at: new Date().toISOString() }
    if (editId) {
      const { error } = await supabase.from('biaya_operasional').update(payload).eq('id', editId)
      if (error) {
        const newList = biaya.map(b=> b.id===editId ? {...b, ...payload} : b)
        setBiaya(newList); saveLocal(newList)
      } else fetchAll()
      setEditId(null)
    } else {
      const { data, error } = await supabase.from('biaya_operasional').insert(payload).select()
      if (error) {
        const newItem = { id: Date.now(), ...payload }
        const newList = [newItem, ...biaya]
        setBiaya(newList); saveLocal(newList)
      } else setBiaya([data[0], ...biaya])
    }
    setForm({ tanggal: new Date().toISOString().split('T')[0], jenis: '', jumlah: '', keterangan: '' })
  }

  const handleEdit = (item) => {
    setEditId(item.id)
    setForm({ tanggal: item.tanggal, jenis: item.jenis, jumlah: String(item.jumlah), keterangan: item.keterangan||'' })
    setTab('transaksi')
    window.scrollTo({top:0, behavior:'smooth'})
  }

  const handleHapus = async (id) => {
    if(!confirm('Hapus biaya ini?')) return
    await supabase.from('biaya_operasional').delete().eq('id', id)
    const newList = biaya.filter(b=>b.id!==id)
    setBiaya(newList); saveLocal(newList)
  }

  const total = biaya.reduce((a,b)=>a+Number(b.jumlah||0),0)

  return (
    <div className="p-4 space-y-4 bg-[#f6fdf6] min-h-screen pb-24">
      <h1 className="font-bold text-lg text-[#0f2a3a]">Biaya Operasional</h1>
      <div className="flex gap-2">
        <button onClick={()=>setTab('transaksi')} className={`px-4 py-2 rounded-full text-xs font-bold ${tab==='transaksi'?'bg-[#0f2a3a] text-white shadow':'bg-white border text-gray-600'}`}>💸 Transaksi</button>
        <button onClick={()=>setTab('jenis')} className={`px-4 py-2 rounded-full text-xs font-bold ${tab==='jenis'?'bg-[#0f2a3a] text-white shadow':'bg-white border text-gray-600'}`}>🏷️ Jenis Biaya</button>
      </div>

      {tab==='transaksi' ? (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-[#0f2a3a] to-[#1a3a2a] rounded-[20px] p-5 text-white">
            <p className="text-[11px] opacity-70 tracking-widest font-bold">TOTAL BIAYA BULAN INI</p>
            <p className="font-black text-2xl mt-1">Rp{total.toLocaleString('id-ID')}</p>
            <p className="text-[11px] opacity-70 mt-1">{biaya.length} transaksi</p>
          </div>

          <div className="bg-white rounded-[20px] p-5 border shadow-sm">
            <h3 className="font-bold text-sm">{editId?'Edit Biaya':'Catat Biaya Baru'}</h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <input type="date" value={form.tanggal} onChange={e=>setForm({...form, tanggal:e.target.value})} className="border-2 border-gray-100 rounded-full px-4 py-2.5 text-xs" />
              <select value={form.jenis} onChange={e=>setForm({...form, jenis:e.target.value})} className="border-2 border-gray-100 rounded-full px-4 py-2.5 text-xs">
                <option value="">Pilih jenis...</option>
                {jenisList.map(j=><option key={j.id} value={j.nama}>{j.nama}</option>)}
              </select>
            </div>
            <input type="number" value={form.jumlah} onChange={e=>setForm({...form, jumlah:e.target.value})} placeholder="Jumlah Rp" className="w-full mt-3 border-2 border-gray-100 rounded-full px-4 py-2.5 text-xs" />
            <input value={form.keterangan} onChange={e=>setForm({...form, keterangan:e.target.value})} placeholder="Keterangan (opsional)" className="w-full mt-3 border-2 border-gray-100 rounded-full px-4 py-2.5 text-xs" />
            <div className="flex gap-2 mt-3">
              <button onClick={handleSimpan} className="flex-1 bg-[#1a7a4c] text-white rounded-full py-3 text-xs font-bold">{editId?'💾 Update':'⊕ Simpan Biaya'}</button>
              {editId && <button onClick={()=>{setEditId(null); setForm({ tanggal: new Date().toISOString().split('T')[0], jenis: '', jumlah: '', keterangan: '' })}} className="border rounded-full px-5 py-3 text-xs">Batal</button>}
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-4 border">
            <h3 className="font-bold text-sm">Riwayat Biaya</h3>
            <div className="mt-3 space-y-2 max-h-[400px] overflow-auto">
              {biaya.length===0 ? <p className="text-center text-xs text-gray-400 py-8">Belum ada biaya</p> :
               biaya.map(b=>(
                <div key={b.id} className="flex justify-between items-center border border-[#eef5ee] rounded-2xl px-4 py-3 hover:border-[#0f2a3a] group">
                  <div><p className="text-xs font-bold text-[#0f2a3a]">{b.jenis}</p><p className="text-[11px] text-gray-500">{b.tanggal} • {b.keterangan||'-'}</p></div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-xs">Rp{Number(b.jumlah).toLocaleString('id-ID')}</p>
                    <button onClick={()=>handleEdit(b)} className="w-7 h-7 rounded-full bg-[#f6fdf6] grid place-items-center text-[11px] opacity-0 group-hover:opacity-100">✏️</button>
                    <button onClick={()=>handleHapus(b.id)} className="w-7 h-7 rounded-full bg-red-50 grid place-items-center text-[11px] opacity-0 group-hover:opacity-100">🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <KategoriManager table="jenis_biaya" title="Jenis Biaya Operasional" placeholder="Contoh: BBM Penagih, Listrik Kantor..." defaultItems={['BBM Marketing','BBM Penagih','Perjalanan Dinas Luar','ATK','Konsumsi','Sewa']} />
      )}
    </div>
  )
}
