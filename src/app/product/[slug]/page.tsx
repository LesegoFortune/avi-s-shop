import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { categoryLabel, categoryTint, tintClasses } from '@/lib/config';
import { getProductBySlug, getProducts } from '@/lib/products';
import { formatZar } from '@/lib/types';
import { ProductImage } from '@/components/ProductImage';
import { ProductCard } from '@/components/ProductCard';
import { OrderPanel } from '@/components/OrderPanel';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Product not found' };
  return {
    title: product.name,
    description: product.description ?? undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = (await getProducts(product.category))
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="text-sm text-muted">
        <Link href="/shop" className="hover:text-brand">
          Shop
        </Link>
        <span className="px-2">/</span>
        <Link
          href={`/shop?category=${product.category}`}
          className="hover:text-brand"
        >
          {categoryLabel(product.category)}
        </Link>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-3xl bg-brand-light/50 p-3 shadow-soft">
          <ProductImage
            product={product}
            fit="contain"
            className="rounded-2xl"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        </div>

        <div>
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
              tintClasses[categoryTint(product.category)]
            }`}
          >
            {categoryLabel(product.category)}
          </span>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            {product.name}
          </h1>
          <p className="mt-3 text-2xl font-semibold text-brand">
            {formatZar(product.price)}
          </p>

          {product.description && (
            <p className="mt-4 leading-relaxed text-ink-soft">
              {product.description}
            </p>
          )}

          {product.tiers.length > 0 && (
            <div className="mt-7">
              <h2 className="text-sm font-semibold">Buying a few?</h2>
              <table className="mt-3 w-full text-sm">
                <thead>
                  <tr className="border-b border-app text-left text-muted">
                    <th className="py-2 font-normal">Quantity</th>
                    <th className="py-2 text-right font-normal">Price each</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-app">
                    <td className="py-2">1 – {product.tiers[0]!.min_qty - 1}</td>
                    <td className="py-2 text-right">
                      {formatZar(product.price)}
                    </td>
                  </tr>
                  {product.tiers.map((tier) => (
                    <tr key={tier.min_qty} className="border-b border-app">
                      <td className="py-2">{tier.min_qty}+</td>
                      <td className="py-2 text-right font-medium text-brand">
                        {formatZar(tier.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-7">
            <OrderPanel product={product} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight">
            You might also like
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
