import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://amgxldbzekahckwgtjih.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtZ3hsZGJ6ZWthaGNrd2d0amloIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTQ4MDY1OSwiZXhwIjoyMDkxMDU2NjU5fQ.lOkCgcgnTkxvGSlUEYWGmv7ZKnNtSwKAb8Y4chAuhGk'

function getClient() {
  return createClient(supabaseUrl, supabaseServiceKey)
}

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json()
    if (!orderId) return NextResponse.json({ error: 'Order ID required.' }, { status: 400 })

    const sb = getClient()
    const { error } = await sb.from('orders').delete().eq('id', orderId)
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to cancel order.' }, { status: 500 })
  }
}
