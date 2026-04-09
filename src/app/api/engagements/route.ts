import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { checkRateLimit } from '@/lib/rate-limit'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

function getClient() {
  return createClient(supabaseUrl, supabaseServiceKey)
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    if (!userId) return NextResponse.json({ engagements: [] })

    const sb = getClient()
    const { data, error } = await sb.from('engagements').select('*').eq('user_id', userId).order('created_at', { ascending: false })
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

    const body = await req.json()

    // Auth verification: userId is required
    if (!body.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const sb = getClient()
    const { error } = await sb.from('engagements').insert({
      user_id: body.userId,
      user_email: body.userEmail,
      user_name: body.userName,
      order_id: body.orderId,
      product: body.product,
      order_type: body.orderType,
      quantity: body.quantity,
    })
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed.' }, { status: 500 })
  }
}
