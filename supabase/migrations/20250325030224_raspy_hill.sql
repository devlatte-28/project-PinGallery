/*
  # Create memories and profiles tables

  1. New Tables
    - `memories`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `date_taken` (date)
      - `location` (text, optional)
      - `user_id` (uuid, references auth.users)
    
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `name` (text)
      - `avatar_url` (text)
      - `bio` (text)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

CREATE TABLE memories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  date_taken date NOT NULL,
  location text,
  user_id uuid REFERENCES auth.users NOT NULL
);

CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users,
  name text NOT NULL,
  avatar_url text,
  bio text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own memories"
  ON memories
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own memories"
  ON memories
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own memories"
  ON memories
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own memories"
  ON memories
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);