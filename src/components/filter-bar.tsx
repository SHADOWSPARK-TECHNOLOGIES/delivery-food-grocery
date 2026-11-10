'use client';

import * as React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const CUISINES = ['Nigerian', 'Fast food', 'Grocery', 'Grill', 'Seafood', 'Café', 'Snacks'];

export function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const set = (patch: Record<string, string>) => {
    const next = new URLSearchParams(sp.toString());
    Object.entries(patch).forEach(([k, v]) => {
      if (!v) next.delete(k);
      else next.set(k, v);
    });
    router.replace(`${pathname}?${next.toString()}`);
  };
  const val = (k: string) => sp.get(k) ?? '';

  return (
    <div className="glass mb-6 grid gap-3 rounded-2xl p-4 sm:grid-cols-2 lg:grid-cols-5">
      <input
        defaultValue={val('q')}
        onChange={(e) => set({ q: e.target.value })}
        placeholder="Search restaurants…"
        className="h-10 rounded-lg border border-line bg-surface/70 px-3 text-sm text-ink outline-none focus:border-cyan sm:col-span-2"
      />
      <select value={val('cuisine')} onChange={(e) => set({ cuisine: e.target.value })} className="h-10 rounded-lg border border-line bg-surface/70 px-3 text-sm text-ink outline-none">
        <option value="">Cuisine</option>
        {CUISINES.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <select value={val('maxTime')} onChange={(e) => set({ maxTime: e.target.value })} className="h-10 rounded-lg border border-line bg-surface/70 px-3 text-sm text-ink outline-none">
        <option value="">Delivery time</option>
        <option value="20">Under 20 min</option>
        <option value="30">Under 30 min</option>
        <option value="40">Under 40 min</option>
      </select>
      <select value={val('sort')} onChange={(e) => set({ sort: e.target.value })} className="h-10 rounded-lg border border-line bg-surface/70 px-3 text-sm text-ink outline-none">
        <option value="time">Sort: fastest</option>
        <option value="rating">Sort: top rated</option>
        <option value="min-order">Sort: lowest min. order</option>
      </select>
    </div>
  );
}
