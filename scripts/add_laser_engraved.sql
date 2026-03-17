-- Run this once against your production database to add "Laser Engraved" cut type for Laser and CNC
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'cut_type', 'Laser Engraved', 5 FROM main_categories WHERE slug = 'laser-cnc' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
