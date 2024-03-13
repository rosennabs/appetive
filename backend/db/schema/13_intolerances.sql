-- Drop and recreate Intolerances table
-- Setup uuid extension first 
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS intolerances CASCADE;

CREATE TABLE
  intolerances (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL
  );