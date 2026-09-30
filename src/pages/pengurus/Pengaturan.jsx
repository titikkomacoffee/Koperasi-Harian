import { useState, useRef } from 'react'
import { supabase } from '../../config/supabase.js'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Pengaturan() {
  const { koperasi, profile } = useAuth()
  const [nama, setNama] = useState(koperasi?.nama_koperasi || 'KOPERASI TRI PUTRA ABADI')
  const [alamat, setAlamat] = useState(koperasi?.alamat || 'Jl. Sesawi No. 22')
  const [telepon, setTelepon] = useState(koperasi?.telepon || '08811653903')
  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(koperasi?.logo_url || null)
  const [loading, setLoading] = useState(false)
  const fileRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      alert('File max 2MB')
      return
    }
    setLogoFile(file)
    setLogoPreview(URL.createObjectURL(file))
  }

  const handlePilihFile = () => {
    // FIX: trigger click dengan user gesture, bukan pointer-events none
    fileRef.current?.click()
  }

  const handleSimpan = async () => {
    setLoading(true)
    try {
      let logoUrl = koperasi?.logo_url
      if (logoFile) {
        // Upload ke Supabase Storage
        const fileName = `logo-${koperasi?.id || 'default'}-${Date.now()}.${logoFile.name.split('.').pop()}`
        const { data, error } = await supabase.storage.from('koperasi-assets').upload(fileName, logoFile, { upsert: true })
        if (error) {
          // Fallback: coba bucket logos
          const { data: d2, error: e2 } = await supabase.storage.from('logos').upload(fileName, logoFile, { upsert: true })
          if (e2) throw e2
          const { data: urlData } = supabase.storage.from('logos').getPublicUrl(fileName)
          logoUrl = urlData.publicUrl
        } else {
          const { data: urlData } = supabase.storage.from('koperasi-assets').getPublicUrl(fileName)
          logoUrl = urlData.publicUrl
        }
      }

      const { error } = await supabase.from('koperasi').update({
        nama_koperasi: nama,
        alamat: alamat,
        telepon: telepon,
        logo_url: logoUrl
      }).eq('id', koperasi?.id)

      if (error) throw error
      alert('Profil koperasi disimpan! Logo akan tampil di header & struk.')
      window.location.reload()
    } catch (err) {
      alert('Gagal simpan: ' + err.message)
    }
    setLoading(false)
  }

  return (
    <div className="p-4 lg:p-6 space-y-4 bg-[#f6f7fb] min-h-screen">
      <div className="bg-white rounded-2xl p-5 shadow-sm border">
        <h2 className="font-bold text-[#0f2a5a]">Profil Koperasi</h2>
        <p className="text-xs text-gray-500 mt-2 leading-relaxed">Nama, alamat, nomor telepon, dan logo ini akan tampil di header aplikasi dan bukti struk untuk anggota tim koperasi.</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-[10px] tracking-widest text-gray-500 font-bold">NAMA KOPERASI</label>
            <input value={nama} onChange={e=>setNama(e.target.value)} className="w-full mt-2 border rounded-full px-5 py-3.5 text-sm font-semibold text-[#0f2a5a]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] tracking-widest text-gray-500 font-bold">LOGO KOPERASI</label>
              <div className="mt-2 flex items-center gap-3">
                {/* FIX: input file hidden tapi ref bisa di klik */}
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                <button type="button" onClick={handlePilihFile} className="border rounded-full px-5 py-2.5 text-xs font-bold hover:bg-gray-50 cursor-pointer">Pilih File</button>
                <span className="text-xs text-gray-400">{logoFile ? logoFile.name : 'Tidak ada file yang dipilih'}</span>
              </div>
              {logoPreview && (
                <div className="mt-3">
                  <img src={logoPreview} alt="preview logo" className="w-20 h-20 object-contain rounded-xl border bg-white p-1" />
                </div>
              )}
            </div>
            <div>
              <label className="text-[10px] tracking-widest text-gray-500 font-bold">ALAMAT</label>
              <input value={alamat} onChange={e=>setAlamat(e.target.value)} className="w-full mt-2 border rounded-full px-5 py-3.5 text-sm font-semibold text-[#0f2a5a]" />
            </div>
          </div>

          <div>
            <label className="text-[10px] tracking-widest text-gray-500 font-bold">NOMOR TELEPON</label>
            <input value={telepon} onChange={e=>setTelepon(e.target.value)} className="w-full mt-2 border rounded-full px-5 py-3.5 text-sm font-semibold text-[#0f2a5a]" />
          </div>

          <button onClick={handleSimpan} disabled={loading} className="w-full bg-[#0f2a5a] text-white rounded-full py-4 text-sm font-bold mt-2">
            {loading ? 'Menyimpan...' : 'Simpan Profil Koperasi'}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t">
          <p className="text-xs text-gray-400">Masuk sebagai {profile?.email || 'koperasitriputraabadi@gmail.com'}</p>
          <input placeholder="Password Baru" type="password" className="w-full mt-3 border rounded-full px-5 py-3.5 text-sm" />
          <button className="w-full bg-[#0f2a5a] text-white rounded-full py-4 text-sm font-bold mt-3">Ganti Password</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border">
        <h3 className="font-bold text-[#0f2a5a]">Setting Denda Keterlambatan</h3>
        <p className="text-xs text-gray-500 mt-2 leading-relaxed">Nominal ini otomatis dipakai untuk menghitung kolom "Denda" di Data Pinjaman ketika angsuran lewat jatuh tempo. Jasa/Bunga Pinjaman (karena biasanya beda-beda tiap nasabah).</p>
        <label className="text-[10px] tracking-widest text-gray-500 font-bold mt-4 block">DENDA PER HARI TELAT (TENOR HARIAN)</label>
        <input placeholder="Rp 1000" className="w-full mt-2 border rounded-full px-5 py-3.5 text-sm" />
      </div>
    </div>
  )
}
