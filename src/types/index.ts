// Shared domain + UI types for ShadowSpark Cyberfood (food & grocery).

export type DietTag = 'halal' | 'vegetarian' | 'gluten-free';

export type City =
  | 'Lagos'
  | 'Abuja'
  | 'Port Harcourt'
  | 'Owerri'
  | 'Kano'
  | 'Ibadan';

export type ZoneId =
  | 'lagos-mainland'
  | 'lagos-island'
  | 'abuja'
  | 'port-harcourt';

export interface DeliveryZone {
  id: ZoneId;
  name: string;
  city: City;
  description: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  restaurantId: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  priceNgn: number;
  dietTags: DietTag[];
  popular?: boolean;
  /** monogram glyph used by the fallback tile when no image is set */
  monogram: string;
  /** optional tint for the fallback tile */
  tint?: string;
}

export interface Restaurant {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  cuisine: string[];
  city: City;
  zones: ZoneId[];
  rating: number;
  reviewCount: number;
  deliveryTimeMin: number;
  minOrderNgn: number;
  deliveryFeeNgn: number;
  featured?: boolean;
  monogram: string;
  tint: string;
  acceptsDietTags: DietTag[];
  categories: MenuCategory[];
  /** menu items exported separately via getMenuItems(restaurantId) */
}

export interface OrderItemLine {
  menuItemId: string;
  name: string;
  priceNgn: number;
  qty: number;
}

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'preparing'
  | 'en_route'
  | 'delivered';

export interface Order {
  id: string;
  ref: string;
  customerId: string;
  restaurantId: string;
  restaurantName: string;
  items: OrderItemLine[];
  status: OrderStatus;
  placedAt: string;
  deliveryTime: string;
  etaMin: number;
  driver?: string;
  addresses: {
    pickup: string;
    dropoff: string;
  };
  subtotalNgn: number;
  deliveryFeeNgn: number;
  discountNgn: number;
  totalNgn: number;
  promoCode?: string;
  paymentMethod: 'paystack' | 'card' | 'cash';
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  rating: number;
  zone: ZoneId;
}

export interface Address {
  id: string;
  label: string;
  line1: string;
  city: City;
  zone: ZoneId;
  landmark?: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: City;
  zone: ZoneId;
}

// ---- cart ----

export interface CartLine {
  restaurantId: string;
  restaurantName: string;
  item: MenuItem;
  qty: number;
}

export interface QuoteSummary {
  subtotalNgn: number;
  deliveryFeeNgn: number;
  discountNgn: number;
  totalNgn: number;
}

export interface TimeSlot {
  id: string;
  label: string;
  etaMin: number;
  available: boolean;
}
