'use client';

import { useState } from 'react';
import { quoteFormLink, type QuoteFields } from '@/lib/whatsapp';
import { supabaseConfigured } from '@/lib/supabase/env';
import { WhatsAppGlyph } from './Header';

const empty: QuoteFields = {
  name: '',
  phone: '',
  occasion: '',
  product: '',
  quantity: '',
  neededBy: '',
  message: '',
};

export function QuoteForm() {
  const [fields, setFields] = useState<QuoteFields>(empty);
  const [logo, setLogo] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const set = (key: keyof QuoteFields) => (value: string) =>
    setFields((f) => ({ ...f, [key]: value }));

  /**
   * Best-effort: log the enquiry (and any logo) so it survives even if the
   * WhatsApp handoff never happens, then open the chat regardless.
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setNote(null);

    let logoUrl: string | null = null;

    if (supabaseConfigured) {
      try {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();

        if (logo) {
          const path = `${Date.now()}-${logo.name.replace(/[^\w.-]/g, '_')}`;
          const { error } = await supabase.storage
            .from('logos')
            .upload(path, logo);
          if (!error) {
            logoUrl = supabase.storage.from('logos').getPublicUrl(path).data
              .publicUrl;
          }
        }

        await supabase.from('quote_requests').insert({
          name: fields.name,
          phone: fields.phone,
          company: fields.occasion || null,
          product_name: fields.product || null,
          quantity: fields.quantity ? Number(fields.quantity) : null,
          needed_by: fields.neededBy || null,
          message: [fields.message, logoUrl && `Attachment: ${logoUrl}`]
            .filter(Boolean)
            .join('\n') || null,
        });
      } catch {
        setNote('We couldn’t save that, but WhatsApp will still open.');
      }
    }

    window.open(quoteFormLink(fields), '_blank', 'noopener,noreferrer');
    setBusy(false);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-soft sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" required value={fields.name} onChange={set('name')} />
        <Field
          label="Phone / WhatsApp"
          required
          type="tel"
          placeholder="082 123 4567"
          value={fields.phone}
          onChange={set('phone')}
        />
        <Field
          label="Occasion"
          optional
          placeholder="Birthday, bridal party, baby shower…"
          value={fields.occasion}
          onChange={set('occasion')}
        />
        <Field
          label="What would you like?"
          placeholder="e.g. 6 personalised tumblers"
          value={fields.product}
          onChange={set('product')}
        />
        <Field
          label="Quantity"
          type="number"
          placeholder="100"
          value={fields.quantity}
          onChange={set('quantity')}
        />
        <Field
          label="Needed by"
          type="date"
          optional
          value={fields.neededBy}
          onChange={set('neededBy')}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="block text-sm font-medium">
          Anything else? <span className="text-muted">(optional)</span>
        </label>
        <textarea
          id="message"
          rows={4}
          value={fields.message}
          onChange={(e) => set('message')(e.target.value)}
          placeholder="Names to engrave, colours, wording, delivery suburb…"
          className="mt-1.5 w-full rounded-xl border border-app bg-cream px-3.5 py-2.5 text-sm outline-none focus:border-brand"
        />
      </div>

      {supabaseConfigured && (
        <div className="mt-5">
          <label htmlFor="logo" className="block text-sm font-medium">
            Attach a photo or artwork{' '}
            <span className="text-muted">(optional)</span>
          </label>
          <input
            id="logo"
            type="file"
            accept="image/*,.pdf,.ai,.eps,.svg"
            onChange={(e) => setLogo(e.target.files?.[0] ?? null)}
            className="mt-1.5 w-full rounded-xl border border-app bg-cream px-3.5 py-2.5 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-brand-light file:px-3 file:py-1.5 file:text-brand"
          />
          <p className="mt-1.5 text-xs text-muted">
            Easiest is to send it on WhatsApp — but you can upload it here if
            you prefer.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={busy}
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brand-dark disabled:opacity-60"
      >
        <WhatsAppGlyph className="size-4" />
        {busy ? 'Opening WhatsApp…' : 'Send on WhatsApp'}
      </button>

      {note && <p className="mt-3 text-center text-xs text-accent">{note}</p>}

      <p className="mt-3 text-center text-xs text-muted">
        This opens WhatsApp with your details filled in. Nothing is charged.
      </p>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
  optional,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '');
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
        {optional && <span className="text-muted"> (optional)</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-app bg-cream px-3.5 py-2.5 text-sm outline-none focus:border-brand"
      />
    </div>
  );
}
