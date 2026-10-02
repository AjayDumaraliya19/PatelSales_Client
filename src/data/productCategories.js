import { getCategoryImagePath } from './categoryImages';

export const PRODUCTS_PAGE_PATH = '/products';

/** Single source of truth — 12 disposable product categories */
export const productCategoryDefinitions= [
  { title: 'Portion Cups & Lids', slug: 'portion-cups-and-lids', group: 'main' },
  { title: 'Plastic Containers', slug: 'plastic-containers', group: 'main' },
  { title: 'Paper Napkins & Towels', slug: 'paper-napkins-and-towels', group: 'main' },
  { title: 'Paper Bags', slug: 'paper-bags', group: 'main' },
  { title: 'Microwaveable Containers', slug: 'microwaveable-containers', group: 'main' },
  { title: 'Foam Products', slug: 'foam-products', group: 'main' },
  { title: "Ken's Salad Dressings", slug: 'kens-salad-dressings', group: 'more' },
  { title: 'Foil Products', slug: 'foil-products', group: 'more' },
  { title: 'Foam Containers', slug: 'foam-containers', group: 'more' },
  { title: 'Eco Friendly Products', slug: 'eco-friendly-products', group: 'more' },
  { title: 'Disposable Plastic Cups', slug: 'disposable-plastic-cups', group: 'more' },
  { title: 'Disposable Gloves', slug: 'disposable-gloves', group: 'more' },
];

export const disposablesCatalogLabel = 'Disposables';

export function getCategoryProductHref(slug) {
  return `${PRODUCTS_PAGE_PATH}?category=${slug}`;
}

export const disposablesCategoryNav = {
  label: disposablesCatalogLabel,
  href: PRODUCTS_PAGE_PATH,
  subMenu: {
    main: productCategoryDefinitions
      .filter((category) => category.group === 'main')
      .map((category) => ({
        title: category.title,
        slug: category.slug,
        image: getCategoryImagePath(category.slug),
        href: getCategoryProductHref(category.slug),
      })),
    more: productCategoryDefinitions
      .filter((category) => category.group === 'more')
      .map((category) => ({
        title: category.title,
        slug: category.slug,
        image: getCategoryImagePath(category.slug),
        href: getCategoryProductHref(category.slug),
      })),
  },
};

const catalogTimestamp = '2024-01-01T00:00:00Z';

export function toCatalogCategory(
  category,
  displayOrder,
) {
  return {
    _id: `cat-${category.slug}`,
    name: category.title,
    slug: category.slug,
    image: getCategoryImagePath(category.slug),
    displayOrder,
    isActive: true,
    createdAt: catalogTimestamp,
    updatedAt: catalogTimestamp,
    productCount: 0,
  };
}

export const catalogCategories= productCategoryDefinitions.map((category, index) =>
  toCatalogCategory(category, index + 1),
);

export const featuredCategoryLinks = productCategoryDefinitions.map((category) => ({
  name: category.title,
  image: getCategoryImagePath(category.slug),
  href: getCategoryProductHref(category.slug),
}));
