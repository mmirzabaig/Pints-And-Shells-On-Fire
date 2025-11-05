import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const lat = searchParams.get('lat') || '30.2672'
  const lon = searchParams.get('lon') || '-97.7431'
  const radius = searchParams.get('radius') || '5000' // 5km in meters

  const apiKey = process.env.ZOMATO_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Zomato API key not configured' },
      { status: 500 }
    )
  }

  try {
    const url = `https://developers.zomato.com/api/v2.1/search?lat=${lat}&lon=${lon}&radius=${radius}&q=taco&count=20`

    const response = await fetch(url, {
      headers: {
        'user-key': apiKey,
        'Accept': 'application/json',
      },
    })

    const data = await response.json()

    const tacoLocations = (data.restaurants || []).map((item: any) => ({
      id: item.restaurant.id,
      name: item.restaurant.name,
      location: {
        address: item.restaurant.location.address,
        latitude: parseFloat(item.restaurant.location.latitude),
        longitude: parseFloat(item.restaurant.location.longitude),
      },
      rating: item.restaurant.user_rating.aggregate_rating,
      cuisines: item.restaurant.cuisines,
      average_cost_for_two: item.restaurant.average_cost_for_two,
      photos_url: item.restaurant.photos_url,
      url: item.restaurant.url,
    }))

    return NextResponse.json({ tacos: tacoLocations })
  } catch (error) {
    console.error('Error fetching taco locations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch taco locations' },
      { status: 500 }
    )
  }
}
