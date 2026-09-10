'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function SignOutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={async () => {
        await createClient().auth.signOut();
        router.replace('/admin/login');
      }}
      className="text-sm text-muted hover:text-brand"
    >
      Sign out
    </button>
  );
}
