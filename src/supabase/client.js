import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase URL/ključ nisu postavljeni. Kopiraj .env.example u .env i upiši svoje podatke.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
