import Link from 'next/link';
import { categories, site } from '@/lib/config';
import { generalLink } from '@/lib/whatsapp';

export function Footer() {
  return (
    <footer className="band-wash mt-20 border-t border-app">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element -- static local file */}
          <img
            src={site.logo}
            alt=""
            width={56}
            height={56}
            className="size-14 rounded-full ring-1 ring-gold/40"
          />
          <p className="mt-3 font-display text-xl font-semibold">{site.name}</p>
          <p className="mt-2 max-w-xs text-sm text-muted">{site.blurb}</p>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide text-gold-ink uppercase">Shop</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/shop?category=${c.slug}`}
                  className="hover:text-gold-ink"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide text-gold-ink uppercase">Get in touch</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <a
                href={generalLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-ink"
              >
                WhatsApp us
              </a>
            </li>
            <li>
              <Link href="/quote" className="hover:text-gold-ink">
                Order something custom
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-app px-4 py-5 text-center text-xs text-muted sm:px-6">
        © {new Date().getFullYear()} {site.name}. Prices exclude delivery.
        Personalised items are made to order and can&apos;t be returned.
      </div>
    </footer>
  );
}
