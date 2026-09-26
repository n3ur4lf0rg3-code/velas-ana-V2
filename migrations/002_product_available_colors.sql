-- Colores habilitados por producto (JSON array de ids). NULL o [] = todos los colores.
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS available_color_ids text NOT NULL DEFAULT '[]';
