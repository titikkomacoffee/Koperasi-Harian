export default function Button({ children, variant='primary', className='', ...props }) {
  const base = variant==='primary' ? 'bg-[#1a7a4c] text-white' : 'bg-white border'
  return <button className={`px-4 py-2.5 rounded-xl font-semibold text-sm ${base} ${className}`} {...props}>{children}</button>
}
