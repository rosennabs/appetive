-- Drop and recreate Cuisines table
-- Setup uuid extension first 
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS cuisines CASCADE;

CREATE TABLE
  cuisines (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL
  );