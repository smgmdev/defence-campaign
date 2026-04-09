import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

function getClient() {
  return createClient(supabaseUrl, supabaseServiceKey)
}

export async function POST(req: Request) {
  try {
    const { orderId, userId } = await req.json()
    if (!orderId) return NextResponse.json({ error: 'Order ID required.' }, { status: 400 })

    // Auth verification: userId is required
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const sb = getClient()

    // Verify the order belongs to the requesting user
    const { data: order, error: fetchError } = await sb.from('orders').select('user_id').eq('id', orderId).single()
    if (fetchError || !order) {
      return NextResponse.json({ error: 'Order not found.' }, { status: 404 })
    }
    if (order.user_id !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { error } = await sb.from('orders').delete().eq('id', orderId)
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to cancel order.' }, { status: 500 })
  }
}
