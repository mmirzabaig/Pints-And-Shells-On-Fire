import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query') || 'brewery'
  const location = searchParams.get('location') || '30.2672,-97.7431' // Austin, TX
  const radius = searchParams.get('radius') || '25000' // 25km

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Google Maps API key not configured' },
      { status: 500 }
    )
  }

  try {
    // Use Google Places API Nearby Search
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&keyword=${query}&type=bar&key=${apiKey}`

    const response = await fetch(url)
    const data = await response.json()

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      throw new Error(`Google Places API error: ${data.status}`)
    }

    // Get detailed information for each brewery
    const detailedBreweries = await Promise.all(
      (data.results || []).map(async (place: any) => {
        const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_address,geometry,rating,website,opening_hours,photos,formatted_phone_number,price_level,user_ratings_total&key=${apiKey}`

        const detailsResponse = await fetch(detailsUrl)
        const detailsData = await detailsResponse.json()

        if (detailsData.status === 'OK') {
          return {
            id: place.place_id,
            place_id: place.place_id,
            name: detailsData.result.name,
            formatted_address: detailsData.result.formatted_address,
            geometry: {
              lat: detailsData.result.geometry.location.lat,
              lng: detailsData.result.geometry.location.lng,
            },
            rating: detailsData.result.rating,
            website: detailsData.result.website,
            opening_hours: detailsData.result.opening_hours,
            photos: detailsData.result.photos,
            phone_number: detailsData.result.formatted_phone_number,
            price_level: detailsData.result.price_level,
            user_ratings_total: detailsData.result.user_ratings_total,
          }
        }

        return null
      })
    )

    const breweries = detailedBreweries.filter(Boolean)

    return NextResponse.json({ breweries })
  } catch (error) {
    console.error('Error fetching breweries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch breweries' },
      { status: 500 }
    )
  }
}
