'use client';

import { useCart } from '@/components/cart-context';
import { getMenuItemById } from '@/data/restaurants';
import { getRestaurantById } from '@/data/restaurants';
import type { OrderItemLine } from '@/types';

export function ReorderButton({ restaurantId, items }: { restaurantId: string; items: OrderItemLine[] }) {
  const { addItem, removeLine } = useCart();
  const restaurant = getRestaurantById(restaurantId);

  const reorder = () => {
    // reset each line then add, so quantities reflect the prior order
    items.forEach((it) => removeLine(it.menuItemId));
    items.forEach((it) => {
      const item = getMenuItemById(it.menuItemId);
      if (item && restaurant) {
        for (let i = 0; i < it.qty; i++) addItem(item, restaurant.id, restaurant.name);
      }
    });
  };

  return (
    <button
      onClick={reorder}
      className="rounded-md bg-cyan px-3 py-2 text-xs font-semibold text-bg transition-colors hover:shadow-glow"
    >
      Reorder
    </button>
  );
}
