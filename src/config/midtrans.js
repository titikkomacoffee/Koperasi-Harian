import { supabase } from './supabase.js'

export async function createMidtransPayment({ amount, pinjaman_id, nasabah_id, koperasi_id, nama }) {
  const { data, error } = await supabase.functions.invoke('pakasir-qris', {
    body: { amount, pinjaman_id, nasabah_id, koperasi_id, customer_name: nama }
  })
  if (error) throw error
  return data
}

export function generateOrderId(prefix='KOP') {
  const date = new Date().toISOString().slice(0,10).replace(/-/g,'')
  const rand = Math.random().toString(36).substr(2,4).toUpperCase()
  return `${prefix}-${date}-${rand}`
}
