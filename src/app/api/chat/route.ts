import { NextResponse } from 'next/server';
import { chat } from '@/lib/agent';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  let body: { userId?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ reply: 'Could not read your message.' }, { status: 400 });
  }
  const userId = body.userId || 'anon';
  const message = (body.message || '').trim();
  if (!message) {
    return NextResponse.json({ reply: 'Type a message to get started.' }, { status: 400 });
  }
  try {
    const result = await chat(userId, message);
    return NextResponse.json({ reply: result.reply, escalate: result.escalate, summary: result.summary });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unexpected error';
    return NextResponse.json({ reply: `The assistant hit a snag: ${msg}`, escalate: true }, { status: 500 });
  }
}
