import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Pints & Shells - Austin Brewery Tours',
  description: 'Discover and create your perfect brewery tour in Austin, Texas. Find the best craft breweries and taco spots.',
  keywords: ['Austin', 'breweries', 'craft beer', 'brewery tour', 'tacos', 'Texas'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
