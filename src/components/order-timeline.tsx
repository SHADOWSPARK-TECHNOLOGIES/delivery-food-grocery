import { cn } from '@/lib/format';
import { orderStatusRank } from '@/data/orders';

const STEPS = [
  { key: 'placed', label: 'Placed' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'preparing', label: 'Preparing' },
  { key: 'en_route', label: 'En route' },
  { key: 'delivered', label: 'Delivered' },
] as const;

export function OrderTimeline({ status }: { status: string }) {
  const current = orderStatusRank[status as keyof typeof orderStatusRank] ?? 0;
  return (
    <ol className="flex items-center gap-1">
      {STEPS.map((s, i) => {
        const done = i <= current;
        return (
          <li key={s.key} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={cn(
                'h-2 flex-1 rounded-full transition-colors',
                i === 0 ? 'hidden' : done ? 'bg-cyan' : 'bg-white/10',
              )}
            />
            <span
              className={cn(
                'grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold',
                done ? 'bg-cyan text-bg' : 'bg-white/10 text-muted',
              )}
            >
              {i + 1}
            </span>
            <span className={cn('text-[11px]', done ? 'text-cyan' : 'text-dim')}>{s.label}</span>
            <div className={cn('h-2 flex-1 rounded-full', i === 0 ? 'hidden' : done ? 'bg-cyan' : 'bg-white/10')} />
          </li>
        );
      })}
    </ol>
  );
}
