export function SetupNotice() {
  return (
    <div className="surface rounded-2xl p-8">
      <h2 className="text-lg font-semibold">Connect Supabase to use the admin</h2>
      <p className="mt-2 text-sm text-muted">
        The shop is currently showing sample products. To manage your own
        catalogue:
      </p>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted">
        <li>
          Create a free project at{' '}
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            supabase.com/dashboard
          </a>
        </li>
        <li>
          Run <code className="rounded bg-brand-light px-1.5 py-0.5 text-brand">supabase/schema.sql</code>{' '}
          in the SQL editor
        </li>
        <li>
          Copy <code className="rounded bg-brand-light px-1.5 py-0.5 text-brand">.env.local.example</code>{' '}
          to <code className="rounded bg-brand-light px-1.5 py-0.5 text-brand">.env.local</code> and paste
          your project URL and anon key
        </li>
        <li>Restart the dev server</li>
      </ol>
      <p className="mt-4 text-sm text-muted">
        Full walkthrough is in <code className="rounded bg-brand-light px-1.5 py-0.5 text-brand">README.md</code>.
      </p>
    </div>
  );
}
