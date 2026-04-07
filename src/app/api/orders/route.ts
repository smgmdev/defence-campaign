import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://amgxldbzekahckwgtjih.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtZ3hsZGJ6ZWthaGNrd2d0amloIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTQ4MDY1OSwiZXhwIjoyMDkxMDU2NjU5fQ.lOkCgcgnTkxvGSlUEYWGmv7ZKnNtSwKAb8Y4chAuhGk'

function getClient() {
  return createClient(supabaseUrl, supabaseServiceKey)
}

export async function GET() {
  try {
    const sb = getClient()
    const { data, error } = await sb.from('orders').select('*').order('created_at', { ascending: false })
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ orders: data })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch orders.' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const sb = getClient()
    const { data, error } = await sb.from('orders').insert({
      type: body.type,
      product: body.product,
      quantity: body.quantity,
      unit: body.unit,
      notes: body.notes || '',
      expires_at: body.expiresAt || null,
      user_id: body.userId || null,
      user_email: body.userEmail || '',
      user_name: body.userName || '',
    }).select().single()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ order: data })
  } catch {
    return NextResponse.json({ error: 'Failed to create order.' }, { status: 500 })
  }
}
