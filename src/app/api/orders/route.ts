import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { checkRateLimit } from '@/lib/rate-limit'
import { verifyAuth } from '@/lib/auth'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const ALLOWED_UNITS = ['KG', 'MT', 'Pcs', 'Rounds', 'Sets', 'Systems', 'Units', 'Vehicles']

function getClient() {
  return createClient(supabaseUrl, supabaseServiceKey)
}

export async function GET() {
  try {
    const sb = getClient()
    // Public marketplace view: expose product/quantity/notes/user_id (for
    // ownership check on client) + user_name (display only). Never expose
    // user_email here — it is private.
    const { data, error } = await sb.from('orders').select('id, type, product, quantity, unit, notes, expires_at, created_at, user_id, user_name').order('created_at', { ascending: false })
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ orders: data })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch orders.' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimit(`orders:${ip}`, 10, 60000)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    // Verify bearer token -> authenticated user
    const user = await verifyAuth(req)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()

    // Validate type
    if (!body.type || !['buy', 'sell'].includes(body.type)) {
      return NextResponse.json({ error: 'Type must be buy or sell.' }, { status: 400 })
    }

    // Validate product
    if (!body.product || typeof body.product !== 'string' || body.product.trim().length === 0 || body.product.length > 200) {
      return NextResponse.json({ error: 'Product is required and must be at most 200 characters.' }, { status: 400 })
    }

    // Validate quantity
    if (!body.quantity || typeof body.quantity !== 'string' || body.quantity.trim().length === 0 || body.quantity.length > 50) {
      return NextResponse.json({ error: 'Quantity is required and must be at most 50 characters.' }, { status: 400 })
    }

    // Validate unit
    if (!body.unit || !ALLOWED_UNITS.includes(body.unit)) {
      return NextResponse.json({ error: `Unit must be one of: ${ALLOWED_UNITS.join(', ')}` }, { status: 400 })
    }

    // Validate notes
    let notes = body.notes || ''
    if (typeof notes !== 'string') notes = ''
    notes = notes.replace(/<[^>]*>/g, '').slice(0, 50)
    if (/https?:\/\/|www\.|\.com|\.net|\.org|\.io|\.co/i.test(notes)) {
      return NextResponse.json({ error: 'Notes must not contain URLs.' }, { status: 400 })
    }
    if (/@/.test(notes)) {
      return NextResponse.json({ error: 'Notes must not contain email addresses.' }, { status: 400 })
    }
    if (/[0-9]{7,}/.test(notes.replace(/\s/g, ''))) {
      return NextResponse.json({ error: 'Notes must not contain phone numbers.' }, { status: 400 })
    }

    // Validate expiresAt if provided
    let expiresAt: string | null = null
    if (body.expiresAt) {
      const d = new Date(body.expiresAt)
      if (isNaN(d.getTime())) {
        return NextResponse.json({ error: 'Invalid expiresAt date.' }, { status: 400 })
      }
      expiresAt = d.toISOString()
    }

    const sb = getClient()
    // user_id, user_email, user_name come from the verified auth token,
    // NOT from the request body.
    const userName = (user.user_metadata as Record<string, unknown>)?.full_name as string | undefined
      || user.email?.split('@')[0]
      || ''

    const { data, error } = await sb.from('orders').insert({
      type: body.type,
      product: body.product.trim(),
      quantity: body.quantity.trim(),
      unit: body.unit,
      notes,
      expires_at: expiresAt,
      user_id: user.id,
      user_email: user.email || '',
      user_name: userName,
    }).select().single()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ order: data })
  } catch {
    return NextResponse.json({ error: 'Failed to create order.' }, { status: 500 })
  }
}
