import {
  createMapTools,
  createOrderTools,
  createPricingTools,
  type ToolDefinition,
  type ToolResult,
} from 'delivery-ai-agents-common';
import { menuItems, restaurants } from '@/data/restaurants';
import { getOrderByRef } from '@/data/orders';
import { zoneById, zoneName } from '@/data/zones';
import { formatNgn } from '@/lib/format';

/** City & zone names the rule-based MockLLM can match against free text. */
const AREA_TOKENS = [
  'lagos', 'ikeja', 'surulere', 'yaba', 'mainland',
  'lekki', 'vi', 'victoria island', 'island', 'ikoyi',
  'abuja', 'wuse', 'garki', 'maitama',
  'port harcourt', 'portharcourt', 'trans amadi', 'pha', 'obiri',
  'owerri', 'kano', 'ibadan',
];

function inferZone(text: string): string | undefined {
  const t = text.toLowerCase();
  if (/mainland|ikeja|surulere|yaba/.test(t)) return 'lagos-mainland';
  if (/lekki|ikoyi|\bvi\b|victoria island|island/.test(t)) return 'lagos-island';
  if (/port harcourt|portharcourt|trans amadi|pha|obiri/.test(t)) return 'port-harcourt';
  if (/abuja|wuse|garki|maitama|asokoro/.test(t)) return 'abuja';
  for (const tok of AREA_TOKENS) if (t.includes(tok)) return undefined; // ambiguous city only
  return undefined;
}

/** Custom vertical tool: which restaurants serve my area fast. */
const findRestaurantsByZone: ToolDefinition = {
  name: 'findRestaurantsByZone',
  description:
    'Find restaurants that deliver to a delivery zone (Lagos Mainland, Lagos Island, Abuja, Port Harcourt) within a number of minutes.',
  keywords: [
    'delivers to my area', 'in my area', 'near me', 'under 30 min',
    'under 30 minutes', 'delivery zone', 'close to me', 'which restaurants deliver',
    'deliver to', 'my area',
  ],
  parameters: {
    type: 'object',
    properties: {
      zone: { type: 'string', description: 'Delivery zone name or city', required: [] },
      maxMinutes: { type: 'number', description: 'Max delivery time in minutes', required: [] },
    },
    required: [],
  },
  extract: (text: string) => {
    const zone = inferZone(text);
    const mins = Number((text.match(/(\d{1,3})\s*(?:min|minutes|mins)/i) || [])[1] ?? 60);
    return { zone, maxMinutes: mins };
  },
  execute: (args, ctx) => {
    const rawZone = String(args.zone ?? inferZone(ctx.messages.slice(-1)[0]?.content ?? '') ?? '');
    const maxMins = Number(args.maxMinutes ?? 60);
    const hits = restaurants
      .filter((r) => {
        const zTxt = `${r.name} ${r.city} ${r.zones.map(zoneName).join(' ')}`.toLowerCase();
        const zMatch = !rawZone || zTxt.includes(rawZone.toLowerCase()) || r.city.toLowerCase().includes(rawZone.split('-')[0]);
        return zMatch && r.deliveryTimeMin <= maxMins;
      })
      .sort((a, b) => a.deliveryTimeMin - b.deliveryTimeMin)
      .slice(0, 5);

    if (hits.length === 0) {
      const zone = rawZone ? ` to ${rawZone}` : '';
      return {
        ok: true,
        data: {
          reply: `I couldn't find places delivering${zone} under ${maxMins} min right now. Try widening your time — I can list every nearby option instead.`,
        },
      };
    }
    const lines = hits
      .map((r) => `• ${r.name} (${r.city}) — ~${r.deliveryTimeMin} min, ${r.rating}★, min order ${formatNgn(r.minOrderNgn)}`)
      .join('\n');
    return {
      ok: true,
      data: {
        reply: `Here are places delivering${rawZone ? ` to ${zoneName(rawZone) ?? rawZone}` : ''} under ${maxMins} min:\n${lines}`,
        restaurants: hits.map((r) => ({ slug: r.slug, name: r.name, deliveryTimeMin: r.deliveryTimeMin })),
      },
    };
  },
};

/** Custom vertical tool: dietary-safe menu items (gluten-free / vegetarian / halal). */
const filterMenuByDiet: ToolDefinition = {
  name: 'filterMenuByDiet',
  description:
    'Filter the menu for dietary tags such as gluten-free, vegetarian or halal.',
  keywords: ['gluten-free', 'gluten free', 'vegetarian', 'vegan', 'halal options', 'dietary', 'no gluten'],
  parameters: {
    type: 'object',
    properties: { diet: { type: 'string' } },
    required: [],
  },
  extract: (text: string) => {
    const t = text.toLowerCase();
    const diet =
      /gluten/.test(t) ? 'gluten-free' : /vegan|vegetarian/.test(t) ? 'vegetarian' : /halal/.test(t) ? 'halal' : 'gluten-free';
    return { diet };
  },
  execute: (args) => {
    const diet = String(args.diet ?? 'gluten-free');
    const items = menuItems
      .filter((i) => i.dietTags.includes(diet as 'gluten-free'))
      .slice(0, 8);
    if (items.length === 0) {
      return { ok: true, data: { reply: `No ${diet} items are on the menu right now — but Mauro? I can check a specific restaurant.` } };
    }
    const lines = items
      .map((i) => {
        const r = restaurants.find((x) => x.id === i.restaurantId);
        return `• ${i.name} — ${formatNgn(i.priceNgn)} @ ${r?.name ?? ''}`;
      })
      .join('\n');
    return {
      ok: true,
      data: {
        reply: `Here are ${diet} options available right now:\n${lines}`,
        items: items.map((i) => ({ id: i.id, name: i.name, priceNgn: i.priceNgn })),
      },
    };
  },
};

// ---- SDK-wired tool bundles operating on the same fixtures ----
const orderClients = {
  async getStatus({ orderId }) {
    if (!orderId) return { ok: false, error: 'I need an order reference to look up.' } as ToolResult<never>;
    const o = getOrderByRef(orderId);
    if (!o) return { ok: false, error: `No order found for ${orderId}.` } as ToolResult<never>;
    return {
      ok: true,
      data: { orderId: o.ref, status: o.status, eta: `${o.etaMin} min`, driver: o.driver ?? 'assigned shortly' },
    };
  },
  async updateAddress({ orderId, address }) {
    const o = orderId ? getOrderByRef(orderId) : undefined;
    if (!orderId || !o) return { ok: false, error: 'I need a valid order reference to change the address.' } as ToolResult<never>;
    return { ok: true, data: { orderId: o.ref, updated: true, address: address ?? 'your new address' } };
  },
  async reschedule({ orderId, time }) {
    const o = orderId ? getOrderByRef(orderId) : undefined;
    if (!orderId || !o) return { ok: false, error: 'I need a valid order reference to reschedule.' } as ToolResult<never>;
    if (o.status !== 'placed') {
      return { ok: false, error: `Order ${o.ref} is already ${o.status === 'en_route' ? 'on the way' : o.status} — it can no longer be rescheduled.` } as ToolResult<never>;
    }
    return { ok: true, data: { orderId: o.ref, time: time ?? '7:00 pm', changed: true } };
  },
  async initiateReturn({ orderId }) {
    const o = orderId ? getOrderByRef(orderId) : undefined;
    const ref = o?.ref ?? 'your order';
    return {
      ok: true,
      data: {
        reply: `Return policy check for ${ref}: food items qualify for a refund only if reported within 45 minutes of delivery and the item was wrong, missing, or spoiled. I've logged a case — a support agent will confirm your refund within 24 hours.`,
      },
    };
  },
} satisfies import('delivery-ai-agents-common').OrderToolClients;

// simple distance estimate keyed by zone pair
const baseKm: Record<string, number> = {
  'lagos-mainland-lagos-island': 12,
  'lagos-island-lagos-mainland': 12,
  'abuja-abuja': 6,
  'port-harcourt-port-harcourt': 5,
};

const mapClients = {
  async calculateETA({ from, to }) {
    const mins = 22 + (Math.abs((to ?? '').length - (from ?? '').length) % 18);
    return { ok: true, data: { etaMinutes: mins, distanceKm: 6 + (mins % 14) } };
  },
  async geocodeAddress({ address }) {
    if (!address) return { ok: false, error: 'Give me an address to geocode.' } as ToolResult<never>;
    return { ok: true, data: { lat: 6.5244, lng: 3.3792, label: address } };
  },
  async getRoute({ from, to }) {
    return { ok: true, data: { from: from ?? 'origin', to: to ?? 'destination', waypoints: [] } };
  },
} satisfies import('delivery-ai-agents-common').MapToolClients;

function urrencyBoost(u?: string): number {
  if (u === 'instant') return 800;
  if (u === 'express') return 400;
  return 0;
}

// build SDK bundles (pricing wired by a cleaner client below)
const pricingClients2: import('delivery-ai-agents-common').PricingToolClients = {
  async quoteDelivery({ from, to, weightKg, urgency }) {
    const dist = Math.abs((to ?? '').length - (from ?? '').length) % 14;
    const priceNgn = 450 + dist * 70 + (weightKg ?? 0) * 12 + urrencyBoost(urgency);
    return {
      ok: true,
      data: {
        priceNgn,
        etaMinutes: 18 + dist,
        service: urgency === 'express' ? 'express' : urgency === 'instant' ? 'instant' : 'standard',
      },
    };
  },
  async applyPromo({ code }) {
    const normalized = (code ?? '').toUpperCase();
    const valid = ['SPARK10', 'FRESH20'];
    if (!valid.includes(normalized)) {
      return { ok: true, data: { code: normalized, applied: false, reason: 'code not recognised or expired' } };
    }
    const amountOffNgn = normalized === 'SPARK10' ? 1000 : 1500;
    return { ok: true, data: { code: normalized, applied: true, amountOffNgn } };
  },
};

/** Full tool set the chat agent can call (order + map + pricing + vertical). */
export function buildTools(): ToolDefinition[] {
  return [
    findRestaurantsByZone,
    filterMenuByDiet,
    ...createOrderTools(orderClients),
    ...createMapTools(mapClients),
    ...createPricingTools(pricingClients2),
  ];
}

export function normalizeZone(input?: string): string | undefined {
  if (!input) return undefined;
  return input.toLowerCase().includes('mainland') ? 'lagos-mainland' : zoneById(input) ? input : undefined;
}
