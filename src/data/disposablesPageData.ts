import { PLACEHOLDER_IMAGE, PLACEHOLDER_BRAND } from './homePageData';

export const disposablesHero = {
  title: 'Disposables',
  subtitle:
    'For Convenience, Durability, and Easy Cleanup — Shop our Disposable Restaurant Supplies.',
  image: PLACEHOLDER_IMAGE,
  imageAlt: 'Disposable food containers, cups, and packaging supplies',
};

export interface DisposablesCategoryCard {
  title: string;
  shopCount: number;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  subLinks: string[];
}

export const primaryCategories: DisposablesCategoryCard[] = [
  {
    title: 'Plastic Disposables',
    shopCount: 12,
    description:
      'Durable plastic cups, containers, cutlery, and dinnerware for restaurants, delis, and catering.',
    image: PLACEHOLDER_IMAGE,
    imageAlt: 'Plastic disposable cups and containers',
    href: '/products?category=plastic',
    subLinks: [
      'Plastic Disposable Plates',
      'Plastic Cups and Lids',
      'Plastic Cutlery',
      'Plastic Trays & Platters',
      'Portion Cups & Lids',
    ],
  },
  {
    title: 'Paperware',
    shopCount: 10,
    description:
      'Paper cups, bowls, bags, and napkins for hot and cold beverages, take-out, and dine-in service.',
    image: PLACEHOLDER_IMAGE,
    imageAlt: 'Paper cups, bags, and napkins',
    href: '/products?category=paper',
    subLinks: [
      'Paper Cups and Lids',
      'Paper Bags',
      'Paper Napkins',
      'Paper Soup Cups',
      'Guest Checks',
    ],
  },
  {
    title: 'Take-Out Containers',
    shopCount: 14,
    description:
      'Leak-resistant containers, clamshells, and boxes for delivery, pickup, and meal prep.',
    image: PLACEHOLDER_IMAGE,
    imageAlt: 'Take-out food containers and clamshells',
    href: '/products?category=takeout',
    subLinks: [
      'Foam Containers',
      'Aluminum Pans & Lids',
      'Deli Containers',
      'Pizza Boxes',
      'Tamper Evident Packaging',
    ],
  },
  {
    title: 'Eco-Friendly Disposables',
    shopCount: 8,
    description:
      'Compostable and biodegradable options for sustainable food service operations.',
    image: PLACEHOLDER_IMAGE,
    imageAlt: 'Eco-friendly compostable packaging',
    href: '/products?category=eco',
    subLinks: [
      'Bagasse Containers',
      'Compostable Cups',
      'Biodegradable Bags',
      'Palm Leaf Plates',
      'PLA Cutlery',
    ],
  },
];

export const brandSpotlight = {
  name: 'Dart',
  logo: PLACEHOLDER_BRAND,
  href: '/products',
  products: [
    { label: 'Foam Cups & Lids', image: PLACEHOLDER_IMAGE },
    { label: 'Insulated Bowls', image: PLACEHOLDER_IMAGE },
    { label: 'Portion Cups', image: PLACEHOLDER_IMAGE },
    { label: 'Carryout Containers', image: PLACEHOLDER_IMAGE },
  ],
};

export const quickLinksRow1 = [
  { label: 'Foam Cups & Lids', image: PLACEHOLDER_IMAGE, href: '/products' },
  { label: 'Tamper Evident Packaging', image: PLACEHOLDER_IMAGE, href: '/products' },
  { label: 'Disposable Gloves', image: PLACEHOLDER_IMAGE, href: '/products' },
  { label: 'Take-Out Bags', image: PLACEHOLDER_IMAGE, href: '/products' },
  { label: 'Food Label Stickers', image: PLACEHOLDER_IMAGE, href: '/products' },
  { label: 'Disposable Chopsticks', image: PLACEHOLDER_IMAGE, href: '/products' },
  { label: 'Guest Checks', image: PLACEHOLDER_IMAGE, href: '/products' },
  { label: 'Scouring Pads', image: PLACEHOLDER_IMAGE, href: '/products' },
];

export const secondaryCategories: DisposablesCategoryCard[] = [
  {
    title: 'Disposable Food Packaging',
    shopCount: 11,
    description: 'Wraps, liners, and packaging for food prep, storage, and transport.',
    image: PLACEHOLDER_IMAGE,
    imageAlt: 'Food packaging supplies',
    href: '/products',
    subLinks: ['Foil Sheets & Rolls', 'Plastic Wrap', 'Butcher Paper', 'Parchment Paper', 'Bakery Boxes'],
  },
  {
    title: 'Catering Disposables',
    shopCount: 9,
    description: 'Bulk supplies for events, buffets, and off-site catering operations.',
    image: PLACEHOLDER_IMAGE,
    imageAlt: 'Catering disposable supplies',
    href: '/products',
    subLinks: ['Chafing Fuel', 'Serving Trays', 'Bulk Napkins', 'Table Covers', 'Sterno Holders'],
  },
  {
    title: 'Disposable Bakery Supplies',
    shopCount: 7,
    description: 'Cake boxes, pastry bags, and bakery packaging for retail and wholesale.',
    image: PLACEHOLDER_IMAGE,
    imageAlt: 'Bakery disposable supplies',
    href: '/products',
    subLinks: ['Cake Circles', 'Cupcake Boxes', 'Pastry Bags', 'Bakery Tissue', 'Window Boxes'],
  },
  {
    title: 'Concession Supplies',
    shopCount: 6,
    description: 'Popcorn bags, nacho trays, and stadium favorites for stands and events.',
    image: PLACEHOLDER_IMAGE,
    imageAlt: 'Concession stand disposables',
    href: '/products',
    subLinks: ['Popcorn Bags', 'Nacho Trays', 'Hot Dog Bags', 'Cotton Candy Cones', 'Soda Cups'],
  },
];

export const quickLinksRow2 = [
  { label: 'Janitorial Disposables', image: PLACEHOLDER_IMAGE, href: '/products' },
  { label: 'Concession Packaging', image: PLACEHOLDER_IMAGE, href: '/products' },
  { label: 'Tabletop Disposables', image: PLACEHOLDER_IMAGE, href: '/products' },
  { label: 'Disposable Party', image: PLACEHOLDER_IMAGE, href: '/products' },
  { label: 'Bakeware & Chef Hats', image: PLACEHOLDER_IMAGE, href: '/products' },
  { label: 'Receipt Paper', image: PLACEHOLDER_IMAGE, href: '/products' },
  { label: 'Restaurant Crayons', image: PLACEHOLDER_IMAGE, href: '/products' },
  { label: 'Foam Dinnerware', image: PLACEHOLDER_IMAGE, href: '/products' },
  { label: 'Plastic Dinnerware', image: PLACEHOLDER_IMAGE, href: '/products' },
];

export const featuredResources = [
  {
    title: 'Disposable Dinnerware Buying Guide',
    image: PLACEHOLDER_IMAGE,
    href: '/products',
  },
  {
    title: 'Types of Disposable Flatware',
    image: PLACEHOLDER_IMAGE,
    href: '/products',
  },
  {
    title: 'Foam vs. Paper Cups Guide',
    image: PLACEHOLDER_IMAGE,
    href: '/products',
  },
];

export const additionalResources = [
  'Can Liner Guide',
  'Receipt Paper Buying Guide',
  'Glove Sizing Chart',
  'Eco-Friendly Packaging FAQ',
  'Bulk Order Checklist',
  'Food Label Requirements',
];

export const seoContent = {
  title: 'Expedite Clean-up and Streamline To-Go Orders with Disposable Restaurant Supplies',
  paragraphs: [
    'Patel Sales carries a full line of wholesale disposable food service supplies for restaurants, delis, bakeries, caterers, and convenience stores across New Jersey and the tri-state area. From foam cups and foil pans to compostable take-out containers and vinyl gloves, we stock the essentials your operation needs every day.',
    'Browse plastic disposables, paperware, take-out containers, and eco-friendly options — all at bulk pricing with same-day pickup available. Whether you run a busy diner, food truck, or hotel kitchen, our disposables help you serve faster and clean up easier.',
    'Order online for delivery or visit our North Brunswick warehouse. Need a custom quote for high-volume orders? Contact our team at (732) 762-7840.',
  ],
};
