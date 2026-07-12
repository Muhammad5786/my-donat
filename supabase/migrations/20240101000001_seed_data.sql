insert into public.categories (id, name, slug, description, sort_order, is_visible)
values
  ('11111111-1111-1111-1111-111111111111', 'Donat', 'donat', 'Donat mini premium dan varian savory.', 1, true),
  ('22222222-2222-2222-2222-222222222222', 'Brownies & Kue', 'brownies-kue', 'Brownies premium dan kue homemade.', 2, true),
  ('33333333-3333-3333-3333-333333333333', 'Bolu', 'bolu', 'Bolu lembut dan klasik.', 3, true)
on conflict (id) do nothing;

insert into public.products (
  id,
  category_id,
  name,
  slug,
  description,
  price_label,
  is_visible,
  is_featured,
  sort_order
)
values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Domini', 'domini', 'Donat mini premium dengan berbagai topping. Perfect for sharing, aesthetic presentation, and sweet gifts.', '12 pcs - Rp 60.000', true, true, 1),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'DonPiz', 'donpiz', 'Mini donut pizza with bolognese, mozzarella, and real chicken. Savory meets sweet.', '12 pcs - Rp 70.000', true, true, 2),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111', 'Big Donut', 'big-donut', 'Donat ukuran besar dengan topping premium.', '6 pcs - Rp 50.000', true, true, 3),
  ('dddddddd-dddd-dddd-dddd-ddddddddddddd', '11111111-1111-1111-1111-111111111111', 'Bomboloni', 'bomboloni', 'Italian-style filled donuts, soft and pillowy with creamy fillings.', '8 pcs Rp 40k / 10 pcs Rp 50k', true, true, 4),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '22222222-2222-2222-2222-222222222222', 'Fudgy Brownies', 'fudgy-brownies', 'Premium baked brownies with high quality chocolate and butter. Various toppings available. Can ship nationwide!', 'Hubungi kami', true, false, 1),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', '22222222-2222-2222-2222-222222222222', 'Brownies Kukus', 'brownies-kukus', 'Steamed brownies with a moist, rich texture. Classic Indonesian favourite.', 'Hubungi kami', true, false, 2),
  ('10101010-1010-1010-1010-101010101010', '22222222-2222-2222-2222-222222222222', 'Rollcake', 'rollcake', 'Premium butter rollcake with generous, creamy fillings.', 'Hubungi kami', true, false, 3),
  ('12121212-1212-1212-1212-121212121212', '33333333-3333-3333-3333-333333333333', 'Bolu Tape', 'bolu-tape', 'Soft sponge cake made with traditional tape fermented cassava. Uniquely Indonesian.', 'Hubungi kami', true, false, 1),
  ('13131313-1313-1313-1313-131313131313', '33333333-3333-3333-3333-333333333333', 'Bolu Pisang', 'bolu-pisang', 'Moist banana sponge cake with a warm homemade aroma.', 'Hubungi kami', true, false, 2)
on conflict (id) do nothing;

insert into public.product_images (id, product_id, storage_path, alt_text, is_primary, sort_order)
values
  ('1a1a1a1a-1a1a-1a1a-1a1a-1a1a1a1a1a1a', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'domini1.jpg', 'Domini Donat Mini', true, 1),
  ('1b1b1b1b-1b1b-1b1b-1b1b-1b1b1b1b1b1b', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'donpiz1.jpg', 'DonPiz Donut Pizza', true, 1),
  ('1c1c1c1c-1c1c-1c1c-1c1c-1c1c1c1c1c1c', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'bigdonut1.jpg', 'Big Donut', true, 1),
  ('1d1d1d1d-1d1d-1d1d-1d1d-1d1d1d1d1d1d', 'dddddddd-dddd-dddd-dddd-ddddddddddddd', 'bomboloni1.jpg', 'Bomboloni', true, 1),
  ('1e1e1e1e-1e1e-1e1e-1e1e-1e1e1e1e1e1e', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'fudgy1.jpg', 'Fudgy Brownies', true, 1),
  ('1f1f1f1f-1f1f-1f1f-1f1f-1f1f1f1f1f1f', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'kukus1.jpg', 'Brownies Kukus', true, 1),
  ('20202020-2020-2020-2020-202020202020', '10101010-1010-1010-1010-101010101010', 'rollcake1.jpg', 'Rollcake', true, 1),
  ('21212121-2121-2121-2121-212121212121', '12121212-1212-1212-1212-121212121212', 'tape1.jpg', 'Bolu Tape', true, 1),
  ('22222222-2222-2222-2222-222222222222', '13131313-1313-1313-1313-131313131313', 'pisang1.jpg', 'Bolu Pisang', true, 1)
on conflict (id) do nothing;

insert into public.product_tags (id, product_id, label, color_class)
values
  ('2a2a2a2a-2a2a-2a2a-2a2a-2a2a2a2a2a2a', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Best Seller', 'bg-[#D77FA1]'),
  ('2b2b2b2b-2b2b-2b2b-2b2b-2b2b2b2b2b2b', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Savory', 'bg-[#A07898]'),
  ('2c2c2c2c-2c2c-2c2c-2c2c-2c2c2c2c2c2c', 'dddddddd-dddd-dddd-dddd-ddddddddddddd', 'Filling', 'bg-[#b5a0d8]'),
  ('2d2d2d2d-2d2d-2d2d-2d2d-2d2d2d2d2d2d', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Ship Nationwide', 'bg-[#6B4C5E]')
on conflict (id) do nothing;
