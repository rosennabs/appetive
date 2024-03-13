-- Drop and recreate meal_plan table
-- Setup uuid extension first 
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS meal_plan CASCADE;

CREATE TABLE
  meal_plan (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id uuid REFERENCES users (id) ON DELETE CASCADE,
    recipe_id INTEGER REFERENCES recipes (id) ON DELETE CASCADE,
    day VARCHAR(255) NOT NULL,
    meal_type VARCHAR(255) NOT NULL
  );