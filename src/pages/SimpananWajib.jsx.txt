export default function SimpananWajib() {
  return (
    <div className="p-4 space-y-4 bg-[#f6fdf6] min-h-screen">
      <h1 className="font-bold">Simpanan Wajib</h1>
      <div className="bg-white rounded-2xl p-4 border">
        <div className="flex gap-2"><span className="bg-[#e8f5e9] text-[#1a7a4c] text-xs px-3 py-1 rounded-full">Daftar Tunggakan</span><span className="text-xs px-3 py-1 text-gray-500">Tunggakan (0)</span></div>
        <div className="mt-4 grid grid-cols-3 text-[11px] text-gray-500 border-b pb-2"><span>Anggota</span><span>Tunggakan</span><span>Aksi</span></div>
        <p className="text-xs text-gray-400 text-center py-8">Semua anggota telah membayar.</p>
      </div>
    </div>
  )
}
