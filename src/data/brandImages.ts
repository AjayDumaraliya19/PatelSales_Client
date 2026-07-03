/**
 * Popular brand logos for home page.
 *
 * Place files in: public/images/brands/
 * See brands.manifest.json for file names.
 */
export const BRAND_IMAGE_DIR = '/images/brands';

export const PLACEHOLDER_BRAND_LOGO =
  'https://placehold.co/240x120/f4f4f4/999999?text=Brand';

export const popularBrandDefinitions = [
  { name: 'Rubbermaid Commercial Products', slug: 'rubbermaid', fileName: 'rubbermaid.png' },
  { name: 'Edlund', slug: 'edlund', fileName: 'edlund.png' },
  { name: 'San Jamar', slug: 'san-jamar', fileName: 'san-jamar.png' },
  { name: 'Vollrath', slug: 'vollrath', fileName: 'vollrath.png' },
  { name: 'Mercer Culinary', slug: 'mercer-culinary', fileName: 'mercer-culinary.png' },
  { name: 'Cambro', slug: 'cambro', fileName: 'cambro.png' },
  { name: 'Carlisle', slug: 'carlisle', fileName: 'carlisle.png' },
  { name: 'Amana Commercial', slug: 'amana', fileName: 'amana.png' },
  { name: 'True', slug: 'true', fileName: 'true.png' },
] as const;

export type PopularBrandSlug = (typeof popularBrandDefinitions)[number]['slug'];

export function getBrandImagePath(slug: string) {
  const brand = popularBrandDefinitions.find((item) => item.slug === slug);
  return brand ? `${BRAND_IMAGE_DIR}/${brand.fileName}` : PLACEHOLDER_BRAND_LOGO;
}

export const popularBrands = popularBrandDefinitions.map((brand) => ({
  name: brand.name,
  slug: brand.slug,
  logo: getBrandImagePath(brand.slug),
  href: '/products',
}));
