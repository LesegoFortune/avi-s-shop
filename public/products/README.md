# Product photos

Drop a photo in here named after the product's slug and it appears on the site
automatically — no code change, no database needed.

The slug is the last part of the product's web address:
`/product/flower-seat-belt-pads` → `flower-seat-belt-pads.jpg`

Use `.jpg`, square-ish, and around 1000×1000 is plenty. Once Supabase is
connected you can upload photos from `/admin` instead, which overrides anything
in this folder.

All fourteen products in the starting catalogue have a photo here. Grids crop to
a square; the product page shows the whole photo, so a portrait shot is fine.

To swap one out, overwrite the file and keep the name the same.
