-- ============================================================
-- ARCADA Original Tile — Complete Database Seed
-- Run in Supabase SQL Editor AFTER schema.sql and rls.sql
-- ============================================================

-- ── STEP 1: RESET (delete old data) ─────────────────────────
-- Run this block first to wipe old NorthernWest data
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM product_variants;
DELETE FROM products;
DELETE FROM categories;

-- Reset sequences (optional, UUIDs don't need this)
-- ────────────────────────────────────────────────────────────


-- ── STEP 2: CATEGORIES ──────────────────────────────────────

INSERT INTO categories (slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, sort_order) VALUES

('silos',
 'Silos Collection',
 'Collection Silos',
 'مجموعة سيلوس',
 'Elongated picket-shaped ceramic tiles (10x30 cm) with artisanal glazed finishes. Available in solid colours and decorative prints.',
 'Carreaux en forme de piquet allongé (10x30 cm) avec des finitions émaillées artisanales. Disponibles en couleurs unies et décors imprimés.',
 'بلاط سيراميك بشكل لقطة مستطيلة (10×30 سم) بتشطيبات مزججة حرفية. متوفرة بألوان موحدة وزخارف مطبوعة.',
 1),

('atelier',
 'Atelier Collection',
 'Collection Atelier',
 'مجموعة أتيليه',
 'Artisan-crafted leaf-shaped tiles (10x30 cm) featuring embossed relief textures, metallic finishes and hand-painted floral décors.',
 'Carreaux en forme de feuille (10x30 cm) avec textures en relief, finitions métalliques et décors floraux peints à la main.',
 'بلاط على شكل ورقة (10×30 سم) بنقوش بارزة وتشطيبات معدنية وزخارف زهرية مرسومة يدويًا.',
 2),

('ducal',
 'Ducal Collection',
 'Collection Ducal',
 'مجموعة دوكال',
 'Classic subway-style rectangular tiles (10x30 cm) with an aged handmade look. Perfect for walls, kitchens and outdoor facades.',
 'Carreaux rectangulaires de style métro (10x30 cm) avec un aspect vieilli fait main. Parfaits pour les murs, cuisines et façades extérieures.',
 'بلاط مستطيل بأسلوب المترو (10×30 سم) بمظهر عتيق مصنوع يدويًا. مثالي للجدران والمطابخ والواجهات الخارجية.',
 3),

('leaf',
 'Leaf Collection',
 'Collection Leaf',
 'مجموعة ليف',
 'Architectural leaf-shaped tiles (15x30 cm) inspired by tropical palm fronds. Striking metallic and painted colour options.',
 'Carreaux en forme de feuille architecturaux (15x30 cm) inspirés des frondes de palmier tropicales. Options de couleurs métalliques et peintes frappantes.',
 'بلاط بشكل ورقة معمارية (15×30 سم) مستوحى من سعف النخيل. خيارات ألوان معدنية ومطلية لافتة.',
 4),

('gonos',
 'Gonos Collection',
 'Collection Gonos',
 'مجموعة غونوس',
 'Playful elongated hexagonal tiles (15x30 cm) with decorative children''s motifs and clean matte finishes.',
 'Carreaux hexagonaux allongés ludiques (15x30 cm) avec des motifs décoratifs pour enfants et des finitions mates épurées.',
 'بلاط سداسي مستطيل مرح (15×30 سم) بزخارف أطفال وتشطيبات مطفية أنيقة.',
 5),

('chic',
 'Chic Collection',
 'Collection Chic',
 'مجموعة شيك',
 'Moroccan-inspired scallop-shaped tiles (20x20 cm) with ornate embossed relief and striking metallic or painted glazes.',
 'Carreaux en forme de coquille marocaine (20x20 cm) avec un relief ornemental en saillie et des émaux métalliques ou peints saisissants.',
 'بلاط مستوحى من الطابع المغربي بشكل صدفة (20×20 سم) بنقوش بارزة زخرفية وطلاء معدني أو ملون مميز.',
 6),

('kronfel',
 'Kronfel',
 'Kronfel',
 'كرونفل',
 'Traditional hand-painted ceramic tiles (20x20 cm) featuring rich blue and gold floral ornamental patterns with matching borders.',
 'Carreaux en céramique peints à la main (20x20 cm) avec de riches motifs ornementaux floraux bleus et dorés avec bordures assorties.',
 'بلاط سيراميك مطلي يدويًا (20×20 سم) بزخارف زهرية غنية باللونين الأزرق والذهبي مع حدود متناسقة.',
 7),

('casbah',
 'Casbah',
 'Casbah',
 'قصبة',
 'Traditional Andalusian-style hand-painted tiles (20x20 cm) with vibrant blue, green and yellow botanical motifs.',
 'Carreaux peints à la main de style andalou traditionnel (20x20 cm) avec des motifs botaniques vibrants bleus, verts et jaunes.',
 'بلاط تقليدي مرسوم يدويًا بالأسلوب الأندلسي (20×20 سم) بزخارف نباتية زاهية باللون الأزرق والأخضر والأصفر.',
 8),

('yasmine',
 'Yasmine',
 'Yasmine',
 'ياسمين',
 'Opulent hand-painted ceramic tiles (20x20 cm) inspired by Ottoman art, featuring intricate scrollwork in red, gold and green.',
 'Carreaux en céramique peints à la main opulents (20x20 cm) inspirés de l''art ottoman, avec des arabesques complexes en rouge, or et vert.',
 'بلاط سيراميك فاخر مرسوم يدويًا (20×20 سم) مستوحى من الفن العثماني بعناصر زخرفية معقدة باللون الأحمر والذهبي والأخضر.',
 9);


-- ── STEP 3: PRODUCTS ────────────────────────────────────────
-- Note: images array will contain SKU-named files.
-- After uploading images to Supabase Storage, run the UPDATE block at the bottom.
-- For now, images are left as empty arrays — add them via the admin dashboard or the UPDATE block.

-- Helper: get category IDs inline
-- SILOS products
INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'silos-terracota',
  'Silos Terracota',
  'Silos Terracota',
  'سيلوس تيراكوتا',
  'Warm terracotta-toned picket tile with a rich earthy glaze. 10x30 cm, 3 faces. Packing: 40 pcs/m², 20 pcs/carton.',
  'Carreau piquet aux tons terracotta chauds avec une glaçure riche. 10x30 cm, 3 faces. Emballage: 40 pcs/m², 20 pcs/carton.',
  'بلاط لقطة بدرجات تيراكوتا دافئة بطلاء غني. 10×30 سم، 3 وجوه. تعبئة: 40 قطعة/م²، 20 قطعة/كرتون.',
  0.00, true, true, ARRAY['ARC-SIL-001.jpg']
FROM categories c WHERE c.slug = 'silos';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'silos-beige',
  'Silos Beige',
  'Silos Beige',
  'سيلوس بيج',
  'Soft beige picket tile with a delicate antique glaze. 10x30 cm, 3 faces. Packing: 40 pcs/m², 20 pcs/carton.',
  'Carreau piquet beige doux avec une glaçure antique délicate. 10x30 cm, 3 faces. Emballage: 40 pcs/m², 20 pcs/carton.',
  'بلاط لقطة بيج ناعم بطلاء عتيق رقيق. 10×30 سم، 3 وجوه.',
  0.00, true, false, ARRAY['ARC-SIL-002.jpg']
FROM categories c WHERE c.slug = 'silos';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'silos-dec-natura-beige',
  'Silos Dec Natura Beige',
  'Silos Dec Natura Beige',
  'سيلوس ديك ناتورا بيج',
  'Beige picket tile with a hand-painted tropical leaf décor. 10x30 cm, 3 faces. Packing: 40 pcs/m², 18 pcs/carton.',
  'Carreau piquet beige avec un décor de feuilles tropicales peint à la main. 10x30 cm, 3 faces.',
  'بلاط لقطة بيج بزخرفة أوراق استوائية مرسومة يدويًا. 10×30 سم، 3 وجوه.',
  0.00, true, false, ARRAY['ARC-SIL-003.jpg']
FROM categories c WHERE c.slug = 'silos';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'silos-dec-jamaica-beige',
  'Silos Dec Jamaica Beige',
  'Silos Dec Jamaica Beige',
  'سيلوس ديك جامايكا بيج',
  'Beige picket tile with a vibrant hibiscus and tropical leaf décor. 10x30 cm, 3 faces.',
  'Carreau piquet beige avec un décor hibiscus et feuilles tropicales vibrant. 10x30 cm, 3 faces.',
  'بلاط لقطة بيج بزخرفة الكركديه والأوراق الاستوائية. 10×30 سم، 3 وجوه.',
  0.00, true, false, ARRAY['ARC-SIL-004.jpg']
FROM categories c WHERE c.slug = 'silos';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'silos-dec-celestina-beige',
  'Silos Dec Celestina Beige',
  'Silos Dec Celestina Beige',
  'سيلوس ديك سيليستينا بيج',
  'Beige picket tile with an elegant bird and floral branch décor. 10x30 cm, 3 faces.',
  'Carreau piquet beige avec un élégant décor d''oiseaux et de branches fleuries. 10x30 cm, 3 faces.',
  'بلاط لقطة بيج بزخرفة أناقة من الطيور والأغصان المزهرة. 10×30 سم، 3 وجوه.',
  0.00, true, false, ARRAY['ARC-SIL-005.jpg']
FROM categories c WHERE c.slug = 'silos';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'silos-antracita',
  'Silos Antracita',
  'Silos Antracita',
  'سيلوس أنتراسيتا',
  'Deep anthracite-toned picket tile with a textured matte glaze. 10x30 cm, 3 faces. Packing: 40 pcs/m², 20 pcs/carton.',
  'Carreau piquet tons anthracite avec une glaçure mate texturée. 10x30 cm, 3 faces.',
  'بلاط لقطة بدرجة أنثراسيت داكنة بطلاء مطفي منسوج. 10×30 سم، 3 وجوه.',
  0.00, true, false, ARRAY['ARC-SIL-006.jpg']
FROM categories c WHERE c.slug = 'silos';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'silos-gris',
  'Silos Gris',
  'Silos Gris',
  'سيلوس رمادي',
  'Light grey picket tile with a subtle textured glaze. 10x30 cm, 3 faces. Packing: 40 pcs/m², 20 pcs/carton.',
  'Carreau piquet gris clair avec une glaçure texturée subtile. 10x30 cm, 3 faces.',
  'بلاط لقطة رمادي فاتح بطلاء منسوج خفيف. 10×30 سم، 3 وجوه.',
  0.00, true, false, ARRAY['ARC-SIL-007.jpg']
FROM categories c WHERE c.slug = 'silos';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'silos-dec-natura-gris',
  'Silos Dec Natura Gris',
  'Silos Dec Natura Gris',
  'سيلوس ديك ناتورا رمادي',
  'Grey picket tile with a hand-painted tropical leaf décor. 10x30 cm, 3 faces.',
  'Carreau piquet gris avec décor feuilles tropicales peint à la main. 10x30 cm, 3 faces.',
  'بلاط لقطة رمادي بزخرفة أوراق استوائية مرسومة يدويًا. 10×30 سم.',
  0.00, true, false, ARRAY['ARC-SIL-008.jpg']
FROM categories c WHERE c.slug = 'silos';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'silos-dec-jamaica-gris',
  'Silos Dec Jamaica Gris',
  'Silos Dec Jamaica Gris',
  'سيلوس ديك جامايكا رمادي',
  'Grey picket tile with a hibiscus and tropical leaf décor. 10x30 cm, 3 faces.',
  'Carreau piquet gris avec décor hibiscus et feuilles tropicales. 10x30 cm, 3 faces.',
  'بلاط لقطة رمادي بزخرفة الكركديه والأوراق الاستوائية. 10×30 سم.',
  0.00, true, false, ARRAY['ARC-SIL-009.jpg']
FROM categories c WHERE c.slug = 'silos';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'silos-dec-celestina-gris',
  'Silos Dec Celestina Gris',
  'Silos Dec Celestina Gris',
  'سيلوس ديك سيليستينا رمادي',
  'Grey picket tile with a bird and floral branch décor. 10x30 cm, 3 faces.',
  'Carreau piquet gris avec décor oiseaux et branches fleuries. 10x30 cm, 3 faces.',
  'بلاط لقطة رمادي بزخرفة الطيور والأغصان المزهرة. 10×30 سم.',
  0.00, true, false, ARRAY['ARC-SIL-010.jpg']
FROM categories c WHERE c.slug = 'silos';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'silos-dec-gold',
  'Silos Dec Gold',
  'Silos Dec Gold',
  'سيلوس ديك ذهبي',
  'Luxurious gold-finish picket tile with ornate embossed relief patterns. 10x30 cm, 5 faces. Packing: 40 pcs/m², 18 pcs/carton.',
  'Carreau piquet finition or luxueux avec des motifs en relief ornementaux. 10x30 cm, 5 faces.',
  'بلاط لقطة فاخر بتشطيب ذهبي مع نقوش بارزة زخرفية. 10×30 سم، 5 وجوه.',
  0.00, true, true, ARRAY['ARC-SIL-011.jpg']
FROM categories c WHERE c.slug = 'silos';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'silos-dec-beige',
  'Silos Dec Beige',
  'Silos Dec Beige',
  'سيلوس ديك بيج',
  'Beige picket tile with intricate floral embossed patterns. 10x30 cm, 5 faces.',
  'Carreau piquet beige avec des motifs floraux en relief complexes. 10x30 cm, 5 faces.',
  'بلاط لقطة بيج بنقوش زهرية بارزة معقدة. 10×30 سم، 5 وجوه.',
  0.00, true, false, ARRAY['ARC-SIL-012.jpg']
FROM categories c WHERE c.slug = 'silos';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'silos-dec-mix-beige',
  'Silos Dec Mix Beige',
  'Silos Dec Mix Beige',
  'سيلوس ديك ميكس بيج',
  'Mixed beige decorative picket tile combining plain and embossed pieces for a dynamic wall effect. 10x30 cm.',
  'Carreau piquet décoratif beige mélangé combinant pièces unies et gaufrées pour un effet mural dynamique. 10x30 cm.',
  'بلاط لقطة بيج مزدوج يجمع القطع الموحدة والمنقوشة لتأثير جداري ديناميكي. 10×30 سم.',
  0.00, true, false, ARRAY['ARC-SIL-013.jpg']
FROM categories c WHERE c.slug = 'silos';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'silos-dec-silver',
  'Silos Dec Silver',
  'Silos Dec Silver',
  'سيلوس ديك فضي',
  'Premium silver-finish picket tile with ornate embossed relief. 10x30 cm, 5 faces.',
  'Carreau piquet finition argent premium avec relief ornemental en saillie. 10x30 cm, 5 faces.',
  'بلاط لقطة فضي فاخر بنقوش بارزة زخرفية. 10×30 سم، 5 وجوه.',
  0.00, true, true, ARRAY['ARC-SIL-014.jpg']
FROM categories c WHERE c.slug = 'silos';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'silos-dec-gris',
  'Silos Dec Gris',
  'Silos Dec Gris',
  'سيلوس ديك رمادي',
  'Grey picket tile with ornate embossed floral patterns. 10x30 cm, 5 faces.',
  'Carreau piquet gris avec des motifs floraux en relief ornementaux. 10x30 cm, 5 faces.',
  'بلاط لقطة رمادي بنقوش زهرية بارزة زخرفية. 10×30 سم، 5 وجوه.',
  0.00, true, false, ARRAY['ARC-SIL-015.jpg']
FROM categories c WHERE c.slug = 'silos';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'silos-dec-mix-gris',
  'Silos Dec Mix Gris',
  'Silos Dec Mix Gris',
  'سيلوس ديك ميكس رمادي',
  'Mixed grey decorative picket tile. 10x30 cm.',
  'Carreau piquet décoratif gris mélangé. 10x30 cm.',
  'بلاط لقطة رمادي مزدوج. 10×30 سم.',
  0.00, true, false, ARRAY['ARC-SIL-016.jpg']
FROM categories c WHERE c.slug = 'silos';

-- ATELIER products
INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'atelier-r1-pb-miel',
  'Atelier R1 Pb Miel',
  'Atelier R1 Pb Miel',
  'أتيليه R1 Pb عسلي',
  'Honey-toned embossed leaf tile with a rich polished body finish. 10x30 cm. Packing: 40 pcs/m², 18 pcs/carton.',
  'Carreau feuille gaufré couleur miel avec une finition corps poli riche. 10x30 cm.',
  'بلاط ورقة منقوش بدرجة عسلية بتشطيب جسم مصقول غني. 10×30 سم.',
  0.00, true, true, ARRAY['ARC-ATL-001.jpg']
FROM categories c WHERE c.slug = 'atelier';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'atelier-r1-ec-blanc',
  'Atelier R1 EC Blanc',
  'Atelier R1 EC Blanc',
  'أتيليه R1 EC أبيض',
  'Crisp white embossed leaf tile with an extra-clear glaze. 10x30 cm.',
  'Carreau feuille gaufré blanc pur avec une glaçure extra-claire. 10x30 cm.',
  'بلاط ورقة منقوش أبيض نقي بطلاء شفاف فائق. 10×30 سم.',
  0.00, true, false, ARRAY['ARC-ATL-002.jpg']
FROM categories c WHERE c.slug = 'atelier';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'atelier-r1-pb-vert',
  'Atelier R1 Pb Vert',
  'Atelier R1 Pb Vert',
  'أتيليه R1 Pb أخضر',
  'Deep forest-green embossed leaf tile with a glossy polished finish. 10x30 cm.',
  'Carreau feuille gaufré vert forêt profond avec une finition brillante polie. 10x30 cm.',
  'بلاط ورقة منقوش باللون الأخضر الغابي الداكن بتشطيب لامع مصقول. 10×30 سم.',
  0.00, true, false, ARRAY['ARC-ATL-003.jpg']
FROM categories c WHERE c.slug = 'atelier';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'atelier-r1-pb-bleu',
  'Atelier R1 Pb Bleu',
  'Atelier R1 Pb Bleu',
  'أتيليه R1 Pb أزرق',
  'Bold cobalt-blue embossed leaf tile with a polished body finish. 10x30 cm.',
  'Carreau feuille gaufré bleu cobalt audacieux avec une finition corps poli. 10x30 cm.',
  'بلاط ورقة منقوش باللون الأزرق الكوبالت الجريء بتشطيب جسم مصقول. 10×30 سم.',
  0.00, true, false, ARRAY['ARC-ATL-004.jpg']
FROM categories c WHERE c.slug = 'atelier';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'atelier-r1-mtl-gold',
  'Atelier R1 Mtl Gold',
  'Atelier R1 Mtl Gold',
  'أتيليه R1 معدني ذهبي',
  'Striking metallic gold leaf tile with an ultra-glossy electro-plated finish. 10x30 cm.',
  'Carreau feuille métallique or saisissant avec une finition électrodéposée ultra-brillante. 10x30 cm.',
  'بلاط ورقة معدني ذهبي مذهل بتشطيب كهروكيميائي فائق اللمعان. 10×30 سم.',
  0.00, true, true, ARRAY['ARC-ATL-005.jpg']
FROM categories c WHERE c.slug = 'atelier';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'atelier-r1-mtl-rose-gold',
  'Atelier R1 Mtl Rose Gold',
  'Atelier R1 Mtl Rose Gold',
  'أتيليه R1 معدني روز غولد',
  'Elegant rose-gold metallic leaf tile. 10x30 cm.',
  'Élégant carreau feuille métallique rose gold. 10x30 cm.',
  'بلاط ورقة معدني روز غولد أنيق. 10×30 سم.',
  0.00, true, false, ARRAY['ARC-ATL-006.jpg']
FROM categories c WHERE c.slug = 'atelier';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'atelier-r1-mtl-silver',
  'Atelier R1 Mtl Silver',
  'Atelier R1 Mtl Silver',
  'أتيليه R1 معدني فضي',
  'Sleek metallic silver leaf tile with a mirror-like electroplated finish. 10x30 cm.',
  'Carreau feuille métallique argent élégant avec finition miroir électrodéposée. 10x30 cm.',
  'بلاط ورقة معدني فضي أنيق بتشطيب مرآة كهروكيميائية. 10×30 سم.',
  0.00, true, false, ARRAY['ARC-ATL-007.jpg']
FROM categories c WHERE c.slug = 'atelier';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'atelier-r1-mtl-bleu-petrole',
  'Atelier R1 Mtl Bleu Pétrole',
  'Atelier R1 Mtl Bleu Pétrole',
  'أتيليه R1 معدني أزرق بترولي',
  'Deep teal/petroleum blue metallic leaf tile. 10x30 cm.',
  'Carreau feuille métallique bleu pétrole profond. 10x30 cm.',
  'بلاط ورقة معدني أزرق بترولي داكن. 10×30 سم.',
  0.00, true, false, ARRAY['ARC-ATL-008.jpg']
FROM categories c WHERE c.slug = 'atelier';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'atelier-r1-ird-rose',
  'Atelier R1 Ird Rose',
  'Atelier R1 Ird Rose',
  'أتيليه R1 Ird وردي',
  'Soft pink iridescent leaf tile with a satin glaze. 10x30 cm. Packing: 40 pcs/m², 18 pcs/carton.',
  'Carreau feuille irisé rose doux avec une glaçure satinée. 10x30 cm.',
  'بلاط ورقة وردي متقزح بطلاء ساتان. 10×30 سم.',
  0.00, true, false, ARRAY['ARC-ATL-009.jpg']
FROM categories c WHERE c.slug = 'atelier';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'atelier-r1-ird-bleu',
  'Atelier R1 Ird Bleu',
  'Atelier R1 Ird Bleu',
  'أتيليه R1 Ird أزرق',
  'Vibrant teal iridescent leaf tile. 10x30 cm.',
  'Carreau feuille irisé sarcelle vibrant. 10x30 cm.',
  'بلاط ورقة أزرق زيتي متقزح زاهٍ. 10×30 سم.',
  0.00, true, false, ARRAY['ARC-ATL-010.jpg']
FROM categories c WHERE c.slug = 'atelier';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'atelier-dec-floral-3',
  'Atelier Dec Floral 3',
  'Atelier Dec Floral 3',
  'أتيليه ديك فلورال 3',
  'Picket-shaped tile with an orange and red floral bouquet décor on a white base. 10x30 cm, 6 faces. Packing: 40 pcs/m², 20 pcs/carton.',
  'Carreau piquet avec décor bouquet floral orange et rouge sur base blanche. 10x30 cm, 6 faces.',
  'بلاط لقطة بزخرفة باقة أزهار برتقالية وحمراء على خلفية بيضاء. 10×30 سم، 6 وجوه.',
  0.00, true, true, ARRAY['ARC-ATL-011.jpg']
FROM categories c WHERE c.slug = 'atelier';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'atelier-dec-floral-4',
  'Atelier Dec Floral 4',
  'Atelier Dec Floral 4',
  'أتيليه ديك فلورال 4',
  'Picket-shaped tile with a yellow and blue wildflower décor on white. 10x30 cm, 6 faces.',
  'Carreau piquet avec décor fleurs sauvages jaunes et bleues sur blanc. 10x30 cm, 6 faces.',
  'بلاط لقطة بزخرفة أزهار برية صفراء وزرقاء على خلفية بيضاء. 10×30 سم، 6 وجوه.',
  0.00, true, false, ARRAY['ARC-ATL-012.jpg']
FROM categories c WHERE c.slug = 'atelier';

-- DUCAL products
INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'ducal-terracota',
  'Ducal Terracota',
  'Ducal Terracota',
  'دوكال تيراكوتا',
  'Handmade-look terracotta subway tile with an aged rustic glaze. 10x30 cm, 3 faces. Packing: 34 pcs/1.02m², 18 pcs/carton.',
  'Carreau métro terracotta à aspect fait main avec une glaçure rustique vieillie. 10x30 cm, 3 faces.',
  'بلاط مترو تيراكوتا بمظهر مصنوع يدويًا وطلاء ريفي عتيق. 10×30 سم، 3 وجوه.',
  0.00, true, false, ARRAY['ARC-DUC-001.jpg']
FROM categories c WHERE c.slug = 'ducal';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'ducal-beige',
  'Ducal Beige',
  'Ducal Beige',
  'دوكال بيج',
  'Classic beige subway tile with a linen-white handmade glaze. 10x30 cm, 3 faces.',
  'Carreau métro beige classique avec une glaçure blanc-lin fait main. 10x30 cm, 3 faces.',
  'بلاط مترو بيج كلاسيكي بطلاء أبيض كتاني مصنوع يدويًا. 10×30 سم، 3 وجوه.',
  0.00, true, false, ARRAY['ARC-DUC-002.jpg']
FROM categories c WHERE c.slug = 'ducal';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'ducal-dec-tucan',
  'Ducal Dec Tucan',
  'Ducal Dec Tucan',
  'دوكال ديك توكان',
  'Subway tile with a vibrant toucan and tropical foliage décor. 10x30 cm, 3 faces. Packing: 34 pcs/1.02m², 20 pcs/carton.',
  'Carreau métro avec un décor toucan et feuillage tropical vibrant. 10x30 cm, 3 faces.',
  'بلاط مترو بزخرفة طيور التوكان والأوراق الاستوائية النابضة. 10×30 سم، 3 وجوه.',
  0.00, true, true, ARRAY['ARC-DUC-003.jpg']
FROM categories c WHERE c.slug = 'ducal';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'ducal-dec-jamaica',
  'Ducal Dec Jamaica',
  'Ducal Dec Jamaica',
  'دوكال ديك جامايكا',
  'Subway tile with a hibiscus flower and tropical leaf décor. 10x30 cm, 3 faces.',
  'Carreau métro avec décor fleur d''hibiscus et feuilles tropicales. 10x30 cm, 3 faces.',
  'بلاط مترو بزخرفة زهرة الكركديه والأوراق الاستوائية. 10×30 سم، 3 وجوه.',
  0.00, true, false, ARRAY['ARC-DUC-004.jpg']
FROM categories c WHERE c.slug = 'ducal';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'ducal-antracita',
  'Ducal Antracita',
  'Ducal Antracita',
  'دوكال أنتراسيتا',
  'Anthracite grey handmade-look subway tile. 10x30 cm, 3 faces. Packing: 34 pcs/1.02m², 18 pcs/carton.',
  'Carreau métro anthracite à aspect fait main. 10x30 cm, 3 faces.',
  'بلاط مترو رمادي أنثراسيت بمظهر مصنوع يدويًا. 10×30 سم، 3 وجوه.',
  0.00, true, false, ARRAY['ARC-DUC-005.jpg']
FROM categories c WHERE c.slug = 'ducal';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'ducal-gris',
  'Ducal Gris',
  'Ducal Gris',
  'دوكال رمادي',
  'Light grey handmade-look subway tile. 10x30 cm, 3 faces.',
  'Carreau métro gris clair à aspect fait main. 10x30 cm, 3 faces.',
  'بلاط مترو رمادي فاتح بمظهر مصنوع يدويًا. 10×30 سم، 3 وجوه.',
  0.00, true, false, ARRAY['ARC-DUC-006.jpg']
FROM categories c WHERE c.slug = 'ducal';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'ducal-dec-celestina',
  'Ducal Dec Celestina',
  'Ducal Dec Celestina',
  'دوكال ديك سيليستينا',
  'Subway tile with delicate blue floral and leaf branch décor. 10x30 cm, 3 faces. Packing: 34 pcs/1.02m², 20 pcs/carton.',
  'Carreau métro avec délicat décor floral bleu et branches de feuilles. 10x30 cm, 3 faces.',
  'بلاط مترو بزخرفة أزهار زرقاء رقيقة وأغصان أوراق. 10×30 سم، 3 وجوه.',
  0.00, true, false, ARRAY['ARC-DUC-007.jpg']
FROM categories c WHERE c.slug = 'ducal';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'ducal-dec-gold',
  'Ducal Dec Gold',
  'Ducal Dec Gold',
  'دوكال ديك ذهبي',
  'Subway tile with a rich gold metallic floral décor. 10x30 cm, 3 faces.',
  'Carreau métro avec riche décor floral métallique or. 10x30 cm, 3 faces.',
  'بلاط مترو بزخرفة زهرية معدنية ذهبية غنية. 10×30 سم، 3 وجوه.',
  0.00, true, true, ARRAY['ARC-DUC-008.jpg']
FROM categories c WHERE c.slug = 'ducal';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'ducal-dec-beige-decor',
  'Ducal Dec Beige',
  'Ducal Dec Beige',
  'دوكال ديك بيج',
  'Subway tile with a beige ornamental patchwork décor. 10x30 cm, 3 faces.',
  'Carreau métro avec décor patchwork ornemental beige. 10x30 cm, 3 faces.',
  'بلاط مترو بزخرفة رقعية زخرفية بيج. 10×30 سم، 3 وجوه.',
  0.00, true, false, ARRAY['ARC-DUC-009.jpg']
FROM categories c WHERE c.slug = 'ducal';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'ducal-dec-silver',
  'Ducal Dec Silver',
  'Ducal Dec Silver',
  'دوكال ديك فضي',
  'Subway tile with a silver metallic ornamental décor. 10x30 cm, 3 faces.',
  'Carreau métro avec décor ornemental métallique argent. 10x30 cm, 3 faces.',
  'بلاط مترو بزخرفة زخرفية معدنية فضية. 10×30 سم، 3 وجوه.',
  0.00, true, false, ARRAY['ARC-DUC-010.jpg']
FROM categories c WHERE c.slug = 'ducal';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'ducal-dec-gris-decor',
  'Ducal Dec Gris',
  'Ducal Dec Gris',
  'دوكال ديك رمادي',
  'Subway tile with a grey ornamental patchwork décor. 10x30 cm, 3 faces.',
  'Carreau métro avec décor patchwork ornemental gris. 10x30 cm, 3 faces.',
  'بلاط مترو بزخرفة رقعية زخرفية رمادية. 10×30 سم، 3 وجوه.',
  0.00, true, false, ARRAY['ARC-DUC-011.jpg']
FROM categories c WHERE c.slug = 'ducal';

-- LEAF products
INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'leaf-r1-pb-bleu',
  'Leaf R1 Pb Bleu',
  'Leaf R1 Pb Bleu',
  'ليف R1 Pb أزرق',
  'Striking cobalt-blue leaf-shaped tile with a glossy polished body. 15x30 cm. Packing: 27 pcs/m² approx., 18 pcs/carton.',
  'Carreau en forme de feuille bleu cobalt saisissant avec un corps poli brillant. 15x30 cm.',
  'بلاط على شكل ورقة أزرق كوبالت مذهل بجسم مصقول لامع. 15×30 سم.',
  0.00, true, true, ARRAY['ARC-LEA-001.jpg']
FROM categories c WHERE c.slug = 'leaf';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'leaf-r1-pb-miel',
  'Leaf R1 Pb Miel',
  'Leaf R1 Pb Miel',
  'ليف R1 Pb عسلي',
  'Warm honey-orange leaf tile with a rich polished finish. 15x30 cm.',
  'Carreau feuille miel-orange chaud avec une finition polie riche. 15x30 cm.',
  'بلاط ورقة عسلي برتقالي دافئ بتشطيب مصقول غني. 15×30 سم.',
  0.00, true, false, ARRAY['ARC-LEA-002.jpg']
FROM categories c WHERE c.slug = 'leaf';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'leaf-r1-pb-vert',
  'Leaf R1 Pb Vert',
  'Leaf R1 Pb Vert',
  'ليف R1 Pb أخضر',
  'Deep forest-green leaf tile with a polished body finish. 15x30 cm.',
  'Carreau feuille vert forêt profond avec finition corps poli. 15x30 cm.',
  'بلاط ورقة أخضر غابي داكن بتشطيب جسم مصقول. 15×30 سم.',
  0.00, true, false, ARRAY['ARC-LEA-003.jpg']
FROM categories c WHERE c.slug = 'leaf';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'leaf-r1-ec-blanc',
  'Leaf R1 EC Blanc',
  'Leaf R1 EC Blanc',
  'ليف R1 EC أبيض',
  'Pure white embossed leaf tile with extra-clear glaze. 15x30 cm.',
  'Carreau feuille blanc pur gaufré avec glaçure extra-claire. 15x30 cm.',
  'بلاط ورقة منقوش أبيض نقي بطلاء شفاف فائق. 15×30 سم.',
  0.00, true, false, ARRAY['ARC-LEA-004.jpg']
FROM categories c WHERE c.slug = 'leaf';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'leaf-r1-mtl-rose-gold',
  'Leaf R1 Mtl Rose Gold',
  'Leaf R1 Mtl Rose Gold',
  'ليف R1 معدني روز غولد',
  'Elegant rose-gold metallic leaf tile with an electroplated finish. 15x30 cm.',
  'Élégant carreau feuille métallique rose gold avec finition électrodéposée. 15x30 cm.',
  'بلاط ورقة معدني روز غولد أنيق بتشطيب كهروكيميائي. 15×30 سم.',
  0.00, true, true, ARRAY['ARC-LEA-005.jpg']
FROM categories c WHERE c.slug = 'leaf';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'leaf-r1-mtl-mauve',
  'Leaf R1 Mtl Mauve',
  'Leaf R1 Mtl Mauve',
  'ليف R1 معدني موف',
  'Deep mauve/purple metallic leaf tile. 15x30 cm.',
  'Carreau feuille métallique mauve/violet profond. 15x30 cm.',
  'بلاط ورقة معدني موف/بنفسجي داكن. 15×30 سم.',
  0.00, true, false, ARRAY['ARC-LEA-006.jpg']
FROM categories c WHERE c.slug = 'leaf';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'leaf-r1-mtl-bleu-petrole',
  'Leaf R1 Mtl Bleu Pétrole',
  'Leaf R1 Mtl Bleu Pétrole',
  'ليف R1 معدني أزرق بترولي',
  'Teal petroleum-blue metallic leaf tile with a mirror-like electroplated surface. 15x30 cm.',
  'Carreau feuille métallique bleu pétrole avec surface miroir électrodéposée. 15x30 cm.',
  'بلاط ورقة معدني أزرق بترولي بسطح مرآة كهروكيميائية. 15×30 سم.',
  0.00, true, false, ARRAY['ARC-LEA-007.jpg']
FROM categories c WHERE c.slug = 'leaf';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'leaf-dec-floral-1',
  'Leaf Dec Floral 1',
  'Leaf Dec Floral 1',
  'ليف ديك فلورال 1',
  'Leaf-shaped tile with a watercolour botanical print in green and orange tones. 15x30 cm, 6 faces. Packing: 27 pcs/m² approx., 20 pcs/carton.',
  'Carreau en forme de feuille avec impression botanique aquarelle en tons verts et orangés. 15x30 cm, 6 faces.',
  'بلاط على شكل ورقة بطباعة نباتية مائية بدرجات خضراء وبرتقالية. 15×30 سم، 6 وجوه.',
  0.00, true, true, ARRAY['ARC-LEA-008.jpg']
FROM categories c WHERE c.slug = 'leaf';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'leaf-dec-floral-2',
  'Leaf Dec Floral 2',
  'Leaf Dec Floral 2',
  'ليف ديك فلورال 2',
  'Leaf-shaped tile with a multi-coloured wildflower print. 15x30 cm, 6 faces.',
  'Carreau feuille avec impression fleurs sauvages multicolores. 15x30 cm, 6 faces.',
  'بلاط على شكل ورقة بطباعة أزهار برية متعددة الألوان. 15×30 سم، 6 وجوه.',
  0.00, true, false, ARRAY['ARC-LEA-009.jpg']
FROM categories c WHERE c.slug = 'leaf';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'leaf-dec-floral-3',
  'Leaf Dec Floral 3',
  'Leaf Dec Floral 3',
  'ليف ديك فلورال 3',
  'Leaf-shaped tile with red and yellow floral bouquet print. 15x30 cm, 6 faces.',
  'Carreau feuille avec impression bouquet floral rouge et jaune. 15x30 cm, 6 faces.',
  'بلاط على شكل ورقة بطباعة باقة أزهار حمراء وصفراء. 15×30 سم، 6 وجوه.',
  0.00, true, false, ARRAY['ARC-LEA-010.jpg']
FROM categories c WHERE c.slug = 'leaf';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'leaf-dec-floral-4',
  'Leaf Dec Floral 4',
  'Leaf Dec Floral 4',
  'ليف ديك فلورال 4',
  'Leaf-shaped tile with blue and yellow wildflower print. 15x30 cm, 6 faces.',
  'Carreau feuille avec impression fleurs sauvages bleues et jaunes. 15x30 cm, 6 faces.',
  'بلاط على شكل ورقة بطباعة أزهار برية زرقاء وصفراء. 15×30 سم، 6 وجوه.',
  0.00, true, false, ARRAY['ARC-LEA-011.jpg']
FROM categories c WHERE c.slug = 'leaf';

-- GONOS products
INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'gonos-dec-girl',
  'Gonos Dec Girl',
  'Gonos Dec Girl',
  'غونوس ديك بنت',
  'Elongated hexagonal tile with a colourful children''s girl motif décor. 15x30 cm, 5 faces. Packing: 30 pcs/1.0125m², 20 pcs/carton.',
  'Carreau hexagonal allongé avec décor motif enfant fille coloré. 15x30 cm, 5 faces.',
  'بلاط سداسي مستطيل بزخرفة ملونة بموضوع أطفال (بنت). 15×30 سم، 5 وجوه.',
  0.00, true, true, ARRAY['ARC-GON-001.jpg']
FROM categories c WHERE c.slug = 'gonos';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'gonos-blanc',
  'Gonos Blanc',
  'Gonos Blanc',
  'غونوس أبيض',
  'Clean white elongated hexagonal tile with a matte finish. 15x30 cm.',
  'Carreau hexagonal allongé blanc épuré avec finition mate. 15x30 cm.',
  'بلاط سداسي مستطيل أبيض نظيف بتشطيب مطفي. 15×30 سم.',
  0.00, true, false, ARRAY['ARC-GON-002.jpg']
FROM categories c WHERE c.slug = 'gonos';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'gonos-dec-boy',
  'Gonos Dec Boy',
  'Gonos Dec Boy',
  'غونوس ديك ولد',
  'Elongated hexagonal tile with a colourful children''s boy motif décor. 15x30 cm, 5 faces.',
  'Carreau hexagonal allongé avec décor motif enfant garçon coloré. 15x30 cm, 5 faces.',
  'بلاط سداسي مستطيل بزخرفة ملونة بموضوع أطفال (ولد). 15×30 سم، 5 وجوه.',
  0.00, true, false, ARRAY['ARC-GON-003.jpg']
FROM categories c WHERE c.slug = 'gonos';

-- CHIC products
INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'chic-r1-pb-bleu',
  'Chic R1 Pb Bleu',
  'Chic R1 Pb Bleu',
  'شيك R1 Pb أزرق',
  'Bold cobalt-blue Moroccan scallop tile with embossed fan relief. 20x20 cm. Packing: 42 pcs/m² approx., 18 pcs/carton.',
  'Carreau marocain en écaille cobalt audacieux avec relief ventail en relief. 20x20 cm.',
  'بلاط مغربي صدفي كوبالت جريء بنقش مروحي بارز. 20×20 سم.',
  0.00, true, true, ARRAY['ARC-CHI-001.jpg']
FROM categories c WHERE c.slug = 'chic';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'chic-r1-pb-miel',
  'Chic R1 Pb Miel',
  'Chic R1 Pb Miel',
  'شيك R1 Pb عسلي',
  'Warm honey/amber scallop tile with embossed fan relief. 20x20 cm.',
  'Carreau en écaille miel/ambre chaud avec relief ventail en relief. 20x20 cm.',
  'بلاط صدفي عسلي/كهرماني دافئ بنقش مروحي بارز. 20×20 سم.',
  0.00, true, false, ARRAY['ARC-CHI-002.jpg']
FROM categories c WHERE c.slug = 'chic';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'chic-r1-pb-vert',
  'Chic R1 Pb Vert',
  'Chic R1 Pb Vert',
  'شيك R1 Pb أخضر',
  'Forest-green scallop tile with embossed fan relief. 20x20 cm.',
  'Carreau en écaille vert forêt avec relief ventail en relief. 20x20 cm.',
  'بلاط صدفي أخضر غابي بنقش مروحي بارز. 20×20 سم.',
  0.00, true, false, ARRAY['ARC-CHI-003.jpg']
FROM categories c WHERE c.slug = 'chic';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'chic-r1-ec-blanc',
  'Chic R1 EC Blanc',
  'Chic R1 EC Blanc',
  'شيك R1 EC أبيض',
  'Pure white scallop tile with extra-clear glaze. 20x20 cm.',
  'Carreau en écaille blanc pur avec glaçure extra-claire. 20x20 cm.',
  'بلاط صدفي أبيض نقي بطلاء شفاف فائق. 20×20 سم.',
  0.00, true, false, ARRAY['ARC-CHI-004.jpg']
FROM categories c WHERE c.slug = 'chic';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'chic-r2-pb-bleu',
  'Chic R2 Pb Bleu',
  'Chic R2 Pb Bleu',
  'شيك R2 Pb أزرق',
  'Moroccan arabesque tile with ornate floral relief in cobalt blue. 20x20 cm.',
  'Carreau arabesque marocain avec relief floral ornemental en bleu cobalt. 20x20 cm.',
  'بلاط أرابيسك مغربي بنقش زهري زخرفي باللون الأزرق الكوبالت. 20×20 سم.',
  0.00, true, true, ARRAY['ARC-CHI-005.jpg']
FROM categories c WHERE c.slug = 'chic';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'chic-r2-pb-miel',
  'Chic R2 Pb Miel',
  'Chic R2 Pb Miel',
  'شيك R2 Pb عسلي',
  'Moroccan arabesque tile with ornate floral relief in honey amber. 20x20 cm.',
  'Carreau arabesque marocain avec relief floral ornemental en ambre miel. 20x20 cm.',
  'بلاط أرابيسك مغربي بنقش زهري زخرفي بالعسلي الكهرماني. 20×20 سم.',
  0.00, true, false, ARRAY['ARC-CHI-006.jpg']
FROM categories c WHERE c.slug = 'chic';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'chic-r2-pb-vert',
  'Chic R2 Pb Vert',
  'Chic R2 Pb Vert',
  'شيك R2 Pb أخضر',
  'Moroccan arabesque tile with ornate floral relief in forest green. 20x20 cm.',
  'Carreau arabesque marocain avec relief floral ornemental en vert forêt. 20x20 cm.',
  'بلاط أرابيسك مغربي بنقش زهري زخرفي بالأخضر الغابي. 20×20 سم.',
  0.00, true, false, ARRAY['ARC-CHI-007.jpg']
FROM categories c WHERE c.slug = 'chic';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'chic-r2-ec-blanc',
  'Chic R2 EC Blanc',
  'Chic R2 EC Blanc',
  'شيك R2 EC أبيض',
  'White Moroccan arabesque tile with ornate floral embossed relief. 20x20 cm.',
  'Carreau arabesque marocain blanc avec relief ornemental floral en saillie. 20x20 cm.',
  'بلاط أرابيسك مغربي أبيض بنقش زهري زخرفي بارز. 20×20 سم.',
  0.00, true, false, ARRAY['ARC-CHI-008.jpg']
FROM categories c WHERE c.slug = 'chic';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'chic-r2-mtl-bleu-cobalte',
  'Chic R2 Mtl Bleu Cobalte',
  'Chic R2 Mtl Bleu Cobalte',
  'شيك R2 معدني أزرق كوبالت',
  'Arabesque tile with a brilliant cobalt-blue metallic electroplated finish. 20x20 cm.',
  'Carreau arabesque avec finition métallique électrodéposée bleu cobalt brillant. 20x20 cm.',
  'بلاط أرابيسك بتشطيب معدني كهروكيميائي أزرق كوبالت لامع. 20×20 سم.',
  0.00, true, true, ARRAY['ARC-CHI-009.jpg']
FROM categories c WHERE c.slug = 'chic';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'chic-r2-mtl-mauve',
  'Chic R2 Mtl Mauve',
  'Chic R2 Mtl Mauve',
  'شيك R2 معدني موف',
  'Arabesque tile with a vibrant mauve/fuchsia metallic finish. 20x20 cm.',
  'Carreau arabesque avec finition métallique mauve/fuchsia vive. 20x20 cm.',
  'بلاط أرابيسك بتشطيب معدني موف/فوشيا زاهٍ. 20×20 سم.',
  0.00, true, false, ARRAY['ARC-CHI-010.jpg']
FROM categories c WHERE c.slug = 'chic';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'chic-r2-mtl-gold',
  'Chic R2 Mtl Gold',
  'Chic R2 Mtl Gold',
  'شيك R2 معدني ذهبي',
  'Luxurious gold arabesque tile with an opulent metallic finish. 20x20 cm.',
  'Carreau arabesque or luxueux avec finition métallique opulente. 20x20 cm.',
  'بلاط أرابيسك ذهبي فاخر بتشطيب معدني بذيخ. 20×20 سم.',
  0.00, true, true, ARRAY['ARC-CHI-011.jpg']
FROM categories c WHERE c.slug = 'chic';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'chic-r2-mtl-rose-gold',
  'Chic R2 Mtl Rose Gold',
  'Chic R2 Mtl Rose Gold',
  'شيك R2 معدني روز غولد',
  'Arabesque tile with a rose gold metallic finish. 20x20 cm.',
  'Carreau arabesque avec finition métallique rose gold. 20x20 cm.',
  'بلاط أرابيسك بتشطيب معدني روز غولد. 20×20 سم.',
  0.00, true, false, ARRAY['ARC-CHI-012.jpg']
FROM categories c WHERE c.slug = 'chic';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'chic-r2-mtl-silver',
  'Chic R2 Mtl Silver',
  'Chic R2 Mtl Silver',
  'شيك R2 معدني فضي',
  'Arabesque tile with an elegant silver metallic finish. 20x20 cm.',
  'Carreau arabesque avec finition métallique argent élégant. 20x20 cm.',
  'بلاط أرابيسك بتشطيب معدني فضي أنيق. 20×20 سم.',
  0.00, true, false, ARRAY['ARC-CHI-013.jpg']
FROM categories c WHERE c.slug = 'chic';

INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'chic-r2-mtl-bleu-petrole',
  'Chic R2 Mtl Bleu Pétrole',
  'Chic R2 Mtl Bleu Pétrole',
  'شيك R2 معدني أزرق بترولي',
  'Arabesque tile with a teal petroleum-blue metallic finish. 20x20 cm.',
  'Carreau arabesque avec finition métallique bleu pétrole. 20x20 cm.',
  'بلاط أرابيسك بتشطيب معدني أزرق بترولي. 20×20 سم.',
  0.00, true, false, ARRAY['ARC-CHI-014.jpg']
FROM categories c WHERE c.slug = 'chic';

-- KRONFEL
INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'kronfel',
  'Kronfel',
  'Kronfel',
  'كرونفل',
  'Traditional hand-painted square tile (20x20 cm) with rich blue, gold and red floral ornamental patterns. Includes matching border pieces.',
  'Carreau carré peint à la main (20x20 cm) avec riches motifs ornementaux floraux bleus, dorés et rouges. Comprend des bordures assorties.',
  'بلاط مربع مطلي يدويًا (20×20 سم) بزخارف زهرية تقليدية غنية باللون الأزرق والذهبي والأحمر. يشمل قطع الحدود المتناسقة.',
  0.00, true, true, ARRAY['ARC-KRO-001.jpg']
FROM categories c WHERE c.slug = 'kronfel';

-- CASBAH
INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'casbah',
  'Casbah',
  'Casbah',
  'قصبة',
  'Andalusian-style hand-painted tile (20x20 cm) with vibrant blue, green and yellow botanical motifs. Includes matching border and corner pieces.',
  'Carreau peint à la main de style andalou (20x20 cm) avec des motifs botaniques vibrants bleus, verts et jaunes. Comprend bordures et coins assortis.',
  'بلاط بالأسلوب الأندلسي مرسوم يدويًا (20×20 سم) بزخارف نباتية زاهية باللون الأزرق والأخضر والأصفر. يشمل حدود وزوايا متناسقة.',
  0.00, true, true, ARRAY['ARC-CAS-001.jpg']
FROM categories c WHERE c.slug = 'casbah';

-- YASMINE
INSERT INTO products (category_id, slug, name_en, name_fr, name_ar, description_en, description_fr, description_ar, base_price, is_active, is_featured, images)
SELECT c.id,
  'yasmine',
  'Yasmine',
  'Yasmine',
  'ياسمين',
  'Ottoman-inspired hand-painted tile (20x20 cm) with intricate scrollwork and floral arabesque in red, gold and green. Includes matching borders.',
  'Carreau peint à la main d''inspiration ottomane (20x20 cm) avec arabesque florale et entrelacs en rouge, or et vert. Comprend bordures assorties.',
  'بلاط مستوحى من العثمانية مرسوم يدويًا (20×20 سم) بزخارف تدوير وأرابيسك زهري بالأحمر والذهبي والأخضر. يشمل حدود متناسقة.',
  0.00, true, true, ARRAY['ARC-YAS-001.jpg']
FROM categories c WHERE c.slug = 'yasmine';


-- ── STEP 4: PRODUCT VARIANTS ─────────────────────────────────
-- Each product gets a single "Standard" variant for ordering purposes
-- SKUs follow pattern: {product-slug}-STD
-- After pricing is confirmed by client, update the base_price on products
-- and price_modifier on variants accordingly.

INSERT INTO product_variants (product_id, name_en, name_fr, name_ar, sku, price_modifier, stock)
SELECT p.id,
  'Standard — ' || split_part(p.slug, '-', 1),
  'Standard — ' || split_part(p.slug, '-', 1),
  'قياسي',
  upper(replace(p.slug, '-', '_')) || '_STD',
  0.00,
  100
FROM products p;


-- ── STEP 5: UPDATE IMAGE URLS AFTER STORAGE UPLOAD ──────────
-- Run this AFTER you upload all images to Supabase Storage
-- bucket: product-images  folder: products/
-- Replace YOUR_SUPABASE_PROJECT_URL with your actual project URL

-- Run this AFTER you upload all images to Supabase Storage
-- bucket: product-images  folder: products/
-- Replace YOUR_SUPABASE_PROJECT_URL with your actual project URL (no trailing slash)

UPDATE products
SET images = ARRAY[
  'https://YOUR_SUPABASE_PROJECT_URL.supabase.co/storage/v1/object/public/product-images/products/' || images[1]
]
WHERE array_length(images, 1) > 0
  AND images[1] NOT LIKE 'http%';

-- ─────────────────────────────────────────────────────────────
-- END OF SEED
-- Total: 9 categories, 57 products, 57 variants
-- ─────────────────────────────────────────────────────────────