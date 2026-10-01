import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

const menus = [
  { to: '/', label: 'Dashboard', icon: '📊' },
  { to: '/kas-bank', label: 'Kas & Bank', icon: '🏦' },
  { to: '/simpanan-wajib', label: 'Simpanan Wajib', icon: '💳' },
  { to: '/anggota/simpanan', label: 'Simpanan', icon: '💰' },
  { to: '/anggota/angsuran', label: 'Angsuran', icon: '📅' },
  { to: '/pendapatan', label: 'Pendapatan', icon: '📈' },
  { to: '/biaya-operasional', label: 'Biaya Operasional', icon: '🧾' },
  { to: '/anggota/pinjaman', label: 'Pinjaman', icon: '💵' },
  { to: '/anggota', label: 'Anggota', icon: '👥' },
  { to: '/laporan', label: 'Laporan', icon: '📑' },
  { to: '/pengurus/anggota', label: 'Kelola Pendaftaran', icon: '✅', role: ['owner','admin'] },
  { to: '/pengurus/pengaturan', label: 'Pengaturan', icon: '⚙️', role: ['owner','admin'] },
]

export default function Sidebar({ open, onClose }) {
  const { role } = useAuth()
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={onClose}></div>}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-[280px] bg-white border-r flex flex-col transition-transform ${open? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 flex items-center gap-2 border-b">
          <div className="w-8 h-8 bg-[#1a7a4c] rounded-lg grid place-items-center text-white">✓</div>
          <span className="font-bold text-[#0f2a3a]">Koperku</span>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {menus.filter(m =>!m.role || m.role.includes(role)).map(m => (
            <NavLink key={m.to} to={m.to} onClick={onClose} className={({isActive})=>`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm ${isActive?'bg-[#e8f5e9] text-[#1a7a4c] font-semibold':'text-gray-600 hover:bg-gray-50'}`}>
              <span>{m.icon}</span>{m.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t text-[11px] text-gray-400">Koperasi Tri Putra Abadi<br/>Jl. Sesawi No.22 Surabaya</div>
      </aside>
    </>
  )
          }
