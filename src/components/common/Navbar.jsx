import { useAuth } from '../../context/AuthContext.jsx'
import { useState } from 'react'

export default function Navbar({ onToggleSidebar }) {
  const { profile, koperasi, logout } = useAuth()
  const [open, setOpen] = useState(false)
  return (
    <nav className="h-[56px] bg-white border-b flex items-center justify-between px-4 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="lg:hidden p-2 rounded-lg bg-gray-100">☰</button>
        <span className="font-bold text-[#0f2a3a] hidden lg:block">Selamat Datang</span>
      </div>
      <div className="relative">
        <button onClick={()=>setOpen(!open)} className="flex items-center gap-2 bg-[#f1f8f1] px-3 py-1.5 rounded-full">
          <div className="w-7 h-7 rounded-full bg-[#1a7a4c] text-white grid place-items-center text-xs">{profile?.nama?.[0] || 'K'}</div>
          <span className="text-xs font-medium hidden md:block">{profile?.nama || 'Koperasi Tri Putra Abadi'}</span>
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border p-2 z-50">
            <p className="px-3 py-2 text-xs text-gray-500">{profile?.email || 'koperasitriputraabadi@gmail.com'}</p>
            <p className="px-3 py-1 text-xs font-bold capitalize">{profile?.role || 'admin'}</p>
            <button onClick={logout} className="w-full text-left px-3 py-2 text-sm hover:bg-red-50 text-red-600 rounded-lg mt-2">Keluar</button>
          </div>
        )}
      </div>
    </nav>
  )
}
