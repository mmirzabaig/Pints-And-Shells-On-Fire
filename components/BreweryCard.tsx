'use client'

import { Brewery } from '@/types'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Star, Globe, Phone, Plus, Trash2 } from 'lucide-react'
import { formatAddress, getPhotoUrl } from '@/lib/utils'
import Image from 'next/image'

interface BreweryCardProps {
  brewery: Brewery
  onAdd?: () => void
  onRemove?: () => void
  isSelected?: boolean
  canAdd?: boolean
}

export function BreweryCard({ brewery, onAdd, onRemove, isSelected, canAdd = true }: BreweryCardProps) {
  const photo = brewery.photos?.[0]
  const photoUrl = photo ? getPhotoUrl(photo.photo_reference) : null

  return (
    <Card className={`overflow-hidden ${isSelected ? 'ring-2 ring-primary' : ''}`}>
      {photoUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={photoUrl}
            alt={brewery.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{brewery.name}</CardTitle>
            <CardDescription className="mt-1 flex items-center text-xs">
              <MapPin className="mr-1 h-3 w-3" />
              {formatAddress(brewery.formatted_address)}
            </CardDescription>
          </div>
          {brewery.rating && (
            <Badge variant="secondary" className="ml-2">
              <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
              {brewery.rating}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        {brewery.opening_hours && (
          <div className="text-sm">
            <Badge variant={brewery.opening_hours.open_now ? 'default' : 'destructive'}>
              {brewery.opening_hours.open_now ? 'Open Now' : 'Closed'}
            </Badge>
          </div>
        )}

        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          {brewery.website && (
            <a
              href={brewery.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-primary"
            >
              <Globe className="mr-1 h-3 w-3" />
              Website
            </a>
          )}
          {brewery.phone_number && (
            <span className="flex items-center">
              <Phone className="mr-1 h-3 w-3" />
              {brewery.phone_number}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter>
        {isSelected ? (
          <Button
            variant="destructive"
            size="sm"
            className="w-full"
            onClick={onRemove}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Remove from Tour
          </Button>
        ) : (
          <Button
            variant="default"
            size="sm"
            className="w-full"
            onClick={onAdd}
            disabled={!canAdd}
          >
            <Plus className="mr-2 h-4 w-4" />
            {canAdd ? 'Add to Tour' : 'Tour Full (Max 5)'}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
