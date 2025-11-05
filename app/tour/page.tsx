'use client'

import { Navigation } from '@/components/Navigation'
import { BreweryCard } from '@/components/BreweryCard'
import { useTourStore } from '@/hooks/useTourStore'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Beer, Save } from 'lucide-react'
import Link from 'next/link'

export default function TourPage() {
  const { selectedBreweries, removeBrewery } = useTourStore()
  const [user, setUser] = useState<any>(null)
  const [isSaving, setIsSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase])

  const handleSaveTour = async () => {
    if (!user) {
      toast.error('Please sign in to save your tour')
      return
    }

    setIsSaving(true)

    try {
      // First, ensure breweries exist in the database
      for (const brewery of selectedBreweries) {
        const { error: breweryError } = await (supabase
          .from('breweries') as any)
          .upsert({
            place_id: brewery.place_id,
            name: brewery.name,
            formatted_address: brewery.formatted_address,
            geometry: brewery.geometry as any,
            rating: brewery.rating ?? null,
            website: brewery.website ?? null,
            opening_hours: brewery.opening_hours as any,
            photos: brewery.photos as any,
            phone_number: brewery.phone_number ?? null,
            price_level: brewery.price_level ?? null,
            user_ratings_total: brewery.user_ratings_total ?? null,
          }, {
            onConflict: 'place_id'
          })

        if (breweryError) {
          console.error('Error saving brewery:', breweryError)
        }
      }

      // Delete existing tour entries for this user
      await supabase
        .from('user_tours')
        .delete()
        .eq('user_id', user.id)

      // Get brewery IDs for the selected breweries
      const { data: breweriesData } = await supabase
        .from('breweries')
        .select('id, place_id')
        .in('place_id', selectedBreweries.map(b => b.place_id))

      if (breweriesData && breweriesData.length > 0) {
        // Insert new tour entries
        const tourEntries = breweriesData.map((brewery: any, index: number) => ({
          user_id: user.id,
          brewery_id: brewery.id,
          position: index,
        }))

        const { error: tourError } = await (supabase
          .from('user_tours') as any)
          .insert(tourEntries)

        if (tourError) {
          throw tourError
        }

        toast.success('Tour saved successfully!')
      }
    } catch (error) {
      console.error('Error saving tour:', error)
      toast.error('Failed to save tour')
    } finally {
      setIsSaving(false)
    }
  }

  if (selectedBreweries.length === 0) {
    return (
      <div className="flex flex-col h-screen">
        <Navigation user={user} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Beer className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No breweries in your tour yet</h2>
            <p className="text-muted-foreground mb-6">
              Add breweries from the map to create your perfect tour
            </p>
            <Link href="/">
              <Button>Browse Breweries</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      <Navigation user={user} />

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">My Brewery Tour</h1>
              <p className="text-muted-foreground mt-1">
                {selectedBreweries.length} of 5 breweries selected
              </p>
            </div>

            {user && (
              <Button onClick={handleSaveTour} disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? 'Saving...' : 'Save Tour'}
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedBreweries.map((brewery, index) => (
              <div key={brewery.place_id} className="relative">
                <div className="absolute -top-2 -left-2 z-10 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <BreweryCard
                  brewery={brewery}
                  onRemove={() => removeBrewery(brewery.place_id)}
                  isSelected={true}
                />
              </div>
            ))}
          </div>

          {selectedBreweries.length < 5 && (
            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">
                You can add {5 - selectedBreweries.length} more {5 - selectedBreweries.length === 1 ? 'brewery' : 'breweries'}
              </p>
              <Link href="/">
                <Button variant="outline">Add More Breweries</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
