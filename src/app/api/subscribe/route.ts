import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'

const resend = new Resend(process.env.RESEND_API_KEY)
const AUDIENCE_ID = '56eef90f-316b-4a16-9ba0-c1c0140fb864'

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
  if (!checkRateLimit(`subscribe:${ip}`, 5, 60000)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  const { email, company, location } = await req.json()

  if (!email) return NextResponse.json({ ok: false }, { status: 400 })

  const { data, error } = await resend.contacts.create({
    audienceId: AUDIENCE_ID,
    email,
    unsubscribed: false,
    firstName: company || '',
    lastName: location || '',
  })

  if (error || !data?.id) {
    console.error('Resend subscribe error:', error ?? 'no data returned — API key may not be set')
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  console.log('Subscriber added:', data.id)
  return NextResponse.json({ ok: true })
}
