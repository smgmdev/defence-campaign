import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
  if (!checkRateLimit(`enquiry:${ip}`, 5, 60000)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  const body = await req.json()
  const { product, calibre, full_name, company, country, email, whatsapp } = body

  const { data, error } = await resend.emails.send({
    from: 'Defence Trading Enquiries <noreply@defencetrading.com>',
    to: 'sales@defencetrading.com',
    replyTo: email,
    subject: `Product Enquiry: ${escapeHtml(String(product))} — ${escapeHtml(String(company))}`,
    html: `
      <h2>New Product Enquiry</h2>
      <table cellpadding="6" style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td><strong>Product</strong></td><td>${escapeHtml(String(product))} — ${escapeHtml(String(calibre))}</td></tr>
        <tr><td><strong>Full Name</strong></td><td>${escapeHtml(String(full_name))}</td></tr>
        <tr><td><strong>Company</strong></td><td>${escapeHtml(String(company))}</td></tr>
        <tr><td><strong>Country</strong></td><td>${escapeHtml(String(country))}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(String(email))}</td></tr>
        <tr><td><strong>WhatsApp</strong></td><td>${escapeHtml(String(whatsapp))}</td></tr>
      </table>
    `,
  })

  if (error || !data?.id) {
    console.error('Resend error:', error ?? 'no data returned — API key may not be set')
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  console.log('Enquiry sent:', data.id)
  return NextResponse.json({ ok: true })
}
