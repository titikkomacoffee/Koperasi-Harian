
import { useState, useRef, useEffect } from 'react'
import { supabase } from '../../config/supabase.js'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Pengaturan() {
  const { koperasi, profile } = useAuth()
  const [nama, setNama] = useState('')
  const [alamat, setAlamat] = useState('')
  const [telepon, setTelepon] = useState('')
  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const fileRef = useRef(null)

  const [tanggalMerah, setTanggalMerah] = useState([])
  const [newTgl, setNewTgl] = useState('')
  const [newKet, setNewKet] = useState('')
  const [liburMinggu, setLiburMinggu] = useState(true)
  const [geserSenin, setGeserSenin] = useState(true)

  const [passBaru, setPassBaru] = useState('')
  const [passBaru2, setPassBaru2] = useState('')
  const [users, setUsers] = useState([])
  const [selectedUserId, setSelectedUserId] = useState('')

  useEffect(() => {
    // Load from koperasi context OR localStorage fallback
    const localKop = JSON.parse(localStorage.getItem('koperasi_profile') || '{}')
    setNama(koperasi?.nama_koperasi || localKop.nama_koperasi || 'KOPERASI TRI PUTRA ABADI')
    setAlamat(koperasi?.alamat || localKop.alamat || 'Jl. Sesawi No. 22, Surabaya')
    setTelepon(koperasi?.telepon || localKop.telepon || '08811653903')
    setLogoPreview(koperasi?.logo_url || localKop.logo_url || null)

    const saved = localStorage.getItem('tanggal_merah')
    if (saved) setTanggalMerah(JSON.parse(saved))
    const minggu = localStorage.getItem('libur_minggu')
    if (minggu !== null) setLiburMinggu(minggu === 'true')
    const geser = localStorage.getItem('geser_senin')
    if (geser !== null) setGeserSenin(geser === 'true')
    fetchUsers()
  }, [koperasi])

  const fetchUsers = async () => {
    const { data } = await supabase.from('profiles').select('id,nama,email,role').limit(100)
    if (data) setUsers(data)
  }

  const saveTanggalMerah = (list) => {
    setTanggalMerah(list)
    localStorage.setItem('tanggal_merah', JSON.stringify(list))
  }

  const handleAddTgl = () => {
    if (!newTgl) return alert('Pilih tanggal')
    if (tanggalMerah.some(t=>t.tanggal===newTgl)) return alert('Tanggal sudah ada')
    const item = { id: Date.now(), tanggal: newTgl, keterangan: newKet || 'Hari Libur' }
    saveTanggalMerah([...tanggalMerah, item].sort((a,b)=>a.tanggal.localeCompare(b.tanggal)))
    setNewTgl(''); setNewKet('')
  }

  const handleHapusTgl = (id) => {
    if (!confirm('Hapus tanggal merah ini?')) return
    saveTanggalMerah(tanggalMerah.filter(t=>t.id!==id))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) return alert('Max 5MB')
    setLogoFile(file)
    setLogoPreview(URL.createObjectURL(file))
  }

  const handleSimpanKoperasi = async () => {
    if (!nama.trim()) return alert('Nama koperasi wajib')
    setLoading(true)
    try {
      let logoUrl = logoPreview
      if (logoFile) {
        const ext = logoFile.name.split('.').pop()
        const fileName = `logo-${koperasi?.id || 'default'}-${Date.now()}.${ext}`
        // coba 4 bucket yang mungkin ada di Supabase kamu (dari screenshot)
        const buckets = ['logo-koperasi','koperasi-assets','logos','koperasi']
        let successUrl = null
        for (const b of buckets) {
          const { error } = await supabase.storage.from(b).upload(fileName, logoFile, { upsert: true })
          if (!error) {
            const { data } = supabase.storage.from(b).getPublicUrl(fileName)
            successUrl = data.publicUrl
            break
          }
        }
        if (successUrl) logoUrl = successUrl
        else {
          // fallback base64 lokal
          const reader = new FileReader()
          logoUrl = await new Promise(res=>{
            reader.onload = () => res(reader.result)
            reader.readAsDataURL(logoFile)
          })
        }
      }

      const payload = { nama_koperasi: nama.trim(), alamat: alamat.trim(), telepon: telepon.trim(), logo_url: logoUrl }
      // simpan lokal dulu agar langsung terlihat
      localStorage.setItem('koperasi_profile', JSON.stringify(payload))
      
      if (koperasi?.id) {
        const { error } = await supabase.from('koperasi').update(payload).eq('id', koperasi.id)
        if (error) throw error
      } else {
        // kalau belum ada koperasi, insert baru
        const { data, error } = await supabase.from('koperasi').insert({ ...payload, kode_unik: 'KH-'+Math.random().toString(36).substring(2,7).toUpperCase() }).select()
        if (error) console.log('Insert koperasi error (pakai lokal):', error.message)
      }

      localStorage.setItem('libur_minggu', String(liburMinggu))
      localStorage.setItem('geser_senin', String(geserSenin))
      alert('✅ Berhasil disimpan!\nNama: '+nama+'\nAlamat: '+alamat+'\nTelpon: '+telepon)
      window.dispatchEvent(new Event('koperasi-updated'))
    } catch (err) {
      // tetap simpan lokal biar tidak hilang
      localStorage.setItem('koperasi_profile', JSON.stringify({ nama_koperasi: nama, alamat, telepon, logo_url: logoPreview }))
      alert('⚠️ Disimpan lokal (Supabase error: '+err.message+')\nCek SQL fix RLS di bawah.')
    }
    setLoading(false)
  }

  const handleGantiPassSendiri = async () => {
    if (passBaru !== passBaru2) return alert('Password baru tidak cocok')
    if (passBaru.length < 6) return alert('Minimal 6 karakter')
    const { error } = await supabase.auth.updateUser({ password: passBaru })
    if (error) alert(error.message)
    else { alert('✅ Password berhasil diganti'); setPassBaru(''); setPassBaru2('') }
  }

  const handleResetPassUser = async () => {
    if (!selectedUserId) return alert('Pilih user')
    const u = users.find(x=>x.id===selectedUserId)
    if (!u?.email) return alert('User tidak punya email')
    const { error } = await supabase.auth.resetPasswordForEmail(u.email, { redirectTo: window.location.origin+'/auth/reset' })
    if (error) alert(error.message)
    else alert('✅ Link reset dikirim ke ' + u.email)
  }

  const getNextKerja = (dateStr) => {
    let d = new Date(dateStr)
    let tries = 0
    while (tries < 10) {
      const iso = d.toISOString().split('T')[0]
      const isMinggu = d.getDay()===0
      const isMerah = tanggalMerah.some(t=>t.tanggal===iso)
      if ((liburMinggu && isMinggu) || isMerah) {
        if (geserSenin) d.setDate(d.getDate()+1)
        else break
      } else break
      tries++
      if (d.getDay()===1 && geserSenin) break
    }
    return d.toISOString().split('T')[0]
  }

  return (
    <div className="p-4 lg:p-6 space-y-5 bg-[#f6f7fb] min-h-screen pb-24">
      <div className="bg-white rounded-[22px] p-5 shadow-sm border">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-11 h-11 bg-[#0f2a5a] rounded-2xl grid place-items-center text-white font-bold text-lg">K</div>
          <div><h2 className="font-bold text-[#0f2a3a] text-[15px]">Profil Koperasi</h2><p className="text-[11px] text-gray-500">Bisa edit nama, alamat, telpon, logo • Auto save lokal + Supabase</p></div>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label className="text-[10px] tracking-widest font-bold text-gray-500">NAMA KOPERASI *</label>
            <input value={nama} onChange={e=>setNama(e.target.value)} placeholder="KOPERASI TRI PUTRA ABADI" className="w-full mt-2 border-2 border-gray-100 rounded-full px-5 py-3.5 text-sm font-bold text-[#0f2a3a] focus:border-[#0f2a5a] focus:outline-none" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <label className="text-[10px] tracking-widest font-bold text-gray-500">LOGO KOPERASI</label>
              <div className="mt-2">
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                <div className="flex items-center gap-3">
                  <button type="button" onClick={()=>fileRef.current?.click()} className="border-2 border-gray-200 rounded-full px-5 py-2.5 text-xs font-bold hover:bg-gray-50">📁 Pilih Logo</button>
                  <span className="text-[11px] text-gray-400 truncate max-w-[140px]">{logoFile ? logoFile.name : 'Belum pilih'}</span>
                </div>
                {logoPreview && (
                  <div className="mt-4 relative w-fit">
                    <img src={logoPreview} alt="logo" className="w-24 h-24 object-contain rounded-2xl border-2 border-gray-100 bg-white p-2 shadow-sm" />
                    <button onClick={()=>{setLogoFile(null); setLogoPreview(null)}} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-[10px]">✕</button>
                  </div>
                )}
                <p className="text-[10px] text-gray-400 mt-2">PNG/JPG max 5MB • Otomatis public • Jika bucket private, akan fallback base64 lokal</p>
              </div>
            </div>
            <div>
              <label className="text-[10px] tracking-widest font-bold text-gray-500">ALAMAT LENGKAP *</label>
              <textarea value={alamat} onChange={e=>setAlamat(e.target.value)} rows={4} placeholder="Jl. Sesawi No. 22, Surabaya" className="w-full mt-2 border-2 border-gray-100 rounded-[18px] px-5 py-3 text-sm font-semibold text-[#0f2a3a] focus:border-[#0f2a5a] focus:outline-none resize-none" />
            </div>
          </div>

          <div>
            <label className="text-[10px] tracking-widest font-bold text-gray-500">NOMOR TELEPON / WA *</label>
            <input value={telepon} onChange={e=>setTelepon(e.target.value)} placeholder="08811653903" className="w-full mt-2 border-2 border-gray-100 rounded-full px-5 py-3.5 text-sm font-bold text-[#0f2a3a] focus:border-[#0f2a5a] focus:outline-none" />
          </div>

          <button onClick={handleSimpanKoperasi} disabled={loading} className="w-full bg-[#0f2a5a] hover:bg-[#0a1f45] text-white rounded-full py-4 text-sm font-bold shadow-lg disabled:opacity-50 transition">
            {loading ? '⏳ Menyimpan...' : '💾 Simpan Nama, Alamat, Telpon & Logo'}
          </button>
          <p className="text-[10px] text-center text-gray-400">Data disimpan di localStorage + Supabase (jika RLS allow). Cek SQL di bawah jika gagal.</p>
        </div>
      </div>

      <div className="bg-white rounded-[22px] p-5 shadow-sm border">
        <h3 className="font-bold text-[#0f2a3a]">📅 Tanggal Merah & Hari Libur</h3>
        <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">Minggu auto libur (tidak ada transaksi/tagihan). Tagihan yang jatuh di Minggu/tanggal merah otomatis geser ke Senin.</p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className={`flex items-center gap-2 border-2 rounded-full px-4 py-3 cursor-pointer transition ${liburMinggu?'bg-[#0f2a5a] text-white border-[#0f2a5a]':'bg-[#f6fdf6] border-gray-100'}`}>
            <input type="checkbox" checked={liburMinggu} onChange={e=>{setLiburMinggu(e.target.checked); localStorage.setItem('libur_minggu', String(e.target.checked))}} className="w-4 h-4" />
            <span className="text-xs font-bold">Minggu Libur</span>
          </label>
          <label className={`flex items-center gap-2 border-2 rounded-full px-4 py-3 cursor-pointer transition ${geserSenin?'bg-[#1a7a4c] text-white border-[#1a7a4c]':'bg-[#f6fdf6] border-gray-100'}`}>
            <input type="checkbox" checked={geserSenin} onChange={e=>{setGeserSenin(e.target.checked); localStorage.setItem('geser_senin', String(e.target.checked))}} className="w-4 h-4" />
            <span className="text-xs font-bold">Geser ke Senin</span>
          </label>
        </div>

        <div className="mt-4 flex gap-2">
          <input type="date" value={newTgl} onChange={e=>setNewTgl(e.target.value)} className="flex-1 border-2 border-gray-100 rounded-full px-4 py-2.5 text-xs" />
          <input value={newKet} onChange={e=>setNewKet(e.target.value)} placeholder="Idul Fitri, Tahun Baru..." className="flex-1 border-2 border-gray-100 rounded-full px-4 py-2.5 text-xs" />
          <button onClick={handleAddTgl} className="bg-[#1a7a4c] text-white rounded-full px-5 text-xs font-bold">+ Tambah</button>
        </div>

        <div className="mt-4 space-y-2 max-h-[240px] overflow-auto">
          {liburMinggu && <div className="bg-blue-50 border border-blue-200 rounded-full px-4 py-2 text-[11px] text-blue-700 font-bold">🔵 Setiap Minggu = Libur Otomatis</div>}
          {tanggalMerah.map(t=>(
            <div key={t.id} className="flex justify-between items-center border-2 border-gray-100 rounded-full px-4 py-2.5 hover:border-[#0f2a3a] group">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold">{t.tanggal}</span>
                <span className="text-[11px] text-gray-500">• {t.keterangan}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400 hidden sm:block">→ {getNextKerja(t.tanggal)}</span>
                <button onClick={()=>handleHapusTgl(t.id)} className="w-7 h-7 rounded-full bg-red-50 hover:bg-red-100 text-red-500 grid place-items-center text-[11px]">🗑️</button>
              </div>
            </div>
          ))}
          {tanggalMerah.length===0 && <p className="text-center text-[11px] text-gray-400 py-6">Belum ada tanggal merah custom. Tambah di atas.</p>}
        </div>
      </div>

      <div className="bg-white rounded-[22px] p-5 shadow-sm border">
        <h3 className="font-bold text-[#0f2a3a]">🔐 Ganti Password Akun</h3>
        <p className="text-[11px] text-gray-500 mt-1">Login sebagai {profile?.email}</p>
        
        <div className="mt-4 space-y-3">
          <input value={passBaru} onChange={e=>setPassBaru(e.target.value)} placeholder="Password Baru (min 6 karakter)" type="password" className="w-full border-2 border-gray-100 rounded-full px-5 py-3 text-sm focus:border-[#0f2a5a] focus:outline-none" />
          <input value={passBaru2} onChange={e=>setPassBaru2(e.target.value)} placeholder="Ulangi Password Baru" type="password" className="w-full border-2 border-gray-100 rounded-full px-5 py-3 text-sm focus:border-[#0f2a5a] focus:outline-none" />
          <button onClick={handleGantiPassSendiri} className="w-full bg-[#0f2a5a] text-white rounded-full py-3.5 text-sm font-bold">🔑 Ganti Password Saya</button>
        </div>

        <div className="mt-6 pt-6 border-t border-dashed">
          <p className="text-[11px] font-bold text-gray-600 tracking-widest">RESET PASSWORD USER LAIN (ADMIN)</p>
          <div className="flex gap-2 mt-3">
            <select value={selectedUserId} onChange={e=>setSelectedUserId(e.target.value)} className="flex-1 border-2 border-gray-100 rounded-full px-4 py-2.5 text-xs">
              <option value="">Pilih admin/penagih/nasabah...</option>
              {users.map(u=><option key={u.id} value={u.id}>{u.nama||u.email} • {u.role} • {u.email}</option>)}
            </select>
            <button onClick={handleResetPassUser} className="bg-amber-500 hover:bg-amber-600 text-white rounded-full px-5 text-xs font-bold">Kirim Link</button>
          </div>
          <p className="text-[10px] text-gray-400 mt-2">Link reset akan dikirim ke email user, mereka bisa ganti password sendiri.</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#0f2a3a] to-[#1a7a4c] rounded-[22px] p-5 text-white">
        <p className="font-bold text-sm">✅ Auto Logic Aktif</p>
        <ul className="text-[11px] opacity-90 mt-2 space-y-1 list-disc list-inside leading-relaxed">
          <li>Nama Koperasi: <b>{nama}</b></li>
          <li>Alamat: {alamat}</li>
          <li>Telpon: {telepon}</li>
          <li>Minggu {liburMinggu?'LIBUR':'MASUK'} • Tagihan {geserSenin?'geser ke Senin':'tetap di Minggu'}</li>
          <li>{tanggalMerah.length} tanggal merah custom</li>
        </ul>
      </div>
    </div>
  )
}
