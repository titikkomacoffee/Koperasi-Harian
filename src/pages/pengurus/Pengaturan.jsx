import { useState } from 'react'
export default function Pengaturan(){
  const [logo,setLogo]=useState(null)
  return (
    <div className="p-4 space-y-3">
      <h1 className="font-bold">Pengaturan</h1>
      <div className="bg-white rounded-2xl p-4 border">
        <p className="text-xs font-bold">Logo Koperasi</p>
        <label className="mt-3 block w-full border-2 border-dashed rounded-xl p-6 text-center text-xs cursor-pointer">
          <input type="file" className="hidden" accept="image/*" onChange={e=>setLogo(URL.createObjectURL(e.target.files[0]))} />
          {logo? <img src={logo} className="w-16 h-16 mx-auto rounded" /> : 'Klik untuk upload logo'}
        </label>
      </div>
    </div>
  )
}
