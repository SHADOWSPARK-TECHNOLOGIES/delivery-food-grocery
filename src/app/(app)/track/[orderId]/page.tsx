'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getOrderByRef } from '@/data/orders';
import { OrderTimeline } from '@/components/order-timeline';
import { MapPlaceholder } from '@/components/map-placeholder';
import { Badge } from '@/components/ui/badge';
import { formatNgn, orderStatusLabel } from '@/lib/format';

export default function TrackPage() {
  const params = useParams<{ orderId: string }>();
  const ref = decodeURIComponent(params.orderId);
  const order = getOrderByRef(ref);

  if (!order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-ink">Track delivery</h1>
        <div className="mx-auto mt-6 grid h-20 w-20 place-items-center rounded-2xl bg-white/5 font-mono text-xl text-cyan shadow-glow">
          {ref.slice(0, 3)}
        </div>
        <p className="mt-4 text-muted">
          No fixture order matches <span className="font-mono text-cyan">{ref}</span>. If you just placed
          it, it&apos;s pending confirmation.
        </p>
        <div className="mt-6">
          <Link href="/dashboard" className="text-cyan hover:underline">
            ← go to my orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold text-ink">Track delivery</h1>
      <div className="mt-2 flex items-center gap-2">
        <Badge tone="cyan" className="font-mono">
          {order.ref}
        </Badge>
        <Badge tone="purple">{orderStatusLabel(order.status)}</Badge>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="glass rounded-2xl p-5">
          <OrderTimeline status={order.status} />
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-xs text-dim">From</div>
              <div className="mt-0.5 text-ink">{order.addresses.pickup}</div>
            </div>
            <div>
              <div className="text-xs text-dim">To</div>
              <div className="mt-0.5 text-ink">{order.addresses.dropoff}</div>
            </div>
            <div>
              <div className="text-xs text-dim">ETA</div>
              <div className="mt-0.5 font-mono text-cyan">{order.etaMin} min</div>
            </div>
            <div>
              <div className="text-xs text-dim">Driver</div>
              <div className="mt-0.5 text-ink">{order.driver ?? 'assigning shortly'}</div>
            </div>
          </div>
        </div>
        <MapPlaceholder label={order.restaurantName} points={[order.addresses.pickup, order.addresses.dropoff]} className="h-full min-h-56" />
      </div>

      <div className="glass mt-6 rounded-2xl p-5">
        <h2 className="text-lg font-bold text-ink">Items</h2>
        <div className="mt-3 space-y-2">
          {order.items.map((it) => (
            <div key={it.menuItemId} className="flex justify-between text-sm">
              <span className="text-ink">
                {it.qty}× {it.name}
              </span>
              <span className="font-mono text-muted">{formatNgn(it.priceNgn * it.qty)}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-between border-t border-line/50 pt-3 font-bold text-ink">
          <span>Total</span>
          <span className="font-mono text-cyan">{formatNgn(order.totalNgn)}</span>
        </div>
      </div>
    </div>
  );
}
