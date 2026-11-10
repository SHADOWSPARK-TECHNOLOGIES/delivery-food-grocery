import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

/**
 * Paystack checkout initialization. Returns a hosted Paystack authorization_url
 * when PAYSTACK_SECRET_KEY is configured, otherwise { ready:false } so the UI
 * can fall back to demo mode. No card details ever touch this server.
 */
export async function POST(req: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ ready: false, reason: 'Paystack not configured' });
  }
  let body: { email?: string; amount?: number; reference?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ready: false, reason: 'Bad request' }, { status: 400 });
  }
  const amountKobo = Math.round(Number(body.amount ?? 0) * 100);
  const reference = body.reference || `fg_${Date.now()}`;
  try {
    const res = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: body.email || 'customer@shadowspark.tech',
        amount: amountKobo,
        reference,
        currency: 'NGN',
      }),
    });
    const json = await res.json();
    if (!json.status) {
      return NextResponse.json({ ready: false, reason: json.message || 'Paystack error' });
    }
    return NextResponse.json({ ready: true, authorization_url: json.data?.authorization_url });
  } catch (err) {
    return NextResponse.json({
      ready: false,
      reason: err instanceof Error ? err.message : 'Paystack unreachable',
    });
  }
}
