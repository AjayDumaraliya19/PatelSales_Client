import { heroSliderImages } from './heroSlideImages';
import { featuredCategoryLinks } from './productCategories';
import { popularBrands } from './brandImages';

/** Replace placeholder images with your actual assets */
export const PLACEHOLDER_IMAGE = 'https://placehold.co/600x400/f0f0f0/666666?text=Replace+Image';
export const PLACEHOLDER_ICON = 'https://placehold.co/120x120/e8eef7/003087?text=Icon';
export const PLACEHOLDER_BRAND = 'https://placehold.co/160x60/f5f5f5/999999?text=Brand+Logo';
export const PLACEHOLDER_BANNER = (slide) =>
  `https://placehold.co/960x420/003087/ffffff?text=Banner+Slide+${slide}`;

export const heroSlides = [
  {
    brandLabel: 'Patel Sales',
    title: 'Bubble Tea Essentials',
    subtitle: 'Sip Something Fun',
    description: 'Stock up on cups, lids, syrups & toppings for your bubble tea menu.',
    cta: 'SHOP NOW',
    ctaHref: '/products',
    discountBadge: '10% OFF',
    image: heroSliderImages.bubbleTea,
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
    discountBadge: '20% OFF',
    image: heroSliderImages.foamCups,
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
    discountBadge: '15% OFF',
    image: heroSliderImages.ecoPackaging,
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
    discountBadge: '10% OFF',
    image: heroSliderImages.concessionSupplies,
    imageAlt: 'Concession stand supplies — slide 4',
    panelClass: 'from-[#6b3fa0] to-[#4a2875]',
  },
];

export const promoGridItems = [
  {
    title: '10% Off Sweet Treats',
    description: 'Satisfy Customer Cravings',
    promoCode: 'SWEET10',
    image: '/images/promo-grid/promo-1.png',
    imageAlt: 'Bubble tea drinks and supplies',
    href: '/products',
    badge: '10% OFF',
    badgeColor: 'bg-[#6b3fa0]',
  },
  {
    title: 'Ice Machines',
    description: 'Apply For An Icon',
    promoCode: 'ICEFREE',
    image: '/images/promo-grid/promo-2.png',
    imageAlt: 'Foam cups and containers',
    href: '/products',
    badge: 'SHIPS FREE',
    badgeColor: 'bg-[#003087]',
  },
  {
    title: 'Concession Supplies',
    description: 'Popcorn, nachos & stadium favorites',
    promoCode: 'CONCESS',
    image: '/images/promo-grid/promo-3.png',
    imageAlt: 'Concession stand supplies',
    href: '/products',
    badge: '10% OFF',
    badgeColor: 'bg-[#e8471e]',
  },
  {
    title: 'Disposables Sale',
    description: 'Foam, foil & plastic bulk deals',
    promoCode: 'DISP15',
    image: '/images/promo-grid/promo-4.png',
    imageAlt: 'Eco-friendly disposable supplies',
    href: '/products',
    badge: '15% OFF',
    badgeColor: 'bg-[#003087]',
  },
];

export const actionTiles = [
  {
    title: 'Scratch & Dent',
    bannerEyebrow,
    bannerTitle: 'Scratch & Dent',
    bannerVariant: 'scratch',
    description: 'Shop like-new items for less',
    ctaLabel: 'Shop Outlet',
    href: '/products',
  },
  {
    title: 'Customizable Supplies',
    bannerEyebrow: 'Add Your Logo',
    bannerTitle: 'Customizable Supplies',
    bannerVariant: 'custom',
    description: 'Add your logo and make it personal',
    ctaLabel: 'Customizable Supplies',
    href: '/products',
  },
  {
    title: 'Limited Time Sales',
    bannerEyebrow: 'Limited Time',
    bannerTitle: 'Sales',
    bannerVariant: 'sales',
    description: 'Discover new sales daily',
    ctaLabel: 'Shop Sales',
    href: '/products',
  },
  {
    title: 'Patel Sales Rewards',
    bannerEyebrow,
    bannerTitle: 'Rewards',
    bannerVariant: 'rewards',
    description: 'Earn rewards on every wholesale order at Patel Sales',
    ctaLabel: 'Learn More',
    href: '/products',
  },
];

export const featuredCategories = featuredCategoryLinks;

export { popularBrands };

export const resourceArticles = [
  {
    title: 'How to Choose the Right Foam Cups',
    image: '/images/resources/resource-1.png',
    imageAlt: 'Guide to foam cups for restaurants',
    href: '/products',
  },
  {
    title: 'Eco-Friendly Packaging Guide',
    image: '/images/resources/resource-2.png',
    imageAlt: 'Sustainable packaging guide',
    href: '/products',
  },
  {
    title: 'Bulk Ordering Tips for Restaurants',
    image: '/images/resources/resource-3.png',
    imageAlt: 'Bulk ordering tips for food service',
    href: '/products',
  },
];

export const featuredSpotlight = {
  title: 'Concession Supplies',
  description: 'Popcorn, nachos, hot dogs & more for your stand or event.',
  cta: 'SHOP NOW',
  href: '/products',
  image: heroSliderImages.concessionSupplies,
  imageAlt: 'Concession stand supplies',
};
