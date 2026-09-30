import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../config/supabase.js'
import Landing from '../Landing.jsx'

export default function Login() {
  const [email, setEmail] = useState('koperasitriputraabadi@gmail.com')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showLanding, setShowLanding] = useState(true)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Login Gagal - Email atau kata sandi salah.')
    } else {
      navigate('/')
    }
    setLoading(false)
  }

  if (showLanding) {
    return <Landing onStart={()=>setShowLanding(false)} />
  }

  return (
    <div className="min-h-screen bg-[#f0faf0] grid place-items-center p-4">
      {error && <div className="fixed top-4 left-4 right-4 bg-[#ffdddd] text-[#a00] p-3 rounded-xl text-xs">{error}</div>}
      <div className="bg-white w-full max-w-[360px] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-center gap-2 mb-4"><div className="w-8 h-8 bg-[#1a7a4c] rounded-lg grid place-items-center text-white">✓</div><span className="font-bold">Koperku</span></div>
        <h1 className="font-bold text-center">Masuk ke Akun Anda</h1>
        <p className="text-[11px] text-gray-500 text-center mt-1 mb-5">Masukkan email dan kata sandi Anda untuk mengakses dasbor.</p>
        <form onSubmit={handleLogin} className="space-y-3">
          <div><label className="text-[11px]">Email</label><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="jama@contoh.com" className="w-full mt-1 border rounded-lg px-3 py-2.5 text-sm bg-[#f6fdf6]" /></div>
          <div><label className="text-[11px]">Kata Sandi</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full mt-1 border rounded-lg px-3 py-2.5 text-sm bg-[#f6fdf6]" /></div>
          <button disabled={loading} className="w-full bg-[#1a7a4c] text-white rounded-lg py-3 text-sm font-semibold mt-2">{loading?'Memuat...':'Masuk'}</button>
        </form>
        <div className="text-center mt-3"><Link to="#" className="text-[11px] text-gray-500">Lupa Kata Sandi?</Link><br/><span className="text-[11px] text-gray-500">Belum punya akun? </span><Link to="/auth/register" className="text-[11px] text-[#1a7a4c] font-bold">Daftar</Link></div>
      </div>
    </div>
  )
}
