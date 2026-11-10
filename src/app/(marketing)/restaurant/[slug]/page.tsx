import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getRestaurantBySlug, getMenuItems, restaurants } from '@/data/restaurants';
import { Monogram } from '@/components/monogram';
import { MenuTile } from '@/components/menu-tile';
import { Badge } from '@/components/ui/badge';
import { MapPlaceholder } from '@/components/map-placeholder';
import { formatNgn } from '@/lib/format';

type P = { params: Promise<{ slug: string }> };

export default async function RestaurantPage({ params }: P) {
  const { slug } = await params;
  const r = getRestaurantBySlug(slug);
  if (!r) notFound();
  const items = getMenuItems(r.id);
  const categories = r.categories;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Link href="/restaurants" className="font-mono text-xs text-cyan hover:underline">
        ← all restaurants
      </Link>

      <div className="mt-4 flex items-center gap-5">
        <Monogram glyph={r.monogram} tint={r.tint} name={r.name} className="h-20 w-20 rounded-2xl text-2xl" />
        <div>
          <h1 className="text-3xl font-bold text-ink">{r.name}</h1>
          <p className="text-sm text-muted">{r.tagline}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Badge tone="amber">{r.rating.toFixed(1)}★</Badge>
            <Badge tone="cyan">~{r.deliveryTimeMin} min</Badge>
            <Badge tone="dim">min {formatNgn(r.minOrderNgn)}</Badge>
            <Badge tone="purple">fee {formatNgn(r.deliveryFeeNgn)}</Badge>
          </div>
        </div>
      </div>

      <p className="mt-4 max-w-2xl text-sm text-muted">{r.description}</p>

      <div className="mt-10 grid gap-8 md:grid-cols-[1.6fr_1fr]">
        <div>
          {categories.map((cat) => {
            const catItems = items.filter((i) => i.categoryId === cat.id);
            if (catItems.length === 0) return null;
            return (
              <section key={cat.id} className="mb-8">
                <h2 className="mb-3 font-mono text-sm uppercase tracking-widest text-cyan">{cat.name}</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {catItems.map((item) => (
                    <MenuTile key={item.id} item={item} restaurant={r} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
        <aside className="space-y-4">
          <MapPlaceholder label={`${r.name} · ${r.city}`} className="h-48" points={r.zones} />
          <div className="glass rounded-xl p-4 text-sm text-muted">
            <div className="font-mono text-xs uppercase tracking-widest text-cyan">Also worth a try</div>
            <div className="mt-2 space-y-1">
              {restaurants.filter((x) => x.id !== r.id && x.zones.some((z) => r.zones.includes(z))).slice(0, 3).map((x) => (
                <Link key={x.id} href={`/restaurant/${x.slug}`} className="block text-ink hover:text-cyan">
                  {x.name} · ~{x.deliveryTimeMin} min
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
