import Link from 'next/link';
import { restaurants } from '@/data/restaurants';
import { deliveryZones } from '@/data/zones';
import { RestaurantCard } from '@/components/restaurant-card';

const CATEGORIES = ['Nigerian', 'Fast food', 'Grocery', 'Grill', 'Seafood', 'Café', 'Snacks'];

export default function HomePage() {
  const featured = restaurants.filter((r) => r.featured).slice(0, 6);
  return (
    <div>
      {/* Hero */}
      <section className="cyber-grid-bg relative overflow-hidden border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">ShadowSpark · Cyberfood</span>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl">
            Hungry? <span className="cyber-text-grad">Ordered.</span>
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            Restaurant &amp; grocery delivery across Lagos, Abuja and Port Harcourt — with an AI
            assistant that tracks, tweaks and trouble-shoots your order in real time.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/restaurants"
              className="rounded-lg bg-cyan px-6 py-3 text-center font-semibold text-bg transition-colors hover:shadow-glow"
            >
              Order now
            </Link>
            <Link
              href="#zones"
              className="rounded-lg border border-line px-6 py-3 text-center font-semibold text-ink transition-colors hover:border-cyan hover:text-cyan"
            >
              Check delivery zones
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-4 text-2xl font-bold text-ink">Browse by taste</h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              href={`/restaurants?cuisine=${encodeURIComponent(c)}`}
              className="rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-cyan hover:text-cyan"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured restaurants */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-ink">Featured right now</h2>
          <Link href="/restaurants" className="text-sm text-cyan hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((r) => (
            <RestaurantCard key={r.id} r={r} />
          ))}
        </div>
      </section>

      {/* Zones */}
      <section id="zones" className="border-t border-line bg-surface/30">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-4 text-2xl font-bold text-ink">Where we deliver</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {deliveryZones.map((z) => (
              <div key={z.id} className="glass rounded-xl p-4">
                <div className="font-mono text-xs uppercase tracking-widest text-cyan">{z.city}</div>
                <div className="mt-1 font-semibold text-ink">{z.name}</div>
                <p className="mt-1 text-xs text-muted">{z.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
