'use client';

import { CartProvider } from '@/components/cart-context';
import { SiteHeader, SiteFooter } from '@/components/site-shell';
import { ChatWidget } from '@/components/chat-widget';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <SiteHeader />
      <main className="min-h-[62vh]">{children}</main>
      <SiteFooter />
      <ChatWidget />
    </CartProvider>
  );
}
