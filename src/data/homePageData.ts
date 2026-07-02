/** Replace placeholder images with your actual assets */
export const PLACEHOLDER_IMAGE = 'https://placehold.co/600x400/f0f0f0/666666?text=Replace+Image';
export const PLACEHOLDER_ICON = 'https://placehold.co/120x120/e8eef7/003087?text=Icon';
export const PLACEHOLDER_BRAND = 'https://placehold.co/160x60/f5f5f5/999999?text=Brand+Logo';
export const PLACEHOLDER_BANNER = (slide: number) =>
  `https://placehold.co/960x420/003087/ffffff?text=Banner+Slide+${slide}`;

export const heroSlides = [
  {
    brandLabel: 'Patel Sales',
    title: 'Bubble Tea Essentials',
    subtitle: 'Sip Something Fun',
    description: 'Stock up on cups, lids, syrups & toppings for your bubble tea menu.',
    cta: 'SHOP NOW',
    ctaHref: '/products',
    couponCode: 'POPJOY',
    discountBadge: '10% OFF',
    image: PLACEHOLDER_BANNER(1),
    imageAlt: 'Bubble tea drinks and supplies — slide 1',
    panelClass: 'from-[#e8471e] to-[#c73a17]',
  },
  {
    brandLabel: 'Patel Sales',
    title: 'Foam Cups & Containers',
    subtitle: 'Wholesale Bulk Pricing',
    description: 'Premium quality foam cups at wholesale prices for restaurants, cafes & delis.',
    cta: 'SHOP NOW',
    ctaHref: '/products',
    couponCode: 'FOAM20',
    discountBadge: '20% OFF',
    image: PLACEHOLDER_BANNER(2),
    imageAlt: 'Foam cups and containers — slide 2',
    panelClass: 'from-[#003087] to-[#0040a0]',
  },
  {
    brandLabel: 'Patel Sales',
    title: 'Eco-Friendly Packaging',
    subtitle: 'Go Green Today',
    description: 'Compostable containers, biodegradable bags & sustainable supplies for your business.',
    cta: 'SHOP NOW',
    ctaHref: '/products',
    couponCode: 'ECO15',
    discountBadge: '15% OFF',
    image: PLACEHOLDER_BANNER(3),
    imageAlt: 'Eco-friendly food packaging — slide 3',
    panelClass: 'from-[#2d6a4f] to-[#1b4332]',
  },
  {
    brandLabel: 'Patel Sales',
    title: 'Concession Supplies',
    subtitle: 'Event Ready Stock',
    description: 'Popcorn bags, nacho trays, cups & stadium favorites for your stand or event.',
    cta: 'SHOP NOW',
    ctaHref: '/products',
    couponCode: 'CONCESS',
    discountBadge: '10% OFF',
    image: PLACEHOLDER_BANNER(4),
    imageAlt: 'Concession stand supplies — slide 4',
    panelClass: 'from-[#6b3fa0] to-[#4a2875]',
  },
];

export const promoGridItems = [
  {
    title: '10% Off Sweet Treats',
    description: 'Satisfy Customer Cravings',
    promoCode: 'SWEET10',
    image: PLACEHOLDER_IMAGE,
    imageAlt: 'Sweet treats packaging supplies',
    href: '/products',
    badge: '10% OFF',
    badgeColor: 'bg-[#6b3fa0]',
  },
  {
    title: 'Ice Machines',
    description: 'Apply For An Icon',
    promoCode: 'ICEFREE',
    image: PLACEHOLDER_IMAGE,
    imageAlt: 'Commercial ice machine',
    href: '/products',
    badge: 'SHIPS FREE',
    badgeColor: 'bg-[#003087]',
  },
  {
    title: 'Concession Supplies',
    description: 'Popcorn, nachos & stadium favorites',
    promoCode: 'CONCESS',
    image: PLACEHOLDER_IMAGE,
    imageAlt: 'Concession stand supplies',
    href: '/products',
    badge: '10% OFF',
    badgeColor: 'bg-[#e8471e]',
  },
  {
    title: 'Disposables Sale',
    description: 'Foam, foil & plastic bulk deals',
    promoCode: 'DISP15',
    image: PLACEHOLDER_IMAGE,
    imageAlt: 'Disposable food service supplies',
    href: '/products',
    badge: '15% OFF',
    badgeColor: 'bg-[#003087]',
  },
];

export const actionTiles = [
  {
    title: 'Scratch & Dent',
    subtitle: 'Shop Now',
    href: '/products',
    bgColor: 'bg-[#4a4a4a]',
    icon: 'TagIcon',
  },
  {
    title: 'Customizable Supplies',
    subtitle: 'Learn More',
    href: '/products',
    bgColor: 'bg-[#6b3fa0]',
    icon: 'PaintBrushIcon',
  },
  {
    title: 'Limited Time Sales',
    subtitle: 'Shop Now',
    href: '/products',
    bgColor: 'bg-[#f5a623]',
    icon: 'BoltIcon',
  },
  {
    title: 'Patel Sales Rewards',
    subtitle: 'Learn More',
    href: '/products',
    bgColor: 'bg-[#003087]',
    icon: 'GiftIcon',
  },
];

export const featuredCategories = [
  { name: 'Disposables', image: PLACEHOLDER_ICON, href: '/disposables' },
  { name: 'Restaurant Equipment', image: PLACEHOLDER_ICON, href: '/products' },
  { name: 'Refrigeration', image: PLACEHOLDER_ICON, href: '/products' },
  { name: 'Smallwares', image: PLACEHOLDER_ICON, href: '/products' },
  { name: 'Food & Beverage', image: PLACEHOLDER_ICON, href: '/products' },
  { name: 'Tabletop', image: PLACEHOLDER_ICON, href: '/products' },
  { name: 'Furniture', image: PLACEHOLDER_ICON, href: '/products' },
  { name: 'Storage & Transport', image: PLACEHOLDER_ICON, href: '/products' },
  { name: 'Janitorial', image: PLACEHOLDER_ICON, href: '/products' },
  { name: 'Industrial', image: PLACEHOLDER_ICON, href: '/products' },
  { name: 'Foam Products', image: PLACEHOLDER_ICON, href: '/products' },
  { name: 'Uncategorized', image: PLACEHOLDER_ICON, href: '/products' },
];

export const popularBrands = [
  { name: 'Dart', logo: PLACEHOLDER_BRAND },
  { name: 'Rubbermaid', logo: PLACEHOLDER_BRAND },
  { name: 'Vollrath', logo: PLACEHOLDER_BRAND },
  { name: 'Cambro', logo: PLACEHOLDER_BRAND },
  { name: 'Edlund', logo: PLACEHOLDER_BRAND },
  { name: 'Winco', logo: PLACEHOLDER_BRAND },
  { name: 'Tablecraft', logo: PLACEHOLDER_BRAND },
  { name: 'San Jamar', logo: PLACEHOLDER_BRAND },
  { name: 'Carlisle', logo: PLACEHOLDER_BRAND },
  { name: 'Continental', logo: PLACEHOLDER_BRAND },
];

export const resourceArticles = [
  {
    title: 'How to Choose the Right Foam Cups',
    image: PLACEHOLDER_IMAGE,
    imageAlt: 'Guide to foam cups for restaurants',
    href: '/products',
  },
  {
    title: 'Eco-Friendly Packaging Guide',
    image: PLACEHOLDER_IMAGE,
    imageAlt: 'Sustainable packaging guide',
    href: '/products',
  },
  {
    title: 'Bulk Ordering Tips for Restaurants',
    image: PLACEHOLDER_IMAGE,
    imageAlt: 'Bulk ordering tips for food service',
    href: '/products',
  },
];

export const featuredSpotlight = {
  title: 'Concession Supplies',
  description: 'Popcorn, nachos, hot dogs & more for your stand or event.',
  cta: 'SHOP NOW',
  href: '/products',
  image: PLACEHOLDER_IMAGE,
  imageAlt: 'Concession stand supplies illustration',
};
