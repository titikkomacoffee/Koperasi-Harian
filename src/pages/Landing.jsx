export default function Landing({ onStart }){
  return (
    <div className="min-h-screen bg-[#f0faf0] grid place-items-center p-4">
      <div className="bg-white w-full max-w-[360px] rounded-3xl p-6 shadow-sm border text-center">
        <div className="w-12 h-12 bg-[#1a7a4c] rounded-xl grid place-items-center text-white mx-auto">✓</div>
        <h1 className="font-bold mt-3 text-lg">Koperasi Tri Putra Abadi</h1>
        <p className="text-[11px] text-gray-500 mt-2">Melayani Pinjaman Dengan Tenor Yang Sesuai Dengan Keadaan Dan Suku Bunga Yang Rendah dan Sangat Ringan untuk semua</p>
        <div className="grid grid-cols-2 gap-2 mt-5 text-[11px] text-left">
          <div className="bg-[#f6fdf6] p-3 rounded-xl">💰 60 Pilihan Tenor<br/><span className="text-[10px] text-gray-500">24H-15Bln</span></div>
          <div className="bg-[#f6fdf6] p-3 rounded-xl">🏦 Midtrans<br/><span className="text-[10px] text-gray-500">QRIS & VA</span></div>
        </div>
        <button onClick={onStart} className="w-full mt-5 bg-[#1a7a4c] text-white rounded-full py-3 text-sm font-bold">Mulai Sekarang</button>
      </div>
    </div>
  )
}
