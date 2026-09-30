import { supabase } from '../config/supabase.js'
import { createMidtransPayment } from '../config/midtrans.js'
export const ajukanPinjaman = async (payload) => {
  const { data, error } = await supabase.from('pinjaman').insert(payload).select().single()
  if (error) throw error; return data
}
export const bayarAngsuranMidtrans = async ({ amount, pinjaman_id, nasabah, koperasi }) => {
  return await createMidtransPayment({ amount, pinjaman_id, nasabah_id: nasabah?.id, koperasi_id: koperasi?.id, nama: nasabah?.nama })
}
