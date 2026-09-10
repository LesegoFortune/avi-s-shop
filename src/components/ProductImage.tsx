'use client';

import { useState } from 'react';
import { categoryTint, tintClasses } from '@/lib/config';
import type { Product } from '@/lib/types';

function initials(name: string) {
  return name
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');
}

/**
 * Uses the uploaded photo, else a local file at `public/products/<slug>.jpg`,
 * else a pastel placeholder — so a product with no picture yet still looks
 * deliberate rather than broken.
 */
export function ProductImage({
  product,
  className = '',
  sizes = '(min-width: 1024px) 300px, 50vw',
  fit = 'cover',
}: {
  product: Pick<Product, 'name' | 'slug' | 'image_url' | 'category'>;
  className?: string;
  sizes?: string;
  /** `contain` shows the whole photo — use it where cropping loses detail. */
  fit?: 'cover' | 'contain';
}) {
  const [failed, setFailed] = useState(false);
  const src = product.image_url ?? `/products/${product.slug}.jpg`;

  if (!failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- arbitrary upload hosts
      <img
        src={src}
        alt={product.name}
        sizes={sizes}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`size-full ${
          fit === 'contain' ? 'object-contain' : 'object-cover'
        } ${className}`}
      />
    );
  }

  return (
    <div
      className={`grid size-full place-items-center ${
        tintClasses[categoryTint(product.category)]
      } ${className}`}
      aria-hidden
    >
      <span className="text-2xl font-semibold tracking-tight opacity-70">
        {initials(product.name) || 'A'}
      </span>
    </div>
  );
}
