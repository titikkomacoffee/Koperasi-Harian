import { Link } from 'react-router-dom'
export default function NotFound(){
  return <div className="min-h-screen grid place-items-center p-6 text-center"><div><h1 className="text-4xl font-bold">404</h1><p className="text-sm text-gray-500 mt-2">Halaman tidak ditemukan</p><Link to="/" className="mt-4 inline-block bg-[#1a7a4c] text-white px-4 py-2 rounded-full text-sm">Kembali</Link></div></div>
}
