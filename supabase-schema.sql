create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('creator', 'user')),
  display_name text not null,
  username text not null unique,
  bio text not null default '',
  spotify_enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.wishlist_items (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  price numeric(10,2) not null check (price >= 0),
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.spotify_recommendations (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  detail text not null default '',
  spotify_url text not null,
  cover_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.gift_history (
  id uuid primary key default gen_random_uuid(),
  supporter_id uuid not null references public.profiles(id) on delete cascade,
  creator_id uuid not null references public.profiles(id) on delete cascade,
  gift_name text not null,
  amount numeric(10,2) not null default 0 check (amount >= 0),
  sent_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.wishlist_items enable row level security;
alter table public.spotify_recommendations enable row level security;
alter table public.gift_history enable row level security;

drop policy if exists "profiles are publicly readable" on public.profiles;
drop policy if exists "users create their own profile" on public.profiles;
drop policy if exists "users update their own profile" on public.profiles;
drop policy if exists "wishlist is publicly readable" on public.wishlist_items;
drop policy if exists "creators manage their wishlist" on public.wishlist_items;
drop policy if exists "enabled recommendations are readable" on public.spotify_recommendations;
drop policy if exists "profile owners manage recommendations" on public.spotify_recommendations;
drop policy if exists "supporters read their own history" on public.gift_history;
drop policy if exists "creators read gifts sent to them" on public.gift_history;
drop policy if exists "supporters send gifts as themselves" on public.gift_history;

create policy "profiles are publicly readable" on public.profiles for select using (true);
create policy "users create their own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "users update their own profile" on public.profiles for update using (auth.uid() = id);
create policy "wishlist is publicly readable" on public.wishlist_items for select using (true);
create policy "creators manage their wishlist" on public.wishlist_items for all using (auth.uid() = creator_id) with check (auth.uid() = creator_id);
create policy "enabled recommendations are readable" on public.spotify_recommendations for select using (exists (select 1 from public.profiles p where p.id = profile_id and p.spotify_enabled));
create policy "profile owners manage recommendations" on public.spotify_recommendations for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);
create policy "supporters read their own history" on public.gift_history for select using (auth.uid() = supporter_id);
create policy "creators read gifts sent to them" on public.gift_history for select using (auth.uid() = creator_id);
create policy "supporters send gifts as themselves" on public.gift_history for insert with check (auth.uid() = supporter_id);

create index if not exists wishlist_creator_id_idx on public.wishlist_items(creator_id);
create index if not exists spotify_profile_id_idx on public.spotify_recommendations(profile_id);
create index if not exists gift_supporter_id_idx on public.gift_history(supporter_id);
create index if not exists gift_creator_id_idx on public.gift_history(creator_id);
