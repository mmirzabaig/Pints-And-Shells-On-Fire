'use client'

import { Navigation } from '@/components/Navigation'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { Beer } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function TacosPage() {
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase])

  return (
    <div className="flex flex-col h-screen">
      <Navigation user={user} />

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-2xl px-4">
          <Beer className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Taco Finder Coming Soon!</h2>
          <p className="text-muted-foreground mb-6">
            We're working on integrating taco locations near your favorite breweries.
            This feature will help you find the perfect food pairing for your brewery tour.
          </p>
          <Link href="/">
            <Button>Back to Map</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
