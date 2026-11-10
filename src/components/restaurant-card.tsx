import Link from 'next/link';
import type { Restaurant } from '@/types';
import { Monogram } from '@/components/monogram';
import { Badge } from '@/components/ui/badge';
import { formatNgn } from '@/lib/format';

export function RestaurantCard({ r }: { r: Restaurant }) {
  return (
    <Link
      href={`/restaurant/${r.slug}`}
      className="glass group block rounded-2xl p-4 transition-transform hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="flex items-center gap-4">
        <Monogram glyph={r.monogram} tint={r.tint} name={r.name} className="h-16 w-16 rounded-xl text-xl" />
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-ink group-hover:text-cyan">{r.name}</h3>
          <p className="truncate text-xs text-muted">{r.cuisine.join(' · ')}</p>
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            <Badge tone="amber">{r.rating.toFixed(1)}★</Badge>
            <Badge tone="cyan">~{r.deliveryTimeMin} min</Badge>
            {r.featured && <Badge tone="purple">featured</Badge>}
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-line/50 pt-3 text-xs text-muted">
        <span>{r.zones.length} zone{r.zones.length === 1 ? '' : 's'}</span>
        <span className="font-mono">min. {formatNgn(r.minOrderNgn)}</span>
      </div>
    </Link>
  );
}
