'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { categories } from '@/lib/config';
import { createClient } from '@/lib/supabase/client';
import type { PriceTier, Product } from '@/lib/types';

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

type Draft = {
  name: string;
  slug: string;
  description: string;
  category: string;
  price: string;
  tiers: PriceTier[];
  personalised: boolean;
  personalisation_note: string;
  options: string;
  bulk_from: string;
  image_url: string | null;
  in_stock: boolean;
  featured: boolean;
};

function toDraft(product?: Product): Draft {
  return {
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    description: product?.description ?? '',
    category: product?.category ?? 'bottles',
    price: product ? String(product.price) : '',
    tiers: product?.tiers ?? [],
    personalised: product?.personalised ?? true,
    personalisation_note: product?.personalisation_note ?? '',
    options: product?.options.join(', ') ?? '',
    bulk_from: product ? String(product.bulk_from) : '10',
    image_url: product?.image_url ?? null,
    in_stock: product?.in_stock ?? true,
    featured: product?.featured ?? false,
  };
}

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft>(toDraft(product));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  async function uploadImage(file: File) {
    setBusy(true);
    setError(null);
    const supabase = createClient();
    const path = `${Date.now()}-${file.name.replace(/[^\w.-]/g, '_')}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(path, file, { upsert: true });

    if (uploadError) {
      setError(`Image upload failed: ${uploadError.message}`);
      setBusy(false);
      return;
    }

    const { data } = supabase.storage.from('product-images').getPublicUrl(path);
    set('image_url', data.publicUrl);
    setBusy(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const payload = {
      name: draft.name.trim(),
      slug: (draft.slug.trim() || slugify(draft.name)) || slugify(draft.name),
      description: draft.description.trim() || null,
      category: draft.category,
      price: Number(draft.price) || 0,
      // Cheapest-last so the pricing table reads top to bottom.
      tiers: draft.tiers
        .filter((t) => t.min_qty > 0 && t.price > 0)
        .sort((a, b) => a.min_qty - b.min_qty),
      personalised: draft.personalised,
      personalisation_note: draft.personalisation_note.trim() || null,
      options: draft.options
        .split(',')
        .map((o) => o.trim())
        .filter(Boolean),
      bulk_from: Number(draft.bulk_from) || 10,
      image_url: draft.image_url,
      in_stock: draft.in_stock,
      featured: draft.featured,
    };

    const supabase = createClient();
    const { error: saveError } = product
      ? await supabase.from('products').update(payload).eq('id', product.id)
      : await supabase.from('products').insert(payload);

    if (saveError) {
      setError(saveError.message);
      setBusy(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  async function handleDelete() {
    if (!product) return;
    if (!confirm(`Delete “${product.name}”? This cannot be undone.`)) return;

    setBusy(true);
    const { error: deleteError } = await createClient()
      .from('products')
      .delete()
      .eq('id', product.id);

    if (deleteError) {
      setError(deleteError.message);
      setBusy(false);
      return;
    }
    router.push('/admin');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="surface space-y-5 rounded-2xl p-6">
        <Text
          label="Product name"
          required
          value={draft.name}
          onChange={(v) => {
            set('name', v);
            if (!product) set('slug', slugify(v));
          }}
        />

        <Text
          label="URL slug"
          hint="Shows in the web address. Leave as generated unless you have a reason."
          value={draft.slug}
          onChange={(v) => set('slug', v)}
        />

        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={draft.description}
            onChange={(e) => set('description', e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-app bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-brand"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className="block text-sm font-medium">
              Category
            </label>
            <select
              id="category"
              value={draft.category}
              onChange={(e) => set('category', e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-app bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-brand"
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <Text
            label="Price each (R)"
            type="number"
            required
            value={draft.price}
            onChange={(v) => set('price', v)}
          />
        </div>
      </div>

      <div className="surface mt-5 rounded-2xl p-6">
        <h2 className="text-sm font-semibold">Photo</h2>
        <div className="mt-3 flex items-start gap-4">
          <div className="surface grid size-24 shrink-0 place-items-center overflow-hidden rounded-xl">
            {draft.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element -- uploaded to Supabase storage
              <img
                src={draft.image_url}
                alt=""
                className="size-full object-cover"
              />
            ) : (
              <span className="text-xs text-muted">No photo</span>
            )}
          </div>

          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void uploadImage(file);
              }}
              className="w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-brand-light file:px-3 file:py-1.5 file:text-brand"
            />
            <p className="mt-1.5 text-xs text-muted">
              A square-ish photo on a plain background works best.
            </p>
            {draft.image_url && (
              <button
                type="button"
                onClick={() => set('image_url', null)}
                className="mt-2 text-xs text-accent hover:underline"
              >
                Remove photo
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="surface mt-5 rounded-2xl p-6">
        <h2 className="text-sm font-semibold">Price for sets</h2>
        <p className="mt-1 text-xs text-muted">
          Set the per-item price at each quantity break — a set of 4 tumblers,
          say. Leave empty if you only sell at one price.
        </p>

        <div className="mt-4 space-y-3">
          {draft.tiers.map((tier, i) => (
            <div key={i} className="flex items-end gap-3">
              <div className="flex-1">
                <label className="block text-xs text-muted">From qty</label>
                <input
                  type="number"
                  min={1}
                  value={tier.min_qty || ''}
                  onChange={(e) => {
                    const next = [...draft.tiers];
                    next[i] = { ...tier, min_qty: Number(e.target.value) || 0 };
                    set('tiers', next);
                  }}
                  className="mt-1 w-full rounded-xl border border-app bg-transparent px-3 py-2 text-sm outline-none focus:border-brand"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-muted">Price each (R)</label>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={tier.price || ''}
                  onChange={(e) => {
                    const next = [...draft.tiers];
                    next[i] = { ...tier, price: Number(e.target.value) || 0 };
                    set('tiers', next);
                  }}
                  className="mt-1 w-full rounded-xl border border-app bg-transparent px-3 py-2 text-sm outline-none focus:border-brand"
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  set(
                    'tiers',
                    draft.tiers.filter((_, idx) => idx !== i),
                  )
                }
                className="rounded-full border border-app px-3 py-2 text-xs hover:border-accent hover:text-accent"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() =>
            set('tiers', [...draft.tiers, { min_qty: 0, price: 0 }])
          }
          className="mt-4 rounded-full border border-app px-4 py-2 text-sm hover:border-brand hover:text-brand"
        >
          + Add a quantity break
        </button>
      </div>

      <div className="surface mt-5 space-y-4 rounded-2xl p-6">
        <h2 className="text-sm font-semibold">Availability</h2>

        <Toggle
          label="In stock"
          hint="Turn off to show “Sold out” without deleting the product."
          checked={draft.in_stock}
          onChange={(v) => set('in_stock', v)}
        />
        <Toggle
          label="Show on the home page"
          hint="Featured products appear under “Popular right now”."
          checked={draft.featured}
          onChange={(v) => set('featured', v)}
        />
        <Toggle
          label="Made to order"
          hint="Needs something from the customer — a name, photo, date or colour."
          checked={draft.personalised}
          onChange={(v) => set('personalised', v)}
        />

        {draft.personalised && (
          <Text
            label="What to ask the customer for"
            hint="Shown above the options and added to the WhatsApp message, e.g. “Tell us the name to engrave”."
            value={draft.personalisation_note}
            onChange={(v) => set('personalisation_note', v)}
          />
        )}

        <Text
          label="Colour or style choices"
          hint="Separate with commas, e.g. Pink, White, Yellow. Leave empty if there's only one version."
          value={draft.options}
          onChange={(v) => set('options', v)}
        />

        <Text
          label="Quantity that becomes a quote"
          hint="At this many, the button changes from “Order” to “Request a quote”."
          type="number"
          value={draft.bulk_from}
          onChange={(v) => set('bulk_from', v)}
        />
      </div>

      {error && <p className="mt-5 text-sm text-accent">{error}</p>}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-brand px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-60"
        >
          {busy ? 'Saving…' : product ? 'Save changes' : 'Add product'}
        </button>
        <Link
          href="/admin"
          className="rounded-full border border-app px-6 py-2.5 text-sm hover:border-brand hover:text-brand"
        >
          Cancel
        </Link>
        {product && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={busy}
            className="ml-auto text-sm text-accent hover:underline disabled:opacity-60"
          >
            Delete product
          </button>
        )}
      </div>
    </form>
  );
}

function Text({
  label,
  value,
  onChange,
  type = 'text',
  required,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  hint?: string;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '');
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        step={type === 'number' ? '0.01' : undefined}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-app bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-brand"
      />
      {hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>
  );
}

function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '');
  return (
    <div className="flex gap-3">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 size-4 accent-[var(--color-brand)]"
      />
      <div>
        <label htmlFor={id} className="block text-sm font-medium">
          {label}
        </label>
        {hint && <p className="text-xs text-muted">{hint}</p>}
      </div>
    </div>
  );
}
