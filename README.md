# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Deploy

### Frontend — Vercel

Deploy the `frontend/` folder as a Vercel project.

- Root directory: `frontend/`
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: default Vercel settings handle the build output
- Set these Vercel Environment Variables:
  - `VITE_CLIENT_API_URL=https://<your-backend-url>`
  - `VITE_SUPABASE_URL=https://<your-supabase-project>.supabase.co`
  - `VITE_SUPABASE_PUBLISHABLE_KEY=<your-supabase-publishable-key>`
  - `SUPABASE_URL=https://<your-supabase-project>.supabase.co`
  - `SUPABASE_PUBLISHABLE_KEY=<your-supabase-publishable-key>`
  - `NODE_ENV=production`
  - `LOVABLE_API_KEY=<optional if using Lovable chat integration>`

This app already reads `VITE_CLIENT_API_URL` for backend API requests and
`VITE_SUPABASE_*` for Supabase integration.

### Backend — Render

Deploy the `backend/` folder as a Render Web Service.

- Root directory: `backend/`
- Build command: `npm install`
- Start command: `npm start`
- Set these Render Environment Variables:
  - `MONGODB_URI`
  - `JWT_ACCESS_SECRET`
  - `JWT_REFRESH_SECRET`
  - `API_PUBLIC_URL=https://<your-backend-url>`
  - `FRONTEND_ORIGIN=https://<your-vercel-site>`
  - `COOKIE_SECURE=true`
  - `SMTP_HOST`
  - `SMTP_PORT`
  - `SMTP_USER`
  - `SMTP_PASS`
  - `SMTP_FROM="Your App <noreply@yourdomain.com>"`
  - `NODE_ENV=production`
  - `PORT=4000` (optional, Render sets one automatically)

The backend uses CORS locked to `FRONTEND_ORIGIN`, so this value must match your
Vercel frontend URL.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
