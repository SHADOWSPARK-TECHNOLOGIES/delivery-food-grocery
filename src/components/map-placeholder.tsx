import { cn } from '@/lib/format';

/** Stylized static map placeholder. When NEXT_PUBLIC_MAPBOX_TOKEN is set,
 *  this same component API would render a real Mapbox map. */
export function MapPlaceholder({
  label,
  className,
  points,
}: {
  label?: string;
  className?: string;
  points?: string[];
}) {
  return (
    <div
      className={cn('cyber-grid-bg relative overflow-hidden rounded-2xl border border-line bg-surface/40', className ?? 'h-56')}
    >
      <div className="absolute inset-0 cyber-grid-bg opacity-60" />
      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/10 blur-xl" />
      <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-glow" />
      <div className="absolute inset-x-0 bottom-0 p-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-widest text-dim">
            {label ?? 'Live map'}
            {process.env.NEXT_PUBLIC_MAPBOX_TOKEN ? '' : ' · placeholder'}
          </span>
        </div>
        {points && points.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {points.map((p, i) => (
              <span key={i} className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-cyan">
                {p}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
