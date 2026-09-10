'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient, supabaseConfigured } from '@/lib/supabase/client';
import { SetupNotice } from '@/components/admin/SetupNotice';

export default function LoginPage() {
  if (!supabaseConfigured) return <SetupNotice />;
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(
    params.get('error') === 'not-allowed'
      ? 'That account isn’t on the admin list.'
      : null,
  );
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const { error } = await createClient().auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setBusy(false);
      return;
    }

    router.replace(params.get('next') ?? '/admin');
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="surface mx-auto max-w-sm rounded-2xl p-7"
    >
      <h2 className="text-lg font-semibold">Sign in</h2>
      <p className="mt-1 text-sm text-muted">
        Use the account you created in Supabase.
      </p>

      <label htmlFor="email" className="mt-6 block text-sm font-medium">
        Email
      </label>
      <input
        id="email"
        type="email"
        required
        autoComplete="username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-app bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-brand"
      />

      <label htmlFor="password" className="mt-4 block text-sm font-medium">
        Password
      </label>
      <input
        id="password"
        type="password"
        required
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-app bg-transparent px-3.5 py-2.5 text-sm outline-none focus:border-brand"
      />

      {error && <p className="mt-4 text-sm text-accent">{error}</p>}

      <button
        type="submit"
        disabled={busy}
        className="mt-6 w-full rounded-full bg-brand px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-60"
      >
        {busy ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
