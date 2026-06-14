# Real Estate Agent Template

A reusable personal-site template for individual real estate agents. Each instance is configured through a single file (`src/config.ts`) and backed by Supabase for listings, images, and media.

---

## Quick start for a new client

```bash
git clone <this-repo> client-name-site
cd client-name-site
npm install
cp .env.example .env   # then fill in the Supabase keys
npm run dev
```

Then edit `src/config.ts`:

```ts
export const AGENT_CONFIG = {
  name: "Agent Full Name",            // shown in hero, footer, WhatsApp greeting
  tagline: "Tagline phrase",          // hero H1 + footer
  bio: "Long-form about paragraph.",
  whatsapp: "503XXXXXXXX",            // digits only, country code first
  website: "https://client.example.com",
  portal: "https://portal.tuwebsv.com",
  primaryColor: "#C9A84C",            // applied via CSS variable --primary
  logo: "/agent-photo.webp",          // file in /public, used as avatar
};
```

That's the only file you should need to edit. The header wordmark, footer copyright, document titles, WhatsApp links, and the agent avatar all derive from `AGENT_CONFIG`. Drop the agent's portrait into `/public` and point `logo` at it.

`primaryColor` is set as a CSS custom property `--primary` at boot (see [src/main.tsx](src/main.tsx)). All accent colors across the UI reference `var(--primary)`, so changing this one value re-skins the entire site.

---

## Required environment variables

Create a `.env` file in the repo root:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

These are also inlined as a fallback in [src/lib/supabase.ts](src/lib/supabase.ts) so the site won't white-screen if the env is misconfigured on the host, but you should set them properly per environment. The anon key is safe to expose in client code — security is enforced by Supabase Row Level Security policies, not by hiding this key.

---

## Supabase schema

The site expects two tables:

**`listings`**
| column          | type    | notes                                              |
| --------------- | ------- | -------------------------------------------------- |
| `id`            | text/uuid | primary key                                        |
| `titulo`        | text    |                                                    |
| `precio`        | numeric | formatted client-side as USD                       |
| `ubicacion`     | text    |                                                    |
| `descripcion`   | text    | newlines split into paragraphs                     |
| `habitaciones`  | integer |                                                    |
| `banos`         | integer |                                                    |
| `metros`        | text    | free-form (e.g. "350 m²")                          |
| `whatsapp`      | text    | per-listing override; falls back to `AGENT_CONFIG.whatsapp` |
| `tipo`          | text    | `for sale` \| `for rent`                           |
| `status`        | text    | only `published` listings are fetched              |
| `featured`      | boolean | shown on the homepage section                      |
| `property_type` | text    | `House` \| `Apartment` \| `Land` \| `Commercial Space` \| `Office` |
| `negociable`    | boolean | renders the "Price negotiable" pill                |
| `sold_status`   | text    | `Available` \| `Sold` \| `Rented`                  |
| `video_url`     | text    | YouTube URL or direct video file                   |

**`listing_images`**
| column        | type    | notes                                  |
| ------------- | ------- | -------------------------------------- |
| `listing_id`  | text/uuid | FK → `listings.id`                     |
| `url`         | text    | public image URL                       |
| `order_index` | integer | ascending; index 0 is the thumbnail    |

RLS: enable `select` for the `anon` role on both tables — that's all the client needs.

---

## Deploying to Vercel

1. Push the repo to GitHub.
2. In Vercel → **Add New Project** → import the GitHub repo.
3. Framework preset: **Vite**. Build command, output directory, and install command are auto-detected (`npm run build`, `dist/`, `npm install`).
4. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   Apply to **Production** and **Preview**.
5. Deploy. SPA routes are handled by the rewrite rule in [vercel.json](vercel.json) — every path serves `index.html` so React Router can take over client-side.
6. Add the custom domain in **Settings → Domains** and point the DNS records as Vercel instructs.

Subsequent pushes to `main` redeploy automatically.

---

## Inviting an agent in Supabase

To give a new agent access to their own row-level admin in the Supabase portal:

1. In Supabase Studio → **Authentication → Users → Invite user**, send an invite to the agent's email. They set their own password via the magic link.
2. In **Authentication → Policies**, ensure the `listings` and `listing_images` tables have a policy that scopes write/update/delete to the agent's `auth.uid()`. A simple shape:
   ```sql
   create policy "agents manage own listings"
     on listings for all
     using (auth.uid() = owner_id)
     with check (auth.uid() = owner_id);
   ```
   (Add an `owner_id uuid` column to `listings` if you haven't already, and populate it on insert.)
3. Public read access for the website is granted by:
   ```sql
   create policy "public reads published listings"
     on listings for select
     to anon
     using (status = 'published');
   ```
4. Share the portal URL configured in `AGENT_CONFIG.portal` — the agent signs in there to manage their listings without touching this repo.

---

## Project layout

```
src/
  config.ts              ← edit this per client
  main.tsx               ← sets --primary CSS var from config
  lib/
    supabase.ts          ← Supabase client (env vars + fallback)
    api.ts               ← fetchListings, useListings, Listing type, formatPrecio
  components/
    Layout.tsx           ← header, banner, pitch section, footer
    ListingCard.tsx      ← card with sold/negociable overlays + property_type badge
    WhatsAppButton.tsx   ← consult-by-WhatsApp CTA
    Gallery.tsx          ← photo gallery on detail page
  pages/
    Home.tsx             ← hero + about + featured section
    Listings.tsx         ← /properties with property_type & tipo filters
    ListingDetail.tsx    ← /properties/:id with video tour
```

---

## Local development

```bash
npm run dev      # http://localhost:3000
npm run lint     # tsc --noEmit
npm run build    # production bundle in dist/
npm run preview  # serve the production build locally
```
