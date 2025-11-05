-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Breweries table
CREATE TABLE IF NOT EXISTS breweries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  place_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  formatted_address TEXT NOT NULL,
  geometry JSONB NOT NULL,
  rating NUMERIC(2, 1),
  website TEXT,
  opening_hours JSONB,
  photos JSONB,
  phone_number TEXT,
  price_level INTEGER,
  user_ratings_total INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User tours table
CREATE TABLE IF NOT EXISTS user_tours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  brewery_id UUID NOT NULL REFERENCES breweries(id) ON DELETE CASCADE,
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, brewery_id)
);

-- Taco locations table
CREATE TABLE IF NOT EXISTS taco_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location JSONB NOT NULL,
  rating NUMERIC(2, 1),
  cuisines TEXT,
  average_cost_for_two INTEGER,
  photos_url TEXT,
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_breweries_place_id ON breweries(place_id);
CREATE INDEX IF NOT EXISTS idx_user_tours_user_id ON user_tours(user_id);
CREATE INDEX IF NOT EXISTS idx_user_tours_brewery_id ON user_tours(brewery_id);
CREATE INDEX IF NOT EXISTS idx_user_tours_position ON user_tours(position);

-- Row Level Security (RLS) Policies

-- Enable RLS on tables
ALTER TABLE breweries ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE taco_locations ENABLE ROW LEVEL SECURITY;

-- Breweries: Everyone can read, only authenticated users can insert/update
CREATE POLICY "Breweries are viewable by everyone"
  ON breweries FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert breweries"
  ON breweries FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update breweries"
  ON breweries FOR UPDATE
  USING (auth.role() = 'authenticated');

-- User tours: Users can only see and manage their own tours
CREATE POLICY "Users can view their own tours"
  ON user_tours FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tours"
  ON user_tours FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tours"
  ON user_tours FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tours"
  ON user_tours FOR DELETE
  USING (auth.uid() = user_id);

-- Taco locations: Everyone can read, authenticated users can insert/update
CREATE POLICY "Taco locations are viewable by everyone"
  ON taco_locations FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert taco locations"
  ON taco_locations FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_breweries_updated_at
  BEFORE UPDATE ON breweries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Seed some initial Austin breweries
INSERT INTO breweries (place_id, name, formatted_address, geometry, rating) VALUES
  ('ChIJexample1', 'Jester King Brewery', '13187 Fitzhugh Rd, Austin, TX 78736', '{"lat": 30.2262, "lng": -98.0475}', 4.6),
  ('ChIJexample2', 'Austin Beerworks', '3001 Industrial Terrace, Austin, TX 78758', '{"lat": 30.3484, "lng": -97.7267}', 4.5),
  ('ChIJexample3', 'Live Oak Brewing Company', '1615 Crozier Ln, Del Valle, TX 78617', '{"lat": 30.1847, "lng": -97.5989}', 4.7)
ON CONFLICT (place_id) DO NOTHING;
