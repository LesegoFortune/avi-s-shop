'use client';

import { useState } from 'react';
import { formatZar, priceAtQty, type Product } from '@/lib/types';
import { orderLink, quoteLink } from '@/lib/whatsapp';
import { WhatsAppGlyph } from './Header';

/**
 * One control, two outcomes: a few items is a straight order, a bigger run
 * becomes a quote. Personalised products also prompt for the name, photo or
 * colour we need before we can make it.
 */
export function OrderPanel({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [option, setOption] = useState<string | null>(
    product.options[0] ?? null,
  );

  const unit = priceAtQty(product, qty);
  const isBulk = qty >= product.bulk_from;
  const href = isBulk
    ? quoteLink(product, qty, option ?? undefined)
    : orderLink(product, qty, option ?? undefined);

  const presets = [1, ...product.tiers.map((t) => t.min_qty)].filter(
    (n, i, arr) => arr.indexOf(n) === i,
  );

  return (
    <div className="rounded-3xl bg-white p-6 shadow-soft">
      {product.options.length > 0 && (
        <div className="mb-5">
          <p className="text-sm font-medium">
            {product.personalisation_note ?? 'Choose an option'}
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {product.options.map((choice) => (
              <button
                key={choice}
                type="button"
                onClick={() => setOption(choice)}
                className={
                  option === choice
                    ? 'rounded-full bg-brand px-3.5 py-1.5 text-sm font-medium text-white'
                    : 'rounded-full border border-app px-3.5 py-1.5 text-sm transition-colors hover:border-brand hover:text-brand'
                }
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      )}

      <label htmlFor="qty" className="block text-sm font-medium">
        How many?
      </label>

      <div className="mt-2.5 flex flex-wrap gap-2">
        {presets.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setQty(n)}
            className={
              qty === n
                ? 'rounded-full bg-brand-dark px-3.5 py-1.5 text-sm font-medium text-white'
                : 'rounded-full border border-app px-3.5 py-1.5 text-sm transition-colors hover:border-brand hover:text-brand'
            }
          >
            {n === 1 ? 'Just one' : n}
          </button>
        ))}
      </div>

      <input
        id="qty"
        type="number"
        min={1}
        value={qty}
        onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
        className="mt-3 w-full rounded-xl border border-app bg-cream px-3.5 py-2.5 text-sm outline-none focus:border-brand"
      />

      <dl className="mt-5 space-y-1.5 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Price each</dt>
          <dd className="font-medium">{formatZar(unit)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Total</dt>
          <dd className="font-semibold">{formatZar(unit * qty)}</dd>
        </div>
      </dl>

      <p className="mt-3 text-xs text-muted">
        {isBulk
          ? 'Larger orders are quoted per job — this is an estimate and excludes delivery.'
          : 'Excludes delivery.'}
      </p>

      {product.in_stock ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
        >
          <WhatsAppGlyph className="size-4" />
          {isBulk ? 'Request a quote on WhatsApp' : 'Order on WhatsApp'}
        </a>
      ) : (
        <div className="mt-5 space-y-3">
          <p className="rounded-xl bg-accent-light px-4 py-3 text-center text-sm text-accent">
            Out of stock right now.
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-app px-6 py-3 text-sm font-medium transition-colors hover:border-brand hover:text-brand"
          >
            <WhatsAppGlyph className="size-4" />
            Ask when it&apos;s back
          </a>
        </div>
      )}

      {product.personalised && (
        <p className="mt-3 text-center text-xs text-muted">
          {product.personalisation_note
            ? `${product.personalisation_note} in the chat — we mock it up before you pay.`
            : 'Send your details in the chat and we mock it up before you pay.'}
        </p>
      )}
    </div>
  );
}
