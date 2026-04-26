import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SlidersHorizontal, X } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { useProducts } from '@/hooks/useProducts';

const TABS = [
  { id: '', label_fr: 'Tous', label_en: 'All', label_ar: 'الكل' },
  { id: 'carrelage-sol', label_fr: 'Carrelage Sol', label_en: 'Floor Tiles', label_ar: 'بلاط الأرضية' },
  { id: 'revetement-mural', label_fr: 'Revêtement Mural', label_en: 'Wall Cladding', label_ar: 'تكسية الجدران' },
  { id: 'grandes-dalles', label_fr: 'Grandes Dalles', label_en: 'Large Format', label_ar: 'بلاط كبير' },
  { id: 'exterieur', label_fr: 'Extérieur', label_en: 'Outdoor', label_ar: 'الخارجي' },
  { id: 'plans-de-travail', label_fr: 'Plans de Travail', label_en: 'Countertops', label_ar: 'سطح العمل' },
  { id: 'salle-de-bain', label_fr: 'Salle de Bain', label_en: 'Bathroom', label_ar: 'الحمام' },
];

const ITEMS_PER_PAGE = 16;

export default function Shop() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'fr' | 'ar';
  const [activeTab, setActiveTab] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [sortOpen, setSortOpen] = useState(false);

  const { products, total, loading } = useProducts({ sort, page });

  const filtered = products.filter((p) =>
    activeTab === '' ? true : p.category?.slug === activeTab
  );

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const getTabLabel = (tab: typeof TABS[0]) => {
    if (lang === 'fr') return tab.label_fr;
    if (lang === 'ar') return tab.label_ar;
    return tab.label_en;
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

      {/* Filter tabs + sort row */}
      <div className="sticky top-[72px] z-30 bg-bg border-b border-border">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16 flex items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-none flex-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setPage(1); }}
                className={`relative flex-shrink-0 font-sans text-[11px] uppercase tracking-[0.2em] px-5 py-4 transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'text-dark'
                    : 'text-muted hover:text-dark'
                }`}
              >
                {getTabLabel(tab)}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-dark"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] text-muted hover:text-dark transition-colors py-4"
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
                  className="absolute right-0 top-full mt-0 bg-white border border-border shadow-lg min-w-[180px] z-50"
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
      </div>

      {/* Results count */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16 py-8">
        <p className="font-sans text-xs text-muted tracking-wide">
          {filtered.length} {filtered.length === 1 ? 'collection' : 'collections'}
        </p>
      </div>

      {/* Product grid — large, portrait ratio */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16 pb-24">
        <ProductGrid products={filtered} loading={loading} />

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
