-- USERS TABLE
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  first_name text,
  last_name text,
  primary key (id)
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone"
on profiles for select
to authenticated, anon
using ( true );

-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (new.id, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name');
  return new;
end;
$$;
-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- CATEGORIES TABLE
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
);

-- PRODUCTS TABLE
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  image_url text,
  price numeric(10,2) not null,
  stock integer not null default 0,
  category_id uuid references categories(id),
  created_at timestamp with time zone default timezone('utc', now())
);

-- ORDERS TABLE
create table orders (
  id uuid primary key default gen_random_uuid(),
  profiles_id uuid references profiles(id),
  status text not null check (status in ('pending', 'shipped', 'canceled')),
  shipping_address text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- ORDER ITEMS TABLE
create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id),
  quantity integer not null,
);
