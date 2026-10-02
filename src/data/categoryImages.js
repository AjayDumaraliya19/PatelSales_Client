/**
 * Featured category images for home page + catalog.
 *
 * Place files in: public/images/categories/
 * File name must match slug (see categories.manifest.json).
 */
export const CATEGORY_IMAGE_DIR = '/images/categories';

export const categoryImageFiles = {
  'portion-cups-and-lids': 'portion-cups-and-lids.png',
  'plastic-containers': 'plastic-containers.png',
  'paper-napkins-and-towels': 'paper-napkins-and-towels.png',
  'paper-bags': 'paper-bags.png',
  'microwaveable-containers': 'microwaveable-containers.png',
  'foam-products': 'foam-products.png',
  'kens-salad-dressings': 'kens-salad-dressings.png',
  'foil-products': 'foil-products.png',
  'foam-containers': 'foam-containers.png',
  'eco-friendly-products': 'eco-friendly-products.png',
  'disposable-plastic-cups': 'disposable-plastic-cups.png',
  'disposable-gloves': 'disposable-gloves.png',
};

export function getCategoryImagePath(slug) {
  const fileName = categoryImageFiles[slug];
  if (!fileName) return null;
  return `${CATEGORY_IMAGE_DIR}/${fileName}`;
}
