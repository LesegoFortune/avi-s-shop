-- Sugar & Soul Finds — database schema
-- Paste this whole file into the Supabase SQL editor and run it once.

-- ---------------------------------------------------------------------------
-- Products
-- ---------------------------------------------------------------------------
create table if not exists public.products (
  id                    uuid primary key default gen_random_uuid(),
  created_at            timestamptz not null default now(),
  name                  text not null,
  slug                  text not null unique,
  description           text,
  category              text not null default 'car-accessories',
  price                 numeric(10, 2) not null default 0,
  tiers                 jsonb not null default '[]'::jsonb,
  personalised          boolean not null default true,
  personalisation_note  text,
  options               jsonb not null default '[]'::jsonb,
  bulk_from             integer not null default 10,
  image_url             text,
  in_stock              boolean not null default true,
  featured              boolean not null default false
);

create index if not exists products_category_idx on public.products (category);
create index if not exists products_featured_idx on public.products (featured);

alter table public.products enable row level security;

-- Anyone can read the catalogue.
drop policy if exists "products are public" on public.products;
create policy "products are public"
  on public.products for select
  using (true);

-- Only signed-in admins can change it.
drop policy if exists "admins manage products" on public.products;
create policy "admins manage products"
  on public.products for all
  to authenticated
  using (true)
  with check (true);

-- ---------------------------------------------------------------------------
-- Quote enquiries
-- ---------------------------------------------------------------------------
create table if not exists public.quote_requests (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null,
  phone         text not null,
  email         text,
  company       text, -- also used for the occasion on the custom order form
  product_name  text,
  quantity      integer,
  needed_by     date,
  message       text,
  status        text not null default 'new'
                check (status in ('new', 'quoted', 'won', 'lost'))
);

alter table public.quote_requests enable row level security;

-- Visitors can submit an enquiry...
drop policy if exists "anyone can submit an enquiry" on public.quote_requests;
create policy "anyone can submit an enquiry"
  on public.quote_requests for insert
  to anon, authenticated
  with check (true);

-- ...but only admins can read them back.
drop policy if exists "admins read enquiries" on public.quote_requests;
create policy "admins read enquiries"
  on public.quote_requests for select
  to authenticated
  using (true);

drop policy if exists "admins update enquiries" on public.quote_requests;
create policy "admins update enquiries"
  on public.quote_requests for update
  to authenticated
  using (true)
  with check (true);

-- ---------------------------------------------------------------------------
-- Storage buckets
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('logos', 'logos', true)
on conflict (id) do nothing;

drop policy if exists "product images are public" on storage.objects;
create policy "product images are public"
  on storage.objects for select
  using (bucket_id in ('product-images', 'logos'));

drop policy if exists "admins upload product images" on storage.objects;
create policy "admins upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

drop policy if exists "admins replace product images" on storage.objects;
create policy "admins replace product images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images');

drop policy if exists "admins delete product images" on storage.objects;
create policy "admins delete product images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');

-- Customers attaching artwork to a quote can write, but not list, the bucket.
drop policy if exists "anyone can upload a logo" on storage.objects;
create policy "anyone can upload a logo"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'logos');
