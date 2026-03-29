CREATE TABLE IF NOT EXISTS portfolio_items (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  category_id TEXT NOT NULL,
  category_ids JSONB DEFAULT '[]'::jsonb,
  description TEXT DEFAULT '',
  customer_file_url TEXT DEFAULT '',
  final_result_url TEXT DEFAULT '',
  extra_image_url TEXT DEFAULT '',
  tags JSONB DEFAULT '[]'::jsonb,
  overview TEXT DEFAULT '',
  service TEXT DEFAULT '',
  used_for TEXT DEFAULT '',
  formats TEXT DEFAULT '',
  project_type TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_portfolio_items_category_id ON portfolio_items(category_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_status ON portfolio_items(status);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_category_ids ON portfolio_items USING GIN (category_ids);
