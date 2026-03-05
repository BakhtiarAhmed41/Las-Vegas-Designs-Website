-- Design Library schema for PostgreSQL (Supabase)

CREATE TABLE IF NOT EXISTS main_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS themes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sub_themes (
  id SERIAL PRIMARY KEY,
  theme_id INT NOT NULL REFERENCES themes(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (theme_id, slug)
);
CREATE INDEX IF NOT EXISTS idx_sub_themes_theme ON sub_themes(theme_id);

CREATE TABLE IF NOT EXISTS filter_options (
  id SERIAL PRIMARY KEY,
  main_category_id INT NOT NULL REFERENCES main_categories(id) ON DELETE CASCADE,
  filter_key VARCHAR(50) NOT NULL,
  value VARCHAR(150) NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (main_category_id, filter_key, value)
);
CREATE INDEX IF NOT EXISTS idx_filter_options_cat_key ON filter_options(main_category_id, filter_key);

CREATE TABLE IF NOT EXISTS designs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  price NUMERIC(10,2) DEFAULT 0.00,
  is_free BOOLEAN DEFAULT true,
  main_category_id INT NOT NULL REFERENCES main_categories(id),
  theme_id INT REFERENCES themes(id),
  sub_theme_id INT REFERENCES sub_themes(id),
  main_preview_url VARCHAR(500),
  stitchout_url VARCHAR(500),
  mockup_url VARCHAR(500),
  seo_title VARCHAR(255),
  meta_description TEXT,
  url_slug VARCHAR(255),
  tags JSONB DEFAULT '[]'::jsonb,
  alt_text VARCHAR(255),
  internal_notes TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft','published')),
  is_featured BOOLEAN DEFAULT false,
  is_new_arrival BOOLEAN DEFAULT false,
  is_bundle BOOLEAN DEFAULT false,
  technical_attributes JSONB DEFAULT '{}'::jsonb,
  formats JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_designs_status ON designs(status);
CREATE INDEX IF NOT EXISTS idx_designs_main_category ON designs(main_category_id);
CREATE INDEX IF NOT EXISTS idx_designs_theme ON designs(theme_id);
CREATE INDEX IF NOT EXISTS idx_designs_sub_theme ON designs(sub_theme_id);
CREATE INDEX IF NOT EXISTS idx_designs_is_free ON designs(is_free);
CREATE INDEX IF NOT EXISTS idx_designs_created ON designs(created_at);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS designs_updated_at ON designs;
CREATE TRIGGER designs_updated_at
  BEFORE UPDATE ON designs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TABLE IF NOT EXISTS design_sizes (
  id SERIAL PRIMARY KEY,
  design_id INT NOT NULL REFERENCES designs(id) ON DELETE CASCADE,
  hoop VARCHAR(20),
  width_in NUMERIC(6,2),
  height_in NUMERIC(6,2),
  stitches INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_design_sizes_design ON design_sizes(design_id);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  total NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','paid','failed')),
  payment_provider TEXT CHECK (payment_provider IN ('stripe','paypal')),
  external_id VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_external ON orders(external_id);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  design_id INT NOT NULL REFERENCES designs(id),
  price NUMERIC(10,2) NOT NULL,
  quantity INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

CREATE TABLE IF NOT EXISTS order_downloads (
  id SERIAL PRIMARY KEY,
  order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  design_id INT NOT NULL REFERENCES designs(id),
  token VARCHAR(64) NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_order_downloads_token ON order_downloads(token);
