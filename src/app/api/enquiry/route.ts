import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'
import { isValidEmail } from '@/lib/auth'

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function str(v: unknown, max = 200): string {
  if (typeof v !== 'string') return ''
  return v.slice(0, max)
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
  if (!checkRateLimit(`enquiry:${ip}`, 5, 60000)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  const body = await req.json().catch(() => ({}))
  const product = str(body.product, 200)
  const calibre = str(body.calibre, 100)
  const full_name = str(body.full_name, 120)
  const company = str(body.company, 200)
  const country = str(body.country, 100)
  const email = str(body.email, 254)
  const whatsapp = str(body.whatsapp, 40)

  if (!product || !full_name || !company || !country || !whatsapp) {
    return NextResponse.json({ ok: false, error: 'Missing required fields.' }, { status: 400 })
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email address.' }, { status: 400 })
  }

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
