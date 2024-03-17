-- Drop and recreate Reviews table
-- Setup uuid extension first 
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE
  reviews (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id uuid REFERENCES users (id) ON DELETE CASCADE,
    recipe_id INTEGER REFERENCES recipes (id) ON DELETE CASCADE,
    rating INTEGER NOT NULL,
    review TEXT,
    created_at TIMESTAMP NOT NULL
  );