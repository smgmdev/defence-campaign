import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)
const AUDIENCE_ID = '56eef90f-316b-4a16-9ba0-c1c0140fb864'

export async function POST(req: Request) {
  const { email, company, location } = await req.json()

  if (!email) return NextResponse.json({ ok: false }, { status: 400 })

  const { data, error } = await resend.contacts.create({
    audienceId: AUDIENCE_ID,
    email,
    unsubscribed: false,
    firstName: company || '',
    lastName: location || '',
  })

  if (error) {
    console.error('Resend subscribe error:', error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  console.log('Subscriber added:', data?.id)
  return NextResponse.json({ ok: true })
}
