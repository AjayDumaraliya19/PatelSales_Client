import React from 'react';
import {
  DisposablesHero,
  DisposablesCategoryGrid,
  DisposablesBrandSpotlight,
  DisposablesQuickLinks,
  DisposablesTopProducts,
  DisposablesResources,
} from '../components/disposables/DisposablesSections';
import {
  primaryCategories,
  secondaryCategories,
  quickLinksRow1,
  quickLinksRow2,
} from '../data/disposablesPageData';
import { mockProducts } from '../data/mockData';

export default function DisposablesPage() {
  const topProducts = mockProducts.slice(0, 10);

  return (
    <div className="min-h-full bg-[#f5f5f5]">
      <DisposablesHero />
      <DisposablesCategoryGrid categories={primaryCategories} />
      <DisposablesBrandSpotlight />
      <DisposablesQuickLinks links={quickLinksRow1} />
      <DisposablesCategoryGrid categories={secondaryCategories} />
      <DisposablesQuickLinks links={quickLinksRow2} />
      <DisposablesTopProducts products={topProducts} />
      <DisposablesResources />
    </div>
  );
}
