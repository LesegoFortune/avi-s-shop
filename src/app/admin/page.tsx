import Link from 'next/link';
import { categoryLabel } from '@/lib/config';
import { getProducts } from '@/lib/products';
import { supabaseConfigured } from '@/lib/supabase/env';
import { formatZar } from '@/lib/types';
import { ProductImage } from '@/components/ProductImage';
import { SetupNotice } from '@/components/admin/SetupNotice';

export default async function AdminProductsPage() {
  if (!supabaseConfigured) return <SetupNotice />;

  const products = await getProducts();

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Products</h2>
          <p className="text-sm text-muted">
            {products.length} {products.length === 1 ? 'item' : 'items'} in the
            catalogue
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-dark"
        >
          + Add product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="surface mt-6 rounded-2xl p-10 text-center text-muted">
          No products yet. Add your first one to get the shop live.
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {products.map((product) => (
            <li key={product.id}>
              <Link
                href={`/admin/products/${product.id}`}
                className="surface flex items-center gap-4 rounded-2xl p-3 transition-shadow hover:shadow-md"
              >
                <div className="size-16 shrink-0 overflow-hidden rounded-xl">
                  <ProductImage product={product} sizes="64px" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{product.name}</p>
                  <p className="text-xs text-muted">
                    {categoryLabel(product.category)} ·{' '}
                    {formatZar(product.price)} each
                    {product.tiers.length > 0 &&
                      ` · ${product.tiers.length} bulk ${
                        product.tiers.length === 1 ? 'tier' : 'tiers'
                      }`}
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
                  {product.featured && (
                    <span className="rounded-full bg-accent-light px-2.5 py-1 text-xs text-accent">
                      Featured
                    </span>
                  )}
                  <span
                    className={
                      product.in_stock
                        ? 'rounded-full bg-brand-light px-2.5 py-1 text-xs text-brand'
                        : 'rounded-full bg-accent-light px-2.5 py-1 text-xs text-accent'
                    }
                  >
                    {product.in_stock ? 'In stock' : 'Sold out'}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
