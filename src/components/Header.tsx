import Link from 'next/link';
import { site } from '@/lib/config';
import { generalLink } from '@/lib/whatsapp';

const nav = [
  { href: '/shop', label: 'Shop all' },
  { href: '/shop?category=car-accessories', label: 'Car' },
  { href: '/shop?category=personalised', label: 'Personalised' },
  { href: '/shop?category=wall-art', label: 'Prints' },
  { href: '/quote', label: 'Custom order' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-app bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold">
          <span className="brand-gradient grid size-9 place-items-center rounded-2xl font-display text-sm font-semibold text-white shadow-soft">
            {site.monogram}
          </span>
          <span className="font-display text-lg tracking-tight">{site.name}</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-6 text-sm md:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-medium text-ink-soft transition-colors hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={generalLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brand-dark md:ml-0"
        >
          <WhatsAppGlyph className="size-4" />
          <span className="hidden sm:inline">WhatsApp us</span>
          <span className="sm:hidden">Chat</span>
        </a>
      </div>

      <nav className="flex gap-5 overflow-x-auto border-t border-app px-4 py-2.5 text-sm md:hidden">
        {nav.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="whitespace-nowrap font-medium text-ink-soft"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.97L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.13a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.1.81.83-3.03-.2-.31a8.19 8.19 0 0 1-1.25-4.37c0-4.54 3.7-8.23 8.24-8.23 4.54 0 8.23 3.69 8.23 8.23 0 4.54-3.69 8.22-8.27 8.22Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.96-.15.17-.29.19-.54.06-.25-.12-1.06-.39-2.02-1.24-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.01-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.48c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.17 1.7 2.6 4.12 3.64.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}
