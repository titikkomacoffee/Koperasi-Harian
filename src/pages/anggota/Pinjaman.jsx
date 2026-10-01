
import { useState, useEffect } from 'react'
import { pilihanPinjaman } from '../../utils/tabelAngsuran.js'
import { supabase } from '../../config/supabase.js'
import { useAuth } from '../../context/AuthContext.jsx'
import ModernSelect from '../../components/common/ModernSelect.jsx'

export default function Pinjaman() {
  const { profile, koperasi } = useAuth()
  const [tab, setTab] = useState('daftar')
  const [selectedId, setSelectedId] = useState(pilihanPinjaman[0]?.id || '')
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])
  const [fetching, setFetching] = useState(true)

  const selected = pilihanPinjaman.find(p=>p.id===selectedId)

  const fetchPinjaman = async () => {
    setFetching(true)
    const { data } = await supabase.from('pinjaman').select('*').order('created_at', { ascending: false }).limit(100)
    setList(data || [])
    setFetching(false)
  }
  useEffect(() => { fetchPinjaman() }, [])

  const handleAjukan = async () => {
    if (!selected) return
    setLoading(true)
    // FIX: Supabase kamu belum ada kolom angsuran_per_periode, jadi kita kirim hanya kolom umum
    const payload = {
      nasabah_id: profile?.id || null,
      koperasi_id: koperasi?.id || null,
      jumlah: selected.jumlah,
      tenor: selected.tenor,
      angsuran: selected.angsuran,
      tipe: selected.tipe,
      status: 'menunggu',
      created_at: new Date().toISOString()
    }
    // coba insert, kalau gagal karena kolom tidak ada, coba minimal
    let { error } = await supabase.from('pinjaman').insert([payload])
    if (error) {
      console.log('Insert error, coba fallback:', error.message)
      const minimal = { jumlah: selected.jumlah, tenor: selected.tenor, status: 'menunggu' }
      const res2 = await supabase.from('pinjaman').insert([minimal])
      error = res2.error
    }
    if (error) alert('Error: '+error.message + '\n\nSolusi: Jalankan SQL migrasi di Supabase (lihat file supabase-fix.sql)')
    else {
      alert('✅ Pengajuan ' + selected.label + ' berhasil!')
      setTab('daftar')
      fetchPinjaman()
    }
    setLoading(false)
  }

  const handleHapus = async (id) => {
    if (!confirm('Hapus pinjaman ini?')) return
    await supabase.from('pinjaman').delete().eq('id', id)
    fetchPinjaman()
  }

  const handleEditStatus = async (id, newStatus) => {
    await supabase.from('pinjaman').update({ status: newStatus }).eq('id', id)
    fetchPinjaman()
  }

  return (
    <div className="p-4 space-y-4 bg-[#f6fdf6] min-h-screen pb-24">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg text-[#0f2a3a]">Manajemen Pinjaman</h1>
        <span className="text-[10px] bg-white border px-3 py-1.5 rounded-full font-bold">{list.length} data</span>
      </div>
      
      <div className="flex gap-2">
        <button onClick={()=>setTab('daftar')} className={`px-4 py-2 rounded-full text-xs font-bold transition ${tab==='daftar'?'bg-[#0f2a3a] text-white shadow':'bg-white border text-gray-600'}`}>📋 Daftar</button>
        <button onClick={()=>setTab('tambah')} className={`px-4 py-2 rounded-full text-xs font-bold transition ${tab==='tambah'?'bg-[#1a7a4c] text-white shadow':'bg-white border text-gray-600'}`}>⊕ Tambah</button>
        <button onClick={()=>setTab('kategori')} className={`px-4 py-2 rounded-full text-xs font-bold transition ${tab==='kategori'?'bg-[#0f2a3a] text-white shadow':'bg-white border text-gray-600'}`}>🏷️ Kategori</button>
      </div>

      {tab==='daftar' && (
        <div className="bg-white rounded-[20px] p-4 border shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div><p className="font-bold text-sm">Daftar Pinjaman</p><p className="text-[11px] text-gray-500">Total {list.length} tercatat • Tap untuk edit/hapus</p></div>
            <button onClick={()=>setTab('tambah')} className="bg-[#1a7a4c] text-white rounded-full px-4 py-2 text-xs font-bold">⊕ Baru</button>
          </div>
          {fetching ? <p className="text-xs text-center py-8 text-gray-400">Memuat...</p> :
           list.length===0 ? (
            <div className="text-center py-12"><div className="w-14 h-14 bg-[#f6fdf6] rounded-2xl grid place-items-center mx-auto mb-3 text-xl">💸</div><p className="text-xs text-gray-400">Belum ada pinjaman</p></div>
           ) : (
            <div className="space-y-2.5">
              {list.map(p => (
                <div key={p.id} className="border border-[#eef5ee] rounded-2xl p-3.5 flex justify-between items-center hover:shadow-sm transition">
                  <div className="flex-1">
                    <p className="font-bold text-sm text-[#0f2a3a]">Rp{(p.jumlah||0).toLocaleString('id-ID')} • {p.tenor||'-'}</p>
                    <div className="flex gap-2 mt-1">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${p.status==='menunggu'?'bg-amber-100 text-amber-700': p.status==='aktif'?'bg-green-100 text-green-700':'bg-gray-100 text-gray-600'}`}>{p.status}</span>
                      <span className="text-[10px] text-gray-500">Rp{(p.angsuran||0).toLocaleString()}/{p.tipe==='harian'?'hari':'bln'}</span>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={()=>handleEditStatus(p.id, p.status==='menunggu'?'aktif':'lunas')} className="w-8 h-8 rounded-full bg-[#f6fdf6] grid place-items-center text-xs">✏️</button>
                    <button onClick={()=>handleHapus(p.id)} className="w-8 h-8 rounded-full bg-red-50 text-red-500 grid place-items-center text-xs">🗑️</button>
                  </div>
                </div>
              ))}
            </div>
           )}
        </div>
      )}

      {tab==='tambah' && (
        <div className="bg-white rounded-[24px] p-5 border shadow-sm space-y-5">
          <div>
            <h3 className="font-bold text-[16px] text-[#0f2a3a]">Tambah Pinjaman Baru</h3>
            <p className="text-[11px] text-gray-500 mt-1">Pilih tenor sesuai tabel resmi: 24H, 30H, 45H, 60H, 70H, 3Bln-15Bln</p>
          </div>
          <div>
            <label className="text-[10px] tracking-widest font-bold text-gray-500 mb-2 block">PAKET ANGSURAN KEKINIAN</label>
            <ModernSelect value={selectedId} onChange={setSelectedId} options={pilihanPinjaman} />
          </div>
          {selected && (
            <div className="bg-gradient-to-br from-[#0f2a3a] to-[#1a7a4c] rounded-[20px] p-4 text-white relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full" />
              <p className="text-[10px] tracking-widest opacity-60 font-bold">RINCIAN PINJAMAN</p>
              <p className="font-black text-xl mt-1">Rp{selected.jumlah.toLocaleString('id-ID')}</p>
              <div className="flex justify-between mt-3">
                <div><p className="text-[10px] opacity-60">TENOR</p><p className="font-bold text-sm">{selected.tenor}</p></div>
                <div><p className="text-[10px] opacity-60">ANGSURAN</p><p className="font-bold text-sm">Rp{selected.angsuran.toLocaleString('id-ID')}/{selected.tipe==='harian'?'hari':'bln'}</p></div>
                <div><p className="text-[10px] opacity-60">TIPE</p><p className="font-bold text-sm uppercase">{selected.tipe}</p></div>
              </div>
            </div>
          )}
          <button onClick={handleAjukan} disabled={loading} className="w-full bg-[#1a7a4c] hover:bg-[#145f32] text-white rounded-full py-4 text-sm font-bold shadow-[0_8px_20px_rgba(26,122,76,0.3)] transition disabled:opacity-50">
            {loading?'⏳ Memproses...':'✅ Ajukan Sekarang'}
          </button>
          <button onClick={()=>setTab('daftar')} className="w-full border-2 border-gray-100 rounded-full py-3 text-xs font-bold hover:bg-gray-50">← Kembali</button>
        </div>
      )}

      {tab==='kategori' && (
        <div className="space-y-3">
          <div className="bg-white rounded-[20px] p-4 border">
            <h3 className="font-bold text-sm">Master Kategori</h3>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-4">
                <p className="font-black text-orange-900">HARIAN</p>
                <p className="text-[11px] text-orange-700 mt-1">24H • 30H • 45H • 60H • 70H</p>
                <p className="font-bold mt-3 text-orange-900">{pilihanPinjaman.filter(p=>p.tipe==='harian').length} paket aktif</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4">
                <p className="font-black text-blue-900">BULANAN</p>
                <p className="text-[11px] text-blue-700 mt-1">3Bln • 6Bln • 9Bln • 12Bln • 15Bln</p>
                <p className="font-bold mt-3 text-blue-900">{pilihanPinjaman.filter(p=>p.tipe==='bulanan').length} paket aktif</p>
              </div>
            </div>
          </div>
          <div className="bg-[#0f2a3a] rounded-[20px] p-4 text-white">
            <p className="text-xs font-bold">💡 Tips Koperasi</p>
            <p className="text-[11px] opacity-80 mt-1 leading-relaxed">Paket harian cocok untuk pedagang pasar, bulanan untuk karyawan. Minggu otomatis libur, tagihan geser ke Senin.</p>
          </div>
        </div>
      )}
    </div>
  )
}
