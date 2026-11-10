'use client';

import * as React from 'react';
import type { CartLine, QuoteSummary, TimeSlot } from '@/types';
import { getRestaurantById } from '@/data/restaurants';
import { timeSlots } from '@/data/orders';
import { PROMO_CODES, computeQuote } from '@/lib/fixtures';

interface CartState {
  lines: CartLine[];
  slotId: string;
  promo: string | undefined;
  applied: { label: string; offNgn: number } | undefined;
}

interface CartCtx {
  lines: CartLine[];
  slot: TimeSlot;
  promo: string | undefined;
  applied: { label: string; offNgn: number } | undefined;
  count: number;
  quote: QuoteSummary;
  addItem: (item: CartLine['item'], restaurantId: string, restaurantName: string) => void;
  removeLine: (menuItemId: string) => void;
  setQty: (menuItemId: string, qty: number) => void;
  setPromo: (code: string) => void;
  clearPromo: () => void;
  setSlot: (slotId: string) => void;
  clear: () => void;
}

const Ctx = React.createContext<CartCtx | null>(null);
const KEY = 'ss-fg-cart';

function load(): CartState {
  if (typeof window === 'undefined') return { lines: [], slotId: 'ts-now', promo: undefined, applied: undefined };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as CartState;
  } catch {
    /* ignore */
  }
  return { lines: [], slotId: 'ts-now', promo: undefined, applied: undefined };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<CartState>(load);

  React.useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const addItem: CartCtx['addItem'] = (item, restaurantId, restaurantName) =>
    setState((s) => {
      const existing = s.lines.find((l) => l.item.id === item.id);
      if (existing) {
        return {
          ...s,
          lines: s.lines.map((l) => (l.item.id === item.id ? { ...l, qty: l.qty + 1 } : l)),
        };
      }
      return { ...s, lines: [...s.lines, { restaurantId, restaurantName, item, qty: 1 }] };
    });

  const removeLine: CartCtx['removeLine'] = (menuItemId) =>
    setState((s) => ({ ...s, lines: s.lines.filter((l) => l.item.id !== menuItemId) }));

  const setQty: CartCtx['setQty'] = (menuItemId, qty) =>
    setState((s) => ({
      ...s,
      lines:
        qty <= 0
          ? s.lines.filter((l) => l.item.id !== menuItemId)
          : s.lines.map((l) => (l.item.id === menuItemId ? { ...l, qty } : l)),
    }));

  const setPromo: CartCtx['setPromo'] = (code) =>
    setState((s) => {
      const c = (code || '').trim().toUpperCase();
      const meta = c ? PROMO_CODES[c] : undefined;
      if (meta) {
        const offNgn = meta.percentOff != null ? Math.round(1000 * (meta.percentOff / 100)) : meta.flatOffNgn;
        return { ...s, promo: c, applied: { label: c, offNgn } };
      }
      if (c) {
        // invalid code: still report attempt via applied
        return { ...s, promo: c, applied: undefined };
      }
      return { ...s, promo: undefined, applied: undefined };
    });

  const clearPromo = () => setState((s) => ({ ...s, promo: undefined, applied: undefined }));
  const setSlot = (slotId: string) => setState((s) => ({ ...s, slotId }));
  const clear = () => setState({ lines: [], slotId: 'ts-now', promo: undefined, applied: undefined });

  const slot = timeSlots.find((t) => t.id === state.slotId) ?? timeSlots[0];
  const deliveryFeeNgn = React.useMemo(() => {
    const ids = new Set(state.lines.map((l) => l.restaurantId));
    let fee = 0;
    ids.forEach((id) => {
      const r = getRestaurantById(id);
      if (r) fee = Math.max(fee, r.deliveryFeeNgn);
    });
    return fee;
  }, [state.lines]);

  const quote = React.useMemo(
    () => computeQuote(state.lines, deliveryFeeNgn, state.applied ? state.promo : undefined),
    [state.lines, state.promo, state.applied, deliveryFeeNgn],
  );

  const count = state.lines.reduce((n, l) => n + l.qty, 0);

  return (
    <Ctx.Provider
      value={{
        lines: state.lines,
        slot,
        promo: state.promo,
        applied: state.applied,
        count,
        quote,
        addItem,
        removeLine,
        setQty,
        setPromo,
        clearPromo,
        setSlot,
        clear,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart(): CartCtx {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
