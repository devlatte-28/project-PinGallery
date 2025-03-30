/*
  # Create memories table with RLS policies

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

  2. Security
    - Enable RLS
    - Add policies for authenticated users to manage their own memories
*/

CREATE TABLE IF NOT EXISTS memories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  date_taken date NOT NULL,
  location text,
  user_id uuid REFERENCES auth.users NOT NULL
);

ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

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

CREATE INDEX IF NOT EXISTS memories_user_id_idx ON memories(user_id);
CREATE INDEX IF NOT EXISTS memories_created_at_idx ON memories(created_at DESC);