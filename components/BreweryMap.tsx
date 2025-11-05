'use client'

import { useCallback, useState } from 'react'
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps'
import { Brewery } from '@/types'
import { BreweryCard } from './BreweryCard'
import { useTourStore } from '@/hooks/useTourStore'
import { toast } from 'sonner'

interface BreweryMapProps {
  breweries: Brewery[]
  center?: { lat: number; lng: number }
  zoom?: number
}

const AUSTIN_CENTER = { lat: 30.2672, lng: -97.7431 }

export function BreweryMap({ breweries, center = AUSTIN_CENTER, zoom = 11 }: BreweryMapProps) {
  const [selectedBrewery, setSelectedBrewery] = useState<Brewery | null>(null)
  const { addBrewery, removeBrewery, isBrewerySelected, canAddMore } = useTourStore()

  const handleMarkerClick = useCallback((brewery: Brewery) => {
    setSelectedBrewery(brewery)
  }, [])

  const handleAddToTour = useCallback((brewery: Brewery) => {
    const success = addBrewery(brewery)
    if (success) {
      toast.success(`${brewery.name} added to your tour!`)
    } else {
      toast.error('Tour is full or brewery already added')
    }
  }, [addBrewery])

  const handleRemoveFromTour = useCallback((brewery: Brewery) => {
    removeBrewery(brewery.place_id)
    toast.success(`${brewery.name} removed from your tour`)
  }, [removeBrewery])

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
      <Map
        defaultCenter={center}
        defaultZoom={zoom}
        mapId="brewery-map"
        className="w-full h-full"
        gestureHandling="greedy"
        disableDefaultUI={false}
      >
        {breweries.map((brewery) => {
          const isSelected = isBrewerySelected(brewery.place_id)

          return (
            <AdvancedMarker
              key={brewery.place_id}
              position={brewery.geometry}
              onClick={() => handleMarkerClick(brewery)}
            >
              <Pin
                background={isSelected ? '#3b82f6' : '#ef4444'}
                borderColor={isSelected ? '#1e40af' : '#991b1b'}
                glyphColor={isSelected ? '#dbeafe' : '#fee2e2'}
                scale={isSelected ? 1.3 : 1}
              />
            </AdvancedMarker>
          )
        })}

        {selectedBrewery && (
          <InfoWindow
            position={selectedBrewery.geometry}
            onCloseClick={() => setSelectedBrewery(null)}
          >
            <div className="p-2 max-w-sm">
              <BreweryCard
                brewery={selectedBrewery}
                onAdd={() => handleAddToTour(selectedBrewery)}
                onRemove={() => handleRemoveFromTour(selectedBrewery)}
                isSelected={isBrewerySelected(selectedBrewery.place_id)}
                canAdd={canAddMore()}
              />
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  )
}
