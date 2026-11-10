import type { Order, OrderStatus, TimeSlot } from '@/types';
import { driverById } from './drivers';

// Five past/active orders across every status so tracking + dashboard render
// from typed fixtures with zero DB access.
export const orders: Order[] = [
  {
    id: 'ord-001',
    ref: 'ORD-FG-7W2K9P',
    customerId: 'cus-demo-01',
    restaurantId: 'rest-iyabasira',
    restaurantName: 'Iya Basira Kitchen',
    items: [
      { menuItemId: 'mi-ib-jollof', name: 'Party Jollof Rice', priceNgn: 2800, qty: 1 },
      { menuItemId: 'mi-ib-plantain', name: 'Peppered Plantain', priceNgn: 1200, qty: 2 },
    ],
    status: 'delivered',
    placedAt: '2026-11-08T18:20:00.000Z',
    deliveryTime: '18:45',
    etaMin: 25,
    driver: 'Emeka Okafor',
    addresses: {
      pickup: 'Iya Basira Kitchen · Yaba, Lagos',
      dropoff: '12 Awolowo Rd, Ikeja, Lagos',
    },
    subtotalNgn: 5200,
    deliveryFeeNgn: 500,
    discountNgn: 0,
    totalNgn: 5700,
    paymentMethod: 'paystack',
  },
  {
    id: 'ord-002',
    ref: 'ORD-FG-3Q8T1M',
    customerId: 'cus-demo-01',
    restaurantId: 'rest-freshco',
    restaurantName: 'FreshCo Grocery',
    items: [
      { menuItemId: 'mi-fc-fruitbox', name: 'Weekly Fruit Box', priceNgn: 8500, qty: 1 },
      { menuItemId: 'mi-fc-garri', name: '2kg Garri (Ieba)', priceNgn: 2600, qty: 1 },
    ],
    status: 'delivered',
    placedAt: '2026-11-06T09:05:00.000Z',
    deliveryTime: '09:40',
    etaMin: 35,
    driver: 'Emeka Okafor',
    addresses: {
      pickup: 'FreshCo Grocery · Ikeja, Lagos',
      dropoff: '3 Murtala Rd, Ikeja, Lagos',
    },
    subtotalNgn: 11100,
    deliveryFeeNgn: 600,
    discountNgn: 0,
    totalNgn: 11700,
    paymentMethod: 'card',
  },
  {
    id: 'ord-003',
    ref: 'ORD-FG-5H2Z8D',
    customerId: 'cus-demo-01',
    restaurantId: 'rest-suyaspot',
    restaurantName: 'Suya Spot 54',
    items: [
      { menuItemId: 'mi-ss-beef', name: 'Beef Suya (large)', priceNgn: 2200, qty: 2 },
    ],
    status: 'en_route',
    placedAt: '2026-11-10T13:04:00.000Z',
    deliveryTime: '13:40',
    etaMin: 14,
    driver: 'Aisha Bello',
    addresses: {
      pickup: 'Suya Spot 54 · Wuse 2, Abuja',
      dropoff: '203 Aminu Kano Cres, Wuse 2, Abuja',
    },
    subtotalNgn: 4400,
    deliveryFeeNgn: 450,
    discountNgn: 0,
    totalNgn: 4850,
    paymentMethod: 'paystack',
  },
  {
    id: 'ord-004',
    ref: 'ORD-FG-9M6X3A',
    customerId: 'cus-demo-01',
    restaurantId: 'rest-chickenrepublic',
    restaurantName: 'Chicken Republic PH',
    items: [
      { menuItemId: 'mi-cr-wings', name: 'Peppered Wings (6pc)', priceNgn: 2400, qty: 1 },
      { menuItemId: 'mi-cr-fries', name: 'Salt & Pepper Fries', priceNgn: 900, qty: 1 },
      { menuItemId: 'mi-cr-zobo', name: 'Chilled Zobo', priceNgn: 700, qty: 2 },
    ],
    status: 'preparing',
    placedAt: '2026-11-10T13:30:00.000Z',
    deliveryTime: '14:10',
    etaMin: 38,
    driver: 'Tunde Adeyemi',
    addresses: {
      pickup: 'Chicken Republic PH · Trans Amadi, Port Harcourt',
      dropoff: '45 Aba Rd, Obiri, Port Harcourt',
    },
    subtotalNgn: 4700,
    deliveryFeeNgn: 400,
    discountNgn: 0,
    totalNgn: 5100,
    paymentMethod: 'cash',
  },
  {
    id: 'ord-005',
    ref: 'ORD-FG-4N7B2C',
    customerId: 'cus-demo-01',
    restaurantId: 'rest-naijaeats',
    restaurantName: 'Naija Eats',
    items: [
      { menuItemId: 'mi-ne-jollof', name: 'Smoky Jollof + Dodo', priceNgn: 2600, qty: 1 },
      { menuItemId: 'mi-mp-puffpuff', name: 'Puff-Puff (dozen)', priceNgn: 1000, qty: 1 },
    ],
    status: 'placed',
    placedAt: '2026-11-10T13:35:00.000Z',
    deliveryTime: '14:20',
    etaMin: 45,
    addresses: {
      pickup: 'Naija Eats · Wuse, Abuja',
      dropoff: '18 Aso Rock Villa Rd, Abuja',
    },
    subtotalNgn: 3600,
    deliveryFeeNgn: 500,
    discountNgn: 360,
    totalNgn: 3740,
    promoCode: 'SPARK10',
    paymentMethod: 'paystack',
  },
];

export const getOrderByRef = (ref: string): Order | undefined =>
  orders.find((o) => o.ref.toLowerCase() === ref.toLowerCase() || o.id === ref.toLowerCase());

export const getOrderById = (id: string): Order | undefined =>
  orders.find((o) => o.id === id || o.ref === id);

export const orderStatusRank: Record<OrderStatus, number> = {
  placed: 0,
  confirmed: 1,
  preparing: 2,
  en_route: 3,
  delivered: 4,
};

export function driverFor(order: Order) {
  if (!order.driver) return undefined;
  return driverById(order.driver) ?? { id: 'drv-null', name: order.driver, phone: '—', vehicle: '—', rating: 0, zone: order.addresses.dropoff.includes('Abuja') ? 'abuja' : 'lagos-mainland' };
}

export const timeSlots: TimeSlot[] = [
  { id: 'ts-now', label: 'ASAP · 20–30 min', etaMin: 25, available: true },
  { id: 'ts-6', label: 'Today 6:00 pm', etaMin: 120, available: true },
  { id: 'ts-7', label: 'Today 7:00 pm', etaMin: 180, available: true },
  { id: 'ts-8', label: 'Today 8:00 pm', etaMin: 240, available: true },
  { id: 'ts-9', label: 'Today 9:00 pm', etaMin: 300, available: false },
];
