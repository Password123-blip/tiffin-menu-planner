-- Tiffin Menu Planner — schema
-- Safe to run more than once.

create extension if not exists "pgcrypto";

create table if not exists public.tiffin_menu_planner_meals (
  id uuid primary key default gen_random_uuid(),
  dish text,
  day_of_week text,
  meal_type text,
  is_veg boolean null,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists tiffin_menu_planner_meals_created_idx on public.tiffin_menu_planner_meals (created_at desc);

alter table public.tiffin_menu_planner_meals enable row level security;

drop policy if exists "tiffin_menu_planner_meals_read" on public.tiffin_menu_planner_meals;
create policy "tiffin_menu_planner_meals_read" on public.tiffin_menu_planner_meals for select using (true);

drop policy if exists "tiffin_menu_planner_meals_insert" on public.tiffin_menu_planner_meals;
create policy "tiffin_menu_planner_meals_insert" on public.tiffin_menu_planner_meals for insert with check (true);
