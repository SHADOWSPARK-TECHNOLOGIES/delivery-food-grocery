import * as React from 'react';
import { cn } from '@/lib/format';

export type BadgeTone = 'cyan' | 'purple' | 'magenta' | 'amber' | 'dim' | 'ok';

const tones: Record<BadgeTone, string> = {
  cyan: 'bg-cyan/15 text-cyan border-cyan/30',
  purple: 'bg-purple/15 text-purple border-purple/30',
  magenta: 'bg-magenta/15 text-magenta border-magenta/30',
  amber: 'bg-amber/15 text-amber border-amber/30',
  dim: 'bg-white/5 text-muted border-white/10',
  ok: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
};

export function Badge({
  className,
  tone = 'dim',
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-mono font-medium',
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}

export function StatusPill({ status }: { status: string }) {
  const tone: BadgeTone =
    status === 'delivered'
      ? 'ok'
      : status === 'en_route'
        ? 'cyan'
        : status === 'preparing' || status === 'confirmed'
          ? 'purple'
          : status === 'placed'
            ? 'amber'
            : 'dim';
  return <Badge tone={tone}>{status.replace('_', ' ')}</Badge>;
}
