export default function BadgeStatus({ status }) {
  const s=(status||'').toLowerCase()
  let cls='bg-gray-100 text-gray-600'
  if(['lancar','lunas','active'].includes(s)) cls='bg-[#e8f5e9] text-[#1a7a4c]'
  if(['telat','menunggak'].includes(s)) cls='bg-red-100 text-red-600'
  if(['pending','menunggu'].includes(s)) cls='bg-amber-100 text-amber-700'
  return <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${cls}`}>{status}</span>
}
