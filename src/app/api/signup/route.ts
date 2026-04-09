import { NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimit(`signup:${ip}`, 5, 60000)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const { name, body, email } = await req.json()

    // Notify sales about new registration
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Defence Trading <noreply@defencetrading.com>',
        to: ['sales@defencetrading.com'],
        subject: `New Account Registration — ${escapeHtml(String(name))} (${escapeHtml(String(body))})`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <h2 style="font-size:18px;color:#000;margin-bottom:24px;">New Account Registration</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:700;width:140px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #eee;">${escapeHtml(String(name))}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:700;">Body</td><td style="padding:10px 0;border-bottom:1px solid #eee;">${escapeHtml(String(body))}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:700;">Email</td><td style="padding:10px 0;border-bottom:1px solid #eee;"><a href="mailto:${escapeHtml(String(email))}">${escapeHtml(String(email))}</a></td></tr>
              <tr><td style="padding:10px 0;font-weight:700;">Registered</td><td style="padding:10px 0;">${new Date().toUTCString()}</td></tr>
            </table>
            <p style="font-size:13px;color:#2a7a2a;margin-top:24px;font-weight:700;">User has verified their email via Supabase Auth.</p>
          </div>
        `,
      }),
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send notification.' }, { status: 500 })
  }
}
