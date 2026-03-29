-- Third portfolio image: shown only at the bottom of the project modal (not on cards).
ALTER TABLE portfolio_items
  ADD COLUMN IF NOT EXISTS extra_image_url TEXT DEFAULT '';
