## Phase 1 Scope (this turn)

Editable from Admin, live on public site via MongoDB:

- **Brand**: company name, tagline, logo (light), logo (dark), favicon
- **Theme**: primary / accent / background colors, font, radius
- **Navigation**: header links (label + URL + enabled + order, drag-drop)
- **Header**: style (transparent/solid/glass), CTA button label + URL
- **Hero (home)**: heading, subheading, primary/secondary CTA, background image/video, animation, show/hide
- **Footer**: columns (drag-drop), copyright, social links (Twitter/LinkedIn/GitHub/Instagram/YouTube/Facebook + custom)
- **Contact info**: email, phone, WhatsApp, address, Google Maps embed URL, business hours
- **SEO (global + home)**: title, description, og image, twitter card, canonical, robots
- **Section controls on home**: show/hide + reorder for hero/logos/services-preview/testimonials/cta

Every field publishes to a **draft**; explicit **Publish** promotes to live. Public site reads the _published_ doc only.

Out of scope this turn (Phase 2+): Services CRUD, Portfolio CRUD, Blog CRUD, Pricing tiers CRUD, Testimonials CRUD, Team CRUD, Careers CRUD, FAQ CRUD, Scheduling, Media library upload to cloud, Multi-version rollback history. Admin UI shells for these already exist and will keep working with dummy data until wired.

## What I need from you before starting

1. **MongoDB Atlas URI** — store securely via `add_secret` as `MONGODB_URI`. Format: `mongodb+srv://user:pass@cluster.xxxxx.mongodb.net/codenest?retryWrites=true&w=majority`
2. **Bootstrap admin** email — I'll ask via `add_secret` as `ADMIN_BOOTSTRAP_EMAIL` and `ADMIN_BOOTSTRAP_PASSWORD` (one-time; used on first server boot to insert the first admin user in Mongo). Password is hashed with bcrypt before storing.
3. I'll auto-generate `SESSION_SECRET` (32-byte random) for cookie encryption.

## Technical Design

**Stack additions**

- `mongodb` (official driver) — server-only, called from `createServerFn` handlers
- `bcryptjs` — password hashing (Worker-safe)
- `zod` — input validation
- TanStack Start `useSession` — encrypted HTTP-only cookie session

**Server-only module layout**

```
src/server/mongo.server.ts           – lazy singleton MongoClient
src/server/auth.server.ts            – bcrypt verify + admin bootstrap on first request
src/server/cms.server.ts             – get/updateDraft/publish helpers
src/lib/session.ts                   – useSession config (SESSION_SECRET)
src/lib/cms.functions.ts             – createServerFn wrappers (public + admin)
src/lib/auth.functions.ts            – login / logout / me
```

**MongoDB collections**

- `site_content` — single doc with `draft` + `published` subdocuments (brand, theme, nav, header, hero, footer, contact, seo, sectionsOrder). Versioned with `updatedAt`.
- `admin_users` — `{ email, passwordHash, role: "admin", createdAt }`
- `sessions` — none (using encrypted cookie sessions, no DB session store)

**Auth flow**

- `/admin/login` public route → posts to `login` server fn → sets encrypted cookie
- Root route loads `getSession()` into router context
- New pathless layout `src/routes/_admin.tsx` gates all `/admin/*` routes: `beforeLoad` redirects to `/admin/login` if not admin
- Existing admin routes move under `_admin.` prefix (filename rename only — URLs unchanged)
- Sign-out button in topbar clears the session

**Public site wiring (no visual redesign)**

- New `useSiteContent()` hook reads `getPublishedContent` via TanStack Query loader (SSR)
- `Navbar`, `Footer`, `<head>` in `__root.tsx`, home hero use hook data
- Fallback to current hardcoded defaults if Mongo unreachable so site never breaks

**Admin UX**

- New page `/admin/cms` with tabbed sections: Brand · Theme · Navigation · Header · Hero · Footer · Contact · SEO · Sections
- Each tab: draft form fields + live-preview iframe (right panel) + `Save Draft` / `Publish` / `Revert to Published` / `Preview` buttons
- Drag-drop reorder for nav links, footer columns, home sections (using existing `@dnd-kit` — will add if missing)
- Existing `/admin/builder` visual builder stays; it will write to the same draft doc in Phase 2

**Security**

- All mutation server fns run `requireAdmin` middleware (checks session cookie → looks up user in `admin_users`)
- Read fn `getPublishedContent` is public (SSR-safe, returns only published subdoc)
- Rate-limit login attempts by IP (in-memory sliding window, best-effort)
- `Set-Cookie`: `HttpOnly`, `Secure`, `SameSite=Lax`

**Failure modes handled**

- Mongo down → public site renders defaults, admin shows connection error banner
- Missing env → clear error in server logs + banner
- Session expired → auto-redirect to `/admin/login?redirect=…`

## Delivery order in this turn

1. Install deps, add secrets scaffolding
2. Mongo client + session + auth helpers + middleware
3. `/admin/login` + `_admin` gate + admin bootstrap
4. `site_content` schema + seed with current hardcoded values
5. CMS admin UI (`/admin/cms`) with all tabs, draft/publish
6. Wire public Navbar/Footer/Head/Hero to `useSiteContent`
7. Verify build + smoke test login → edit → publish → see change

## After this turn

Phase 2 will extend the same pattern to Services/Portfolio/Blog/Pricing/Testimonials/Team/Careers/FAQ collections and wire the visual `/admin/builder` writes into `site_content.draft`.

**Please share the MongoDB Atlas connection string when ready** — I'll request it via a secure secret prompt as the first step of implementation.
