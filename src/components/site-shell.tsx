'use client';

import * as React from 'react';
import Link from 'next/link';
import { useCart } from '@/components/cart-context';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/restaurants', label: 'Restaurants' },
  { href: '/dashboard', label: 'My orders' },
];

export function SiteHeader() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-mono text-lg font-bold cyber-text-grad">ss//cyberfood</span>
        </Link>
        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-cyan">
              {n.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/cart"
          className="relative ml-auto rounded-lg border border-line bg-surface/70 px-3 py-2 text-sm font-medium text-ink hover:border-cyan hover:text-cyan md:ml-0"
        >
          Cart
          {count > 0 && (
            <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-cyan px-1 font-mono text-[11px] font-bold text-bg">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-surface/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-mono text-lg font-bold cyber-text-grad">ss//cyberfood</div>
          <p className="mt-2 max-w-sm text-sm text-muted">
            ShadowSpark Cyberfood — restaurant &amp; grocery delivery across Lagos, Abuja and Port
            Harcourt. Prices in ₦, humans on standby.
          </p>
        </div>
        <div className="space-y-1 text-sm">
          <div className="mb-2 font-mono text-xs uppercase tracking-widest text-dim">Browse</div>
          <p className="text-muted">Restaurants</p>
          <p className="text-muted">Groceries</p>
          <p className="text-muted">Deals</p>
        </div>
        <div className="space-y-1 text-sm">
          <div className="mb-2 font-mono text-xs uppercase tracking-widest text-dim">Support</div>
          <p className="text-muted">+234 803 000 0000</p>
          <p className="text-muted">hello@shadowspark.tech</p>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center font-mono text-xs text-dim">
        © {new Date().getFullYear()} ShadowSpark Technologies · Owerri, Nigeria
      </div>
    </footer>
  );
}
