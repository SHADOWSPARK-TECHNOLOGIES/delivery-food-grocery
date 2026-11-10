'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/cart-context';
import { timeSlots } from '@/data/orders';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatNgn } from '@/lib/format';
import { PROMO_CODES } from '@/lib/fixtures';

export default function CartPage() {
  const cart = useCart();
  const router = useRouter();
  const [promoInput, setPromoInput] = useState('');
  const [notice, setNotice] = useState<string | null>(null);

  const apply = () => {
    const code = promoInput.trim().toUpperCase();
    cart.setPromo(code);
    setNotice(PROMO_CODES[code] ? `${code} applied` : 'That code is not valid here.');
  };

  const restaurants = [...new Set(cart.lines.map((l) => l.restaurantName))];

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-[1.6fr_1fr]">
      <div>
        <Link href="/restaurants" className="font-mono text-xs text-cyan hover:underline">
          ← keep ordering
        </Link>
        <h1 className="mt-3 text-3xl font-bold text-ink">Your cart</h1>

        {cart.lines.length === 0 ? (
          <div className="glass mt-6 rounded-2xl p-8 text-center">
            <p className="text-muted">Your cart is empty.</p>
            <Link href="/restaurants" className="mt-4 inline-block text-cyan hover:underline">
              Find somewhere to eat →
            </Link>
          </div>
        ) : (
          <>
            <p className="mt-1 font-mono text-xs text-dim">
              {restaurants.length} restaurant{restaurants.length > 1 ? 's' : ''} · {cart.count} items
            </p>
            <div className="mt-5 space-y-3">
              {cart.lines.map((l) => (
                <div key={l.item.id} className="glass flex items-center gap-4 rounded-xl p-4">
                  <div
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-lg font-mono text-sm font-bold text-bg"
                    style={{ background: `linear-gradient(135deg, ${l.item.tint ?? '#00f5d4'}cc, ${l.item.tint ?? '#00f5d4'}44)` }}
                  >
                    {l.item.monogram}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-ink">{l.item.name}</div>
                    <div className="text-xs text-muted">
                      {l.restaurantName} · {formatNgn(l.item.priceNgn)} each
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => cart.setQty(l.item.id, l.qty - 1)}
                      className="grid h-7 w-7 place-items-center rounded-md bg-white/5 text-muted hover:text-ink"
                    >
                      −
                    </button>
                    <span className="w-5 text-center font-mono text-sm text-ink">{l.qty}</span>
                    <button
                      onClick={() => cart.setQty(l.item.id, l.qty + 1)}
                      className="grid h-7 w-7 place-items-center rounded-md bg-cyan/15 text-cyan hover:bg-cyan/25"
                    >
                      +
                    </button>
                    <button
                      onClick={() => cart.removeLine(l.item.id)}
                      className="ml-1 text-xs text-dim hover:text-magenta"
                      aria-label="Remove"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* delivery slot */}
            <div className="mt-6">
              <div className="mb-2 font-mono text-xs uppercase tracking-widest text-dim">Delivery time</div>
              <div className="flex flex-wrap gap-2">
                {timeSlots.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => cart.setSlot(s.id)}
                    disabled={!s.available}
                    className={
                      cart.slot.id === s.id
                        ? 'rounded-lg border border-cyan bg-cyan/15 px-3 py-2 text-sm text-cyan'
                        : 'rounded-lg border border-line px-3 py-2 text-sm text-muted disabled:opacity-40'
                    }
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {cart.lines.length > 0 && (
        <aside>
          <div className="glass sticky top-20 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-ink">Order summary</h2>

            <div className="mt-4 space-y-2 border-t border-line/60 pt-4 text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="font-mono text-ink">{formatNgn(cart.quote.subtotalNgn)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Delivery</span>
                <span className="font-mono text-ink">{formatNgn(cart.quote.deliveryFeeNgn)}</span>
              </div>
              {cart.applied && (
                <div className="flex justify-between text-emerald-300">
                  <span>Promo {cart.applied.label}</span>
                  <span className="font-mono">−{formatNgn(cart.quote.discountNgn)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-line/60 pt-2 text-base font-bold text-ink">
                <span>Total</span>
                <span className="font-mono text-cyan">{formatNgn(cart.quote.totalNgn)}</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Input
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Promo code (SPARK10)"
                className="h-9"
              />
              <Button variant="outline" size="sm" onClick={apply}>
                Apply
              </Button>
            </div>
            {notice && <p className="mt-2 text-xs text-cyan">{notice}</p>}
            {cart.applied && (
              <button onClick={cart.clearPromo} className="mt-1 text-xs text-dim hover:text-magenta">
                remove {cart.applied.label}
              </button>
            )}

            <Button
              className="mt-5 w-full"
              size="lg"
              onClick={() => router.push('/checkout')}
            >
              Proceed to checkout →
            </Button>
            <p className="mt-2 text-center font-mono text-[11px] text-dim">₦ · Paystack · cash on delivery</p>
          </div>
        </aside>
      )}
    </div>
  );
}
