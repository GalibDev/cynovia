# CYNOVIA Catalog Website

A simple portfolio-style ecommerce catalog for **CYNOVIA** built with Next.js App Router, TypeScript, Tailwind CSS, and Supabase.

This is intentionally not a cart website. There is no login, checkout, payment, order system, or dashboard. Visitors browse categories and products, then contact CYNOVIA for inquiry.

## Features

- Home page with header search, desktop sidebar menu, hero banner, category grid, feature strip, and footer
- Category listing and category detail pages
- Product detail page with product information and inquiry CTA
- About and Contact pages
- Supabase-backed `categories` and `products` tables
- Password-protected admin panel for managing categories and products
- Local fallback sample data when Supabase env vars are missing
- Loading, error, empty, and not-found states
- Fully responsive desktop, tablet, and mobile layout

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase
- lucide-react icons

## Getting Started

Install dependencies:

```bash
npm install
```

Create `.env.local`:

```bash
cp .env.example .env.local
```

Add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
SUPABASE_STORAGE_BUCKET=cynovia-images
ADMIN_PASSWORD=change-this-admin-password
NEXT_PUBLIC_WHATSAPP_NUMBER=8801XXXXXXXXX
```

Run the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin panel:

```text
http://localhost:3000/admin
```

The local fallback password is `admin123` if `ADMIN_PASSWORD` is not set. Change it before using the site publicly.

## Supabase Setup

1. Create a Supabase project.
2. Open the SQL editor.
3. Run `supabase/schema.sql`.
4. Run `supabase/seed.sql`.
5. Run `supabase/storage.sql` if you want admin image uploads.
6. Copy the project URL, anon key, service role key, and storage bucket into `.env.local`.

The schema creates:

- `categories`: `id`, `name`, `slug`, `description`, `image_url`, `sort_order`
- `products`: `id`, `category_id`, `name`, `slug`, `description`, `image_url`, `is_featured`, `created_at`

Both tables have public read policies for anonymous visitors.

The admin panel writes through `SUPABASE_SERVICE_ROLE_KEY`, which must stay server-only. Do not expose it with a `NEXT_PUBLIC_` prefix.
Image uploads use the public `cynovia-images` storage bucket by default.

## Useful Scripts

```bash
npm run dev
npm run build
npm run lint
```

## Folder Structure

```text
src/
  app/
    admin/
    about/
    categories/
    contact/
    products/
    globals.css
    layout.tsx
    page.tsx
  components/
  lib/
supabase/
  schema.sql
  seed.sql
```
