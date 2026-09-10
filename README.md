# Little Curated

Cute car accessories and personalised gifts — a catalogue site with WhatsApp
ordering and a browser-based admin. No card payments: customers order or request
a quote over WhatsApp, and you confirm payment by EFT or cash.

Built with Next.js 16, Tailwind 4 and Supabase.

## Two ways customers buy

| Path | Who it's for | What happens |
| --- | --- | --- |
| **Order on WhatsApp** | Someone buying one or a few | Product page → pick colour and quantity → WhatsApp opens with the item, choice, quantity and price filled in |
| **Request a quote** | Sets and bigger runs | `/quote` form, or a large quantity on any product → WhatsApp opens with the details and deadline |

The product page switches between the two automatically once the quantity
reaches that product's **Quantity that becomes a quote** setting.

Products marked **Made to order** also add a line to the WhatsApp message
prompting the customer for what you need — the name to engrave, the photo, the
date — so nothing gets missed in the first reply.

## Running it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. It works immediately using the starting catalogue in
`src/lib/seed.ts` — no database needed to look around.

### Adding your product photos

Drop a photo into `public/products/` named after the product's slug and it
appears straight away:

```
public/products/flower-seat-belt-pads.jpg
public/products/just-a-girl-car-decal.jpg
```

The slug is the last part of the product's web address. Until a photo exists,
the card shows a pastel placeholder in that category's colour, so nothing looks
broken. Once Supabase is connected you can upload photos from `/admin` instead,
which overrides this folder.

## Going live

### 1. Set your WhatsApp number

```bash
cp .env.local.example .env.local
```

Set `NEXT_PUBLIC_WHATSAPP_NUMBER` to your number in full international format,
digits only — `082 123 4567` becomes `27821234567`. Get this right before
showing anyone the site; every order button depends on it.

### 2. Create the database (free)

1. Create a project at [supabase.com/dashboard](https://supabase.com/dashboard)
2. Open **SQL Editor**, paste in all of `supabase/schema.sql`, and run it.
   This creates the tables, the security rules and the image buckets.
3. Optionally run `supabase/seed.sql` too, to load the starting catalogue.
   It is generated from `src/lib/seed.ts`, so the two match.
4. Go to **Settings → API** and copy the *Project URL* and the *anon public*
   key into `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```

Both keys are safe in the browser — row-level security is what protects the
data, and the schema locks writes to signed-in accounts.

### 3. Create your admin login

In Supabase: **Authentication → Users → Add user**. Use your email and a strong
password, and tick *Auto Confirm User*.

Then set `ADMIN_EMAILS` in `.env.local` to that email. Anyone who somehow
creates another account still can't reach `/admin`.

Restart the dev server and sign in at http://localhost:3000/admin.

### 4. Deploy

Steps 2 and 3 are optional — the shop deploys and sells fine without a
database, running off `src/lib/seed.ts`. That is how it went live.

The repo is connected to GitHub, so Vercel deploys it automatically:

```bash
git push -u origin main
```

Then at [vercel.com/new](https://vercel.com/new), import
`LesegoFortune/avi-s-shop`. Vercel detects Next.js on its own — leave the build
settings alone. Before the first deploy, add one environment variable under
**Environment Variables**:

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `27788287195` |

That is the only one needed to go live. Add the Supabase pair and
`ADMIN_EMAILS` later, when you do step 2 — until then `/admin` shows a setup
notice instead of breaking.

You get a free `avi-s-shop.vercel.app` address straight away; point a real
domain at it later in **Settings → Domains**. Every future `git push` to `main`
redeploys the site.

#### Changing products before there's a database

Until Supabase exists, the catalogue lives in code. Edit `src/lib/seed.ts` and
the matching row in `supabase/seed.sql` — keep the two in step — then commit and
push. The site redeploys in about a minute.

## Running the shop day to day

Everything happens at `/admin` in the browser — no code, no developer.

- **Products** — add, edit and delete items, upload photos, set the single price
  and each quantity break for sets.
- **Made to order** — turn on for anything needing a name, photo, date or colour
  from the customer, and write what to ask them for.
- **Colour or style choices** — a comma-separated list becomes tappable pills on
  the product page, and the chosen one lands in the WhatsApp message.
- **In stock** toggle — shows "Sold out" on the card without deleting the
  product, so you keep the photo and description for next time.
- **Show on the home page** — controls what appears under *Everyone's favourites*.
- **Enquiries** — every bulk quote form submission, newest first, with a link
  that opens WhatsApp to that customer. This is a backup in case a chat gets
  lost, not your main inbox.

## Changing the shop's details

| What | Where |
| --- | --- |
| Shop name, tagline, contact details | `src/lib/config.ts` |
| Product categories | `categories` in `src/lib/config.ts` |
| Colours and fonts | `@theme` block at the top of `src/app/globals.css` |
| Which pastel a category uses | `tint` on each entry in `categories` |
| Home page copy and sections | `src/app/page.tsx` |
| Wording of WhatsApp messages | `src/lib/whatsapp.ts` |
| Starting catalogue (pre-database) | `src/lib/seed.ts` |
| Product photos | `public/products/<slug>.jpg` |

Categories are stored as free text in the database, so adding one only means
editing `config.ts` — no migration needed.

## Project layout

```
src/
  app/
    page.tsx                 home
    shop/                    catalogue with category filters
    product/[slug]/          product detail + order/quote switch
    quote/                   custom order form
    admin/                   login, products, enquiries
  components/                Header, Footer, ProductCard, OrderPanel, QuoteForm
  lib/
    config.ts                shop settings
    products.ts              reads Supabase, falls back to sample data
    whatsapp.ts              builds the wa.me links
    supabase/                browser, server and session clients
  proxy.ts                   guards /admin
supabase/
  schema.sql                 run once
  seed.sql                   optional sample catalogue
```

## Notes

- Prices are per item in ZAR and exclude delivery. Larger quantities show an
  estimate, clearly labelled, because those get quoted per job.
- The site is fully server-rendered, so products are indexable by Google.
- Nothing is charged anywhere in this app — there is no payment integration to
  secure or maintain.
