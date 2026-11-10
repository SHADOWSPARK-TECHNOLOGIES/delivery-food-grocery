'use client';

import * as React from 'react';
import { cn } from '@/lib/format';
import type { MenuItem, Restaurant } from '@/types';
import { useCart } from '@/components/cart-context';
import { Badge } from '@/components/ui/badge';

const DIET_TONE: Record<string, 'ok' | 'purple' | 'amber'> = {
  vegetarian: 'ok',
  'gluten-free': 'purple',
  halal: 'amber',
};

export function MenuTile({ item, restaurant }: { item: MenuItem; restaurant: Restaurant }) {
  const { addItem, lines } = useCart();
  const inCart = lines.find((l) => l.item.id === item.id)?.qty ?? 0;
  const tint = item.tint ?? restaurant.tint;

  return (
    <div className="glass flex flex-col gap-2 rounded-xl p-3">
      <div className="flex items-start gap-3">
        <div
          className="grid h-12 w-12 shrink-0 place-items-center rounded-lg font-mono text-sm font-bold text-bg"
          style={{ background: `linear-gradient(135deg, ${tint}cc, ${tint}44)` }}
        >
          {item.monogram}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="truncate text-sm font-semibold text-ink">{item.name}</h4>
            {item.popular && <Badge tone="cyan">★</Badge>}
          </div>
          <p className="mt-0.5 line-clamp-2 text-xs text-muted">{item.description}</p>
          <div className="mt-1 flex flex-wrap gap-1">
            {item.dietTags.map((d) => (
              <Badge key={d} tone={DIET_TONE[d]}>
                {d}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <span className="font-mono text-sm font-bold text-cyan">₦{item.priceNgn.toLocaleString('en-NG')}</span>
        {inCart > 0 ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => addItem(item, restaurant.id, restaurant.name)}
              className="h-7 w-7 rounded-md bg-cyan/15 text-cyan hover:bg-cyan/25"
              aria-label="Increment quantity"
            >
              +
            </button>
            <span className={cn('font-mono text-sm text-cyan')}>{inCart}</span>
            <span className="h-7 w-7 rounded-md bg-white/5 text-muted" aria-hidden="true" />
          </div>
        ) : (
          <button
            onClick={() => addItem(item, restaurant.id, restaurant.name)}
            className="rounded-md bg-cyan px-3 py-1 text-xs font-semibold text-bg transition-colors hover:shadow-glow"
          >
            + Add
          </button>
        )}
      </div>
    </div>
  );
}
