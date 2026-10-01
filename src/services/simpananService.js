import { supabase } from '../config/supabase.js'
export const tambahSimpanan = async (p) => {
  const { data, error } = await supabase.from('simpanan').insert(p).select().single()
  if(error) throw error; return data
}
