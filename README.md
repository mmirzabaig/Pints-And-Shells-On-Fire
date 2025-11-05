# Pints & Shells - Austin Brewery Tour App

A modern web application for discovering and planning brewery tours in Austin, Texas. Built with Next.js 15, TypeScript, React 18, and Supabase.

## Features

- 🗺️ **Interactive Brewery Map** - Explore Austin breweries on an interactive Google Maps interface
- 🍺 **Custom Tour Planning** - Select up to 5 breweries to create your perfect tour
- 🔐 **User Authentication** - Sign in with Google to save and manage your tours
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 🌮 **Taco Finder** - Find taco locations near breweries (coming soon)
- 💾 **Persistent Storage** - Tours are saved to Supabase database

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 18
- **Styling**: Tailwind CSS 3
- **Maps**: @vis.gl/react-google-maps
- **State Management**: Zustand
- **UI Components**: Custom components with shadcn/ui patterns
- **Notifications**: Sonner

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with Google OAuth
- **API Routes**: Next.js API Routes

### External APIs
- Google Maps API (Places, Geocoding)
- Zomato API (for taco locations)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account
- Google Cloud Platform account (for Maps API)
- Zomato API key (optional, for taco feature)

### 1. Clone the Repository

```bash
git clone https://github.com/WBHankins93/Pints-And-Shells-On-Fire.git
cd Pints-And-Shells-On-Fire
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API to get your credentials
3. Run the database schema:
   - Go to the SQL Editor in your Supabase dashboard
   - Copy the contents of `supabase/schema.sql`
   - Execute the SQL to create tables and policies

### 4. Configure Google OAuth in Supabase

1. Go to Authentication > Providers in your Supabase dashboard
2. Enable Google provider
3. Add authorized redirect URLs:
   - `http://localhost:3000/auth/callback` (development)
   - `https://yourdomain.com/auth/callback` (production)

### 5. Set Up Google Maps API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable these APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
4. Create an API key with restrictions

### 6. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Fill in your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Zomato API (optional)
ZOMATO_API_KEY=your-zomato-api-key
NEXT_PUBLIC_ZOMATO_API_KEY=your-zomato-api-key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 7. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── breweries/    # Brewery search endpoints
│   │   └── tacos/        # Taco location endpoints
│   ├── auth/             # Authentication pages
│   ├── tour/             # Tour management page
│   ├── tacos/            # Taco finder page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page (map)
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── Navigation.tsx    # Navigation bar
│   ├── BreweryCard.tsx   # Brewery display card
│   └── BreweryMap.tsx    # Google Maps component
├── hooks/                 # Custom React hooks
│   └── useTourStore.ts   # Zustand store for tour state
├── lib/                   # Utility libraries
│   ├── supabase/         # Supabase client setup
│   └── utils.ts          # Helper functions
├── types/                 # TypeScript type definitions
│   └── index.ts          # Database and app types
├── supabase/             # Database migrations
│   └── schema.sql        # Database schema
├── src-legacy/           # Original React app (archived)
└── public/               # Static assets
```

## Database Schema

### Tables

- **breweries** - Stores brewery information from Google Places
- **user_tours** - User's selected breweries for their tour
- **taco_locations** - Taco restaurant locations

### Row Level Security (RLS)

All tables have RLS policies enabled:
- Breweries are readable by everyone
- Users can only access their own tours
- Authenticated users can insert/update data

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## Migration from Legacy Version

This is a complete rewrite from the original Create React App version. Key improvements:

- ✅ Modern Next.js 15 with App Router
- ✅ Full TypeScript support
- ✅ Supabase instead of Firebase
- ✅ Modern Google Maps integration
- ✅ Improved state management with Zustand
- ✅ Better UI with Tailwind CSS
- ✅ API routes for better security
- ✅ Improved authentication flow
- ✅ Row-level security in database

## Legacy Version

The original Create React App version is preserved in the `src-legacy` directory for reference.

**Original deployment**: https://pintsandshells-e38a2.appspot.com

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

- Original version built with Create React App
- Austin brewery data from Google Places API
- UI components inspired by shadcn/ui
- Map integration powered by @vis.gl/react-google-maps

## Support

For issues or questions, please open an issue on GitHub.

---

**Enjoy exploring Austin's craft beer scene! 🍺**

