import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import type { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { toast } from '@/components/ui/Toast';
import type { Lang } from '@/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  const lang = i18n.language as Lang;

  const name = (product[`name_${lang}` as keyof Product] as string) || product.name_en;
  const price = product.base_price;
  const image = product.images[0];
  const categoryName = product.category
    ? ((product.category[`name_${lang}` as keyof typeof product.category] as string) || product.category.name_en)
    : '';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    toast.success(`${name} ajouté au panier`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={() => navigate(`/product/${product.slug}`)}
      className="group cursor-pointer"
    >
      {/* Image — tall portrait ratio like Florim */}
      <div
        className="relative overflow-hidden bg-surface-warm mb-4"
        style={{ aspectRatio: '3/4' }}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(160deg, #C8BFB0 0%, #9E9189 50%, #8B7355 100%)',
            }}
          >
            <span className="font-display text-white/30 font-light" style={{ fontSize: '60px' }}>
              A
            </span>
          </div>
        )}

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-all duration-500" />

        {/* View button — slides up from bottom */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] bg-white/95 backdrop-blur-sm py-3 flex items-center justify-center gap-2">
          <ArrowRight size={11} strokeWidth={1.5} className="text-accent" />
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-dark">
            {t('product.view')}
          </span>
        </div>

        {/* Badge */}
        {product.is_featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-dark text-white font-sans text-[9px] uppercase tracking-[0.2em] px-2.5 py-1">
              Nouveauté
            </span>
          </div>
        )}

        {/* Cart button top-right */}
        <button
          onClick={handleAddToCart}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-dark hover:text-white text-dark"
          aria-label={t('product.addToCart')}
        >
          <ShoppingCart size={13} strokeWidth={1.5} />
        </button>
      </div>

      {/* Info */}
      <div>
        {categoryName && (
          <p className="font-sans text-[10px] text-muted uppercase tracking-[0.22em] mb-1">
            {categoryName}
          </p>
        )}
        <h3 className="font-display text-dark font-light leading-snug mb-1 group-hover:text-accent transition-colors duration-300" style={{ fontSize: '18px' }}>
          {name}
        </h3>
        <p className="font-sans text-sm text-text-main font-light">
          {price.toFixed(0)} MAD<span className="text-muted text-xs"> / m²</span>
        </p>
      </div>
    </motion.div>
  );
}
