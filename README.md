# BakaBoost

BakaBoost is a React + Vite creator-support platform. Supporters can discover creators, save gifts, and track gift activity. Creators can manage a public profile, wishlist, and optional Spotify recommendations.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Supabase Auth and Postgres

## Requirements

- Node.js 20 or newer
- npm
- A Supabase project for authentication and profile data

## Local setup

```bash
npm install
```

Create a root `.env` file. Never commit this file:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

The app also accepts the existing names below if your environment already uses them:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

Run the database setup:

1. Open the Supabase SQL Editor.
2. Copy and run [`supabase-schema.sql`](supabase-schema.sql).
3. The schema is safe to run more than once and does not delete existing rows.

Start the development server:

```bash
npm run dev
```

Open <http://localhost:8443/>.

## Available commands

```bash
npm run dev       # Start Vite on port 8443
npm run build     # Create a production build
npm run preview   # Preview the production build
npm run format    # Format the project with oxfmt
```

## Authentication setup

In Supabase, open **Authentication > URL Configuration** and add:

```text
Site URL:
http://localhost:8443

Redirect URL:
http://localhost:8443/**
```

For Google and Apple OAuth, use this Supabase callback URL:

```text
https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
```

Configure OAuth providers under **Authentication > Providers** in the Supabase dashboard. Provider credentials are never stored in this repository.

## User flows

- Authentication leads to role selection: creator or supporter.
- Supporters complete a profile and can view gift history.
- Creators complete a public profile and can display wishlist items.
- Spotify recommendations are optional and only appear when enabled and present in the database.
- Empty database states are shown instead of placeholder profile data.

## Project structure

```text
src/
  App.tsx             Main application and page flows
  index.css           Global styles and responsive design
  lib/supabase.ts     Supabase client configuration
  imports/             Local visual assets
supabase-schema.sql   Database tables, indexes, and RLS policies
.env.example          Environment variable template
vite.config.ts        Vite configuration
```

## Security notes

- Use only the Supabase publishable/anon key in the frontend.
- Never commit `.env`, service-role keys, OAuth secrets, or Apple `.p8` files.
- Row Level Security policies in `supabase-schema.sql` restrict profile ownership, wishlist management, recommendations, and gift history access.

## Amazon creator search

The creator wishlist includes an Amazon search powered by the `amazon-search` Supabase Edge Function. Configure the function secrets; never put these values in `.env` or a `VITE_` variable:

```bash
supabase functions deploy amazon-search
supabase secrets set RAPIDAPI_KEY=your_rapidapi_key RAPIDAPI_AMAZON_HOST=real-time-amazon-data.p.rapidapi.com
```

The default provider URL is `https://real-time-amazon-data.p.rapidapi.com/search`. If your RapidAPI subscription uses another Amazon provider, set its search endpoint too:

```bash
supabase secrets set RAPIDAPI_AMAZON_SEARCH_URL=https://your-provider.p.rapidapi.com/search
```

The function accepts `POST { "query": "wireless headphones", "country": "US" }` and returns normalized products. The frontend calls it with `supabase.functions.invoke("amazon-search")`, then saves the selected result through the authenticated `wishlist_items` insert and its existing RLS policy.

## Spotify creator search

Deploy the Spotify search function and store the Spotify app credentials as Supabase secrets:

```bash
supabase functions deploy spotify-search
supabase secrets set SPOTIFY_CLIENT_ID=your_client_id SPOTIFY_CLIENT_SECRET=your_client_secret
```

Creators can search tracks and playlists in their profile, add a result to Spotify picks, and play valid tracks, albums, playlists, artists, shows, or episodes through Spotify's official embed player. The client never receives the Spotify client secret.
