import Link from 'next/link';
import { supabaseConfigured } from '@/lib/supabase/env';
import { SignOutButton } from '@/components/admin/SignOutButton';

export const metadata = { title: 'Admin' };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-app pb-4">
        <h1 className="text-xl font-semibold tracking-tight">Admin</h1>
        <nav className="flex gap-5 text-sm">
          <Link href="/admin" className="text-muted hover:text-brand">
            Products
          </Link>
          <Link href="/admin/enquiries" className="text-muted hover:text-brand">
            Enquiries
          </Link>
          <Link href="/" className="text-muted hover:text-brand">
            View shop
          </Link>
        </nav>
        {supabaseConfigured && (
          <div className="ml-auto">
            <SignOutButton />
          </div>
        )}
      </div>

      <div className="mt-8">{children}</div>
    </div>
  );
}
