import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://eiosyymlsfxxsdgnxqif.supabase.co"
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpb3N5eW1sc2Z4eHNkZ254cWlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1OTAzOTMsImV4cCI6MjEwNjE2NjM5M30.7vACrpdn8d7_l4zxmICknkhbTFkSLdvVHeN0DujyGQM"

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase env belum di set - cek .env.local')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true, autoRefreshToken: true }
})
