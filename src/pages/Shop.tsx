import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SlidersHorizontal, X } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { useProducts, useCategories } from '@/hooks/useProducts';
import type { Lang } from '@/types';

const ITEMS_PER_PAGE = 20;

export default function Shop() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;
  const [activeTab, setActiveTab] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [sortOpen, setSortOpen] = useState(false);

  const { categories } = useCategories();
  const { products, total, loading } = useProducts({ category: activeTab || undefined, sort, page, limit: ITEMS_PER_PAGE });

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const getCatLabel = (cat: { name_en: string; name_fr: string; name_ar: string }) => {
    const raw = lang === 'fr' ? cat.name_fr : lang === 'ar' ? cat.name_ar : cat.name_en;
    return raw.replace(/\s*collection\s*/gi, '').trim();
  };

  return (
    <>
      <SEOHead
        title="Collections — ARCADA"
        description="Parcourez toutes les collections ARCADA. Carrelage sol, revêtement mural, grandes dalles et plus."
      />

      {/* Page hero */}
      <div className="pt-[120px] pb-10 bg-bg border-b border-border">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent mb-4">ARCADA</p>
            <h1
              className="font-display text-dark font-light"
              style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}
            >
              {t('common.allProducts')}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Filter tabs — not sticky */}
      <div className="bg-bg border-b border-border">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16 flex items-center gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-none flex-1">
            {[{ slug: '', name_en: 'All', name_fr: 'Tous', name_ar: 'الكل' }, ...categories].map((tab) => (
              <button
                key={tab.slug}
                onClick={() => { setActiveTab(tab.slug); setPage(1); }}
                className={`relative flex-shrink-0 font-sans text-[11px] uppercase tracking-[0.2em] px-5 py-4 transition-colors duration-200 ${
                  activeTab === tab.slug
                    ? 'text-dark'
                    : 'text-muted hover:text-dark'
                }`}
              >
                {getCatLabel(tab)}
                {activeTab === tab.slug && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-dark"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count + sort row */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16 py-6 flex items-center justify-between">
        <p className="font-sans text-xs text-muted tracking-wide">
          {total} {total === 1 ? 'product' : 'products'}
        </p>

        {/* Sort */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] text-muted hover:text-dark transition-colors py-1"
          >
            <SlidersHorizontal size={12} strokeWidth={1.5} />
            {t('common.sort')}
            {sortOpen && <X size={12} strokeWidth={1.5} />}
          </button>

          <AnimatePresence>
            {sortOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-1 bg-white border border-border shadow-lg min-w-[180px] z-50 rounded-xl"
              >
                {[
                  { value: 'newest', label: t('common.newest') },
                  { value: 'price_asc', label: t('common.priceAsc') },
                  { value: 'price_desc', label: t('common.priceDesc') },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSort(opt.value); setSortOpen(false); }}
                    className={`w-full text-left px-5 py-3 font-sans text-xs transition-colors ${
                      sort === opt.value
                        ? 'text-dark bg-surface-warm'
                        : 'text-muted hover:text-dark hover:bg-surface-warm'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Product grid — large, portrait ratio */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16 pb-24">
        <ProductGrid products={products} loading={loading} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-20">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 font-sans text-sm transition-colors border ${
                  page === i + 1
                    ? 'bg-dark text-white border-dark'
                    : 'border-border text-muted hover:border-accent hover:text-accent'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
