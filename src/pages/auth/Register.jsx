import { useState } from 'react'
import { supabase } from '../../config/supabase.js'
export default function Register(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [loading,setLoading]=useState(false)
  const handle=async(e)=>{ e.preventDefault(); setLoading(true); await supabase.auth.signUp({ email, password }); setLoading(false); alert('Cek email untuk verifikasi') }
  return <div className="min-h-screen grid place-items-center p-4 bg-[#f0faf0]"><form onSubmit={handle} className="bg-white p-6 rounded-2xl w-full max-w-[360px] space-y-3"><h1 className="font-bold text-center">Daftar</h1><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border rounded-lg px-3 py-2.5 text-sm" /><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full border rounded-lg px-3 py-2.5 text-sm" /><button className="w-full bg-[#1a7a4c] text-white rounded-lg py-3 text-sm">{loading?'...':'Daftar'}</button></form></div>
}
