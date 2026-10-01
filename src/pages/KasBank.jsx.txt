
import { useState, useEffect } from 'react'
import { supabase } from '../config/supabase.js'
import KategoriManager from '../components/common/KategoriManager.jsx'

export default function KasBank() {
  const [tab, setTab] = useState('akun')
  const [akun, setAkun] = useState([
    { id:1, nama: 'Allo Bank', no: '085142977371', pemilik:'KOPERASI TRI PUTRA ABADI', saldo: 0 },
    { id:2, nama: 'BCA', no: '3141923739', pemilik:'KOPERASI TRI PUTRA ABADI', saldo: 0 },
    { id:3, nama: 'Kas Kecil', no: '-', pemilik:'Kas Tunai', saldo: 0 },
  ])
  const [form, setForm] = useState({ nama:'', no:'', pemilik:'' })
  const [editId, setEditId] = useState(null)

  useEffect(()=>{
    const saved = localStorage.getItem('kas_akun')
    if(saved) setAkun(JSON.parse(saved))
  },[])

  const saveLocal = (list) => localStorage.setItem('kas_akun', JSON.stringify(list))

  const handleSimpan = () => {
    if(!form.nama) return alert('Nama wajib')
    if(editId) {
      const newList = akun.map(a=> a.id===editId ? {...a, ...form} : a)
      setAkun(newList); saveLocal(newList); setEditId(null)
    } else {
      const newItem = { id: Date.now(), ...form, saldo:0 }
      const newList = [...akun, newItem]
      setAkun(newList); saveLocal(newList)
    }
    setForm({ nama:'', no:'', pemilik:'' })
  }

  const handleHapus = (id) => {
    if(!confirm('Hapus akun ini?')) return
    const newList = akun.filter(a=>a.id!==id)
    setAkun(newList); saveLocal(newList)
  }

  return (
    <div className="p-4 space-y-4 bg-[#f6fdf6] min-h-screen pb-24">
      <h1 className="font-bold text-lg">Kas & Bank</h1>
      <div className="flex gap-2">
        <button onClick={()=>setTab('akun')} className={`px-4 py-2 rounded-full text-xs font-bold ${tab==='akun'?'bg-[#e8f5e9] text-[#1a7a4c] border border-[#1a7a4c]':'bg-white border'}`}>🏦 Akun</button>
        <button onClick={()=>setTab('kategori')} className={`px-4 py-2 rounded-full text-xs font-bold ${tab==='kategori'?'bg-[#0f2a3a] text-white':'bg-white border'}`}>🏷️ Kategori</button>
      </div>

      {tab==='akun' && (
        <div className="space-y-4">
          <div className="bg-white rounded-[20px] p-5 border shadow-sm">
            <h3 className="font-bold text-sm">{editId?'Edit Akun':'Tambah Akun Bank/Kas'}</h3>
            <div className="mt-3 space-y-3">
              <input value={form.nama} onChange={e=>setForm({...form, nama:e.target.value})} placeholder="Nama Akun (BCA, Allo Bank, Kas Kecil)" className="w-full border-2 border-gray-100 rounded-full px-4 py-2.5 text-xs" />
              <input value={form.no} onChange={e=>setForm({...form, no:e.target.value})} placeholder="No Rekening / -" className="w-full border-2 border-gray-100 rounded-full px-4 py-2.5 text-xs" />
              <input value={form.pemilik} onChange={e=>setForm({...form, pemilik:e.target.value})} placeholder="Pemilik (KOPERASI TRI PUTRA ABADI)" className="w-full border-2 border-gray-100 rounded-full px-4 py-2.5 text-xs" />
              <div className="flex gap-2">
                <button onClick={handleSimpan} className="flex-1 bg-[#1a7a4c] text-white rounded-full py-3 text-xs font-bold">{editId?'Update':'⊕ Simpan Akun'}</button>
                {editId && <button onClick={()=>{setEditId(null); setForm({nama:'',no:'',pemilik:''})}} className="border rounded-full px-5 py-3 text-xs">Batal</button>}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {akun.map(a=>(
              <div key={a.id} className="bg-white rounded-[20px] p-4 border shadow-sm group hover:border-[#0f2a3a] transition">
                <div className="flex justify-between">
                  <div><p className="font-bold text-sm">{a.nama}</p><p className="text-[11px] text-gray-500 mt-0.5">{a.no} • {a.pemilik}</p></div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                    <button onClick={()=>{setEditId(a.id); setForm({nama:a.nama,no:a.no,pemilik:a.pemilik})}} className="w-7 h-7 rounded-full bg-[#f6fdf6] grid place-items-center text-[11px]">✏️</button>
                    <button onClick={()=>handleHapus(a.id)} className="w-7 h-7 rounded-full bg-red-50 grid place-items-center text-[11px]">🗑️</button>
                  </div>
                </div>
                <p className="font-black text-lg mt-3">Rp {Number(a.saldo||0).toLocaleString('id-ID')}</p>
                <p className="text-[10px] text-gray-400">Saldo awal • Klik edit untuk ubah</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==='kategori' && (
        <KategoriManager table="kategori_kas" title="Kategori Kas & Bank" placeholder="Contoh: Bank, E-Wallet, Kas Tunai..." defaultItems={['Bank BCA','Bank Allo','Kas Tunai','E-Wallet','Deposito']} />
      )}
    </div>
  )
}
