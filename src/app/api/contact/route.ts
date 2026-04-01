import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const body = await req.json()
  const { first_name, last_name, email, company, country, phone, org_type, role, request_type, interests, message } = body

  const { data, error } = await resend.emails.send({
    from: 'Defence Trading Enquiries <noreply@defencetrading.com>',
    to: 'sales@defencetrading.com',
    replyTo: email,
    subject: `New Enquiry: ${request_type} — ${company}`,
    html: `
      <h2>New Contact Enquiry</h2>
      <table cellpadding="6" style="border-collapse:collapse;width:100%;max-width:600px;">
        <tr><td><strong>Name</strong></td><td>${first_name} ${last_name}</td></tr>
        <tr><td><strong>Email</strong></td><td>${email}</td></tr>
        <tr><td><strong>Company</strong></td><td>${company}</td></tr>
        <tr><td><strong>Country</strong></td><td>${country}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
        <tr><td><strong>Organisation Type</strong></td><td>${org_type}</td></tr>
        <tr><td><strong>Role</strong></td><td>${role}</td></tr>
        <tr><td><strong>Request Type</strong></td><td>${request_type}</td></tr>
        <tr><td><strong>Interested In</strong></td><td>${Array.isArray(interests) ? interests.join(', ') : interests}</td></tr>
        <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${message}</td></tr>
      </table>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  console.log('Email sent:', data?.id)
  return NextResponse.json({ ok: true })
}
