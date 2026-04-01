import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function GET() {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return NextResponse.json({ ok: false, error: 'RESEND_API_KEY is not set in environment' })
  }

  const resend = new Resend(apiKey)

  const { data, error } = await resend.emails.send({
    from: 'Defence Trading <noreply@defencetrading.com>',
    to: 'sales@defencetrading.com',
    subject: 'Test Email from Vercel',
    html: '<p>This is a test email sent from the Vercel deployment.</p>',
  })

  if (error || !data?.id) {
    return NextResponse.json({ ok: false, error: error ?? 'no data returned' })
  }

  return NextResponse.json({ ok: true, id: data.id, message: 'Email sent — check sales@defencetrading.com and Resend dashboard' })
}
