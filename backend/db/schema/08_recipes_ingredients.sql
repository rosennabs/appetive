-- Drop and recreate recipes_ingredients table
-- Setup uuid extension first 
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS recipes_ingredients CASCADE;

CREATE TABLE
  recipes_ingredients (
    id SERIAL PRIMARY KEY NOT NULL,
    recipe_id INTEGER REFERENCES recipes (id) ON DELETE CASCADE,
    ingredient_id INTEGER REFERENCES ingredients (id) ON DELETE CASCADE,
    measurement VARCHAR(255) NOT NULL
  );