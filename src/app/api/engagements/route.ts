import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { checkRateLimit } from '@/lib/rate-limit'
import { verifyAuth } from '@/lib/auth'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

function getClient() {
  return createClient(supabaseUrl, supabaseServiceKey)
}

export async function GET(req: Request) {
  try {
    const user = await verifyAuth(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const sb = getClient()
    const { data, error } = await sb.from('engagements').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ engagements: data })
  } catch {
    return NextResponse.json({ error: 'Failed.' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimit(`engagements:${ip}`, 20, 60000)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const user = await verifyAuth(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const userName = (user.user_metadata as Record<string, unknown>)?.full_name as string | undefined
      || user.email?.split('@')[0]
      || ''

    const sb = getClient()
    const { error } = await sb.from('engagements').insert({
      user_id: user.id,
      user_email: user.email || '',
      user_name: userName,
      order_id: typeof body.orderId === 'string' ? body.orderId : null,
      product: typeof body.product === 'string' ? body.product.slice(0, 200) : '',
      order_type: body.orderType === 'buy' || body.orderType === 'sell' ? body.orderType : null,
      quantity: typeof body.quantity === 'string' ? body.quantity.slice(0, 50) : '',
    })
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed.' }, { status: 500 })
  }
}
