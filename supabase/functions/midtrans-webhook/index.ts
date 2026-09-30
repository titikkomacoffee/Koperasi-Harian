import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
serve(async (req)=>{
  const body=await req.json()
  const supabase=createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!)
  await supabase.from("midtrans_transaksi").update({ status:body.transaction_status, payload:body }).eq("order_id", body.order_id)
  if(body.transaction_status==="settlement"){
    const {data}=await supabase.from("midtrans_transaksi").select("*").eq("order_id",body.order_id).single()
    if(data?.pinjaman_id) await supabase.from("pinjaman").update({status:"lunas"}).eq("id",data.pinjaman_id)
  }
  return new Response(JSON.stringify({ok:true}))
})
