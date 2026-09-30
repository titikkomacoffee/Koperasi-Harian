import { createClient } from '@supabase/supabase-js'
const url = import.meta.env.VITE_SUPABASE_URL || "https://eiosyymlsfxxsdgnxqif.supabase.co"
const key = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.[STRIPPED 127 bytes].7vACrpdn8d7_l4zxmICknkhbTFkSLdvVHeN0DujyGQM"
export const supabase = createClient(url, key, { auth: { persistSession: true, autoRefreshToken: true } })
