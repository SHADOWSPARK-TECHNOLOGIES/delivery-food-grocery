import { cn } from '@/lib/format';

/** Colored monogram tile — image fallback that always renders. */
export function Monogram({
  glyph,
  tint,
  className,
  name,
}: {
  glyph: string;
  tint: string;
  className?: string;
  name?: string;
}) {
  return (
    <div
      role="img"
      aria-label={name ?? glyph}
      className={cn('grid place-items-center font-mono font-bold text-bg', className ?? 'h-24 w-24 rounded-2xl text-2xl')}
      style={{ background: `linear-gradient(135deg, ${tint}cc, ${tint}55)` }}
    >
      {glyph}
    </div>
  );
}
