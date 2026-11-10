import { restaurants } from '@/data/restaurants';
import { RestaurantCard } from '@/components/restaurant-card';
import { FilterBar } from '@/components/filter-bar';

type SP = { [k: string]: string | string[] | undefined };

export default async function RestaurantsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const q = String(sp.q ?? '').trim().toLowerCase();
  const cuisine = String(sp.cuisine ?? '');
  const maxTime = Number(sp.maxTime ?? 0) || 0;
  const sort = String(sp.sort ?? 'time');

  let list = restaurants.filter((r) => {
    if (q && !`${r.name} ${r.tagline} ${r.cuisine.join(' ')}`.toLowerCase().includes(q)) return false;
    if (cuisine && !r.cuisine.includes(cuisine)) return false;
    if (maxTime && r.deliveryTimeMin > maxTime) return false;
    return true;
  });

  if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
  else if (sort === 'min-order') list = [...list].sort((a, b) => a.minOrderNgn - b.minOrderNgn);
  else list = [...list].sort((a, b) => a.deliveryTimeMin - b.deliveryTimeMin);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-ink">Restaurants</h1>
      <p className="mt-1 text-sm text-muted">{list.length} available across Lagos, Abuja &amp; Port Harcourt</p>
      <div className="mt-6">
        <FilterBar />
      </div>
      {list.length === 0 ? (
        <p className="text-muted">No restaurants match those filters.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r) => (
            <RestaurantCard key={r.id} r={r} />
          ))}
        </div>
      )}
    </div>
  );
}
