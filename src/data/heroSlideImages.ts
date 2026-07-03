/**
 * Home page hero slider image paths.
 *
 * Place banner files in: public/images/hero/
 * Backend can return the same relative paths or full CDN URLs.
 */
export const HERO_SLIDER_IMAGE_DIR = '/images/hero';

export const heroSliderImageFiles = {
  slide01BubbleTea: 'slide-01-bubble-tea.png',
  slide02FoamCups: 'slide-02-foam-cups.png',
  slide03EcoPackaging: 'slide-03-eco-packaging.png',
  slide04ConcessionSupplies: 'slide-04-concession-supplies.png',
} as const;

export type HeroSliderImageFile =
  (typeof heroSliderImageFiles)[keyof typeof heroSliderImageFiles];

export function heroSliderImagePath(fileName: HeroSliderImageFile | string) {
  return `${HERO_SLIDER_IMAGE_DIR}/${fileName}`;
}

export const heroSliderImages = {
  bubbleTea: heroSliderImagePath(heroSliderImageFiles.slide01BubbleTea),
  foamCups: heroSliderImagePath(heroSliderImageFiles.slide02FoamCups),
  ecoPackaging: heroSliderImagePath(heroSliderImageFiles.slide03EcoPackaging),
  concessionSupplies: heroSliderImagePath(heroSliderImageFiles.slide04ConcessionSupplies),
} as const;
