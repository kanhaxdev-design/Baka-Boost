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
  asin text,
  description text not null default '',
  rating text not null default '',
  review_count text not null default '',
  availability text not null default '',
  image_url text,
  item_url text,
  created_at timestamptz not null default now()
);

alter table public.wishlist_items add column if not exists item_url text;
alter table public.wishlist_items add column if not exists asin text;
alter table public.wishlist_items add column if not exists description text not null default '';
alter table public.wishlist_items add column if not exists rating text not null default '';
alter table public.wishlist_items add column if not exists review_count text not null default '';
alter table public.wishlist_items add column if not exists availability text not null default '';

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

create table if not exists public.gift_intents (
  id uuid primary key default gen_random_uuid(),
  supporter_id uuid not null references public.profiles(id) on delete cascade,
  creator_id uuid not null references public.profiles(id) on delete cascade,
  wishlist_item_id uuid references public.wishlist_items(id) on delete set null,
  product_url text not null,
  status text not null default 'pending' check (status in ('pending', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(trim(body)) > 0),
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.profile_follows (
  follower_id uuid not null references public.profiles(id) on delete cascade,
  creator_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, creator_id),
  check (follower_id <> creator_id)
);

create table if not exists public.post_likes (
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

create table if not exists public.post_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(trim(body)) > 0),
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscriptions (
  email text primary key check (position('@' in email) > 1),
  created_at timestamptz not null default now()
);

alter table public.profiles add column if not exists slug text;
alter table public.profiles add column if not exists banner_url text;
alter table public.profiles add column if not exists accent_color text not null default '#ff4d8d';
alter table public.profiles add column if not exists page_bio text not null default '';

create table if not exists public.creator_settings (
  creator_id uuid primary key references public.profiles(id) on delete cascade,
  show_gallery boolean not null default true,
  show_shop boolean not null default true,
  show_memberships boolean not null default true,
  tip_label text not null default 'Buy me a coffee',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text not null default '',
  image_url text not null,
  is_exclusive boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.shop_products (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  description text not null default '',
  price numeric(10,2) not null check (price >= 0),
  image_url text,
  product_url text,
  product_type text not null default 'digital' check (product_type in ('digital', 'physical', 'commission')),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.memberships (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  description text not null default '',
  price numeric(10,2) not null check (price >= 0),
  benefits text[] not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.membership_subscriptions (
  id uuid primary key default gen_random_uuid(),
  membership_id uuid not null references public.memberships(id) on delete cascade,
  supporter_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'active', 'cancelled')),
  provider_subscription_id text,
  created_at timestamptz not null default now(),
  unique (membership_id, supporter_id)
);

create table if not exists public.tips (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.profiles(id) on delete cascade,
  supporter_id uuid references public.profiles(id) on delete set null,
  amount numeric(10,2) not null check (amount > 0),
  message text not null default '',
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'refunded')),
  provider_payment_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null,
  title text not null,
  body text not null default '',
  read_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.wishlist_items enable row level security;
alter table public.spotify_recommendations enable row level security;
alter table public.gift_history enable row level security;
alter table public.gift_intents enable row level security;
alter table public.posts enable row level security;
alter table public.profile_follows enable row level security;
alter table public.post_likes enable row level security;
alter table public.post_comments enable row level security;
alter table public.newsletter_subscriptions enable row level security;
alter table public.creator_settings enable row level security;
alter table public.gallery_items enable row level security;
alter table public.shop_products enable row level security;
alter table public.memberships enable row level security;
alter table public.membership_subscriptions enable row level security;
alter table public.tips enable row level security;
alter table public.notifications enable row level security;

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
drop policy if exists "supporters create gift intents" on public.gift_intents;
drop policy if exists "supporters read their gift intents" on public.gift_intents;
drop policy if exists "creators read gift intents" on public.gift_intents;
drop policy if exists "posts are publicly readable" on public.posts;
drop policy if exists "creators manage their posts" on public.posts;
drop policy if exists "follows are publicly readable" on public.profile_follows;
drop policy if exists "supporters manage follows" on public.profile_follows;
drop policy if exists "post likes are publicly readable" on public.post_likes;
drop policy if exists "users manage their post likes" on public.post_likes;
drop policy if exists "post comments are publicly readable" on public.post_comments;
drop policy if exists "users create their comments" on public.post_comments;
drop policy if exists "users manage newsletter subscriptions" on public.newsletter_subscriptions;
drop policy if exists "creator settings are publicly readable" on public.creator_settings;
drop policy if exists "creators manage their settings" on public.creator_settings;
drop policy if exists "gallery is publicly readable" on public.gallery_items;
drop policy if exists "creators manage their gallery" on public.gallery_items;
drop policy if exists "active shop products are publicly readable" on public.shop_products;
drop policy if exists "creators manage their shop" on public.shop_products;
drop policy if exists "active memberships are publicly readable" on public.memberships;
drop policy if exists "creators manage their memberships" on public.memberships;
drop policy if exists "supporters manage their subscriptions" on public.membership_subscriptions;
drop policy if exists "creators read membership subscriptions" on public.membership_subscriptions;
drop policy if exists "tips are readable by participants" on public.tips;
drop policy if exists "supporters create tips" on public.tips;
drop policy if exists "users read their notifications" on public.notifications;
drop policy if exists "users update their notifications" on public.notifications;

create policy "profiles are publicly readable" on public.profiles for select using (true);
create policy "users create their own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "users update their own profile" on public.profiles for update using (auth.uid() = id);
create policy "wishlist is publicly readable" on public.wishlist_items for select using (true);
create policy "creators manage their wishlist" on public.wishlist_items for all using (auth.uid() = creator_id) with check (auth.uid() = creator_id);
create policy "enabled recommendations are readable" on public.spotify_recommendations for select using (exists (select 1 from public.profiles p where p.id = profile_id and p.spotify_enabled));
create policy "profile owners manage recommendations" on public.spotify_recommendations for all using (auth.uid() = profile_id) with check (auth.uid() = profile_id);
create policy "supporters read their own history" on public.gift_history for select using (auth.uid() = supporter_id);
create policy "creators read gifts sent to them" on public.gift_history for select using (auth.uid() = creator_id);
create policy "supporters send gifts as themselves" on public.gift_history for insert with check (
  auth.uid() = supporter_id
  and exists (select 1 from public.profiles p where p.id = creator_id and p.role = 'creator')
);
create policy "supporters create gift intents" on public.gift_intents for insert with check (
  auth.uid() = supporter_id
  and exists (select 1 from public.profiles p where p.id = creator_id and p.role = 'creator')
  and (
    wishlist_item_id is null
    or exists (select 1 from public.wishlist_items w where w.id = wishlist_item_id and w.creator_id = creator_id and w.item_url = product_url)
  )
);
create policy "supporters read their gift intents" on public.gift_intents for select using (auth.uid() = supporter_id);
create policy "creators read gift intents" on public.gift_intents for select using (auth.uid() = creator_id);
create policy "posts are publicly readable" on public.posts for select using (true);
create policy "creators manage their posts" on public.posts for all using (auth.uid() = author_id) with check (auth.uid() = author_id);
create policy "follows are publicly readable" on public.profile_follows for select using (true);
create policy "supporters manage follows" on public.profile_follows for all using (auth.uid() = follower_id) with check (auth.uid() = follower_id);
create policy "post likes are publicly readable" on public.post_likes for select using (true);
create policy "users manage their post likes" on public.post_likes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "post comments are publicly readable" on public.post_comments for select using (true);
create policy "users create their comments" on public.post_comments for insert with check (auth.uid() = author_id);
create policy "users manage newsletter subscriptions" on public.newsletter_subscriptions for insert with check (true);
create policy "creator settings are publicly readable" on public.creator_settings for select using (true);
create policy "creators manage their settings" on public.creator_settings for all using (auth.uid() = creator_id) with check (auth.uid() = creator_id);
create policy "gallery is publicly readable" on public.gallery_items for select using (true);
create policy "creators manage their gallery" on public.gallery_items for all using (auth.uid() = creator_id) with check (auth.uid() = creator_id);
create policy "active shop products are publicly readable" on public.shop_products for select using (is_active = true or auth.uid() = creator_id);
create policy "creators manage their shop" on public.shop_products for all using (auth.uid() = creator_id) with check (auth.uid() = creator_id);
create policy "active memberships are publicly readable" on public.memberships for select using (is_active = true or auth.uid() = creator_id);
create policy "creators manage their memberships" on public.memberships for all using (auth.uid() = creator_id) with check (auth.uid() = creator_id);
create policy "supporters manage their subscriptions" on public.membership_subscriptions for all using (auth.uid() = supporter_id) with check (auth.uid() = supporter_id);
create policy "creators read membership subscriptions" on public.membership_subscriptions for select using (exists (select 1 from public.memberships m where m.id = membership_id and m.creator_id = auth.uid()));
create policy "tips are readable by participants" on public.tips for select using (auth.uid() = supporter_id or auth.uid() = creator_id);
create policy "supporters create tips" on public.tips for insert with check (auth.uid() = supporter_id and exists (select 1 from public.profiles p where p.id = creator_id and p.role = 'creator'));
create policy "users read their notifications" on public.notifications for select using (auth.uid() = user_id);
create policy "users update their notifications" on public.notifications for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists wishlist_creator_id_idx on public.wishlist_items(creator_id);
create index if not exists spotify_profile_id_idx on public.spotify_recommendations(profile_id);
create index if not exists gift_supporter_id_idx on public.gift_history(supporter_id);
create index if not exists gift_creator_id_idx on public.gift_history(creator_id);
create index if not exists gift_intents_supporter_id_idx on public.gift_intents(supporter_id);
create index if not exists gift_intents_creator_id_idx on public.gift_intents(creator_id);
create index if not exists posts_author_id_created_at_idx on public.posts(author_id, created_at desc);
create index if not exists profile_follows_creator_id_idx on public.profile_follows(creator_id);
create index if not exists post_likes_post_id_idx on public.post_likes(post_id);
create index if not exists post_comments_post_id_created_at_idx on public.post_comments(post_id, created_at);
create index if not exists gallery_creator_id_created_at_idx on public.gallery_items(creator_id, created_at desc);
create index if not exists shop_products_creator_id_idx on public.shop_products(creator_id);
create index if not exists memberships_creator_id_idx on public.memberships(creator_id);
create index if not exists membership_subscriptions_supporter_id_idx on public.membership_subscriptions(supporter_id);
create index if not exists tips_creator_id_created_at_idx on public.tips(creator_id, created_at desc);
create index if not exists notifications_user_id_created_at_idx on public.notifications(user_id, created_at desc);
