import { HashRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { useState } from 'react'
import Navbar from './components/common/Navbar.jsx'
import Sidebar from './components/common/Sidebar.jsx'
import ProtectedRoute from './components/common/ProtectedRoute.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import Dashboard from './pages/anggota/Dashboard.jsx'
import Simpanan from './pages/anggota/Simpanan.jsx'
import Pinjaman from './pages/anggota/Pinjaman.jsx'
import Angsuran from './pages/anggota/Angsuran.jsx'
import KasBank from './pages/KasBank.jsx'
import SimpananWajib from './pages/SimpananWajib.jsx'
import Pendapatan from './pages/Pendapatan.jsx'
import BiayaOperasional from './pages/BiayaOperasional.jsx'
import Anggota from './pages/Anggota.jsx'
import Laporan from './pages/Laporan.jsx'
import DashboardAdmin from './pages/pengurus/DashboardAdmin.jsx'
import KelolaAnggota from './pages/pengurus/KelolaAnggota.jsx'
import VerifikasiPinjaman from './pages/pengurus/VerifikasiPinjaman.jsx'
import LaporanKeuangan from './pages/pengurus/LaporanKeuangan.jsx'
import Pengaturan from './pages/pengurus/Pengaturan.jsx'
import NotFound from './pages/NotFound.jsx'

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="flex min-h-screen bg-[#f6fdf6]">
      <Sidebar open={sidebarOpen} onClose={()=>setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onToggleSidebar={()=>setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/kas-bank" element={<KasBank />} />
            <Route path="/simpanan-wajib" element={<SimpananWajib />} />
            <Route path="/anggota/simpanan" element={<Simpanan />} />
            <Route path="/anggota/pinjaman" element={<Pinjaman />} />
            <Route path="/anggota/angsuran" element={<Angsuran />} />
            <Route path="/pendapatan" element={<Pendapatan />} />
            <Route path="/biaya-operasional" element={<BiayaOperasional />} />
            <Route path="/anggota" element={<Anggota />} />
            <Route path="/laporan" element={<Laporan />} />
            <Route path="/pengurus" element={<ProtectedRoute allowedRoles={['owner','admin','pengurus']}><DashboardAdmin /></ProtectedRoute>} />
            <Route path="/pengurus/anggota" element={<ProtectedRoute allowedRoles={['owner','admin']}><KelolaAnggota /></ProtectedRoute>} />
            <Route path="/pengurus/pinjaman" element={<ProtectedRoute allowedRoles={['owner','admin']}><VerifikasiPinjaman /></ProtectedRoute>} />
            <Route path="/pengurus/laporan" element={<ProtectedRoute allowedRoles={['owner','admin']}><LaporanKeuangan /></ProtectedRoute>} />
            <Route path="/pengurus/pengaturan" element={<ProtectedRoute allowedRoles={['owner','admin']}><Pengaturan /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/*" element={<Layout />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  )
}
