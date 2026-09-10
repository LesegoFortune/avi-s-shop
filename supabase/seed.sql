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

  ('Dino Hooded Onesie', 'dino-hooded-onesie', 'Plush fleece romper in bright green with a spiked tail and a hooded dinosaur face. Zips right up, keeps a toddler warm indoors, and gets worn far past pyjama time.', 'baby', 299, '[{"min_qty":3,"price":279}]', false, null, '["6-12 months","12-18 months","18-24 months","2-3 years"]', 5, true, false),

  ('Personalised Photo Phone Case', 'personalised-photo-phone-case', 'Your photo printed edge to edge on a shockproof case, with a matching flower wrist strap so it never slips out of your hand.', 'phone-cases', 249, '[{"min_qty":3,"price":229}]', true, 'Send the photo and your exact phone model', '["Orange","Blush pink","Cream","Sage"]', 5, true, false),

  ('“Dad & Me” Baby Tee', 'dad-and-me-baby-tee', 'Soft cotton tee scattered with pink hearts and a little fist bump between father and child. The photo everyone takes on Father’s Day.', 'baby', 189, '[{"min_qty":3,"price":175}]', true, 'Tell us the size you need', '["0-6 months","6-12 months","12-18 months","18-24 months","2-3 years"]', 5, true, false),

  ('Custom Photo Canvas', 'custom-photo-canvas', 'Your favourite family photo stretched over a wooden frame, ready to hang straight out of the box. Colours come out warm, not washed out.', 'wall-art', 599, '[{"min_qty":2,"price":549}]', true, 'Send the photo and pick your size', '["20x30cm","30x40cm","40x60cm","50x70cm"]', 3, true, false),

  ('Wedding Photo Phone Case', 'wedding-photo-phone-case', 'A glossy case printed with your own photo and a soft black bumper. Made for the couple who want the day on them all the time.', 'phone-cases', 229, '[{"min_qty":3,"price":209}]', true, 'Send the photo and your exact phone model', '["Glossy","Matte"]', 5, true, false),

  ('Personalised Dad Keyring', 'personalised-dad-keyring', 'Brushed steel dog tag engraved with a fist bump, hung with a little charm per child, each one engraved with their name.', 'personalised', 199, '[{"min_qty":3,"price":179}]', true, 'Send each child’s name, and tell us boy or girl for each charm', '["Black tag","Silver tag"]', 5, true, false),

  ('“The Day It All Began” Framed Print', 'day-it-all-began-framed-print', 'Your photo cut into a heart above the month it happened, with the date circled and both names down the side. An anniversary gift that lands.', 'wall-art', 449, '[{"min_qty":3,"price":419}]', true, 'Send the photo, both names, and the date to circle', '["A4","A3","Black frame","Oak frame"]', 5, true, false),

  ('“Super Mom” Phone Case', 'super-mom-phone-case', 'Matte black case with a mom-and-kids illustration in soft blue. No personalising needed, it just says it.', 'phone-cases', 199, '[{"min_qty":3,"price":179}]', true, 'Tell us your exact phone model', '["One child","Two children","Three children"]', 5, true, false),

  ('Spotify Photo Collage Print', 'spotify-photo-collage-print', 'Four of your photos around a scannable song code, so the track plays when anyone points a phone at it. Printed on thick matte paper.', 'wall-art', 349, '[{"min_qty":3,"price":319}]', true, 'Send four photos and the song you want the code for', '["20x30cm","30x40cm","40x60cm","50x70cm"]', 5, true, false),

  ('Personalised Moon Crystal Lamp', 'personalised-moon-crystal-lamp', 'A moon etched inside a glass sphere with your names and date, lit warm from a wooden base. Looks like a paperweight until you switch it on.', 'personalised', 449, '[{"min_qty":3,"price":419}]', true, 'Send both names and the date to engrave', '["Warm white light","Colour changing"]', 5, true, false),

  ('Personalised Birthday Newspaper', 'personalised-birthday-newspaper', 'A full front page made up about them, with your photos and their name in the headline. Guests read the whole thing at the party.', 'personalised', 299, '[{"min_qty":3,"price":279}]', true, 'Send the photos, the name, the age and anything you want written in', '["A3","A2"]', 5, true, false),

  ('Personalised Photo Glass Block', 'personalised-photo-glass-block', 'A thick square of glass with your photo printed inside it and your names underneath. Catches the light on a shelf all day.', 'personalised', 399, '[{"min_qty":3,"price":369}]', true, 'Send the photo and the names to print', '["10x10cm","15x15cm"]', 5, true, false),

  ('Personalised Photo Crystal Lamp', 'personalised-photo-crystal-lamp', 'Your photo etched into a glass ball inside a heart, names and date underneath, sitting on a warm wooden light base.', 'personalised', 429, '[{"min_qty":3,"price":399}]', true, 'Send the photo, both names and the date', '["Warm white light","Colour changing"]', 5, true, false),

  ('Personalised Song Plaque Print', 'personalised-song-plaque-print', 'One photo above a song title and a player bar, framed simply. The song you both claim as yours, on the wall.', 'wall-art', 329, '[{"min_qty":3,"price":299}]', true, 'Send the photo, the song name and the artist', '["A4","A3","Oak frame","Black frame"]', 5, true, false),

  ('Personalised Satin Bride Robe', 'personalised-satin-bride-robe', 'Soft satin robe with the name and title in gold script across the back. What the whole bridal party gets ready in.', 'personalised', 449, '[{"min_qty":4,"price":419},{"min_qty":6,"price":399}]', true, 'Send the name, title and date for each robe', '["White","Blush pink","Champagne","Black"]', 4, true, false),

  ('“Love” Definition Photo Print', 'love-definition-photo-print', 'Four of your photos above the word love written out like a dictionary entry, with both names in the definition.', 'wall-art', 399, '[{"min_qty":3,"price":369}]', true, 'Send four photos and both names', '["A4","A3","Black frame","Oak frame"]', 5, true, false),

  ('“Boyfriend” Gift Bag', 'boyfriend-gift-bag', 'Heavy white bag with a black satin bow and script lettering. Turns whatever you bought into a proper gift.', 'personalised', 89, '[{"min_qty":5,"price":79}]', false, null, '["Small","Medium","Large"]', 10, true, false),

  ('Trifold Baby Photo Frame', 'trifold-baby-photo-frame', 'Three little frames hinged together in white wood, so the newborn photos stand up on their own on a shelf.', 'baby', 349, '[{"min_qty":3,"price":319}]', true, 'Tell us the wording you want on each frame', '["White","Natural wood"]', 5, true, false),

  ('“Happy Birthday” Gift Bag', 'happy-birthday-gift-bag', 'The same heavy white bag with a black satin bow, lettered for a birthday. Buy a few, they get used all year.', 'personalised', 89, '[{"min_qty":5,"price":79}]', false, null, '["Small","Medium","Large"]', 10, true, false),

  ('“To My Mom” Acrylic Plaque', 'to-my-mom-acrylic-plaque', 'A pink acrylic stand cut to shape, printed with a long letter to your mom. The one people actually read all the way through.', 'personalised', 299, '[{"min_qty":3,"price":279}]', true, 'Tell us who it is from, and any wording you want changed', '["Pink","Clear","White"]', 5, true, false),

  ('Personalised Face Photo Blanket', 'personalised-face-photo-blanket', 'Fleece blanket printed with a cut-out face and name repeated across it. Ridiculous in the best way, and genuinely warm.', 'baby', 649, '[{"min_qty":2,"price":599}]', true, 'Send a clear face photo per person, plus the names', '["Pink","Blue","Grey","Cream"]', 3, true, false),

  ('Personalised Bridal Slippers', 'personalised-bridal-slippers', 'Fluffy cross-strap slippers with the name in gold across the toe. Bridesmaids put them on and do not take them off.', 'personalised', 349, '[{"min_qty":4,"price":329},{"min_qty":6,"price":309}]', true, 'Send the name and shoe size for each pair', '["White","Blush pink","Grey"]', 4, true, false),

  ('Personalised Baby Birth Stats Light', 'baby-birth-stats-light', 'Acrylic panel engraved with the birth date, time, weight and length beside three photos, lit warm from a wooden base.', 'baby', 449, '[{"min_qty":3,"price":419}]', true, 'Send the photos plus the full name, date, time, weight and length', '["Warm white light","Colour changing"]', 5, true, false),

  ('“To My Man” Acrylic Heart', 'to-my-man-acrylic-heart', 'A clear acrylic heart, printed with a letter to him and standing on its own. Small enough for a bedside table.', 'personalised', 299, '[{"min_qty":3,"price":279}]', true, 'Tell us any wording you want changed, and who it is from', '["Clear","Frosted"]', 5, true, false),

  ('Monogram Leather Phone Case', 'monogram-leather-phone-case', 'Soft leather-look case embossed with your initial in a floral letter, with a name and year underneath.', 'phone-cases', 249, '[{"min_qty":3,"price":229}]', true, 'Send your initial, the name, the year and your exact phone model', '["Brown","Black","Tan"]', 5, true, false),

  ('Personalised Family Mugs (Set of 2)', 'personalised-family-mugs', 'A pair of mugs printed with little cartoon versions of the kids and their names. The set that gets used every single morning.', 'drinkware', 299, '[{"min_qty":3,"price":279}]', true, 'Send each child’s name, and tell us boy or girl for each character', '["Mum & Dad","Gogo & Mkhulu","Custom wording"]', 5, true, false),

  ('Pink Dino Hooded Onesie', 'pink-dino-hooded-onesie', 'Bright pink fleece romper with a yellow tummy patch, a spiked tail and a dinosaur face on the hood. Zips down the front so nappy changes stay quick.', 'baby', 329, '[{"min_qty":2,"price":309}]', false, null, '["0-6 months","6-12 months","12-18 months","18-24 months"]', 5, true, false),

  ('Green Dino Onesie with Mittens', 'green-dino-hooded-onesie', 'Olive fleece dino romper with a white tummy and a toothy hood, and it comes with matching mittens for the cold mornings.', 'baby', 349, '[{"min_qty":2,"price":329}]', false, null, '["0-6 months","6-12 months","12-18 months","18-24 months"]', 5, true, false),

  ('Teddy Bear Hooded Onesie', 'teddy-bear-hooded-onesie', 'Chocolate brown teddy suit in thick fleece, with ears on the hood, a little tail at the back and covered feet. Buttons all the way down.', 'baby', 379, '[{"min_qty":2,"price":355}]', false, null, '["0-6 months","6-12 months","12-18 months","18-24 months"]', 5, true, false),

  ('Panda Hooded Onesie', 'panda-hooded-onesie', 'Soft black and white panda romper with the face on the hood. The one that gets photographed the most.', 'baby', 349, '[{"min_qty":2,"price":329}]', false, null, '["0-6 months","6-12 months","12-18 months","18-24 months"]', 5, true, false),

  ('Dino Romper & Hat Set', 'dino-romper-and-hat-set', 'Two pieces in 100 percent cotton muslin — a sleeveless romper with a spiked back and a matching dino hat. Made for summer, not for winter.', 'baby', 249, '[{"min_qty":3,"price":229}]', false, null, '["0-3 months","3-6 months","6-9 months"]', 5, true, false),

  ('Red Dragon Hooded Onesie', 'red-dragon-hooded-onesie', 'Red fleece romper with yellow spikes down the back and little horns on the hood. Warm enough to be the whole outfit indoors.', 'baby', 329, '[{"min_qty":2,"price":309}]', false, null, '["0-6 months","6-12 months","12-18 months","18-24 months"]', 5, true, false)
on conflict (slug) do nothing;
