
import { useState, useEffect } from 'react'
import { supabase } from '../../config/supabase.js'

export default function KategoriManager({ table, title, placeholder, defaultItems }) {
  const [items, setItems] = useState([])
  const [nama, setNama] = useState('')
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false })
    if (!error && data && data.length>0) setItems(data)
    else {
      // fallback to defaultItems or localStorage
      const saved = localStorage.getItem('kategori_'+table)
      if (saved) setItems(JSON.parse(saved))
      else setItems(defaultItems.map((n,i)=>({id:i+1, nama:n, isLocal:true})))
    }
    setLoading(false)
  }
  useEffect(()=>{fetchData()},[table])

  const saveLocal = (list) => {
    localStorage.setItem('kategori_'+table, JSON.stringify(list))
  }

  const handleSimpan = async () => {
    if(!nama.trim()) return alert('Nama kategori wajib diisi')
    if(editId) {
      // edit
      const { error } = await supabase.from(table).update({ nama: nama.trim() }).eq('id', editId)
      if (error) {
        // local fallback
        const newList = items.map(it=> it.id===editId ? {...it, nama:nama.trim()} : it)
        setItems(newList); saveLocal(newList)
      } else {
        fetchData()
      }
      setEditId(null)
    } else {
      const { data, error } = await supabase.from(table).insert({ nama: nama.trim() }).select()
      if (error) {
        const newItem = { id: Date.now(), nama: nama.trim(), isLocal:true }
        const newList = [newItem, ...items]
        setItems(newList); saveLocal(newList)
      } else {
        if(data) setItems([data[0], ...items])
        else fetchData()
      }
    }
    setNama('')
  }

  const handleEdit = (item) => {
    setEditId(item.id)
    setNama(item.nama)
  }

  const handleHapus = async (id) => {
    if(!confirm('Hapus kategori ini? Data terkait akan tetap tapi kategori jadi tanpa kategori.')) return
    const { error } = await supabase.from(table).delete().eq('id', id)
    const newList = items.filter(it=>it.id!==id)
    setItems(newList); saveLocal(newList)
  }

  const handleCancel = () => { setEditId(null); setNama('') }

  return (
    <div className="bg-white rounded-[20px] p-5 border shadow-sm">
      <h3 className="font-bold text-sm text-[#0f2a3a]">{title}</h3>
      <p className="text-[11px] text-gray-500 mt-1">Bisa input, edit, hapus • Klik edit untuk ubah nama</p>
      
      <div className="mt-4 flex gap-2">
        <input value={nama} onChange={e=>setNama(e.target.value)} placeholder={placeholder} className="flex-1 border-2 border-gray-100 rounded-full px-4 py-2.5 text-xs focus:border-[#0f2a3a] focus:outline-none" />
        <button onClick={handleSimpan} className="bg-[#0f2a3a] text-white rounded-full px-5 py-2.5 text-xs font-bold">{editId?'Update':'Tambah'}</button>
        {editId && <button onClick={handleCancel} className="border rounded-full px-4 py-2.5 text-xs">Batal</button>}
      </div>

      <div className="mt-4 space-y-2 max-h-[300px] overflow-auto">
        {loading ? <p className="text-center text-xs text-gray-400 py-6">Memuat...</p> :
         items.length===0 ? <p className="text-center text-xs text-gray-400 py-6">Belum ada kategori</p> :
         items.map(item=>(
          <div key={item.id} className="flex justify-between items-center border border-[#eef5ee] rounded-full px-4 py-2.5 group hover:border-[#0f2a3a] transition">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#f6fdf6] grid place-items-center text-[11px]">🏷️</span>
              <span className="text-xs font-semibold text-[#0f2a3a]">{item.nama}</span>
              {item.isLocal && <span className="text-[8px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">Lokal</span>}
            </div>
            <div className="flex gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition">
              <button onClick={()=>handleEdit(item)} className="w-7 h-7 rounded-full bg-[#f6fdf6] hover:bg-[#e8f5e9] grid place-items-center text-[11px]">✏️</button>
              <button onClick={()=>handleHapus(item.id)} className="w-7 h-7 rounded-full bg-red-50 hover:bg-red-100 grid place-items-center text-[11px]">🗑️</button>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-gray-400 mt-3">Total {items.length} kategori • Data disimpan di Supabase + lokal fallback agar tetap jalan walau RLS belum setting</p>
    </div>
  )
}
