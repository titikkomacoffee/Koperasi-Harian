import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://oekljkhftgcvuhepmxua.supabase.co"
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9la2xqa2hmdGdjdnVoZXBteHVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MzE3NDEsImV4cCI6MjEwNDEwNzc0MX0.5UabBvkHpeTOb756ZQHdyTPd9b_5kz3RusWF-xiSaw0"
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true, autoRefreshToken: true }
})
