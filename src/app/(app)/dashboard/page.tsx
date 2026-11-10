import Link from 'next/link';
import { orders } from '@/data/orders';
import { currentCustomer } from '@/data/customer';
import { Badge } from '@/components/ui/badge';
import { StatusPill } from '@/components/ui/badge';
import { orderStatusLabel, formatNgn } from '@/lib/format';
import { ReorderButton } from '@/components/reorder-button';

export default function DashboardPage() {
  const mine = orders.filter((o) => o.customerId === currentCustomer.id);
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold text-ink">My orders</h1>
      <p className="mt-1 text-sm text-muted">
        Hi {currentCustomer.name.split(' ')[0]} — reorder past favourites or track what&apos;s live.
      </p>

      <div className="mt-6 space-y-3">
        {mine.map((o) => (
          <div key={o.id} className="glass flex flex-wrap items-center gap-4 rounded-2xl p-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Link href={`/track/${o.ref}`} className="font-mono text-sm text-cyan hover:underline">
                  {o.ref}
                </Link>
                <StatusPill status={o.status} />
                {o.promoCode && <Badge tone="amber">{o.promoCode}</Badge>}
              </div>
              <div className="mt-1 text-sm text-muted">
                {o.restaurantName} · {o.items.length} item{o.items.length === 1 ? '' : 's'}
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono font-bold text-ink">{formatNgn(o.totalNgn)}</div>
              <div className="text-xs text-dim">{orderStatusLabel(o.status)}</div>
            </div>
            <div className="flex gap-2">
              {o.status === 'delivered' && <ReorderButton restaurantId={o.restaurantId} items={o.items} />}
              {o.status !== 'delivered' && (
                <Link
                  href={`/track/${o.ref}`}
                  className="rounded-md border border-line px-3 py-2 text-xs text-cyan hover:border-cyan"
                >
                  Track
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
