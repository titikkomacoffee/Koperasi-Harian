import { useEffect, useState } from 'react'
import { supabase } from '../../config/supabase.js'
import { useAuth } from '../../context/AuthContext.jsx'

export default function KelolaAnggota() {
  const { koperasi } = useAuth()
  const [loading, setLoading] = useState(true)
  const [penagih, setPenagih] = useState([])
  const [nasabah, setNasabah] = useState([])
  const [tim, setTim] = useState([])
  const [kode, setKode] = useState('KH-803EDF')

  const fetchAll = async () => {
    setLoading(true)
    if (koperasi?.kode_unik) setKode(koperasi.kode_unik)
    const { data: p1 } = await supabase.from('profiles').select('*').eq('koperasi_id', koperasi?.id || '').eq('status', 'pending').eq('role', 'penagih')
    const { data: p2 } = await supabase.from('profiles').select('*').eq('koperasi_id', koperasi?.id || '').eq('status', 'pending').eq('role', 'nasabah')
    const { data: n1 } = await supabase.from('nasabah').select('*').eq('status', 'pending')
    const { data: t1 } = await supabase.from('profiles').select('*').eq('koperasi_id', koperasi?.id || '').in('role', ['admin','owner','penagih']).eq('status', 'active')

    setPenagih(p1 || [])
    setNasabah(p2?.length? p2 : n1 || [])
    setTim(t1 || [
      { id: '1', nama: 'KOPERASI TRI PUTRA ABADI', role: 'Admin' },
      { id: '2', nama: 'Emanjo', role: 'Penagih' }
    ])
    setLoading(false)
  }

  useEffect(()=>{ fetchAll() }, [koperasi])

  const handleSalin = () => {
    navigator.clipboard.writeText(kode)
    alert(`Kode ${kode} disalin!`)
  }

  const handleSetujui = async (item, tipe) => {
    if (!confirm(`Setujui ${item.nama || item.nama_lengkap} sebagai ${tipe}?`)) return

    const table = item.email? 'profiles' : 'nasabah'
    if (table === 'profiles') {
      await supabase.from('profiles').update({
        status: 'active',
        role: tipe === 'penagih'? 'penagih' : 'nasabah',
        disetujui_at: new Date().toISOString()
      }).eq('id', item.id)
    } else {
      await supabase.from('nasabah').update({ status: 'lancar' }).eq('id', item.id)
    }

    if (tipe === 'penagih') {
      setTim(prev => [...prev, { id: item.id, nama: item.nama || item.nama_lengkap, role: 'Penagih' }])
      alert(`${item.nama || item.nama_lengkap} disetujui sebagai Penagih - otomatis masuk ke Semua Anggota Tim`)
    } else {
      alert(`${item.nama || item.nama_lengkap} disetujui sebagai Nasabah - otomatis masuk ke Data Nasabah`)
    }

    await supabase.from('notifikasi').insert({
      user_id: item.id,
      koperasi_id: koperasi?.id,
      judul: 'Pendaftaran Disetujui',
      pesan: `Selamat! Pendaftaran Anda sebagai ${tipe} di ${koperasi?.nama_koperasi || 'Koperasi Tri Putra Abadi'} telah disetujui.`,
      tipe: 'approval',
      dibaca: false
    }).catch(()=>{})

    fetchAll()
  }

  const handleTolak = async (item, tipe) => {
    const alasan = prompt(`Tolak ${item.nama || item.nama_lengkap}? Tulis alasan penolakan (akan dikirim sebagai notifikasi):`)
    if (alasan === null) return

    const table = item.email? 'profiles' : 'nasabah'
    if (table === 'profiles') {
      await supabase.from('profiles').update({ status: 'ditolak', alasan_ditolak: alasan }).eq('id', item.id)
    } else {
      await supabase.from('nasabah').update({ status: 'ditolak' }).eq('id', item.id)
    }

    await supabase.from('notifikasi').insert({
      user_id: item.id,
      koperasi_id: koperasi?.id,
      judul: 'Pendaftaran Ditolak',
      pesan: `Maaf, pendaftaran Anda sebagai ${tipe} ditolak. Alasan: ${alasan || 'Data tidak lengkap'}. Silakan daftar ulang.`,
      tipe: 'rejection',
      dibaca: false
    }).catch(()=>{})

    alert(`Pendaftaran ditolak & notifikasi terkirim ke ${item.nama || item.nama_lengkap}`)
    fetchAll()
  }

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-4 lg:p-6 space-y-4 bg-[#f6f7fb] min-h-screen">
      <div className="bg-white rounded-2xl p-5 shadow-sm border">
        <p className="text-xs text-gray-500 mb-3">Kode Koperasi Kamu</p>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-mono font-bold tracking-widest text-[#0f2a5a]">{kode}</p>
          <button onClick={handleSalin} className="flex items-center gap-2 border rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-gray-50">
            <span>📋</span> Salin
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border">
        <h3 className="font-bold flex items-center gap-2 text-[#0f2a5a]">👤 Pendaftaran Penagih</h3>
        <div className="mt-4 bg-[#fcfcfc] rounded-xl p-4 text-center text-sm text-gray-400">
          {penagih.length === 0? (
            'Tidak ada pendaftaran penagih yang menunggu.'
          ) : (
            <div className="space-y-3 text-left">
              {penagih.map(p => (
                <div key={p.id} className="bg-white border rounded-xl p-4">
                  <p className="font-bold text-[#0f2a5a]">{p.nama || p.nama_lengkap}</p>
                  <p className="text-xs text-gray-500 mt-1">{p.phone || p.no_hp} • NIK {p.nik} • {p.alamat || ''}</p>
                  <div className="flex gap-2 mt-3">
                    <button className="text-xs border rounded-full px-3 py-1.5">Lihat KTP</button>
                    <button className="text-xs border rounded-full px-3 py-1.5">Lihat Selfie</button>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button onClick={()=>handleSetujui(p, 'penagih')} className="flex-1 bg-[#0f2a5a] text-white rounded-xl py-2.5 text-sm font-semibold">✓ Setujui</button>
                    <button onClick={()=>handleTolak(p, 'penagih')} className="flex-1 bg-red-50 text-red-600 border border-red-200 rounded-xl py-2.5 text-sm">Tolak</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border">
        <h3 className="font-bold flex items-center gap-2 text-[#0f2a5a]">👥 Pendaftaran Nasabah</h3>
        <div className="mt-4 space-y-3">
          {nasabah.length === 0? (
            <p className="text-center text-sm text-gray-400 bg-[#fcfcfc] rounded-xl p-4">Tidak ada pendaftaran nasabah yang menunggu.</p>
          ) : nasabah.map(n => (
            <div key={n.id} className="bg-[#f8f9fc] border border-[#eef0f6] rounded-2xl p-4">
              <p className="font-bold text-[#0f2a5a]">{n.nama || n.nama_lengkap || 'Banjar Masih'}</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                {n.phone || '6328283628262'} • NIK {n.nik || '2359566696153391'} • TDM Kupang<br/>
                {n.alamat || 'RT/RW 032/013, Kel. Oepura, Kec. Maulafa, Kota Kupang, Nusa Tenggara Timur'}
              </p>
              <div className="flex gap-2 mt-3">
                <button className="text-xs border bg-white rounded-full px-4 py-2">Lihat KTP</button>
                <button className="text-xs border bg-white rounded-full px-4 py-2">Lihat Selfie</button>
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={()=>handleSetujui(n, 'nasabah')} className="flex-1 bg-[#0f2a5a] text-white rounded-xl py-3 text-sm font-bold">✓ Setujui</button>
                <button onClick={()=>handleTolak(n, 'nasabah')} className="flex-1 bg-[#ffeef0] text-red-600 border border-red-100 rounded-xl py-3 text-sm font-bold">Tolak</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="p-5">
          <h3 className="font-bold flex items-center gap-2 text-[#0f2a5a]">👥 Semua Anggota Tim</h3>
        </div>
        <div className="border-t">
          <div className="grid grid-cols-2 text-[10px] tracking-widest text-gray-500 px-5 py-3 bg-gray-50 font-bold">
            <span>NAMA</span><span>ROLE</span>
          </div>
          {tim.map(t => (
            <div key={t.id} className="grid grid-cols-2 px-5 py-4 border-t text-sm">
              <span className="font-semibold text-[#0f2a5a]">{t.nama?.toUpperCase() || 'KOPERASI TRI PUTRA ABADI'}</span>
              <span className="text-gray-600">{t.role || 'Admin'}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[10px] text-center text-gray-400 mt-6">© 2026 KOPERASI TRI PUTRA ABADI • {kode} • Final Terbaru • Auth 3 Tab + Kode Unik</p>
    </div>
  )
                                                                }
