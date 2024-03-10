-- Drop and recreate Notifications table
-- Setup uuid extension first 
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS notifications CASCADE;

CREATE TABLE
  notifications (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id uuid REFERENCES users (id) ON DELETE CASCADE,
    recipe_id INTEGER REFERENCES recipes (id) ON DELETE CASCADE,
    content VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    is_read BOOLEAN DEFAULT FALSE
  );