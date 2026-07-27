# Netweavesolutions Client API

Standalone Node.js service (Express + Mongoose + JWT) powering the Client Portal
of the Netweavesolutions website. The Lovable frontend cannot run MongoDB
directly (it deploys to Cloudflare Workers, which has no TCP), so this service
lives outside Lovable and is called over HTTPS.

## Stack

- Express 4 + Helmet + CORS + express-rate-limit
- Mongoose 8 (MongoDB Atlas recommended)
- JWT (access + refresh) with bcrypt-hashed passwords
- Nodemailer for verification / OTP / password reset emails
- Zod for input validation
- MVC layout: `models/`, `controllers/`, `routes/`, `middleware/`, `utils/`

## Local dev

```bash
cd server
cp .env.example .env       # fill in MONGODB_URI + JWT secrets + SMTP
npm install
npm run dev
# → API on http://localhost:4000
```

## Deploy (pick one)

- **Railway** — New Project → Deploy from repo → set env vars from `.env.example` → Deploy.
- **Render** — New Web Service → root `server/` → build `npm install` → start `npm start` → env vars.
- **Fly.io** — `fly launch` inside `server/`, then `fly secrets set …`.

After deploy, copy the public URL and set it as `VITE_CLIENT_API_URL` in the
Lovable project (Project Settings → Environment Variables), e.g.
`https://codenest-api.up.railway.app`.

## Endpoints (Phase 1)

Auth (`/auth`)

- `POST /register` — create account, send email verification token
- `POST /login` — email + password → { accessToken } + refresh cookie
- `POST /logout` — clears refresh cookie + rotates jti
- `POST /refresh` — rotates refresh cookie, returns new access token
- `POST /verify-email` — { token } confirms email
- `POST /send-otp` — sends 6-digit OTP to email (auth-gated)
- `POST /verify-otp` — { otp } marks phone/email OTP-verified
- `POST /forgot-password` — { email } sends reset link
- `POST /reset-password` — { token, password }
- `POST /change-password` — auth-gated
- `GET  /me` — current client

Profile (`/profile`, auth-gated)

- `GET  /` — full profile
- `PUT  /` — update profile fields

Health

- `GET  /healthz` — liveness probe

All authenticated routes expect `Authorization: Bearer <accessToken>`.
The refresh cookie is httpOnly, SameSite=None, Secure (configurable).

## Security defaults

- bcrypt cost 12
- Rate limit: 100 req / 15 min per IP globally; 10 / 15 min on `/auth/*`
- Helmet with sensible defaults + noSniff + frameguard
- Zod validation on every mutating endpoint
- JWT access 15 min, refresh 30 days (rotate on use)
- CORS locked to `FRONTEND_ORIGIN`

## Schema (Phase 1 shipped; Phase 2/3 stubbed)

`clients` (full), plus stub models for `projects`, `projectFiles`,
`projectMessages`, `projectActivities`, `projectNotes`, `projectMeetings`,
`notifications`, `payments`, `invoices` — so Phase 2 controllers can be added
without further migrations.

