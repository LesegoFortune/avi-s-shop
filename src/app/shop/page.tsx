import Link from 'next/link';
import type { Metadata } from 'next';
import { categories, categoryLabel } from '@/lib/config';
import { getProducts } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';

export const metadata: Metadata = { title: 'Shop' };

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = categories.some((c) => c.slug === category)
    ? category
    : undefined;
  const products = await getProducts(active);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">
        {active ? categoryLabel(active) : 'Everything in the shop'}
      </h1>
      <p className="mt-2 text-ink-soft">
        Car décor, decals and personalised keepsakes. Pick your colours, send us
        the details, and we make it up for you.
      </p>

      <div className="mt-7 flex flex-wrap gap-2">
        <FilterPill href="/shop" label="All" active={!active} />
        {categories.map((c) => (
          <FilterPill
            key={c.slug}
            href={`/shop?category=${c.slug}`}
            label={c.label}
            active={active === c.slug}
          />
        ))}
      </div>

      {products.length === 0 ? (
        <p className="mt-10 rounded-3xl bg-white p-10 text-center text-muted shadow-soft">
          Nothing here yet. Message us for what you need — we probably make it.
        </p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterPill({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        active
          ? 'rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-soft'
          : 'rounded-full bg-white px-4 py-2 text-sm font-medium shadow-soft transition-all hover:-translate-y-0.5 hover:text-brand'
      }
    >
      {label}
    </Link>
  );
}
