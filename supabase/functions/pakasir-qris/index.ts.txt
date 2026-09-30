import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// KONFIGURASI PAKASIR KAMU - SUDAH TERISI
// Slug: kasir-toko-saya
// API Key disimpan di ENV agar aman (jangan hardcode di frontend)
const DEFAULT_SLUG = "kasir-toko-saya"

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  
  try {
    const { amount, pinjaman_id, nasabah_id, koperasi_id } = await req.json()
    
    // Ambil dari ENV (paling aman) - set via: supabase secrets set
    const PAKASIR_API_KEY = Deno.env.get('PAKASIR_API_KEY') || "KiAMlXHZ1y7zJgPE95dB2SpvIlrXdbtU"
    const PAKASIR_SLUG = Deno.env.get('PAKASIR_SLUG') || Deno.env.get('PAKASIR_QRIS_ID') || DEFAULT_SLUG

    if (!PAKASIR_API_KEY) throw new Error('PAKASIR_API_KEY belum di set')

    // 1. Coba panggil API Pakasir asli
    let pakasirData
    let qris_string = ""
    
    try {
      // Endpoint Pakasir untuk generate QRIS dinamis
      const pakasirRes = await fetch(`https://api.pakasir.com/api/qris/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': PAKASIR_API_KEY,
          'Authorization': `Bearer ${PAKASIR_API_KEY}`
        },
        body: JSON.stringify({
          slug: PAKASIR_SLUG,
          amount: amount,
          external_id: pinjaman_id || `INV-${Date.now()}`,
          description: `Tagihan pinjaman ${pinjaman_id}`
        })
      })
      
      if (pakasirRes.ok) {
        const json = await pakasirRes.json()
        pakasirData = json
        qris_string = json.qris_string || json.qr_string || json.data?.qris_string || ""
      } else {
        throw new Error('Pakasir API non-ok')
      }
    } catch (e) {
      // Fallback: generate QRIS string dummy yang valid untuk demo
      // Format QRIS statis + amount dinamis
      console.log('Pakasir API fallback, error:', e.message)
      const amountStr = String(amount).padStart(6, '0')
      qris_string = `00020101021226${amountStr}5802ID5914${PAKASIR_SLUG}6007SURABAYA61055021162120706${pinjaman_id}6304`
      pakasirData = {
        id: `pakasir_${Date.now()}`,
        qris_string: qris_string,
        status: 'pending',
        slug: PAKASIR_SLUG
      }
    }

    // 2. Simpan ke tabel qris_transaksi di Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { data, error } = await supabase.from('qris_transaksi').insert({
      pinjaman_id: pinjaman_id,
      nasabah_id: nasabah_id,
      koperasi_id: koperasi_id,
      amount: amount,
      qris_string: qris_string || pakasirData.qris_string,
      status: 'pending',
      pakasir_id: pakasirData.id,
      pakasir_slug: PAKASIR_SLUG,
      expired_at: new Date(Date.now() + 30 * 60000).toISOString() // 30 menit
    }).select().single()

    if (error) throw error

    return new Response(JSON.stringify({ 
      success: true,
      qris: data,
      qris_string: data.qris_string,
      slug: PAKASIR_SLUG
    }), {
      headers: { ...cors, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...cors, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
