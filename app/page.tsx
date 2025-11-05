import { createClient } from '@/lib/supabase/server'
import { Navigation } from '@/components/Navigation'
import { BreweryMap } from '@/components/BreweryMap'
import { Brewery } from '@/types'

async function getBreweries(): Promise<Brewery[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('breweries')
    .select('*')
    .order('name')

  if (error || !data) {
    console.error('Error fetching breweries:', error)
    return []
  }

  return data.map((brewery: any) => ({
    id: brewery.id,
    place_id: brewery.place_id,
    name: brewery.name,
    formatted_address: brewery.formatted_address,
    geometry: brewery.geometry as { lat: number; lng: number },
    rating: brewery.rating ? Number(brewery.rating) : null,
    website: brewery.website ?? null,
    opening_hours: brewery.opening_hours as any,
    photos: brewery.photos as any,
    phone_number: brewery.phone_number ?? null,
    price_level: brewery.price_level ?? null,
    user_ratings_total: brewery.user_ratings_total ?? null,
    created_at: brewery.created_at ?? undefined,
    updated_at: brewery.updated_at ?? undefined,
  }))
}

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const breweries = await getBreweries()

  return (
    <div className="flex flex-col h-screen">
      <Navigation user={user} />

      <main className="flex-1 relative">
        <div className="absolute inset-0">
          <BreweryMap breweries={breweries} />
        </div>

        {/* Floating search/filter panel */}
        <div className="absolute top-4 left-4 right-4 md:left-4 md:right-auto md:w-96 z-10">
          <div className="bg-card border rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Austin Breweries</h2>
            <p className="text-sm text-muted-foreground">
              Click on markers to view brewery details and add to your tour (max 5)
            </p>
            <div className="mt-3 text-sm">
              <span className="font-medium">{breweries.length}</span> breweries found
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
