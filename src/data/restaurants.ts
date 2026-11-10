import type { DietTag, MenuItem, Restaurant } from '@/types';

function cat(id: string, name: string, restaurantId: string) {
  return { id, name, restaurantId };
}

function item(
  id: string,
  restaurantId: string,
  categoryId: string,
  name: string,
  description: string,
  priceNgn: number,
  dietTags: DietTag[],
  monogram: string,
  tint: string,
  popular = false,
): MenuItem {
  return { id, restaurantId, categoryId, name, description, priceNgn, dietTags, monogram, tint, popular };
}

export const restaurants: Restaurant[] = [
  {
    id: 'rest-iyabasira',
    slug: 'iya-basira-kitchen',
    name: 'Iya Basira Kitchen',
    tagline: 'Hometown taste, plated like home',
    description: 'Banku-free, oven-and-coal style Nigerian home cooking with a modern kitchen edge. Jollof, ofada and slow-cooked soups straight from Yaba.',
    cuisine: ['Nigerian', 'Home cooking'],
    city: 'Lagos',
    zones: ['lagos-mainland'],
    rating: 4.8,
    reviewCount: 1210,
    deliveryTimeMin: 28,
    minOrderNgn: 2500,
    deliveryFeeNgn: 500,
    featured: true,
    monogram: 'IB',
    tint: '#00f5d4',
    acceptsDietTags: ['vegetarian', 'gluten-free'],
    categories: [
      cat('c-ib-rice', 'Rice & Mains', 'rest-iyabasira'),
      cat('c-ib-sides', 'Sides & Small Chops', 'rest-iyabasira'),
    ],
  },
  {
    id: 'rest-chickenrepublic',
    slug: 'chicken-republic-ph',
    name: 'Chicken Republic PH',
    tagline: 'Crunchy chicken, Port Harcourt style',
    description: 'Real Port Harcourt fast-food energy: golden peppered wings, spice-rubbed fries and cold zobo.',
    cuisine: ['Fast food', 'Nigerian'],
    city: 'Port Harcourt',
    zones: ['port-harcourt'],
    rating: 4.4,
    reviewCount: 760,
    deliveryTimeMin: 25,
    minOrderNgn: 1500,
    deliveryFeeNgn: 400,
    featured: true,
    monogram: 'CR',
    tint: '#f72585',
    acceptsDietTags: [],
    categories: [
      cat('c-cr-chicken', 'Chicken & Wings', 'rest-chickenrepublic'),
      cat('c-cr-sides', 'Sides & Drinks', 'rest-chickenrepublic'),
    ],
  },
  {
    id: 'rest-freshco',
    slug: 'freshco-grocery',
    name: 'FreshCo Grocery',
    tagline: 'Farm-fresh produce, delivered chilled',
    description: 'Refrigerated delivery of fruits, vegetables, pantry staples and chilled staples across the mainland.',
    cuisine: ['Grocery'],
    city: 'Lagos',
    zones: ['lagos-mainland', 'lagos-island'],
    rating: 4.6,
    reviewCount: 930,
    deliveryTimeMin: 35,
    minOrderNgn: 4000,
    deliveryFeeNgn: 600,
    featured: true,
    monogram: 'F',
    tint: '#8b5cf6',
    acceptsDietTags: ['vegetarian', 'gluten-free'],
    categories: [
      cat('c-fc-produce', 'Fresh Produce', 'rest-freshco'),
      cat('c-fc-pantry', 'Pantry & Staples', 'rest-freshco'),
    ],
  },
  {
    id: 'rest-suyaspot',
    slug: 'suya-spot-54',
    name: 'Suya Spot 54',
    tagline: 'Peppered to order, never plastic',
    description: "Wuse's favourite roadside suya now at your door. Beef, chicken and smoky yaji grilled while you watch.",
    cuisine: ['Grill', 'Street food'],
    city: 'Abuja',
    zones: ['abuja'],
    rating: 4.7,
    reviewCount: 640,
    deliveryTimeMin: 22,
    minOrderNgn: 1800,
    deliveryFeeNgn: 450,
    featured: true,
    monogram: 'S',
    tint: '#ffb703',
    acceptsDietTags: ['halal'],
    categories: [
      cat('c-ss-suya', 'Suya & Grill', 'rest-suyaspot'),
      cat('c-ss-sides', 'Sides & Sauces', 'rest-suyaspot'),
    ],
  },
  {
    id: 'rest-mamaput',
    slug: 'mama-put-and-grill',
    name: 'Mama Put & Grill',
    tagline: 'Small chops, big flavours',
    description: 'Mama Put favourites: ofada, plantain chips, peppered gizzard and asun — served fast on the mainland.',
    cuisine: ['Nigerian', 'Grill'],
    city: 'Lagos',
    zones: ['lagos-mainland'],
    rating: 4.5,
    reviewCount: 1180,
    deliveryTimeMin: 30,
    minOrderNgn: 2000,
    deliveryFeeNgn: 450,
    monogram: 'MP',
    tint: '#e63946',
    acceptsDietTags: ['gluten-free'],
    categories: [
      cat('c-mp-grill', 'Asun & Gizzard', 'rest-mamaput'),
      cat('c-mp-chops', 'Small Chops', 'rest-mamaput'),
    ],
  },
  {
    id: 'rest-islandbites',
    slug: 'island-bites',
    name: 'Island Bites',
    tagline: 'Lekki lunch, upgraded',
    description: 'Light, modern Island fare — grilled fish, fresh salads and chewy bagels for the Lekki/VI crowd.',
    cuisine: ['Seafood', 'Café'],
    city: 'Lagos',
    zones: ['lagos-island'],
    rating: 4.3,
    reviewCount: 510,
    deliveryTimeMin: 32,
    minOrderNgn: 3000,
    deliveryFeeNgn: 550,
    monogram: 'IBg',
    tint: '#06d6a0',
    acceptsDietTags: ['vegetarian', 'gluten-free', 'halal'],
    categories: [
      cat('c-ib-seafood', 'Seafood', 'rest-islandbites'),
      cat('c-ib-cafe', 'Bagels & Salads', 'rest-islandbites'),
    ],
  },
  {
    id: 'rest-kanofries',
    slug: 'kano-fries',
    name: 'Kano Fries',
    tagline: 'Golden, spiced, dangerously crisp',
    description: 'Suya-spiced fries, loaded chips and kebab rolls from maker-shop startup culture in Kano.',
    cuisine: ['Snacks', 'Fast food'],
    city: 'Kano',
    zones: ['abuja'],
    rating: 4.2,
    reviewCount: 380,
    deliveryTimeMin: 20,
    minOrderNgn: 1200,
    deliveryFeeNgn: 350,
    monogram: 'KF',
    tint: '#f4a261',
    acceptsDietTags: ['vegetarian', 'halal'],
    categories: [
      cat('c-kf-fries', 'Fries & Loaded', 'rest-kanofries'),
      cat('c-kf-kebab', 'Kebab & Rolls', 'rest-kanofries'),
    ],
  },
  {
    id: 'rest-naijaeats',
    slug: 'naija-eats',
    name: 'Naija Eats',
    tagline: 'Every corner, one order',
    description: "A pan-Nigerian pantry: from Lagos jollof to Abuja pepper soup, with national delivery zones.",
    cuisine: ['Nigerian', 'Variety'],
    city: 'Abuja',
    zones: ['abuja', 'lagos-island', 'lagos-mainland'],
    rating: 4.6,
    reviewCount: 1560,
    deliveryTimeMin: 30,
    minOrderNgn: 2200,
    deliveryFeeNgn: 500,
    featured: true,
    monogram: 'NE',
    tint: '#a855f7',
    acceptsDietTags: ['halal', 'vegetarian', 'gluten-free'],
    categories: [
      cat('c-ne-classics', 'Naija Classics', 'rest-naijaeats'),
      cat('c-ne-soups', 'Soups & Swallow', 'rest-naijaeats'),
    ],
  },
];

// ---- menu items (45+ across all restaurants) ----

export const menuItems: MenuItem[] = [
  // Iya Basira Kitchen
  item('mi-ib-jollof', 'rest-iyabasira', 'c-ib-rice', 'Party Jollof Rice', 'Smoky party jollof with grilled chicken and diced vegetables.', 2800, ['gluten-free'], 'JF', '#ffb703', true),
  item('mi-ib-ofada', 'rest-iyabasira', 'c-ib-rice', 'Ofada Rice + Ayamase', 'Local ofada rice with peppery ayamase (green pepper) stew and assorted.', 3500, ['gluten-free'], 'OF', '#e63946', true),
  item('mi-ib-fried-rice', 'rest-iyabasira', 'c-ib-rice', 'Nigerian Fried Rice', 'Long-grain fried rice with liver, peas, carrots and sweet corn.', 2600, [], 'FR', '#f4a261'),
  item('mi-ib-pounded', 'rest-iyabasira', 'c-ib-rice', 'Pounded Yam + Egusi', 'Soft pounded yam with melon-seed egusi soup and assorted meat.', 3200, ['gluten-free'], 'PY', '#8b5cf6'),
  item('mi-ib-vegetable', 'rest-iyabasira', 'c-ib-sides', 'Steamed Vegetable Bowl', 'Lightly fried cabbage, carrot, green beans with grilled plantain.', 1800, ['vegetarian', 'gluten-free'], 'VG', '#06d6a0'),
  item('mi-ib-plantain', 'rest-iyabasira', 'c-ib-sides', 'Peppered Plantain', 'Soft ripe plantain tossed in a mild pepper glaze.', 1200, ['vegetarian', 'gluten-free'], 'PL', '#ffb703'),

  // Chicken Republic PH
  item('mi-cr-wings', 'rest-chickenrepublic', 'c-cr-chicken', 'Peppered Wings (6pc)', 'Six flame-grilled wings in a fiery PH pepper coat.', 2400, [], 'WN', '#f72585', true),
  item('mi-cr-bbq-chicken', 'rest-chickenrepublic', 'c-cr-chicken', 'BBQ Half Chicken', 'Half chicken slow-basted in smoky BBQ before the grill.', 2900, ['halal'], 'BB', '#e63946'),
  item('mi-cr-spicy-tender', 'rest-chickenrepublic', 'c-cr-chicken', 'Spicy Chicken Tenders', 'Golden-crumbed tenders dusted in cayenne.', 2100, [], 'TD', '#f4a261'),
  item('mi-cr-fries', 'rest-chickenrepublic', 'c-cr-sides', 'Salt & Pepper Fries', 'Crisp fries finished with sea salt and cracked pepper.', 900, ['vegetarian'], 'FR', '#ffb703', true),
  item('mi-cr-zobo', 'rest-chickenrepublic', 'c-cr-sides', 'Chilled Zobo', 'Hibiscus cooler sweetened with pineapple and ginger.', 700, ['vegetarian', 'gluten-free'], 'ZB', '#a855f7'),

  // FreshCo Grocery
  item('mi-fc-fruitbox', 'rest-freshco', 'c-fc-produce', 'Weekly Fruit Box', 'Six mixed seasonal fruits selected for peak ripeness.', 8500, ['vegetarian', 'gluten-free'], 'FB', '#06d6a0', true),
  item('mi-fc-vegbox', 'rest-freshco', 'c-fc-produce', 'F&V Veggie Box', 'Daily greens — spinach, lettuce, carrots and peppers.', 6200, ['vegetarian', 'gluten-free'], 'VB', '#2dc653'),
  item('mi-fc-ugwu', 'rest-freshco', 'c-fc-produce', 'Bunch of Ugu', 'Fresh fluted pumpkin leaves, farm-picked.', 800, ['vegetarian', 'gluten-free'], 'UG', '#2dc653'),
  item('mi-fc-garri', 'rest-freshco', 'c-fc-pantry', '2kg Garri (Ieba)', 'Extra-fine yellow garri, 50kg-sack quality repacked at 2kg.', 2600, ['vegetarian', 'gluten-free'], 'GR', '#f4a261'),
  item('mi-fc-rice-bag', 'rest-freshco', 'c-fc-pantry', '10kg Parboiled Rice', 'Long-grain Nigerian parboiled rice in a sealed bag.', 13500, ['vegetarian', 'gluten-free'], 'RC', '#ffb703'),
  item('mi-fc-palm-oil', 'rest-freshco', 'c-fc-pantry', '5L Red Palm Oil', 'Unrefined deep-red palm oil, single origin.', 7200, ['vegetarian', 'gluten-free'], 'PO', '#e63946'),

  // Suya Spot 54
  item('mi-ss-beef', 'rest-suyaspot', 'c-ss-suya', 'Beef Suya (large)', 'Smoke-grilled beef skewers rolled in yaji pepper.', 2200, ['halal'], 'BS', '#ffb703', true),
  item('mi-ss-chicken', 'rest-suyaspot', 'c-ss-suya', 'Chicken Suya', 'Succulent chicken thighs char-grilled with suya spice.', 2400, ['halal'], 'CS', '#f4a261'),
  item('mi-ss-kilishi', 'rest-suyaspot', 'c-ss-suya', 'Kilishi (spiced biltong)', 'Dried, spice-cured oven beef strips.', 1800, ['halal'], 'KL', '#e63946'),
  item('mi-ss-onion', 'rest-suyaspot', 'c-ss-sides', 'Sliced Onions + Pepper', 'Fresh onion rings and tomato with extra yaji on the side.', 500, ['vegetarian', 'halal'], 'ON', '#8b5cf6'),
  item('mi-ss-mixed-grill', 'rest-suyaspot', 'c-ss-sides', 'Mixed Grill Platter', 'Beef, chicken and kilishi on one smoky platter.', 4200, ['halal'], 'MX', '#a855f7'),

  // Mama Put & Grill
  item('mi-mp-asun', 'rest-mamaput', 'c-mp-grill', 'Mama Asun (peppered goat)', 'Grilled goat offcuts flash-fried in pepper and tumeric.', 3000, ['gluten-free'], 'AS', '#e63946', true),
  item('mi-mp-gizzard', 'rest-mamaput', 'c-mp-grill', 'Peppered Gizzard', 'Char-grilled gizzard tossed in hot peri-peri sauce.', 1600, ['gluten-free'], 'GZ', '#f72585'),
  item('mi-mp-fu-fu', 'rest-mamaput', 'c-mp-grill', 'Eba + Okro (small)', 'Garri eba with slimy double-cooked okro soup.', 1800, ['vegetarian', 'gluten-free'], 'EB', '#f4a261'),
  item('mi-mp-softdrink', 'rest-mamaput', 'c-mp-chops', 'Small Chops Mix', 'Six pieces — puff-puff, samosa and spring roll.', 1200, [], 'SC', '#06d6a0', true),
  item('mi-mp-puffpuff', 'rest-mamaput', 'c-mp-chops', 'Puff-Puff (dozen)', 'Sweet fried dough balls dusted with sugar.', 1000, ['vegetarian'], 'PP', '#ffb703'),

  // Island Bites
  item('mi-ibpanel-grilled', 'rest-islandbites', 'c-ib-seafood', 'Grilled Whole Croaker', 'Grilled croaker with lime butter and a side of fried plantain.', 6500, ['gluten-free', 'halal'], 'GC', '#06d6a0', true),
  item('mi-ibpanel-prawns', 'rest-islandbites', 'c-ib-seafood', 'Garlic Butter Prawns', 'King prawns sautéed in garlic butter and parsley.', 7200, ['gluten-free'], 'GP', '#f72585'),
  item('mi-ibpanel-peppersoup', 'rest-islandbites', 'c-ib-seafood', 'Catfish Pepper Soup', 'Spicy catfish broth with scent leaf and uziza.', 3800, ['gluten-free', 'halal'], 'PS', '#e63946'),
  item('mi-ibpanel-bagel', 'rest-islandbites', 'c-ib-cafe', 'Everything Bagel', 'Crisp bagel with cream cheese, tomato and rocket.', 1900, ['vegetarian'], 'BG', '#8b5cf6'),
  item('mi-ibpanel-greens', 'rest-islandbites', 'c-ib-cafe', 'Fresh Garden Salads', 'Mixed greens, avocado, cherry tomatoes and honey-lime dressing.', 2400, ['vegetarian', 'gluten-free'], 'SL', '#2dc653'),

  // Kano Fries
  item('mi-kf-suya-fries', 'rest-kanofries', 'c-kf-fries', 'Suyaspice Loaded Fries', 'Crisp fries doused in suya spice and kewpie mayo.', 1600, ['vegetarian'], 'SF', '#f4a261', true),
  item('mi-kf-cheese-fries', 'rest-kanofries', 'c-kf-fries', 'Cheese Fries', 'Fries blanketed in melted cheese sauce.', 1400, ['vegetarian'], 'CF', '#ffb703'),
  item('mi-kf-sweet-plantain', 'rest-kanofries', 'c-kf-fries', 'Sweet Plantain Fries', 'Golden fried plantain strips with honey glaze.', 1100, ['vegetarian', 'gluten-free'], 'PF', '#06d6a0'),
  item('mi-kf-kebab', 'rest-kanofries', 'c-kf-kebab', 'Beef Kebab Roll', 'Beef kebab wrapped with fries and sauce.', 1800, ['halal'], 'KR', '#a855f7'),
  item('mi-kf-roll', 'rest-kanofries', 'c-kf-kebab', 'Shawarma Roll', 'Chicken shawarma with garlic sauce and fries inside.', 1700, ['halal'], 'SR', '#e63946', true),

  // Naija Eats
  item('mi-ne-jollof', 'rest-naijaeats', 'c-ne-classics', 'Smoky Jollof + Dodo', 'Export-grade party jollof with caramelised dodo.', 2600, ['vegetarian', 'gluten-free'], 'JO', '#ffb703', true),
  item('mi-ne-amala', 'rest-naijaeats', 'c-ne-classics', 'Amala + Gbegiri', 'Yam flour amala with bean soup and ewedu.', 2400, ['vegetarian', 'gluten-free'], 'AM', '#f4a261'),
  item('mi-ne-eagle', 'rest-naijaeats', 'c-ne-soups', 'Pepper Soup (Goat)', 'Light, fiery goat pepper soup with utazi.', 3000, ['gluten-free', 'halal'], 'GO', '#e63946'),
  item('mi-ne-okra', 'rest-naijaeats', 'c-ne-soups', 'Okra Soup + Swallow', 'Veggetable okra soup served with eba or semo.', 2800, ['vegetarian', 'gluten-free'], 'OK', '#2dc653'),
  item('mi-ne-whitejollof', 'rest-naijaeats', 'c-ne-soups', 'White Rice + Tomato Stew', 'Steamed white rice with rich tomato stew and protein.', 2200, ['gluten-free', 'halal'], 'WR', '#06d6a0'),
];

export const getMenuItems = (restaurantId: string): MenuItem[] =>
  menuItems.filter((i) => i.restaurantId === restaurantId);

export const getRestaurantBySlug = (slug: string): Restaurant | undefined =>
  restaurants.find((r) => r.slug === slug);

export const getRestaurantById = (id: string): Restaurant | undefined =>
  restaurants.find((r) => r.id === id);

export const getMenuItemById = (id: string): MenuItem | undefined =>
  menuItems.find((i) => i.id === id);

export type { DietTag, MenuItem, Restaurant };
