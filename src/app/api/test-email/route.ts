import { NextResponse } from 'next/server'

// Debug endpoint disabled for production. To re-enable for local testing,
// set ENABLE_TEST_EMAIL=1 in .env.local.
export async function GET() {
  if (process.env.ENABLE_TEST_EMAIL !== '1') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  const { Resend } = await import('resend')
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return NextResponse.json({ ok: false, error: 'RESEND_API_KEY not set' }, { status: 500 })
  const resend = new Resend(apiKey)
  const { data, error } = await resend.emails.send({
    from: 'Defence Trading <noreply@defencetrading.com>',
    to: 'sales@defencetrading.com',
    subject: 'Test Email',
    html: '<p>Test email.</p>',
  })
  if (error || !data?.id) return NextResponse.json({ ok: false, error: error ?? 'no data' }, { status: 500 })
  return NextResponse.json({ ok: true, id: data.id })
}
