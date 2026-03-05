-- Seed data for Design Library (run after schema.sql)

INSERT INTO main_categories (name, slug, sort_order) VALUES
('Embroidery', 'embroidery', 1),
('Print', 'print', 2),
('SVG and Cricut', 'svg-cricut', 3),
('Laser and CNC', 'laser-cnc', 4)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

INSERT INTO themes (name, slug, sort_order) VALUES
('Animals', 'animals', 1),
('Vehicles and Equipment', 'vehicles', 2),
('Sports and Leagues', 'sports', 3),
('Holidays and Seasonal', 'holidays', 4),
('Military and Service', 'military', 5),
('Farm and Rural Life', 'farm', 6),
('Logos and Branding', 'logos', 7),
('Quotes and Typography', 'quotes', 8),
('Kids and Baby', 'kids', 9),
('Wedding and Romance', 'wedding', 10),
('Professions and Jobs', 'professions', 11),
('Flags and Patriotism', 'flags', 12),
('Nature and Outdoor', 'nature', 13),
('Food and Drinks', 'food', 14),
('Signs and Home Decor', 'signs', 15)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, sort_order = EXCLUDED.sort_order;

INSERT INTO sub_themes (theme_id, name, slug, sort_order)
SELECT id, 'Dogs', 'dogs', 1 FROM themes WHERE slug = 'animals' LIMIT 1
ON CONFLICT (theme_id, slug) DO NOTHING;
INSERT INTO sub_themes (theme_id, name, slug, sort_order)
SELECT id, 'NFL', 'nfl', 1 FROM themes WHERE slug = 'sports' LIMIT 1
ON CONFLICT (theme_id, slug) DO NOTHING;
INSERT INTO sub_themes (theme_id, name, slug, sort_order)
SELECT id, 'Semi Trucks', 'semi-trucks', 1 FROM themes WHERE slug = 'vehicles' LIMIT 1
ON CONFLICT (theme_id, slug) DO NOTHING;
INSERT INTO sub_themes (theme_id, name, slug, sort_order)
SELECT id, 'Christmas', 'christmas', 1 FROM themes WHERE slug = 'holidays' LIMIT 1
ON CONFLICT (theme_id, slug) DO NOTHING;

-- Filter options: Embroidery (placement, style, hoop_size)
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'placement', 'Left Chest', 1 FROM main_categories WHERE slug = 'embroidery' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'placement', 'Centre Chest', 2 FROM main_categories WHERE slug = 'embroidery' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'placement', 'Full Back', 3 FROM main_categories WHERE slug = 'embroidery' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'placement', 'Sleeve', 4 FROM main_categories WHERE slug = 'embroidery' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'placement', 'Hat', 5 FROM main_categories WHERE slug = 'embroidery' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;

INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'style', 'Flat Embroidery', 1 FROM main_categories WHERE slug = 'embroidery' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'style', 'Applique', 2 FROM main_categories WHERE slug = 'embroidery' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'style', '3D Puff', 3 FROM main_categories WHERE slug = 'embroidery' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'style', 'Outline', 4 FROM main_categories WHERE slug = 'embroidery' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'style', 'FSL', 5 FROM main_categories WHERE slug = 'embroidery' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'style', 'Patch', 6 FROM main_categories WHERE slug = 'embroidery' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;

INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'hoop_size', '4x4', 1 FROM main_categories WHERE slug = 'embroidery' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'hoop_size', '5x7', 2 FROM main_categories WHERE slug = 'embroidery' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'hoop_size', '6x10', 3 FROM main_categories WHERE slug = 'embroidery' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'hoop_size', '8x8', 4 FROM main_categories WHERE slug = 'embroidery' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'hoop_size', '8x12', 5 FROM main_categories WHERE slug = 'embroidery' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'hoop_size', '9.5x14', 6 FROM main_categories WHERE slug = 'embroidery' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;

-- Print: print_method, design_style, file_format, background
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'print_method', 'DTF', 1 FROM main_categories WHERE slug = 'print' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'print_method', 'Sublimation', 2 FROM main_categories WHERE slug = 'print' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'print_method', 'Screen Print', 3 FROM main_categories WHERE slug = 'print' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'print_method', 'Vinyl', 4 FROM main_categories WHERE slug = 'print' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'print_method', 'Full Color', 5 FROM main_categories WHERE slug = 'print' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;

INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'design_style', 'Minimal', 1 FROM main_categories WHERE slug = 'print' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'design_style', 'Bold', 2 FROM main_categories WHERE slug = 'print' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'design_style', 'Vintage', 3 FROM main_categories WHERE slug = 'print' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'design_style', 'Grunge', 4 FROM main_categories WHERE slug = 'print' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'design_style', 'Street', 5 FROM main_categories WHERE slug = 'print' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'design_style', 'Modern', 6 FROM main_categories WHERE slug = 'print' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;

INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'file_format', 'PNG', 1 FROM main_categories WHERE slug = 'print' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'file_format', 'JPG', 2 FROM main_categories WHERE slug = 'print' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'file_format', 'PDF', 3 FROM main_categories WHERE slug = 'print' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'file_format', 'PSD', 4 FROM main_categories WHERE slug = 'print' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'file_format', 'Vector', 5 FROM main_categories WHERE slug = 'print' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;

INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'background', 'Transparent', 1 FROM main_categories WHERE slug = 'print' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'background', 'Solid', 2 FROM main_categories WHERE slug = 'print' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;

-- SVG and Cricut: svg_type, layer_type, design_style, file_format
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'svg_type', 'Basic Cut', 1 FROM main_categories WHERE slug = 'svg-cricut' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'svg_type', 'Print Then Cut', 2 FROM main_categories WHERE slug = 'svg-cricut' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;

INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'layer_type', 'One Color', 1 FROM main_categories WHERE slug = 'svg-cricut' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'layer_type', 'Multi Color', 2 FROM main_categories WHERE slug = 'svg-cricut' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'layer_type', 'Layered', 3 FROM main_categories WHERE slug = 'svg-cricut' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;

INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'design_style', 'Minimal', 1 FROM main_categories WHERE slug = 'svg-cricut' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'design_style', 'Bold', 2 FROM main_categories WHERE slug = 'svg-cricut' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'design_style', 'Vintage', 3 FROM main_categories WHERE slug = 'svg-cricut' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'design_style', 'Modern', 4 FROM main_categories WHERE slug = 'svg-cricut' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'design_style', 'Script', 5 FROM main_categories WHERE slug = 'svg-cricut' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'design_style', 'Distressed', 6 FROM main_categories WHERE slug = 'svg-cricut' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;

INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'file_format', 'SVG', 1 FROM main_categories WHERE slug = 'svg-cricut' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'file_format', 'DXF', 2 FROM main_categories WHERE slug = 'svg-cricut' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'file_format', 'PNG', 3 FROM main_categories WHERE slug = 'svg-cricut' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'file_format', 'EPS', 4 FROM main_categories WHERE slug = 'svg-cricut' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'file_format', 'PDF', 5 FROM main_categories WHERE slug = 'svg-cricut' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'file_format', 'AI', 6 FROM main_categories WHERE slug = 'svg-cricut' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;

-- Laser and CNC: cut_type, build_style, file_format
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'cut_type', 'Laser Cut', 1 FROM main_categories WHERE slug = 'laser-cnc' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'cut_type', 'CNC Route', 2 FROM main_categories WHERE slug = 'laser-cnc' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'cut_type', 'Plasma Cut', 3 FROM main_categories WHERE slug = 'laser-cnc' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'cut_type', 'Stencil', 4 FROM main_categories WHERE slug = 'laser-cnc' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;

INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'build_style', 'Single Layer', 1 FROM main_categories WHERE slug = 'laser-cnc' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'build_style', 'Layered', 2 FROM main_categories WHERE slug = 'laser-cnc' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'build_style', 'Engrave Plus Cut', 3 FROM main_categories WHERE slug = 'laser-cnc' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'build_style', '3D Stack', 4 FROM main_categories WHERE slug = 'laser-cnc' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;

INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'file_format', 'SVG', 1 FROM main_categories WHERE slug = 'laser-cnc' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'file_format', 'DXF', 2 FROM main_categories WHERE slug = 'laser-cnc' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'file_format', 'AI', 3 FROM main_categories WHERE slug = 'laser-cnc' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'file_format', 'EPS', 4 FROM main_categories WHERE slug = 'laser-cnc' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'file_format', 'PDF', 5 FROM main_categories WHERE slug = 'laser-cnc' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
INSERT INTO filter_options (main_category_id, filter_key, value, sort_order)
SELECT id, 'file_format', 'CDR', 6 FROM main_categories WHERE slug = 'laser-cnc' LIMIT 1
ON CONFLICT (main_category_id, filter_key, value) DO NOTHING;
