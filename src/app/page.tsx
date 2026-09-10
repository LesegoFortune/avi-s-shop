import Link from 'next/link';
import { categories, site } from '@/lib/config';
import { getFeaturedProducts } from '@/lib/products';
import { generalLink } from '@/lib/whatsapp';
import { ProductCard } from '@/components/ProductCard';
import { CategoryTile } from '@/components/CategoryTile';
import { WhatsAppGlyph } from '@/components/Header';

const steps = [
  {
    title: 'Pick your piece',
    body: 'Browse the shop, or send us a photo of what you have in mind.',
  },
  {
    title: 'Send your details',
    body: 'WhatsApp us the name, photo or colour. We mock it up so you see it first.',
  },
  {
    title: 'Approve & collect',
    body: 'Pay by EFT or cash, then collect or we courier it to you.',
  },
];

/* Four photos that open the page — the hero collage. */
const heroShots = [
  { slug: 'flower-seat-belt-pads', alt: 'Flower seat belt pads' },
  { slug: 'personalised-frosted-glass-tumbler', alt: 'Personalised tumblers' },
  { slug: 'flower-air-vent-clips', alt: 'Flower air vent clips' },
  { slug: 'personalised-acrylic-photo-calendar', alt: 'Acrylic photo calendar' },
];

export default async function HomePage() {
  const featured = await getFeaturedProducts(4);

  return (
    <>
      <section className="hero-wash">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.05fr_1fr] md:items-center md:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-brand uppercase shadow-soft">
              <span className="size-1.5 rounded-full bg-brand" />
              Made to order in South Africa
            </p>
            <h1 className="mt-5 text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              Cute car accessories &amp;{' '}
              <span className="text-brand">personalised</span> gifts
            </h1>
            <p className="mt-5 max-w-lg text-lg text-ink-soft">{site.blurb}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-lift transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
              >
                Shop everything
              </Link>
              <Link
                href="/quote"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink shadow-soft transition-transform hover:-translate-y-0.5"
              >
                Order something custom
              </Link>
            </div>

            <p className="mt-7 text-sm text-ink-soft">
              One little treat or a whole bridal party — same care either way.
            </p>
          </div>

          {/*
            Staggered photo collage rather than a single banner shot: the
            catalogue is lots of small things, and this shows four at once.
          */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {heroShots.map((shot, i) => (
              // eslint-disable-next-line @next/next/no-img-element -- static local file
              <img
                key={shot.slug}
                src={`/products/${shot.slug}.jpg`}
                alt={shot.alt}
                className={`aspect-square w-full rounded-3xl object-cover shadow-soft ${
                  i % 2 === 0 ? 'md:translate-y-4' : ''
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl">Everyone&apos;s favourites</h2>
          <Link
            href="/shop"
            className="shrink-0 text-sm font-semibold text-brand hover:underline"
          >
            See everything →
          </Link>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="band-wash border-y border-app">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl sm:text-3xl">How ordering works</h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="rounded-3xl bg-white p-7 shadow-soft"
              >
                <span className="grid size-10 place-items-center rounded-2xl bg-brand-light text-base font-semibold text-brand">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg">{step.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl sm:text-3xl">Shop by category</h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryTile key={c.slug} category={c} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="brand-gradient flex flex-col items-start gap-6 rounded-[2rem] p-8 text-white shadow-lift sm:flex-row sm:items-center sm:justify-between sm:p-12">
          <div>
            <h2 className="text-2xl sm:text-3xl">Got something in mind?</h2>
            <p className="mt-2.5 max-w-md text-white/85">
              Send us a photo or an idea. If we can make it, we&apos;ll quote
              you the same day.
            </p>
          </div>
          <a
            href={generalLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand shadow-soft transition-transform hover:-translate-y-0.5"
          >
            <WhatsAppGlyph className="size-4" />
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
