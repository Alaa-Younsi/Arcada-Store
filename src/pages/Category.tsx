import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '@/components/seo/SEOHead';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { CategoryFilter } from '@/components/shop/CategoryFilter';
import { useCategoryProducts, useCategory } from '@/hooks/useProducts';
import type { Lang } from '@/types';

export default function Category() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;
  const { products, loading } = useCategoryProducts(slug);
  const { category } = useCategory(slug);
  const [sort, setSort] = useState('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);

  const catName = category
    ? (lang === 'ar' ? category.name_ar : lang === 'fr' ? category.name_fr : category.name_en)
    : slug;
  const catDesc = category
    ? (lang === 'ar' ? (category.description_ar ?? '') : lang === 'fr' ? (category.description_fr ?? '') : (category.description_en ?? ''))
    : '';

  const sorted = [...products]
    .filter((p) => p.base_price >= priceRange[0] && p.base_price <= priceRange[1])
    .sort((a, b) => {
      if (sort === 'price_asc') return a.base_price - b.base_price;
      if (sort === 'price_desc') return b.base_price - a.base_price;
      return 0;
    });

  return (
    <>
      <SEOHead
        title={`${catName} — ARCADA`}
        description={catDesc}
      />

      {/* Category hero */}
      <div className="bg-surface-warm border-b border-border pt-[72px]">
        <div className="max-w-screen-xl mx-auto px-4 py-16 md:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-accent mb-3">
              {t('sections.collection')}
            </p>
            <h1 className="font-display text-dark mb-3" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 400 }}>
              {catName}
            </h1>
            <p className="font-sans text-muted text-sm max-w-xl font-light">{catDesc}</p>
            <p className="font-sans text-stone text-xs mt-3">{sorted.length} produits</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="flex gap-10">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="sticky top-28">
              <CategoryFilter
                categories={[]}
                selected={[]}
                onToggle={() => {}}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                sort={sort}
                onSortChange={setSort}
                maxPrice={50000}
              />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <ProductGrid products={sorted} loading={loading} />
          </div>
        </div>
      </div>
    </>
  );
}


