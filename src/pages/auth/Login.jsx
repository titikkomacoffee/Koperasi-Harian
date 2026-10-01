import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../config/supabase.js'
import Landing from '../Landing.jsx'
export default function Login(){
  const [email,setEmail]=useState('koperasitriputraabadi@gmail.com')
  const [password,setPassword]=useState('')
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState('')
  const [showLanding,setShowLanding]=useState(true)
  const navigate=useNavigate()
  const handleLogin=async(e)=>{
    e.preventDefault(); setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if(error) setError('Login Gagal - Email atau kata sandi salah.')
    else navigate('/')
    setLoading(false)
  }
  if(showLanding) return <Landing onStart={()=>setShowLanding(false)} />
  return (
    <div className="min-h-screen bg-[#f0faf0] grid place-items-center p-4">
      {error && <div className="fixed top-4 left-4 right-4 bg-[#ffdddd] text-[#a00] p-3 rounded-xl text-xs">{error}</div>}
      <div className="bg-white w-full max-w-[360px] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-center gap-2 mb-4"><div className="w-8 h-8 bg-[#1a7a4c] rounded-lg grid place-items-center text-white">✓</div><span className="font-bold">Koperku</span></div>
        <h1 className="font-bold text-center">Masuk ke Akun Anda</h1>
        <form onSubmit={handleLogin} className="space-y-3 mt-4">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border rounded-lg px-3 py-2.5 text-sm bg-[#f6fdf6]" />
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Kata Sandi" className="w-full border rounded-lg px-3 py-2.5 text-sm bg-[#f6fdf6]" />
          <button disabled={loading} className="w-full bg-[#1a7a4c] text-white rounded-lg py-3 text-sm font-semibold">{loading?'Memuat...':'Masuk'}</button>
        </form>
        <div className="text-center mt-3 text-[11px]"><Link to="/auth/register" className="text-[#1a7a4c] font-bold">Daftar</Link></div>
      </div>
    </div>
  )
}
