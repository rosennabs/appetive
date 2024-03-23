-- Drop and recreate Recipes table
-- Setup uuid extension first 
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS recipes CASCADE;

CREATE TABLE
  recipes (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id uuid REFERENCES users (id) ON DELETE CASCADE,
    cuisine_id INTEGER REFERENCES cuisines (id) ON DELETE CASCADE,
    diet_id INTEGER REFERENCES diets (id) ON DELETE CASCADE,
    meal_type_id INTEGER REFERENCES meal_types (id) ON DELETE CASCADE,
    intolerance_id INTEGER REFERENCES intolerances (id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    prep_time INTEGER NOT NULL,
    instructions TEXT NOT NULL,
    proteins VARCHAR(255),
    fats VARCHAR(255),
    carbs VARCHAR(255),
    number_of_servings INTEGER,
    calories INTEGER,
    counter_attempt INTEGER,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
  );