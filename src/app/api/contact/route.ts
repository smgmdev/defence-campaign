import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'
import { isValidEmail } from '@/lib/auth'

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function s(v: unknown, max = 500): string {
  if (typeof v !== 'string') return ''
  return v.slice(0, max)
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
  if (!checkRateLimit(`contact:${ip}`, 5, 60000)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  const body = await req.json().catch(() => ({}))
  const first_name = s(body.first_name, 80)
  const last_name = s(body.last_name, 80)
  const email = s(body.email, 254)
  const company = s(body.company, 200)
  const country = s(body.country, 100)
  const phone = s(body.phone, 40)
  const org_type = s(body.org_type, 100)
  const role = s(body.role, 100)
  const request_type = s(body.request_type, 100)
  const interests = Array.isArray(body.interests) ? body.interests.slice(0, 20).map((x: unknown) => s(x, 80)) : []
  const message = s(body.message, 5000)

  if (!first_name || !company || !message) {
    return NextResponse.json({ ok: false, error: 'Missing required fields.' }, { status: 400 })
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Invalid email address.' }, { status: 400 })
  }

  const { data, error } = await resend.emails.send({
    from: 'Defence Trading Enquiries <noreply@defencetrading.com>',
    to: 'sales@defencetrading.com',
    replyTo: email,
    subject: `New Enquiry: ${escapeHtml(String(request_type))} — ${escapeHtml(String(company))}`,
    html: `
      <h2>New Contact Enquiry</h2>
      <table cellpadding="6" style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td><strong>Name</strong></td><td>${escapeHtml(String(first_name))} ${escapeHtml(String(last_name))}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(String(email))}</td></tr>
        <tr><td><strong>Company</strong></td><td>${escapeHtml(String(company))}</td></tr>
        <tr><td><strong>Country</strong></td><td>${escapeHtml(String(country))}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${escapeHtml(String(phone))}</td></tr>
        <tr><td><strong>Organisation Type</strong></td><td>${escapeHtml(String(org_type))}</td></tr>
        <tr><td><strong>Role</strong></td><td>${escapeHtml(String(role))}</td></tr>
        <tr><td><strong>Request Type</strong></td><td>${escapeHtml(String(request_type))}</td></tr>
        <tr><td><strong>Interested In</strong></td><td>${escapeHtml(Array.isArray(interests) ? interests.join(', ') : String(interests))}</td></tr>
        <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${escapeHtml(String(message))}</td></tr>
      </table>
    `,
  })

  if (error || !data?.id) {
    console.error('Resend error:', error ?? 'no data returned — API key may not be set')
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  console.log('Email sent:', data.id)
  return NextResponse.json({ ok: true })
}
