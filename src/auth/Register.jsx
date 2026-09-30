import { useState } from 'react'
import { supabase } from '../../config/supabase.js'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [step,setStep]=useState(1)
  const [form,setForm]=useState({ nama_koperasi:'Koperasi Tri Putra Abadi', alamat:'Jl. Sesawi No.22 Surabaya', telepon:'0881153903', email_kop:'', nama:'', email:'', password:'', no_hp:'', kode_unik:'' })
  const nav = useNavigate()
  const [loading,setLoading]=useState(false)

  const generateKode = () => 'KH-' + Math.random().toString(36).substr(2,6).toUpperCase()

  const handleDaftarKoperasi = async (e) => {
    e.preventDefault(); setLoading(true)
    try {
      const kode = generateKode()
      const { data: auth, error } = await supabase.auth.signUp({ email: form.email, password: form.password })
      if (error) throw error
      const userId = auth.user?.id || auth.session?.user?.id
      if (!userId) throw new Error('Gagal buat auth')
      const { data: kop, error: e1 } = await supabase.from('koperasi').insert({ nama_koperasi: form.nama_koperasi, alamat: form.alamat, telepon: form.telepon, email: form.email_kop || form.email, owner_id: userId, kode_unik: kode, logo_url: '' }).select().single()
      if (e1) throw e1
      await supabase.from('profiles').insert({ id: userId, koperasi_id: kop.id, nama: form.nama, email: form.email, role: 'owner', no_hp: form.no_hp })
      await supabase.from('pengaturan').insert({ koperasi_id: kop.id, user_id: userId, pakasir_slug: 'kasir-toko-saya', pakasir_api_key: 'KiAMlXHZ1y7zJgPE95dB2SpvIlrXdbtU', pakasir_qris_id: 'kasir-toko-saya', denda_per_hari: 5000 })
      alert(`Berhasil! Kode Koperasi kamu: ${kode} - Share ke penagih untuk daftar`)
      nav('/auth/login')
    } catch(err){ alert(err.message) }
    setLoading(false)
  }

  return (
    <div className="min-h-screen grid place-items-center bg-[#0f2a5a] p-4">
      <div className="bg-white rounded-[28px] p-8 w-full max-w-lg">
        <h1 className="font-bold text-lg">Daftar Koperasi Baru</h1>
        <p className="text-xs text-gray-500 mb-4">Buat koperasi baru, dapat kode unik KH-XXXXXX untuk rekrut tim</p>
        {step===1 ? (
          <div className="space-y-3">
            <input value={form.nama_koperasi} onChange={e=>setForm({...form,nama_koperasi:e.target.value})} placeholder="Nama Koperasi" className="w-full border rounded-xl px-4 py-3 text-sm"/>
            <input value={form.alamat} onChange={e=>setForm({...form,alamat:e.target.value})} placeholder="Alamat" className="w-full border rounded-xl px-4 py-3 text-sm"/>
            <input value={form.telepon} onChange={e=>setForm({...form,telepon:e.target.value})} placeholder="Telepon" className="w-full border rounded-xl px-4 py-3 text-sm"/>
            <button onClick={()=>setStep(2)} className="w-full btn-primary py-3">Lanjut Data Owner</button>
          </div>
        ) : (
          <form onSubmit={handleDaftarKoperasi} className="space-y-3">
            <input value={form.nama} onChange={e=>setForm({...form,nama:e.target.value})} placeholder="Nama Owner" className="w-full border rounded-xl px-4 py-3 text-sm" required/>
            <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email Owner (untuk login)" className="w-full border rounded-xl px-4 py-3 text-sm" required/>
            <input value={form.no_hp} onChange={e=>setForm({...form,no_hp:e.target.value})} placeholder="No HP" className="w-full border rounded-xl px-4 py-3 text-sm"/>
            <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Password" className="w-full border rounded-xl px-4 py-3 text-sm" required/>
            <button disabled={loading} className="w-full btn-primary py-3">{loading?'Mendaftarkan...':'Daftar & Buat Koperasi'}</button>
            <button type="button" onClick={()=>setStep(1)} className="w-full text-xs">Kembali</button>
          </form>
        )}
      </div>
    </div>
  )
}
