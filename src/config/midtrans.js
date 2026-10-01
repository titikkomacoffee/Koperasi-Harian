import { supabase } from './supabase.js'
export async function createMidtransPayment({ amount, pinjaman_id, nasabah_id, koperasi_id, nama }) {
  const { data, error } = await supabase.functions.invoke('midtrans-payment', {
    body: { amount, pinjaman_id, nasabah_id, koperasi_id, customer_name: nama || "Nasabah" }
  })
  if (error) throw error
  return data
}
export function generateOrderId(prefix='KOP'){
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2,4).toUpperCase()}`
}
