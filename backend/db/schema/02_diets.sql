-- Drop and recreate Diets table
-- Setup uuid extension first 
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS diets CASCADE;

CREATE TABLE
  diets (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL
  );