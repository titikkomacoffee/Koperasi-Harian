
import { useState, useMemo, useRef, useEffect } from 'react'

export default function ModernSelect({ value, onChange, options }) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [tab, setTab] = useState('harian')
  const ref = useRef(null)

  useEffect(() => {
    const h = (e) => { if(ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const selected = useMemo(() => options.find(o => o.id === value), [value, options])
  const filtered = useMemo(() => {
    let list = options.filter(o => o.tipe === tab)
    if(q) list = list.filter(o => o.label.toLowerCase().includes(q.toLowerCase()) || String(o.jumlah).includes(q))
    return list
  }, [options, tab, q])

  const formatRp = (n) => 'Rp' + n.toLocaleString('id-ID')

  return (
    <div ref={ref} className="relative">
      <button 
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left bg-white border-2 border-[#e8f0e8] rounded-[16px] px-4 py-3.5 flex items-center justify-between shadow-sm hover:border-[#1a7a4c] hover:shadow-md transition-all"
      >
        <div className="flex-1 min-w-0">
          {selected ? (
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full grid place-items-center text-xs font-bold ${selected.tipe==='harian'?'bg-orange-100 text-orange-700':'bg-blue-100 text-blue-700'}`}>{selected.tipe==='harian'?'H':'B'}</div>
              <div>
                <p className="font-bold text-[14px] text-[#0f2a3a] leading-none">{formatRp(selected.jumlah)} • {selected.tenor}</p>
                <p className="text-[11px] text-gray-500 mt-1">{formatRp(selected.angsuran)}/{selected.tipe==='harian'?'hari':'bulan'}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400">Pilih paket pinjaman...</p>
          )}
        </div>
        <div className={`w-8 h-8 rounded-full bg-[#f6fdf6] grid place-items-center text-[#1a7a4c] transition ${open ? 'rotate-180 bg-[#e8f5e9]' : ''}`}>▼</div>
      </button>

      {open && (
        <div className="absolute left-0 right-0 mt-2 z-50 bg-white rounded-[22px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden">
          <div className="p-3 bg-[#f9fdf9] border-b border-[#eef5ee]">
            <div className="flex gap-2 mb-3">
              <button onClick={() => setTab('harian')} className={`flex-1 py-2.5 rounded-full text-[12px] font-bold transition ${tab==='harian' ? 'bg-[#0f2a3a] text-white shadow-lg' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                📅 Harian {options.filter(o=>o.tipe==='harian').length}
              </button>
              <button onClick={() => setTab('bulanan')} className={`flex-1 py-2.5 rounded-full text-[12px] font-bold transition ${tab==='bulanan' ? 'bg-[#1a7a4c] text-white shadow-lg' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                🗓️ Bulanan {options.filter(o=>o.tipe==='bulanan').length}
              </button>
            </div>
            <input 
              autoFocus
              value={q} 
              onChange={e=>setQ(e.target.value)}
              placeholder="Cari Rp200rb, 24 Hari..."
              className="w-full bg-white border border-gray-200 rounded-full px-4 py-2.5 text-[12px] focus:outline-none focus:ring-2 focus:ring-[#1a7a4c]/20 focus:border-[#1a7a4c]"
            />
          </div>
          <div className="max-h-[340px] overflow-auto p-2 space-y-1 bg-white">
            {filtered.map(o => {
              const active = o.id === value
              return (
                <button
                  key={o.id}
                  onClick={() => { onChange(o.id); setOpen(false); setQ('') }}
                  className={`w-full text-left rounded-2xl px-4 py-3 flex items-center justify-between transition-all ${active ? 'bg-[#0f2a3a] text-white shadow-md scale-[0.98]' : 'hover:bg-[#f6fdf6] border border-transparent hover:border-[#e8f5e9]'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full grid place-items-center text-[11px] font-bold ${active ? 'bg-white/20 text-white' : o.tipe==='harian' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>{o.tipe==='harian'?'H':'B'}</div>
                    <div>
                      <p className={`text-[13px] leading-none ${active ? 'font-bold text-white' : 'font-semibold text-[#0f2a3a]'}`}>{formatRp(o.jumlah)} - {o.tenor}</p>
                      <p className={`text-[11px] mt-1 ${active ? 'text-white/70' : 'text-gray-500'}`}>{formatRp(o.angsuran)}/{o.tipe==='harian'?'hari':'bulan'} • {o.label.split('(')[1]?.replace(')','') || ''}</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full grid place-items-center text-[12px] ${active ? 'bg-white text-[#0f2a3a]' : 'border border-gray-200 text-transparent'}`}>✓</div>
                </button>
              )
            })}
            {filtered.length===0 && <p className="text-center text-[12px] text-gray-400 py-10">Tidak ada paket<br/><span className="text-[10px]">Coba kata kunci lain</span></p>}
          </div>
        </div>
      )}
    </div>
  )
}
