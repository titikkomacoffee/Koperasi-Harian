export default function Button({ children, variant='primary', className='', ...props }) {
  const base = variant==='primary' ? 'bg-[#1a7a4c] text-white hover:bg-[#156a3f]' : 'bg-white border text-gray-700'
  return <button className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition ${base} ${className}`} {...props}>{children}</button>
}
