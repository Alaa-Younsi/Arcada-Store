import { useTranslation } from 'react-i18next';

const CATEGORY_LABELS: Record<string, { fr: string; en: string }> = {
  'carrelage-sol': { fr: 'Carrelage Sol', en: 'Floor Tiles' },
  'revetement-mural': { fr: 'Revêtement Mural', en: 'Wall Cladding' },
  'grandes-dalles': { fr: 'Grandes Dalles', en: 'Large Format' },
  'exterieur': { fr: 'Extérieur', en: 'Outdoor' },
  'plans-de-travail': { fr: 'Plans de Travail', en: 'Countertops' },
  'salle-de-bain': { fr: 'Salle de Bain', en: 'Bathroom' },
};

interface CategoryFilterProps {
  categories: string[];
  selected: string[];
  onToggle: (category: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  sort: string;
  onSortChange: (sort: string) => void;
  maxPrice?: number;
}

export function CategoryFilter({
  categories,
  selected,
  onToggle,
  priceRange,
  onPriceChange,
  sort,
  onSortChange,
  maxPrice = 50000,
}: CategoryFilterProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'fr' | 'en' | 'ar';

  const getCatLabel = (slug: string) => {
    const labels = CATEGORY_LABELS[slug];
    if (!labels) return slug;
    return lang === 'fr' ? labels.fr : labels.en;
  };

  return (
    <div className="space-y-8">
      {/* Collections filter */}
      {categories.length > 0 && (
        <div>
          <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-dark mb-4">
            Collections
          </h3>
          <div className="space-y-3">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selected.includes(cat)}
                  onChange={() => onToggle(cat)}
                  className="sr-only"
                />
                <span
                  className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-colors ${
                    selected.includes(cat)
                      ? 'border-accent bg-accent'
                      : 'border-border-dark group-hover:border-accent'
                  }`}
                >
                  {selected.includes(cat) && (
                    <svg viewBox="0 0 10 8" width="8" height="8" fill="none">
                      <path d="M1 4l3 3 5-6" strokeWidth="1.5" stroke="white" />
                    </svg>
                  )}
                </span>
                <span className="font-sans text-xs text-muted group-hover:text-dark transition-colors">
                  {getCatLabel(cat)}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div>
        <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-dark mb-4">
          Budget (MAD)
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between font-sans text-xs text-muted">
            <span>{priceRange[0]} MAD</span>
            <span>{priceRange[1]} MAD</span>
          </div>
          <input
            type="range"
            min={0}
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
            className="w-full"
          />
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-dark mb-4">
          {t('common.sort')}
        </h3>
        <div className="space-y-2">
          {[
            { value: 'newest', label: t('common.newest') },
            { value: 'price_asc', label: t('common.priceAsc') },
            { value: 'price_desc', label: t('common.priceDesc') },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => onSortChange(option.value)}
              className={`block w-full text-left font-sans text-xs py-1.5 transition-colors ${
                sort === option.value ? 'text-accent font-medium' : 'text-muted hover:text-dark'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
