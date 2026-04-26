import { useState } from 'react';
import { Plus, Edit, Trash2, Copy, Star } from 'lucide-react';
import { useAdminProducts, useAdminCategories } from '@/hooks/useAdmin';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { toast } from '@/components/ui/Toast';
import ProductForm from './ProductForm';
import type { Product } from '@/types';

export default function ProductsManager() {
  const { products, loading, deleteProduct, createProduct, updateProduct, refetch } = useAdminProducts();
  const { categories } = useAdminCategories();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSave = async (data: unknown) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, data);
        toast.success('Product updated');
        setEditingProduct(null);
      } else {
        await createProduct(data);
        toast.success('Product created');
        setShowCreateModal(false);
      }
      refetch();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Save failed');
    }
  };

  const filtered = products.filter((p) =>
    activeCategory === 'all' || p.category_id === activeCategory
  );

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleBulkDelete = async () => {
    if (!selected.size) return;
    if (!confirm(`Delete ${selected.size} product(s)?`)) return;
    for (const id of Array.from(selected)) {
      await deleteProduct(id).catch((e: unknown) =>
        toast.error(e instanceof Error ? e.message : 'Delete failed')
      );
    }
    setSelected(new Set());
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    setDeletingId(id);
    try {
      await deleteProduct(id);
      toast.success('Product deleted');
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  const getStockStatus = (p: Product) => {
    const stock = p.variants?.reduce((sum, v) => sum + (v.stock ?? 0), 0) ?? null;
    if (stock === null) return { label: '—', variant: 'gray' as const };
    if (stock === 0) return { label: 'Out of Stock', variant: 'red' as const };
    if (stock < 5) return { label: `Low (${stock})`, variant: 'yellow' as const };
    return { label: String(stock), variant: 'green' as const };
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="font-display font-light text-[#1A1714] uppercase text-2xl sm:text-3xl tracking-[0.15em] border-l-2 border-[#8B7355] pl-4">
          PRODUCTS
        </h1>
        <div className="flex gap-2 flex-wrap">
          {selected.size > 0 && (
            <button
              onClick={handleBulkDelete}
              className="font-sans text-xs text-[#8B7355] border border-[#8B7355] px-3 py-2 hover:bg-[#1A1714] hover:text-black transition-colors whitespace-nowrap"
            >
              DELETE {selected.size} SELECTED
            </button>
          )}
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 font-sans text-xs text-white bg-[#1A1714] px-3 py-2 hover:bg-[#2D2926] transition-colors whitespace-nowrap"
          >
            <Plus size={12} /> NEW PRODUCT
          </button>
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveCategory('all')}
          className={`font-sans text-xs uppercase tracking-[0.15em] px-3 py-1.5 whitespace-nowrap border-b-2 transition-colors ${
            activeCategory === 'all' ? 'text-[#1A1714] border-[#8B7355]' : 'text-[#6B6459] border-transparent hover:text-[#1A1714]'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`font-sans text-xs uppercase tracking-[0.15em] px-3 py-1.5 whitespace-nowrap border-b-2 transition-colors ${
              activeCategory === cat.id ? 'text-[#1A1714] border-[#8B7355]' : 'text-[#6B6459] border-transparent hover:text-[#1A1714]'
            }`}
          >
            {cat.name_en}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E8E2D9] overflow-x-auto rounded-xl">
        <table className="w-full text-xs font-sans">
          <thead>
            <tr className="border-b border-[#E8E2D9]">
              <th className="px-3 py-3" />
              {['Name', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-[#6B6459] uppercase tracking-[0.15em]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [1, 2, 3, 4].map((i) => (
                <tr key={i} className="border-b border-[#E8E2D9]">
                  <td colSpan={7} className="px-4 py-3">
                    <div className="h-4 bg-[#1a1a1a] animate-pulse rounded-sm" />
                  </td>
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center">
                  <div className="text-[#8B7355] font-display font-light text-2xl mb-2">// EMPTY</div>
                  <div className="text-[#9E9189] font-sans text-xs">No products in this category</div>
                </td>
              </tr>
            ) : filtered.map((product) => {
              const stock = getStockStatus(product);
              const catName = categories.find((c) => c.id === product.category_id)?.name_en ?? '—';
              return (
                <tr key={product.id} className="border-b border-[#E8E2D9] hover:bg-[#F2EDE6] transition-colors group">
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(product.id)}
                      onChange={() => toggleSelect(product.id)}
                      className="w-3 h-3 accent-[#FF0000]"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {product.images?.[0] && (
                        <img src={product.images[0]} alt="" className="w-8 h-8 object-cover opacity-60" />
                      )}
                      <div>
                        <p className="text-[#1A1714] font-bold">{product.name_en}</p>
                        {product.is_featured && <Star size={10} className="text-yellow-400 mt-0.5" />}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#6B6459]">{catName}</td>
                  <td className="px-4 py-3 text-[#1A1714]">${product.base_price.toFixed(2)}</td>
                  <td className="px-4 py-3"><Badge variant={stock.variant}>{stock.label}</Badge></td>
                  <td className="px-4 py-3">
                    <Badge variant={product.is_active ? 'green' : 'gray'}>
                      {product.is_active ? 'Active' : 'Hidden'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="text-[#6B6459] hover:text-[#1A1714]"
                        aria-label="Edit product"
                      >
                        <Edit size={13} />
                      </button>
                      <button
                        aria-label="Duplicate product"
                        className="text-[#6B6459] hover:text-blue-400"
                      >
                        <Copy size={13} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        disabled={deletingId === product.id}
                        className="text-[#6B6459] hover:text-[#8B7355] disabled:opacity-30"
                        aria-label="Delete product"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="New Product"
        size="xl"
      >
        <ProductForm
          product={null}
          onSave={handleSave}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        title="Edit Product"
        size="xl"
      >
        {editingProduct && (
          <ProductForm
            product={editingProduct}
            onSave={handleSave}
            onCancel={() => setEditingProduct(null)}
          />
        )}
      </Modal>
    </div>
  );
}

