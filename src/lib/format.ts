import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes (clsx + tailwind-merge). */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Format a NGN amount with the Nigerian locale, e.g. 1,250. */
export function formatNgn(value: number): string {
  return `₦${value.toLocaleString('en-NG')}`;
}

/** Format a Nigerian phone number as +234 800 000 0000. */
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 13 && digits.startsWith('234')) {
    return `+234 ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`;
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return `+234 ${digits.slice(1, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  return raw;
}

/** Short human label for an ISO/relative delivery time. */
export function formatTime(input: string): string {
  try {
    const d = new Date(input);
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleTimeString('en-NG', {
        hour: 'numeric',
        minute: '2-digit',
      });
    }
  } catch {
    /* fall through */
  }
  return input;
}

/** Human-readable order status (agent + UI share this mapping). */
export function orderStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    placed: 'Placed',
    confirmed: 'Confirmed',
    preparing: 'Preparing',
    en_route: 'En route',
    delivered: 'Delivered',
  };
  return labels[status] ?? status;
}
