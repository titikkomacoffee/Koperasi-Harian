import { useState } from 'react'
import { pilihanPinjaman } from '../../utils/tabelAngsuran.js'
import { supabase } from '../../config/supabase.js'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Pinjaman() {
  const { profile, koperasi } = useAuth()
  const [tab, setTab] = useState('daftar')
  const [selectedId, setSelectedId] = useState(pilihanPinjaman[0]?.id || '')
  const [loading, setLoading] = useState(false)

  const selected = pilihanPinjaman.find(p=>p.id===selectedId)

  const handleAjukan = async () => {
    if (!selected) return
    setLoading(true)
    const { error } = await supabase.from('pinjaman').insert({
      nasabah_id: profile?.id,
      koperasi_id: koperasi?.id,
      jumlah: selected.jumlah,
      paket: selected.tenor,
      tenor: selected.tenor,
      angsuran_per_periode: selected.angsuran,
      tipe_angsuran: selected.tipe,
      status: 'menunggu',
      tanggal_pinjam: new Date().toISOString()
    })
    if (error) alert('Error: '+error.message)
    else alert('Pengajuan '+selected.label+' berhasil!')
    setLoading(false)
  }

  return (
    <div className="p-4 space-y-4 bg-[#f6fdf6] min-h-screen">
      <h1 className="font-bold">Manajemen Pinjaman</h1>
      <div className="flex gap-2"><button onClick={()=>setTab('daftar')} className={`px-4 py-1 rounded-full text-xs ${tab==='daftar'?'bg-white border font-bold':'bg-[#e8f5e9]'}`}>Daftar Pinjaman</button><button onClick={()=>setTab('kategori')} className={`px-4 py-1 rounded-full text-xs ${tab==='kategori'?'bg-white border font-bold':'bg-[#e8f5e9]'}`}>Master Kategori</button></div>

      {tab==='daftar' ? (
        <div className="bg-white rounded-2xl p-4 border">
          <p className="text-[11px] text-gray-500">Total 0 data pinjaman tercatat.</p>
          <button onClick={()=>setTab('tambah')} className="mt-3 bg-[#1a7a4c] text-white rounded-full px-4 py-2 text-xs">⊕ Tambah Pinjaman</button>
          <div className="grid grid-cols-4 text-[10px] text-gray-500 mt-4 border-b pb-2"><span>Anggota</span><span>Kategori</span><span>Sisa Pokok</span><span>Status</span></div>
          <p className="text-xs text-gray-400 text-center py-8">Tidak ada data pinjaman.</p>
        </div>
      ) : tab==='tambah' ? (
        <div className="bg-white rounded-2xl p-4 border">
          <h3 className="font-bold text-sm">Tambah Pinjaman - Tabel Angsuran Koperasi Tri Putra Abadi</h3>
          <p className="text-[11px] text-gray-500 mt-1">Pilih tenor sesuai tabel: 24H, 30H, 45H, 60H, 70H, 3Bln, 6Bln, 9Bln, 12Bln, 15Bln</p>
          <select value={selectedId} onChange={e=>setSelectedId(e.target.value)} className="w-full border rounded-xl px-3 py-3 mt-3 text-xs">
            <optgroup label="Harian">
              {pilihanPinjaman.filter(p=>p.tipe==='harian').map(p=><option key={p.id} value={p.id}>{p.label}</option>)}
            </optgroup>
            <optgroup label="Bulanan">
              {pilihanPinjaman.filter(p=>p.tipe==='bulanan').map(p=><option key={p.id} value={p.id}>{p.label}</option>)}
            </optgroup>
          </select>
          {selected && <div className="bg-[#f6fdf6] rounded-xl p-3 mt-3 text-xs"><p>Pinjaman: Rp{selected.jumlah.toLocaleString()} - {selected.tenor} - Angsuran Rp{selected.angsuran.toLocaleString()}</p></div>}
          <button onClick={handleAjukan} disabled={loading} className="w-full mt-4 bg-[#1a7a4c] text-white rounded-full py-3 text-sm">{loading?'Mengajukan...':'Ajukan Pinjaman'}</button>
          <button onClick={()=>setTab('daftar')} className="w-full mt-2 border rounded-full py-2 text-xs">Kembali</button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-4 border">
          <p className="text-xs">Master Kategori Pinjaman</p>
          <p className="text-[11px] text-gray-500">Kelola kategori pinjaman</p>
        </div>
      )}
    </div>
  )
}
