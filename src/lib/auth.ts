import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

/**
 * Extracts the Supabase bearer token from the Authorization header and
 * returns the verified user (id, email, metadata) or null.
 */
export async function verifyAuth(req: Request) {
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) return null
  const token = authHeader.slice(7)
  if (!token) return null
  try {
    const sb = createClient(supabaseUrl, supabaseServiceKey)
    const { data, error } = await sb.auth.getUser(token)
    if (error || !data?.user) return null
    return data.user
  } catch {
    return null
  }
}

/**
 * Simple email format validation.
 */
export function isValidEmail(email: unknown): email is string {
  if (typeof email !== 'string') return false
  if (email.length > 254) return false
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
}
