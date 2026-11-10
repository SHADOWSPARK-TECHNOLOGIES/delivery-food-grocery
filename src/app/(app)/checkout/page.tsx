'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/cart-context';
import { currentCustomer } from '@/data/customer';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { formatNgn } from '@/lib/format';

const AREA_SUGGESTIONS = [
  'Ikeja, Lagos',
  'Yaba, Lagos',
  'Lekki Phase 1, Lagos',
  'Wuse 2, Abuja',
  'Garki, Abuja',
  'Trans Amadi, Port Harcourt',
  'Obiri, Port Harcourt',
];

export default function CheckoutPage() {
  const cart = useCart();
  const router = useRouter();
  const [addr, setAddr] = useState('');
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState<'paystack' | 'cash'>('paystack');
  const [busy, setBusy] = useState(false);
  const hint = AREA_SUGGESTIONS.filter((a) => a.toLowerCase().includes(addr.toLowerCase())).slice(0, 3);

  if (cart.lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-muted">Nothing to check out yet.</p>
        <Link href="/restaurants" className="mt-4 inline-block text-cyan hover:underline">
          Add something →
        </Link>
      </div>
    );
  }

  const place = async () => {
    setBusy(true);
    const reference = `ORD-FG-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    if (method === 'paystack' && process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
      try {
        const res = await fetch('/api/paystack/init', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: currentCustomer.email, amount: cart.quote.totalNgn, reference }),
        });
        const json = await res.json();
        if (json.ready && json.authorization_url) {
          window.location.href = json.authorization_url;
          return;
        }
      } catch {
        /* fall through to demo mode */
      }
    }
    // Demo mode: clear cart and jump to the live tracking page.
    cart.clear();
    router.push(`/track/${reference}`);
    setBusy(false);
  };

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-[1.6fr_1fr]">
      <div>
        <h1 className="text-3xl font-bold text-ink">Checkout</h1>

        <div className="mt-6 space-y-5">
          <section>
            <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-dim">Delivery address</h2>
            <div className="relative">
              <Input
                value={addr}
                onChange={(e) => {
                  setAddr(e.target.value);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                placeholder="Start typing — e.g. Ikeja, Lagos"
              />
              {open && hint.length > 0 && (
                <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-line bg-surface">
                  {hint.map((h) => (
                    <button
                      key={h}
                      onClick={() => {
                        setAddr(h);
                        setOpen(false);
                      }}
                      className="block w-full px-3 py-2 text-left text-sm text-ink hover:bg-white/5"
                    >
                      {h}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Textarea rows={2} placeholder="Apartment / landmark (optional)" className="mt-2" />
          </section>

          <section>
            <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-dim">Payment method</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              <button
                onClick={() => setMethod('paystack')}
                className={
                  method === 'paystack'
                    ? 'rounded-lg border border-cyan bg-cyan/10 p-3 text-left text-sm text-ink'
                    : 'rounded-lg border border-line p-3 text-left text-sm text-muted'
                }
              >
                <div className="font-semibold text-ink">Paystack</div>
                <div className="text-xs">Card / bank transfer / USSD</div>
              </button>
              <button
                onClick={() => setMethod('cash')}
                className={
                  method === 'cash'
                    ? 'rounded-lg border border-cyan bg-cyan/10 p-3 text-left text-sm text-ink'
                    : 'rounded-lg border border-line p-3 text-left text-sm text-muted'
                }
              >
                <div className="font-semibold text-ink">Cash on delivery</div>
                <div className="text-xs">Pay the rider on arrival</div>
              </button>
            </div>
          </section>

          <section>
            <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-dim">Review</h2>
            <div className="glass divide-y divide-line/50 rounded-xl">
              {cart.lines.map((l) => (
                <div key={l.item.id} className="flex justify-between px-4 py-2.5 text-sm">
                  <span className="text-ink">
                    {l.qty}× {l.item.name}
                  </span>
                  <span className="font-mono text-muted">{formatNgn(l.item.priceNgn * l.qty)}</span>
                </div>
              ))}
              <div className="flex justify-between px-4 py-2.5 text-sm font-bold text-ink">
                <span>Total</span>
                <span className="font-mono text-cyan">{formatNgn(cart.quote.totalNgn)}</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <aside>
        <div className="glass sticky top-20 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Order total</span>
            <span className="font-mono text-2xl font-bold text-cyan">{formatNgn(cart.quote.totalNgn)}</span>
          </div>
          <div className="mt-1 text-xs text-dim">
            {cart.slot.label} · {cart.count} items
          </div>
          {cart.applied && <div className="mt-1 text-xs text-emerald-300">Promo {cart.applied.label} applied</div>}
          <Button className="mt-5 w-full" size="lg" disabled={busy} onClick={() => void place()}>
            {busy ? 'Processing…' : 'Place order'}
          </Button>
          {!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY && (
            <p className="mt-3 text-center font-mono text-[11px] text-dim">
              Demo mode — add your Paystack keys to enable live payment.
              {method === 'cash' ? ' (cash selected)' : ''}
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}
