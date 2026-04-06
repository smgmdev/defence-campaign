import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://amgxldbzekahckwgtjih.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtZ3hsZGJ6ZWthaGNrd2d0amloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0ODA2NTksImV4cCI6MjA5MTA1NjY1OX0.s5a4gFyzMlK3IEp0XBvF0IdLZ2pnJ4gcGWMzl9C4qHU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
