import * as React from 'react';
import { cn } from '@/lib/format';

export const Checkbox = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      type="checkbox"
      ref={ref}
      className={cn(
        'h-4 w-4 rounded border-line bg-surface/70 accent-cyan outline-none focus:ring-1 focus:ring-cyan/40',
        className,
      )}
      {...props}
    />
  ),
);
Checkbox.displayName = 'Checkbox';

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'h-10 w-full rounded-lg border border-line bg-surface/70 px-3 text-sm text-ink outline-none transition-colors focus:border-cyan',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
