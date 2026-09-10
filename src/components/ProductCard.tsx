import Link from 'next/link';
import { categoryLabel, categoryTint, tintClasses } from '@/lib/config';
import { formatZar, type Product } from '@/lib/types';
import { ProductImage } from './ProductImage';

export function ProductCard({ product }: { product: Product }) {
  const cheapest = product.tiers.length
    ? Math.min(...product.tiers.map((t) => t.price))
    : null;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-square overflow-hidden">
        <ProductImage
          product={product}
          className="transition-transform duration-300 group-hover:scale-105"
        />
        {!product.in_stock ? (
          <span className="absolute top-3 left-3 rounded-full bg-ink/85 px-2.5 py-1 text-xs font-medium text-white">
            Sold out
          </span>
        ) : (
          product.personalised && (
            <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-brand shadow-soft backdrop-blur">
              Made to order
            </span>
          )
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span
          className={`inline-flex w-fit rounded-full px-2 py-0.5 text-[11px] font-medium ${
            tintClasses[categoryTint(product.category)]
          }`}
        >
          {categoryLabel(product.category)}
        </span>

        <h3 className="mt-2.5 text-base leading-snug transition-colors group-hover:text-brand">
          {product.name}
        </h3>

        <div className="mt-auto pt-3">
          <p className="text-lg font-semibold">
            {formatZar(product.price)}
            {product.tiers.length > 0 && (
              <span className="text-sm font-normal text-muted"> each</span>
            )}
          </p>
          {cheapest !== null && cheapest < product.price && (
            <p className="text-xs text-muted">
              from {formatZar(cheapest)} for a set
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
