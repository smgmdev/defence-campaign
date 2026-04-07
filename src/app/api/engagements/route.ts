import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://amgxldbzekahckwgtjih.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtZ3hsZGJ6ZWthaGNrd2d0amloIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTQ4MDY1OSwiZXhwIjoyMDkxMDU2NjU5fQ.lOkCgcgnTkxvGSlUEYWGmv7ZKnNtSwKAb8Y4chAuhGk'

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
    const body = await req.json()
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
