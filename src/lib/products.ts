import { createClient } from './supabase/server';
import { seedProducts } from './seed';
import type { Product } from './types';

/** Normalises a Supabase row — jsonb columns can arrive as null. */
function fromRow(row: Record<string, unknown>): Product {
  return {
    ...(row as Product),
    tiers: Array.isArray(row.tiers) ? (row.tiers as Product['tiers']) : [],
    options: Array.isArray(row.options) ? (row.options as string[]) : [],
  };
}

export async function getProducts(category?: string): Promise<Product[]> {
  const supabase = await createClient();

  if (!supabase) {
    const all = seedProducts;
    return category ? all.filter((p) => p.category === category) : all;
  }

  let query = supabase
    .from('products')
    .select('*')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (category) query = query.eq('category', category);

  const { data, error } = await query;
  if (error) {
    console.error('getProducts failed:', error.message);
    return [];
  }
  return (data ?? []).map(fromRow);
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const all = await getProducts();
  const featured = all.filter((p) => p.featured && p.in_stock);
  const pool = featured.length > 0 ? featured : all.filter((p) => p.in_stock);
  return pool.slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();

  if (!supabase) {
    return seedProducts.find((p) => p.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('getProductBySlug failed:', error.message);
    return null;
  }
  return data ? fromRow(data) : null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient();
  if (!supabase) return seedProducts.find((p) => p.id === id) ?? null;

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('getProductById failed:', error.message);
    return null;
  }
  return data ? fromRow(data) : null;
}
