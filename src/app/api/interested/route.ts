import { NextResponse } from 'next/server'

const RESEND_API_KEY = 're_5z7p9CmY_krUa3P65GnrHQmADzYApW5cN'

export async function POST(req: Request) {
  try {
    const { name, email, userBody, product, orderId, orderType, quantity } = await req.json()

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Defence Trading <noreply@defencetrading.com>',
        to: ['sales@defencetrading.com'],
        subject: `Order Interest — ${name} interested in ${product}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <h2 style="font-size:18px;color:#000;margin-bottom:24px;">Order Interest Notification</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:700;width:140px;">User</td><td style="padding:10px 0;border-bottom:1px solid #eee;">${name}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:700;">Email</td><td style="padding:10px 0;border-bottom:1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:700;">Account Type</td><td style="padding:10px 0;border-bottom:1px solid #eee;">${userBody || '—'}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:700;">Order Type</td><td style="padding:10px 0;border-bottom:1px solid #eee;">${orderType?.toUpperCase()}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:700;">Product</td><td style="padding:10px 0;border-bottom:1px solid #eee;">${product}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:700;">Quantity</td><td style="padding:10px 0;border-bottom:1px solid #eee;">${quantity}</td></tr>
              <tr><td style="padding:10px 0;font-weight:700;">Order ID</td><td style="padding:10px 0;">${orderId}</td></tr>
            </table>
            <p style="font-size:13px;color:#2a7a2a;margin-top:24px;font-weight:700;">This user has expressed interest in this order. Please follow up.</p>
          </div>
        `,
      }),
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed.' }, { status: 500 })
  }
}
