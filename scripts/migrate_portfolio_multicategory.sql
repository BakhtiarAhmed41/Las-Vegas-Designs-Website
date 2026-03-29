-- Run once on existing databases: multi-category support for portfolio_items
ALTER TABLE portfolio_items
  ADD COLUMN IF NOT EXISTS category_ids JSONB DEFAULT '[]'::jsonb;

UPDATE portfolio_items
SET category_ids = jsonb_build_array(category_id)
WHERE category_id IS NOT NULL
  AND category_id <> ''
  AND (category_ids IS NULL OR category_ids = '[]'::jsonb OR jsonb_array_length(category_ids) = 0);

CREATE INDEX IF NOT EXISTS idx_portfolio_items_category_ids ON portfolio_items USING GIN (category_ids);
