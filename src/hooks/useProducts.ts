import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import type { Product, Category } from '@/types';

export function useProducts(options?: {
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.products
      .getAll(options)
      .then(({ data, count }) => {
        setProducts(data);
        setTotal(count);
      })
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : 'Failed to load products')
      )
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options?.category, options?.sort, options?.page, options?.limit]);

  return { products, total, loading, error };
}

export function useFeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.products
      .getFeatured()
      .then(setProducts)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : 'Failed to load products')
      )
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}

export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api.products
      .getBySlug(slug)
      .then(setProduct)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : 'Failed to load product')
      )
      .finally(() => setLoading(false));
  }, [slug]);

  return { product, loading, error };
}

export function useCategoryProducts(slug: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    api.products
      .getByCategory(slug)
      .then(setProducts)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : 'Failed to load products')
      )
      .finally(() => setLoading(false));
  }, [slug]);

  return { products, loading, error };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.categories
      .getAll()
      .then(setCategories)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : 'Failed to load categories')
      )
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading, error };
}

export function useCategory(slug: string) {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api.categories
      .getBySlug(slug)
      .then(setCategory)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : 'Failed to load category')
      )
      .finally(() => setLoading(false));
  }, [slug]);

  return { category, loading, error };
}
