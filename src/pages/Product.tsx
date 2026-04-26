import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '@/components/seo/SEOHead';
import { useProduct, useCategoryProducts } from '@/hooks/useProducts';
import { VariantSelector } from '@/components/shop/VariantSelector';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';
import { toast } from '@/components/ui/Toast';
import type { Lang, ProductVariant } from '@/types';

export default function Product() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as Lang;
  const { product, loading } = useProduct(slug);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [descOpen, setDescOpen] = useState(true);

  // Related products
  const categorySlug = product?.category?.slug ?? '';
  const { products: related } = useCategoryProducts(categorySlug);
  const relatedFiltered = related.filter((p) => p.id !== product?.id).slice(0, 4);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-bg">
        <p className="font-display text-dark/30 text-3xl font-light tracking-[0.3em] animate-pulse">ARCADA</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-bg">
        <p className="font-sans text-muted text-sm">Produit introuvable</p>
      </div>
    );
  }

  const name = (product[`name_${lang}` as keyof typeof product] as string) || product.name_en;
  const description =
    (product[`description_${lang}` as keyof typeof product] as string) ||
    product.description_en ||
    '';
  const categoryName = product.category
    ? ((product.category[`name_${lang}` as keyof typeof product.category] as string) ||
        product.category.name_en)
    : '';

  const effectiveVariant = selectedVariant ?? product.variants?.[0] ?? null;
  const price = product.base_price + (effectiveVariant?.price_modifier ?? 0);
  const stock = effectiveVariant?.stock ?? 999;
  const stockStatus =
    stock === 0
      ? 'outOfStock'
      : stock < 5
      ? 'lowStock'
      : 'inStock';

  const handleAddToCart = () => {
    addItem(product, effectiveVariant ?? undefined, quantity);
    toast.success(`${name} ajouté au panier`);
  };

  return (
    <>
      <SEOHead
        title={`${name} — ARCADA`}
        description={description.slice(0, 160)}
        image={product.images[0]}
        productSchema={{ name, price, description, image: product.images[0] ?? '' }}
      />

      {/* Breadcrumb */}
      <div className="bg-surface-warm border-b border-border pt-[82px]">
        <div className="max-w-screen-xl mx-auto px-4 py-3">
          <p className="font-sans text-xs text-muted">
            <span>ARCADA</span>
            {categoryName && (
              <><span className="mx-2 text-border-dark">—</span><span>{categoryName}</span></>
            )}
            <span className="mx-2 text-border-dark">—</span>
            <span className="text-dark">{name}</span>
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Images */}
          <div className="space-y-3">
            <div className="relative bg-surface-warm overflow-hidden rounded-2xl" style={{ aspectRatio: '4/3' }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={product.images[activeImage] ?? ''}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              {!product.images[activeImage] && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="font-display text-dark/20 text-5xl font-light tracking-[0.15em]">ARCADA</p>
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-20 h-20 border-2 overflow-hidden transition-colors rounded-xl ${
                      idx === activeImage
                        ? 'border-accent'
                        : 'border-transparent hover:border-border-dark'
                    }`}
                  >
                    <img src={img} alt={`${name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="flex flex-col">
            {categoryName && (
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-accent mb-3">{categoryName}</p>
            )}

            <h1 className="font-display text-dark mb-4 leading-tight" style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 400 }}>
              {name}
            </h1>

            <div className="flex items-baseline gap-2 mb-8">
              <span className="font-sans text-2xl text-dark font-light">{price.toLocaleString('fr-MA')} MAD</span>
              <span className="font-sans text-xs text-muted">/ m²</span>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted mb-3">
                  {t('product.variants')}
                </p>
                <VariantSelector
                  variants={product.variants}
                  selected={effectiveVariant}
                  onSelect={setSelectedVariant}
                />
              </div>
            )}

            {/* Stock */}
            <div className="mb-6">
              <span
                className={`font-sans text-xs uppercase tracking-[0.15em] ${
                  stockStatus === 'inStock'
                    ? 'text-green-600'
                    : stockStatus === 'lowStock'
                    ? 'text-amber-600'
                    : 'text-red-600'
                }`}
              >
                ● {t(`product.${stockStatus}`)}
                {stockStatus === 'lowStock' && ` (${stock} restants)`}
              </span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-sans text-xs text-muted uppercase tracking-[0.15em]">
                {t('product.quantity')}
              </span>
              <div className="flex items-center border border-border">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-muted hover:text-dark hover:bg-surface-warm transition-colors"
                >
                  <Minus size={14} strokeWidth={1.5} />
                </button>
                <span className="w-12 text-center font-sans text-sm text-dark">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-muted hover:text-dark hover:bg-surface-warm transition-colors"
                >
                  <Plus size={14} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              variant={stock === 0 ? 'ghost' : 'primary'}
              size="lg"
              disabled={stock === 0}
              onClick={handleAddToCart}
              className="w-full mb-8 flex items-center justify-center gap-3"
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
              {stock === 0 ? t('product.outOfStock') : t('product.addToCart')}
            </Button>

            {/* Description accordion */}
            <div className="border-t border-border">
              <button
                onClick={() => setDescOpen((o) => !o)}
                className="flex items-center justify-between w-full font-sans text-xs uppercase tracking-[0.2em] text-dark py-4"
              >
                {t('product.description')}
                {descOpen ? <ChevronUp size={16} strokeWidth={1.5} /> : <ChevronDown size={16} strokeWidth={1.5} />}
              </button>
              <AnimatePresence>
                {descOpen && description && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="font-sans text-muted text-sm leading-relaxed pb-6 font-light">
                      {description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Catalogue link */}
            <div className="border-t border-border pt-5">
              <a
                href="/CATALOGUE-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs uppercase tracking-[0.2em] text-accent hover:text-accent-dark transition-colors"
              >
                Télécharger le Catalogue 2026 →
              </a>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedFiltered.length > 0 && (
          <div className="mt-24">
            <div className="flex items-center gap-6 mb-10">
              <h2 className="font-display text-dark font-light text-3xl">{t('product.relatedProducts')}</h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <ProductGrid products={relatedFiltered} />
          </div>
        )}
      </div>
    </>
  );
}

