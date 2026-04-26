import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/Button';
import type { Lang } from '@/types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language as Lang;
  const { items, removeItem, updateQuantity, totalAmount } = useCartStore();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/70 z-[80] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white border-l border-border z-[90] flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-sans text-xs uppercase tracking-[0.25em] text-dark">
                {t('cart.title')}
              </h2>
              <button
                onClick={onClose}
                className="text-muted hover:text-dark transition-colors"
                aria-label="Close cart"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="font-sans text-muted text-sm">{t('cart.empty')}</p>
                  <button
                    onClick={onClose}
                    className="mt-4 font-sans text-xs text-accent hover:text-accent-dark uppercase tracking-[0.15em] transition-colors"
                  >
                    {t('cart.continueShopping')}
                  </button>
                </div>
              ) : (
                items.map((item) => {
                  const name =
                    (item.product[`name_${lang}` as keyof typeof item.product] as string) ||
                    item.product.name_en;
                  const variantName = item.variant
                    ? (item.variant[`name_${lang}` as keyof typeof item.variant] as string) ||
                      item.variant.name_en
                    : null;
                  const price =
                    item.product.base_price + (item.variant?.price_modifier ?? 0);

                  return (
                    <div
                      key={`${item.product.id}-${item.variant?.id}`}
                      className="flex gap-3 border border-border p-3 rounded-xl"
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-16 bg-surface-warm flex-shrink-0 overflow-hidden">
                        {item.product.images[0] ? (
                          <img
                            src={item.product.images[0]}
                            alt={name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="font-display text-dark/20 text-xs">ARCADA</span>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-dark text-sm font-light truncate">
                          {name}
                        </p>
                        {variantName && (
                          <p className="font-sans text-muted text-xs">{variantName}</p>
                        )}
                        <p className="font-sans text-accent text-sm mt-1">
                          {(price * item.quantity).toLocaleString('fr-MA')} MAD
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() =>
                            removeItem(item.product.id, item.variant?.id)
                          }
                          className="text-muted hover:text-dark transition-colors"
                          aria-label={t('cart.remove')}
                        >
                          <Trash2 size={14} strokeWidth={1.5} />
                        </button>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.variant?.id,
                                item.quantity - 1
                              )
                            }
                            className="w-6 h-6 flex items-center justify-center border border-border text-muted hover:border-accent hover:text-accent transition-colors"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="font-sans text-xs text-dark w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.variant?.id,
                                item.quantity + 1
                              )
                            }
                            className="w-6 h-6 flex items-center justify-center border border-border text-muted hover:border-accent hover:text-accent transition-colors"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-sans text-xs text-muted uppercase tracking-[0.15em]">
                    {t('cart.subtotal')}
                  </span>
                  <span className="font-sans text-dark text-lg font-light">
                    {totalAmount().toLocaleString('fr-MA')} MAD
                  </span>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => { onClose(); navigate('/checkout'); }}
                >
                  {t('cart.checkout')}
                </Button>
              </div>
            )}
      </div>
    </>
  );
}
