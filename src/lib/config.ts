/** Site-wide settings. Change these in one place. */
export const site = {
  name: 'Sugar & Soul Finds',
  /** Shown in the header badge. Kept here so it can't drift from the name. */
  monogram: 'S&S',
  tagline: 'Cute car accessories & personalised gifts',
  blurb:
    'Girly car décor, decals and one-of-a-kind personalised keepsakes — engraved, printed and shipped across South Africa.',
  // Contact is WhatsApp only — there is deliberately no public email address
  // until the shop has a domain with a real mailbox behind it.
  // Full international format, digits only. e.g. 27821234567
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '27788287195',
  currency: 'R',
} as const;

/**
 * `tint` picks the pastel used for this category across tiles and badges, so
 * adding a category keeps the palette consistent without extra styling.
 * `photo` is the slug of a product whose picture stands in for the category on
 * the home page — so category tiles show real stock, not a coloured square.
 */
export const categories = [
  {
    slug: 'car-accessories',
    label: 'Car Accessories',
    tint: 'rose',
    photo: 'flower-seat-belt-pads',
  },
  {
    slug: 'decals',
    label: 'Decals & Stickers',
    tint: 'lilac',
    photo: 'just-a-girl-car-decal',
  },
  {
    slug: 'personalised',
    label: 'Personalised Gifts',
    tint: 'peach',
    photo: 'personalised-acrylic-photo-calendar',
  },
  {
    slug: 'drinkware',
    label: 'Tumblers & Drinkware',
    tint: 'mint',
    photo: 'personalised-frosted-glass-tumbler',
  },
  {
    slug: 'wall-art',
    label: 'Prints & Wall Art',
    tint: 'sky',
    photo: 'line-art-framed-print',
  },
  {
    slug: 'baby',
    label: 'Baby & Kids',
    tint: 'rose',
    photo: 'personalised-silicone-baby-feeding-set',
  },
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];
export type Tint = (typeof categories)[number]['tint'];

export function categoryLabel(slug: string) {
  return categories.find((c) => c.slug === slug)?.label ?? 'Other';
}

export function categoryTint(slug: string): Tint {
  return categories.find((c) => c.slug === slug)?.tint ?? 'rose';
}

/** Tailwind classes per pastel, kept here so tiles and badges always match. */
export const tintClasses: Record<Tint, string> = {
  rose: 'bg-rose-tint text-rose-ink',
  lilac: 'bg-lilac-tint text-lilac-ink',
  peach: 'bg-peach-tint text-peach-ink',
  mint: 'bg-mint-tint text-mint-ink',
  sky: 'bg-sky-tint text-sky-ink',
};

/** Emails allowed into /admin. Comma-separated in env. */
export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}
