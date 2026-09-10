import { createClient } from '@/lib/supabase/server';
import { supabaseConfigured } from '@/lib/supabase/env';
import type { QuoteRequest } from '@/lib/types';
import { SetupNotice } from '@/components/admin/SetupNotice';

export default async function EnquiriesPage() {
  if (!supabaseConfigured) return <SetupNotice />;

  const supabase = await createClient();
  const { data, error } = await supabase!
    .from('quote_requests')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) {
    return (
      <p className="surface rounded-2xl p-8 text-sm text-accent">
        Couldn&apos;t load enquiries: {error.message}
      </p>
    );
  }

  const enquiries = (data ?? []) as QuoteRequest[];

  return (
    <>
      <h2 className="text-lg font-semibold">Quote enquiries</h2>
      <p className="text-sm text-muted">
        Everything submitted through the bulk quote form, newest first. These are
        a backup — the customer also lands in your WhatsApp.
      </p>

      {enquiries.length === 0 ? (
        <p className="surface mt-6 rounded-2xl p-10 text-center text-muted">
          No enquiries yet.
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {enquiries.map((q) => (
            <li key={q.id} className="surface rounded-2xl p-5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="font-medium">{q.name}</p>
                {q.company && (
                  <p className="text-sm text-muted">{q.company}</p>
                )}
                <p className="ml-auto text-xs text-muted">
                  {new Date(q.created_at).toLocaleString('en-ZA')}
                </p>
              </div>

              <p className="mt-2 text-sm">
                {q.quantity ? `${q.quantity} × ` : ''}
                {q.product_name ?? 'Unspecified item'}
                {q.needed_by && (
                  <span className="text-muted">
                    {' '}
                    · needed by {q.needed_by}
                  </span>
                )}
              </p>

              {q.message && (
                <p className="mt-2 text-sm whitespace-pre-line text-muted">
                  {q.message}
                </p>
              )}

              <div className="mt-3 flex gap-4 text-sm">
                <a
                  href={`https://wa.me/${q.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline"
                >
                  WhatsApp {q.phone}
                </a>
                <a href={`tel:${q.phone}`} className="text-muted hover:text-brand">
                  Call
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
