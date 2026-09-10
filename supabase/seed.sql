-- Optional: load the starting catalogue so the shop is not empty on day one.
-- Run after schema.sql, then edit prices and wording in /admin.
--
-- Generated from src/lib/seed.ts — keep the two in step if you edit either.

insert into public.products
  (name, slug, description, category, price, tiers,
   personalised, personalisation_note, options, bulk_from, in_stock, featured)
values
  ('Flower Seat Belt Pads (Set of 2)', 'flower-seat-belt-pads', 'Soft padded shoulder covers with beaded flower appliqués and a rhinestone centre. Velcro on, no fiddling — and no more seat belt digging into your shoulder.', 'car-accessories', 159, '[{"min_qty":5,"price":145},{"min_qty":10,"price":129}]', true, 'Tell us which flower colour you want', '["White daisy","Pink","Orange","Yellow"]', 10, true, true),

  ('Personalised Frosted Glass Tumbler', 'personalised-frosted-glass-tumbler', 'Frosted glass can with a bamboo lid and reusable straw, with the name of your choice in script. The bridesmaid gift everyone actually keeps.', 'drinkware', 189, '[{"min_qty":4,"price":175},{"min_qty":6,"price":165},{"min_qty":10,"price":155}]', true, 'Send the name for each tumbler, plus any title like “Bride” or “Maid of honour”', '["Blush pink","Clear frosted","White"]', 6, true, true),

  ('Personalised Acrylic Photo Calendar', 'personalised-acrylic-photo-calendar', 'Clear acrylic keepsake on a stand, printed with your photo, the month and year, and the special day circled in a heart. Add a Spotify code and the song plays when they scan it.', 'personalised', 399, '[{"min_qty":3,"price":369}]', true, 'Send the photo, the name, the date to circle, and the song if you want a Spotify code', '[]', 5, true, true),

  ('Personalised Silicone Baby Feeding Set', 'personalised-silicone-baby-feeding-set', 'Seven pieces in food-grade silicone — suction bowl, divided plate, bib, cup, spoon, fork and scoop — engraved with your little one’s name. Dishwasher safe and soft on new gums.', 'baby', 649, '[{"min_qty":3,"price":599}]', true, 'Tell us the baby’s name and the colour you’d like', '["Dusty rose","Sage","Beige","Grey"]', 5, true, true),

  ('“Just a Girl” Car Decal', 'just-a-girl-car-decal', '“Please be patient, I’m just a girl.” in a retro script with a coquette bow underneath. Weatherproof vinyl that peels off cleanly when you’re over it.', 'decals', 89, '[{"min_qty":5,"price":79},{"min_qty":10,"price":69}]', true, 'Pick your colour', '["Bubblegum pink","Baby blue","White"]', 10, true, true),

  ('Princess on Board Decal', 'princess-on-board-decal', 'Blowing-a-kiss silhouette in soft pink for the back window. Cut vinyl, no background — it looks painted on.', 'decals', 79, '[{"min_qty":5,"price":69}]', true, 'Pick your colour', '["Pink","White","Black"]', 10, true, false),

  ('Cartoon Fuel Cap Decal', 'cartoon-fuel-cap-decal', 'Cheeky little mouse holding the pump, sized for a fuel flap. Makes the petrol price sting slightly less.', 'decals', 79, '[{"min_qty":5,"price":69}]', true, 'Tell us your fuel type for the nozzle — 93, 95 or diesel', '["95 unleaded","93 unleaded","Diesel"]', 10, true, false),

  ('Cheeky Cup Holder Coasters (Set of 2)', 'cheeky-cup-holder-coasters', 'Pink silicone coasters for your cup holders, with the viral “Don’t mess up the car — please” print. Catches every spill and every passenger’s attention.', 'car-accessories', 129, '[{"min_qty":5,"price":115}]', false, null, '["Pink","Black"]', 10, true, false),

  ('Flower Air Vent Clips (Set of 4)', 'flower-air-vent-clips', 'Enamel daisies with gold centres that clip onto your air vents in two sizes. Add a drop of your own oil and they double as a diffuser.', 'car-accessories', 119, '[{"min_qty":5,"price":105}]', true, 'Pick your colour', '["Pink","White","Yellow"]', 10, true, true),

  ('Floral Steering Wheel Cover', 'floral-steering-wheel-cover', 'Stretch-fit cover in black with pink blossoms scattered around it. Grippy in traffic, and it hides a sun-faded wheel.', 'car-accessories', 199, '[{"min_qty":5,"price":179}]', false, null, '["Pink flowers","White flowers"]', 10, true, false),

  ('360° Car Headrest Hooks (Set of 2)', 'car-headrest-hooks', 'Rotating hooks that clip behind the headrest and swing a full circle, so handbags and shopping stop tipping over on the corners.', 'car-accessories', 89, '[{"min_qty":5,"price":79}]', true, 'Pick your colour', '["Black","White","Beige"]', 10, true, false),

  ('Personalised Framed Calendar Print', 'personalised-framed-calendar-print', 'Framed print pairing a favourite photo with the month it happened, a quote of your choosing and the date circled. A birthday or anniversary gift that goes straight on the wall.', 'personalised', 449, '[{"min_qty":3,"price":419}]', true, 'Send the photo, the full name, the date, and the quote you want on it', '["White frame","Black frame","Oak frame"]', 5, true, false),

  ('Line Art Framed Print', 'line-art-framed-print', 'Single-line drawing of a woman in a towel turban, framed in light oak. Quiet, modern and it suits any bedroom or bathroom.', 'wall-art', 399, '[{"min_qty":3,"price":369}]', true, 'Pick your frame and size', '["A4","A3","Oak frame","Black frame"]', 5, true, false),

  ('“God Made a Way” Print', 'god-made-a-way-print', '“Long story short, God made a way.” Set in an elegant serif with a soft metallic finish that catches the light.', 'wall-art', 349, '[{"min_qty":3,"price":319}]', true, 'Pick your size and finish', '["A4","A3","Champagne","Matte black"]', 5, true, false),

  ('Dino Hooded Onesie', 'dino-hooded-onesie', 'Plush fleece romper in bright green with a spiked tail and a hooded dinosaur face. Zips right up, keeps a toddler warm indoors, and gets worn far past pyjama time.', 'baby', 299, '[{"min_qty":3,"price":279}]', false, null, '["6-12 months","12-18 months","18-24 months","2-3 years"]', 5, true, false)
on conflict (slug) do nothing;
