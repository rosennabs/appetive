-- Drop and recreate users_recipes table
-- Setup uuid extension first 
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS users_recipes CASCADE;

CREATE TABLE
  users_recipes (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id uuid REFERENCES users (id) ON DELETE CASCADE,
    recipe_id INTEGER REFERENCES recipes (id) ON DELETE CASCADE,
    has_tried BOOLEAN DEFAULT FALSE,
    is_fav BOOLEAN DEFAULT FALSE
  );