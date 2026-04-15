import { supabase } from './supabase'

/**
 * fetch() wrapper that attaches the current Supabase access token as
 * `Authorization: Bearer ...` so API routes can verify the user
 * server-side. Falls back to plain fetch when not signed in.
 */
export async function authFetch(input: RequestInfo | URL, init?: RequestInit) {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  const headers = new Headers(init?.headers || {})
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  return fetch(input, { ...init, headers })
}
