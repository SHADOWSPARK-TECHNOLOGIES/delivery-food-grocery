// ShadowSpark Cyberfood — database seed.
//
//   pnpm db:seed
//
// Requires a reachable DATABASE_URL (PostgreSQL / Neon). The Next.js build
// does NOT run this — it only runs when you connect a real database.
// Self-contained (no '@/' alias) so tsx can execute it directly.

import { PrismaClient, DietTag } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ---- zones ----
  const zones = [
    { id: 'lagos-mainland', name: 'Lagos Mainland', city: 'Lagos', description: 'Yaba, Surulere, Ikeja' },
    { id: 'lagos-island', name: 'Lagos Island', city: 'Lagos', description: 'Victoria Island, Lekki, Ikoyi' },
    { id: 'abuja', name: 'Abuja', city: 'Abuja', description: 'Wuse, Garki, Maitama, Asokoro' },
    { id: 'port-harcourt', name: 'Port Harcourt', city: 'Port Harcourt', description: 'GRA, Trans Amadi, Obiri' },
  ];
  for (const z of zones) {
    await prisma.deliveryZone.upsert({ where: { id: z.id }, update: z, create: z });
  }

  // ---- drivers ----
  const drivers = [
    { id: 'drv-001', name: 'Emeka Okafor', phone: '+2348031234567', vehicle: 'Yamaha bike · green box', rating: 4.9, zone: 'lagos-mainland' },
    { id: 'drv-002', name: 'Aisha Bello', phone: '+2348099887766', vehicle: 'Bajaj rickshaw · purple', rating: 4.8, zone: 'abuja' },
    { id: 'drv-003', name: 'Tunde Adeyemi', phone: '+2348055554433', vehicle: 'Honda bike · tricked', rating: 4.6, zone: 'port-harcourt' },
  ];
  for (const d of drivers) {
    await prisma.driver.upsert({ where: { id: d.id }, update: d, create: d });
  }

  // ---- customer ----
  const customer = await prisma.customer.upsert({
    where: { id: 'cus-demo-01' },
    update: {},
    create: {
      id: 'cus-demo-01',
      name: 'Ngozi Umeh',
      phone: '+2348030000000',
      email: 'ngozi@example.com',
      city: 'Lagos',
      zone: 'lagos-mainland',
    },
  });

  // ---- restaurants + a curated subset of menu items ----
  const seedRestaurants = [
    {
      id: 'rest-iyabasira',
      name: 'Iya Basira Kitchen',
      slug: 'iya-basira-kitchen',
      city: 'Lagos',
      rating: 4.8,
      reviewCount: 1210,
      deliveryTimeMin: 28,
      minOrderNgn: 2500,
      deliveryFeeNgn: 500,
      featured: true,
      items: [
        { id: 'mi-ib-jollof', name: 'Party Jollof Rice', priceNgn: 2800, dietTags: ['gluten_free'], popular: true },
        { id: 'mi-ib-ofada', name: 'Ofada Rice + Ayamase', priceNgn: 3500, dietTags: ['gluten_free'], popular: true },
      ],
    },
    {
      id: 'rest-freshco',
      name: 'FreshCo Grocery',
      slug: 'freshco-grocery',
      city: 'Lagos',
      rating: 4.6,
      reviewCount: 930,
      deliveryTimeMin: 35,
      minOrderNgn: 4000,
      deliveryFeeNgn: 600,
      featured: true,
      items: [
        { id: 'mi-fc-fruitbox', name: 'Weekly Fruit Box', priceNgn: 8500, dietTags: ['vegetarian', 'gluten_free'], popular: true },
        { id: 'mi-fc-ugwu', name: 'Bunch of Ugu', priceNgn: 800, dietTags: ['vegetarian', 'gluten_free'], popular: false },
      ],
    },
    {
      id: 'rest-suyaspot',
      name: 'Suya Spot 54',
      slug: 'suya-spot-54',
      city: 'Abuja',
      rating: 4.7,
      reviewCount: 640,
      deliveryTimeMin: 22,
      minOrderNgn: 1800,
      deliveryFeeNgn: 450,
      featured: true,
      items: [
        { id: 'mi-ss-beef', name: 'Beef Suya (large)', priceNgn: 2200, dietTags: ['halal'], popular: true },
      ],
    },
  ];

  for (const sr of seedRestaurants) {
    const restaurant = await prisma.restaurant.upsert({
      where: { slug: sr.slug },
      update: {},
      create: {
        id: sr.id,
        name: sr.name,
        slug: sr.slug,
        city: sr.city,
        rating: sr.rating,
        reviewCount: sr.reviewCount,
        deliveryTimeMin: sr.deliveryTimeMin,
        minOrderNgn: sr.minOrderNgn,
        deliveryFeeNgn: sr.deliveryFeeNgn,
        featured: sr.featured,
      },
    });

    const category = await prisma.category.create({
      data: { name: 'House Favourites', restaurantId: restaurant.id },
    });

    for (const it of sr.items) {
      await prisma.menuItem.upsert({
        where: { id: it.id },
        update: { name: it.name, priceNgn: it.priceNgn, dietTags: it.dietTags as DietTag[], popular: it.popular },
        create: {
          id: it.id,
          name: it.name,
          priceNgn: it.priceNgn,
          dietTags: it.dietTags as DietTag[],
          popular: it.popular,
          restaurantId: restaurant.id,
          categoryId: category.id,
        },
      });
    }
  }

  // ---- sample order (placed) ----
  const orderSeed = await (async () => {
    const r = await prisma.restaurant.findFirst();
    if (!r) return null;
    const item = await prisma.menuItem.findFirst({ where: { restaurantId: r.id } });
    return { r, item };
  })();
  if (orderSeed && orderSeed.item) {
    await prisma.order.upsert({
      where: { ref: 'ORD-FG-DB-0001' },
      update: {},
      create: {
        id: 'ord-db-0001',
        ref: 'ORD-FG-DB-0001',
        customerId: customer.id,
        restaurantId: orderSeed.r.id,
        status: 'placed',
        etaMin: 30,
        deliveryTime: 'ASAP',
        subtotalNgn: orderSeed.item.priceNgn,
        deliveryFee: 0,
        discountNgn: 0,
        totalNgn: orderSeed.item.priceNgn,
        pickup: `${orderSeed.r.name} · ${orderSeed.r.city}`,
        dropoff: '12 Awolowo Rd, Ikeja, Lagos',
        items: {
          create: [{ menuItemId: orderSeed.item.id, qty: 1, priceNgn: orderSeed.item.priceNgn }],
        },
      },
    });
  }

  console.log('[seed] ShadowSpark Cyberfood seeded:');
  console.log('  zones:', zones.length, '· drivers:', drivers.length, '· restaurants:', seedRestaurants.length);
  console.log('  customer:', customer.email, '· sample order: ORD-FG-DB-0001');
  console.log('[seed] Done.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('[seed] Failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
