import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const body = await req.json()
  const { product, calibre, full_name, company, country, email, whatsapp } = body

  const { data, error } = await resend.emails.send({
    from: 'Defence Trading Enquiries <noreply@defencetrading.com>',
    to: 'sales@defencetrading.com',
    replyTo: email,
    subject: `Product Enquiry: ${product} — ${company}`,
    html: `
      <h2>New Product Enquiry</h2>
      <table cellpadding="6" style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td><strong>Product</strong></td><td>${product} — ${calibre}</td></tr>
        <tr><td><strong>Full Name</strong></td><td>${full_name}</td></tr>
        <tr><td><strong>Company</strong></td><td>${company}</td></tr>
        <tr><td><strong>Country</strong></td><td>${country}</td></tr>
        <tr><td><strong>Email</strong></td><td>${email}</td></tr>
        <tr><td><strong>WhatsApp</strong></td><td>${whatsapp}</td></tr>
      </table>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  console.log('Enquiry sent:', data?.id)
  return NextResponse.json({ ok: true })
}
