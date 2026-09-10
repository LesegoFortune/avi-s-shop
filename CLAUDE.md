# Little Curated — context for Claude

Read this before making changes. It captures decisions made in the conversation
that built this project, which aren't obvious from the code alone.

## What the business is

Little Curated sells **cute car accessories and personalised gifts** in South
Africa — flower seat belt pads, car window decals, cup holder coasters, air vent
clips, steering wheel covers, personalised frosted-glass tumblers for bridal
parties, engraved silicone baby feeding sets, acrylic photo-calendar keepsakes
and framed prints.

It is a **separate venture** from the owner's poultry farm. Don't mix branding
or customers between them.

This is **not** corporate logo-branded merchandise. It's consumer-facing, girly
décor and keepsakes. An earlier version of this project wrongly assumed
corporate branded bottles — if any wording still reads that way, it's a leftover
and should be fixed.

## Decisions already made — don't relitigate these

- **No card payments.** Customers order or request a quote over WhatsApp; the
  owner confirms payment by EFT or cash. There is deliberately no payment
  integration. Don't add Payfast/Yoco/Stripe unless asked.
- **Two buying paths.** Small quantities open a straight WhatsApp order; at a
  product's `bulk_from` quantity the button becomes "Request a quote".
- **Made to order, not branding.** `personalised` + `personalisation_note` +
  `options` cover what the customer must supply (name, photo, date, colour).
  There is no logo/artwork branding model.
- **Personalisation details come via WhatsApp** by preference. On-site upload
  exists on the custom order form but is intentionally optional and
  de-emphasised.
- **WhatsApp is the only contact channel.** There is deliberately no public
  email address — the shop has no domain, so any address would bounce. The
  `email` field and `NEXT_PUBLIC_CONTACT_EMAIL` were removed rather than left
  pointing at a dead mailbox. Add one back only when a real inbox exists.
- **Bright palette, rose plus the logo's gold.** Rose stays the primary action
  colour but was softened from the old hot pink (#f43f84 -> #e04a80) so it sits
  with the gold rather than fighting it. Gold from the badge is the accent:
  `gold` for decoration, `gold-ink` for text on light grounds (the bright gold
  fails contrast), `gold-light` for tinted chips. Each category keeps its
  pastel. A teal/amber theme was explicitly rejected.
- **The logo is a black-and-gold badge** at `public/logo.jpg`, also the favicon
  via `src/app/icon.png`. It is detailed, so it is shown small beside the
  wordmark rather than used alone; it is cropped tight to the ring because the
  original had white margin that shrank the mark at header size.
- **Light theme only.** `globals.css` sets `color-scheme: light` and has no
  `prefers-color-scheme: dark` block. The owner asked for bright and modern; a
  dark scheme made the product photos look grubby. Don't reintroduce one.
- **Type pairing.** Fraunces (soft serif) for headings, Plus Jakarta Sans for
  body, wired up in `layout.tsx` via `next/font`. Headings pick the serif up
  automatically from the `h1, h2, h3` rule; use `font-display` elsewhere.
- **Supabase for database, auth and image storage**, deployed on Vercel. The
  catalogue falls back to `src/lib/seed.ts` when Supabase env vars are absent,
  so the site runs before any database exists — keep that fallback working.

## Outstanding work

1. **Many photos are supplier listing images, not own photography.** They carry
   overlay text that now shows on the live site — “CUSTOMITED” on the tumbler,
   “Custom photo” and “CUSTOM CANVAS” on several of the newer items, a size
   chart on the Spotify collage print, “Over 500 positive reviews” on the
   trifold baby frame, a “Fleece · S-VERIFIED” stamp on the animal onesies,
   and a **SHEIN watermark on the “To My Man” acrylic heart** (a competitor's
   brand on the shop's own product page). The seat belt
   pad shot is a four-up supplier collage, and the Dino Hooded Onesie is a
   candid home snapshot with a child in frame. All live as-is at the owner's
   request; worth replacing with own photography as stock arrives.
2. **Prices are estimates**, written by Claude against a guess at the SA market.
   They need replacing with real numbers — this now covers all 40 products, and
   the 31 added after the first batch were never priced by the owner at all.
3. **Launched on seed data, no Supabase yet.** This was a deliberate call: the
   shop is fully browsable from `src/lib/seed.ts`, and `/admin` shows a setup
   notice instead of breaking. Until a project exists, product edits mean
   changing `seed.ts` and `seed.sql` together and redeploying. Steps to add
   Supabase later are in `README.md`.
4. **Coaster wording.** The real product reads "Don't f*** up the car". It is
   listed as "Cheeky Cup Holder Coasters" with softened wording, pending the
   owner's decision. Don't change it back without being asked. Note the
   photo now on the site shows the unsoftened wording, so the two disagree.
5. **No domain yet.** Plan is a free `*.vercel.app` address first, a `.co.za`
   later.

## Conventions

- `src/lib/config.ts` is the single place for shop name, contact details and
  categories. The shop has been renamed twice — "Avi's Shop", then "Sugar &
  Soul Finds", now **Little Curated**. `site.name`, `site.monogram` and
  `site.logo` all live there, so nothing else should hardcode the brand. Each category carries a `tint` that
  drives its pastel everywhere, and a `photo` — the slug of a product whose
  picture fronts that category on the home page.
- `src/lib/seed.ts` and `supabase/seed.sql` must stay in step — the SQL is
  generated from the TypeScript.
- `ProductImage` falls back through uploaded URL → `public/products/<slug>.jpg`
  → a pastel placeholder. Never let a missing photo render as broken. It crops
  (`cover`) in grids and shows the whole photo (`fit="contain"`) on the product
  page, because the catalogue mixes portrait prints with square accessories.
- Prices are ZAR, per item, excluding delivery. Any total shown for a
  quote-sized quantity must be labelled an estimate.
- Copy is written in South African English ("personalised", "colour") and reads
  plainly, not like marketing filler.

## Commands

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
npx tsc --noEmit
```
