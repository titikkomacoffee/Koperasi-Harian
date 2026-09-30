// MIDTRANS SNAP - ganti pakasir-qris
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
const MIDTRANS_SERVER_KEY = Deno.env.get("MIDTRANS_SERVER_KEY")!
const SNAP_URL = Deno.env.get("MIDTRANS_IS_PRODUCTION")==="true" ? "https://app.midtrans.com/snap/v1/transactions" : "https://app.sandbox.midtrans.com/snap/v1/transactions"
serve(async (req)=>{
  const { amount, pinjaman_id, customer_name } = await req.json()
  const order_id = `KOP-${Date.now()}`
  const payload={ transaction_details:{ order_id, gross_amount:Number(amount) }, customer_details:{ first_name:customer_name||"Nasabah" } }
  const res=await fetch(SNAP_URL,{ method:"POST", headers:{ "Content-Type":"application/json", Authorization:`Basic ${btoa(MIDTRANS_SERVER_KEY+":")}` }, body:JSON.stringify(payload) })
  const snap=await res.json()
  const supabase=createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!)
  await supabase.from("midtrans_transaksi").insert({ order_id, token:snap.token, redirect_url:snap.redirect_url, pinjaman_id, amount, status:"pending" })
  return new Response(JSON.stringify(snap),{ headers:{ "Content-Type":"application/json" } })
})
