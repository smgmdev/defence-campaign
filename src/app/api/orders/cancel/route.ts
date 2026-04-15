import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { checkRateLimit } from '@/lib/rate-limit'
import { verifyAuth } from '@/lib/auth'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

function getClient() {
  return createClient(supabaseUrl, supabaseServiceKey)
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimit(`cancel:${ip}`, 20, 60000)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const user = await verifyAuth(req)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { orderId } = await req.json()
    if (!orderId || typeof orderId !== 'string') {
      return NextResponse.json({ error: 'Order ID required.' }, { status: 400 })
    }

    const sb = getClient()

    // Verify the order belongs to the authenticated user
    const { data: order, error: fetchError } = await sb.from('orders').select('user_id').eq('id', orderId).single()
    if (fetchError || !order) {
      return NextResponse.json({ error: 'Order not found.' }, { status: 404 })
    }
    if (order.user_id !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { error } = await sb.from('orders').delete().eq('id', orderId)
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to cancel order.' }, { status: 500 })
  }
}
