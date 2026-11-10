// Aggregated read-access to the typed fixtures — single import surface for
// pages, API routes and the agent tools. No DB in the picture.

export {
  restaurants,
  menuItems,
  getMenuItems,
  getRestaurantBySlug,
  getRestaurantById,
  getMenuItemById,
} from '@/data/restaurants';

export { orders, getOrderByRef, getOrderById, orderStatusRank, timeSlots } from '@/data/orders';

export { drivers, driverById, driverName } from '@/data/drivers';

export { deliveryZones, zoneById, zoneName } from '@/data/zones';

export { currentCustomer, customerById } from '@/data/customer';

import { formatNgn } from './format';
import type { CartLine, QuoteSummary } from '@/types';

/** Valid promo codes (shared between cart UI and the agent). */
export const PROMO_CODES: Record<string, { percentOff?: number; flatOffNgn: number }> = {
  SPARK10: { percentOff: 10, flatOffNgn: 1000 },
  FRESH20: { flatOffNgn: 1500 },
};

export function computeQuote(
  lines: CartLine[],
  deliveryFeeNgn: number,
  promoCode?: string,
): QuoteSummary {
  const subtotalNgn = lines.reduce(
    (sum, l) => sum + l.item.priceNgn * l.qty,
    0,
  );
  const promo = promoCode?.toUpperCase()
    ? PROMO_CODES[promoCode.toUpperCase()]
    : undefined;
  const discountNgn = promo
    ? Math.min(
        subtotalNgn,
        promo.percentOff != null
          ? Math.round((subtotalNgn * promo.percentOff) / 100)
          : promo.flatOffNgn,
      )
    : 0;
  return {
    subtotalNgn,
    deliveryFeeNgn,
    discountNgn,
    totalNgn: subtotalNgn + deliveryFeeNgn - discountNgn,
  };
}

export { formatNgn };
