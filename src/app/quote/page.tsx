import type { Metadata } from 'next';
import { QuoteForm } from '@/components/QuoteForm';

export const metadata: Metadata = {
  title: 'Order something custom',
  description:
    'Tell us the name, photo or idea and we make it up for you — tumblers, acrylic keepsakes, prints and car décor.',
};

const promises = [
  'You see a mockup before you pay — no surprises.',
  'Sets get cheaper per item, so bridal parties and gift boxes work out well.',
  'Nationwide courier, or collect from us.',
  'Ready in 3–7 working days once you approve the design.',
];

export default function QuotePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">
        Order something custom
      </h1>
      <p className="mt-2 max-w-2xl text-ink-soft">
        A name on a tumbler, a photo on acrylic, a whole bridal party — tell us
        what you&apos;re after and we&apos;ll come straight back to you on
        WhatsApp.
      </p>

      <div className="mt-9 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <QuoteForm />

        <aside className="space-y-4">
          <div className="rounded-3xl bg-rose-tint p-6">
            <h2 className="font-semibold text-rose-ink">What to expect</h2>
            <ul className="mt-3 space-y-2.5 text-sm text-ink">
              {promises.map((p) => (
                <li key={p} className="flex gap-2.5">
                  <span aria-hidden className="text-brand">
                    ♥
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-lilac-tint p-6">
            <h2 className="font-semibold text-lilac-ink">
              Buying something off the shelf?
            </h2>
            <p className="mt-2 text-sm text-ink">
              No form needed — open any product in the shop and tap
              &ldquo;Order on WhatsApp&rdquo;.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
