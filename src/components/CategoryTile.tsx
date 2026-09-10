import Link from 'next/link';
import { tintClasses, type Tint } from '@/lib/config';

/**
 * A category link that leads with a real product photo. Falls back to the
 * category's pastel if the photo is missing, so it never renders as a gap.
 */
export function CategoryTile({
  category,
}: {
  category: { slug: string; label: string; tint: Tint; photo: string };
}) {
  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="group relative flex aspect-[16/10] items-end overflow-hidden rounded-3xl shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
    >
      <div className={`absolute inset-0 ${tintClasses[category.tint]}`} />
      {/* eslint-disable-next-line @next/next/no-img-element -- static local file */}
      <img
        src={`/products/${category.photo}.jpg`}
        alt=""
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Light scrim only, so the pastels stay bright; the label sits on a
          white pill rather than needing a dark wash to be readable. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent" />
      <span className="relative m-4 rounded-full bg-white/95 px-4 py-2 font-semibold text-ink shadow-soft backdrop-blur transition-colors group-hover:text-brand">
        {category.label}
      </span>
    </Link>
  );
}
