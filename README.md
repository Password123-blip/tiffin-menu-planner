# Tiffin Menu Planner

**Plan a week of tiffin without repeating a sabzi**

Plan a week of tiffin without repeating a sabzi.

A full-stack demo built with **Next.js 14 (App Router)**, **Tailwind CSS** and a
**Supabase (Postgres)** backend. Records are written from the browser straight to
Postgres through row-level security policies — no custom API layer to maintain.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14, App Router, TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase Postgres, RLS-secured |
| Hosting | GitHub Pages (static export via Actions) |

## Run it locally

```bash
npm install
cp .env.example .env.local   # add your Supabase URL + anon key
npm run dev
```

Open http://localhost:3000.

## Set up the database

Run `supabase/migrations/0001_init.sql` in the Supabase SQL editor. It is
idempotent — safe to run more than once. It creates the `tiffin_menu_planner_meals` table,
enables row-level security, adds read/insert policies for anonymous users, and
seeds a few example rows.

## Data model

Table: `tiffin_menu_planner_meals`

| Column | Type |
| --- | --- |
| `dish` | text |
| `day_of_week` | text |
| `meal_type` | text |
| `is_veg` | boolean |
| `notes` | text |
| `created_at` | timestamptz |

Every row also has `id uuid` and `created_at timestamptz`.

## Deploy

Push to GitHub, then turn on **Pages → Source: GitHub Actions**. The included
workflow (`.github/workflows/deploy-pages.yml`) builds a static export and
publishes it to `https://<owner>.github.io/tiffin-menu-planner/`. Set
`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as Actions
repository secrets so the deployed site is wired to the database.

A `netlify.toml` is included as well, so importing the repo on Netlify works too.

## What it does

- **A week at a glance** — Seven days, two meals, no accidental repeats.
- **Veg and non-veg side by side** — Tag each dish so the whole household can pick.
- **Print and stick on the fridge** — Clean layout that survives a real kitchen.

## License

MIT
