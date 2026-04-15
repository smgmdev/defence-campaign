import { NextResponse } from 'next/server'
import crypto from 'crypto'

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

const RESEND_API_KEY = process.env.RESEND_API_KEY || ''
const SECRET = process.env.VERIFY_TOKEN_SECRET || ''

export async function POST(req: Request) {
  try {
    if (!SECRET) {
      return NextResponse.json({ error: 'Server misconfigured.' }, { status: 500 })
    }

    const { token } = await req.json()

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Invalid token.' }, { status: 400 })
    }

    // Verify token signature
    const [payload, sig] = token.split('.')
    if (!payload || !sig) {
      return NextResponse.json({ error: 'Invalid token.' }, { status: 400 })
    }

    const expectedSig = crypto.createHmac('sha256', SECRET).update(payload).digest('base64url')
    // Timing-safe comparison
    const sigBuf = Buffer.from(sig, 'utf8')
    const expBuf = Buffer.from(expectedSig, 'utf8')
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return NextResponse.json({ error: 'Invalid token signature.' }, { status: 400 })
    }

    // Decode payload
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString())

    // Check expiry
    if (data.exp && Date.now() > data.exp) {
      return NextResponse.json({ error: 'Token has expired.' }, { status: 400 })
    }

    // Notify sales that email is verified
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Defence Trading <noreply@defencetrading.com>',
        to: ['sales@defencetrading.com'],
        subject: `Email Verified ✓ — ${escapeHtml(String(data.name))} (${escapeHtml(String(data.body))})`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <h2 style="font-size:18px;color:#000;margin-bottom:24px;">Email Verified ✓</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:700;width:140px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #eee;">${escapeHtml(String(data.name))}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:700;">Body</td><td style="padding:10px 0;border-bottom:1px solid #eee;">${escapeHtml(String(data.body))}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:700;">Email</td><td style="padding:10px 0;border-bottom:1px solid #eee;"><a href="mailto:${escapeHtml(String(data.email))}">${escapeHtml(String(data.email))}</a></td></tr>
              <tr><td style="padding:10px 0;font-weight:700;">Verified At</td><td style="padding:10px 0;">${new Date().toUTCString()}</td></tr>
            </table>
            <p style="font-size:13px;color:#2a7a2a;margin-top:24px;font-weight:700;">This user has verified their email address. Account is now active.</p>
          </div>
        `,
      }),
    })

    return NextResponse.json({ success: true, name: data.name })
  } catch {
    return NextResponse.json({ error: 'Verification failed.' }, { status: 500 })
  }
}
