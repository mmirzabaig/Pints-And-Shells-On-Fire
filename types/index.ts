export interface Brewery {
  id: string
  place_id: string
  name: string
  formatted_address: string
  geometry: {
    lat: number
    lng: number
  }
  rating?: number | null
  website?: string | null
  opening_hours?: {
    open_now?: boolean
    weekday_text?: string[]
  } | null
  photos?: Array<{
    photo_reference: string
    height: number
    width: number
  }> | null
  phone_number?: string | null
  price_level?: number | null
  user_ratings_total?: number | null
  created_at?: string
  updated_at?: string
}

export interface UserTour {
  id: string
  user_id: string
  brewery_id: string
  position: number
  created_at: string
}

export interface TacoLocation {
  id: string
  name: string
  location: {
    address: string
    latitude: number
    longitude: number
  }
  rating?: number | null
  cuisines?: string | null
  average_cost_for_two?: number | null
  photos_url?: string | null
  url?: string | null
  created_at?: string
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      breweries: {
        Row: {
          id: string
          place_id: string
          name: string
          formatted_address: string
          geometry: Json
          rating: number | null
          website: string | null
          opening_hours: Json | null
          photos: Json | null
          phone_number: string | null
          price_level: number | null
          user_ratings_total: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          place_id: string
          name: string
          formatted_address: string
          geometry: Json
          rating?: number | null
          website?: string | null
          opening_hours?: Json | null
          photos?: Json | null
          phone_number?: string | null
          price_level?: number | null
          user_ratings_total?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          place_id?: string
          name?: string
          formatted_address?: string
          geometry?: Json
          rating?: number | null
          website?: string | null
          opening_hours?: Json | null
          photos?: Json | null
          phone_number?: string | null
          price_level?: number | null
          user_ratings_total?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      user_tours: {
        Row: {
          id: string
          user_id: string
          brewery_id: string
          position: number
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          brewery_id: string
          position?: number
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          brewery_id?: string
          position?: number
          created_at?: string | null
        }
      }
      taco_locations: {
        Row: {
          id: string
          name: string
          location: Json
          rating: number | null
          cuisines: string | null
          average_cost_for_two: number | null
          photos_url: string | null
          url: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          location: Json
          rating?: number | null
          cuisines?: string | null
          average_cost_for_two?: number | null
          photos_url?: string | null
          url?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          location?: Json
          rating?: number | null
          cuisines?: string | null
          average_cost_for_two?: number | null
          photos_url?: string | null
          url?: string | null
          created_at?: string | null
        }
      }
    }
  }
}
