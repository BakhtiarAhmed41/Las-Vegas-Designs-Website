-- Design Library schema for MySQL
-- Run this in phpMyAdmin or mysql CLI.
-- Step 1: Create the database (or use your existing one and change the name below).
-- Step 2: Select it so all CREATE TABLE commands run in that database.

CREATE DATABASE IF NOT EXISTS lasvegasdesigns
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE lasvegasdesigns;

CREATE TABLE IF NOT EXISTS main_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS themes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sub_themes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  theme_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (theme_id) REFERENCES themes(id) ON DELETE CASCADE,
  INDEX idx_theme (theme_id)
);

CREATE TABLE IF NOT EXISTS filter_options (
  id INT AUTO_INCREMENT PRIMARY KEY,
  main_category_id INT NOT NULL,
  filter_key VARCHAR(50) NOT NULL,
  value VARCHAR(150) NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (main_category_id) REFERENCES main_categories(id) ON DELETE CASCADE,
  INDEX idx_category_key (main_category_id, filter_key)
);

CREATE TABLE IF NOT EXISTS designs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10, 2) DEFAULT 0.00,
  is_free BOOLEAN DEFAULT true,
  main_category_id INT NOT NULL,
  theme_id INT,
  sub_theme_id INT,
  main_preview_url VARCHAR(500),
  stitchout_url VARCHAR(500),
  mockup_url VARCHAR(500),
  seo_title VARCHAR(255),
  meta_description TEXT,
  url_slug VARCHAR(255),
  tags JSON,
  alt_text VARCHAR(255),
  internal_notes TEXT,
  status ENUM('draft', 'published') DEFAULT 'draft',
  is_featured BOOLEAN DEFAULT false,
  is_new_arrival BOOLEAN DEFAULT false,
  is_bundle BOOLEAN DEFAULT false,
  technical_attributes JSON,
  formats JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (main_category_id) REFERENCES main_categories(id),
  FOREIGN KEY (theme_id) REFERENCES themes(id),
  FOREIGN KEY (sub_theme_id) REFERENCES sub_themes(id),
  INDEX idx_status (status),
  INDEX idx_main_category (main_category_id),
  INDEX idx_theme (theme_id),
  INDEX idx_sub_theme (sub_theme_id),
  INDEX idx_is_free (is_free),
  INDEX idx_created (created_at)
);

CREATE TABLE IF NOT EXISTS design_sizes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  design_id INT NOT NULL,
  hoop VARCHAR(20),
  width_in DECIMAL(6, 2),
  height_in DECIMAL(6, 2),
  stitches INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (design_id) REFERENCES designs(id) ON DELETE CASCADE,
  INDEX idx_design (design_id)
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
  payment_provider ENUM('stripe', 'paypal'),
  external_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_external (external_id)
);

CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  design_id INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  quantity INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (design_id) REFERENCES designs(id),
  INDEX idx_order (order_id)
);

CREATE TABLE IF NOT EXISTS order_downloads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  design_id INT NOT NULL,
  token VARCHAR(64) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (design_id) REFERENCES designs(id),
  INDEX idx_token (token)
);
