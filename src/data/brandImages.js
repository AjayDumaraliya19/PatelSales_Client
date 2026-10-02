/**
 * Popular brand logos for home page.
 *
 * Place files in: public/images/brands/
 * See brands.manifest.json for file names.
 */
export const BRAND_IMAGE_DIR = '/images/brands';

export const PLACEHOLDER_BRAND_LOGO = 'https://placehold.co/240x120/f4f4f4/999999?text=Brand';

export const popularBrandDefinitions = [
  { name: 'Moniz', slug: 'brand-1', fileName: 'brand-1.png' },
  { name: 'Duro', slug: 'brand-2', fileName: 'brand-2.png' },
  { name: 'Kraft', slug: 'brand-3', fileName: 'brand-3.png' },
  { name: 'Solo Foodservice', slug: 'brand-4', fileName: 'brand-4.png' },
  { name: 'Newspring Packaging', slug: 'brand-5', fileName: 'brand-5.png' },
  { name: 'Fabri-Kal', slug: 'brand-6', fileName: 'brand-6.png' },
  { name: 'Vollrath', slug: 'brand-7', fileName: 'brand-7.png' },
  { name: 'Cambro', slug: 'brand-8', fileName: 'brand-8.png' },
];
export const getBrandImagePath = (slug) => {
  const brand = popularBrandDefinitions.find(b => b.slug === slug);
  return brand ? `${BRAND_IMAGE_DIR}/${brand.fileName}` : PLACEHOLDER_BRAND_LOGO;
};

export const popularBrands = popularBrandDefinitions.map((brand) => ({
  name: brand.name,
  slug: brand.slug,
  logo: getBrandImagePath(brand.slug),
  href: '/products',
}));
