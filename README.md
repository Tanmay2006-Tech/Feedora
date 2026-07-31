# 🍲 Feedora — Food Donation & Distribution Platform

A full-stack web application that connects food donors, NGOs, and volunteers to reduce food waste and fight hunger in real time.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8?style=flat&logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)

---

## 📖 Overview

Feedora enables:

- **Donors** to post available food items — cooked meals, bakery items, produce, dairy
- **NGOs** to claim and receive food donations for distribution
- **Volunteers** to facilitate pickup and delivery
- Real-time impact tracking of meals saved, CO₂ prevented, and lives helped

---

## ✨ Features

### Core Functionality
- User authentication with role-based access (Donor, NGO, Volunteer)
- Food post creation with location tracking and expiry windows
- Real-time claim and delivery management system
- Activity feed showing all platform actions
- Impact dashboard with aggregate metrics

### User Dashboards
- **Donor Dashboard** — Post food items, track donations, view impact
- **NGO Dashboard** — Claim available food, manage pickups, schedule deliveries
- **Volunteer Dashboard** — View available tasks, track deliveries, earn ratings
- **Impact Dashboard** — Platform-wide metrics, food type breakdown, top contributors

### Data & Analytics
- Total meals saved and CO₂ emissions prevented
- Active donations and partnerships
- Volunteer performance tracking
- Food waste breakdown by category
- Real-time activity logging

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19 + TypeScript, Vite |
| **Styling** | Tailwind CSS v4 + shadcn/ui |
| **State/Data** | React Query |
| **Forms** | React Hook Form + Zod validation |
| **Routing** | Custom path-based routing |
| **Theming** | next-themes (light/dark mode) |
| **Notifications** | Sonner (toasts) |
| **Backend** | Express.js API + Vercel Functions (Node.js 20.x) |
| **Package Manager** | pnpm (monorepo workspaces) |
| **Deployment** | Vercel |

---

## 📂 Project Structure

```
feedora/
├── api/                       # Vercel API routes (serverless functions)
│   └── [[...slug]].ts        # API handler
├── artifacts/
│   ├── feedora/               # Main React application
│   │   ├── src/
│   │   │   ├── pages/         # Page components (home, login, register, etc.)
│   │   │   ├── components/    # Reusable UI components
│   │   │   ├── hooks/         # Custom React hooks
│   │   │   └── utils/         # Utility functions
│   │   └── vite.config.ts
│   └── api-server/            # Express.js API server
├── lib/                        # Shared libraries
│   ├── api-client-react/      # API client hooks
│   ├── api-zod/                # Zod schemas for validation
│   └── db/                     # Database utilities
├── vercel.json                 # Vercel deployment config
├── pnpm-workspace.yaml
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (20.x recommended)
- pnpm (recommended) — or npm/yarn

### Installation

```bash
git clone https://github.com/Tanmay2006-Tech/Feedora.git
cd Feedora
pnpm install
```

### Development

```bash
pnpm run dev
```

The app runs at `http://localhost:5173`.

### Build

```bash
pnpm run build          # Full build (typecheck + all packages)
pnpm run build:vercel   # Vercel-specific build
```

Build output goes to `artifacts/feedora/dist`.

---

## 🌐 Pages

**Public**
- `/` — Home / landing page
- `/login` — User authentication
- `/register` — New user signup with role selection

**Authenticated**
- `/donor` — Donor dashboard for posting food
- `/ngo` — NGO dashboard for claiming donations
- `/volunteer` — Volunteer dashboard for deliveries
- `/impact` — Real-time impact metrics and analytics

---

## 🔌 API Endpoints

**Authentication**
- `POST /api/auth/register` — Create new user account
- `POST /api/auth/login` — User login
- `GET /api/auth/me` — Get current user profile

**Food Posts**
- `GET /api/food-posts` — List all food posts
- `POST /api/food-posts` — Create new food post
- `GET /api/food-posts/{id}` — Get specific post details
- `POST /api/food-posts/{id}/claim` — Claim a food post
- `POST /api/food-posts/{id}/cancel` — Cancel a post

**Claims & Delivery**
- `GET /api/claims` — List all claims
- `POST /api/claims` — Create claim for food post
- `POST /api/claims/{id}/pickup` — Mark food as picked up
- `POST /api/claims/{id}/deliver` — Mark food as delivered

**Impact & Analytics**
- `GET /api/impact/summary` — Platform-wide impact metrics
- `GET /api/impact/by-food-type` — Impact breakdown by food category
- `GET /api/activity/recent` — Recent platform activity

**Directory**
- `GET /api/ngos` — List all partner NGOs
- `GET /api/volunteers` — List all active volunteers

---

## 🗄️ Database

Currently uses an in-memory mock database that resets on each deployment — ideal for demos and prototyping. For production, integrate with:
- PostgreSQL (e.g. via Neon)
- MongoDB
- Firebase Realtime Database

---

## 🚢 Deployment (Vercel)

This project is configured for Vercel with a `vercel.json` covering build commands, output directory, environment variable defaults, security headers, and SPA/API routing.

1. **Push to GitHub**
   ```bash
   git push origin main
   ```
2. **Connect the repo** at [vercel.com/dashboard](https://vercel.com/dashboard) → *Add New → Project* → select repository → *Deploy*
3. **Set environment variables** in Vercel Dashboard → Project Settings → Environment Variables:

   | Variable | Default | Notes |
   |---|---|---|
   | `PORT` | `3000` | Server port |
   | `BASE_PATH` | `/` | Frontend base path |
   | `NODE_ENV` | `production` | |
   | `VITE_API_BASE_URL` | — | Exposed to client via Vite |
   | `DATABASE_URL` | — | If using a persistent DB |
   | `JWT_SECRET` | — | Auth secret key |

4. Vercel auto-detects the build (`pnpm run build`), install command (`pnpm install --frozen-lockfile`), and output directory (`artifacts/feedora/dist`).

### Manual deploy via CLI
```bash
npm install -g vercel
vercel --prod
```

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for the full guide, including troubleshooting build failures, environment variable issues, and API configuration options.

---

## 🔐 Security

Configured in `vercel.json`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- Automatic HTTPS

**Still to do:** CSRF protection, rate limiting, Content-Security-Policy headers, and a production authentication strategy.

---

## 🧪 Test Accounts

```
Donor:      john@donor.com / password
NGO:        contact@foodforall.org / password
Volunteer:  sarah@volunteer.com / password
```

---

## ⚡ Performance

- Frontend bundle: ~275 KB (~91 KB gzipped)
- React Query caching (5-minute stale time)
- Lazy component loading with `React.lazy`
- Build time: under 30s on Vercel

---

## 🗺️ Roadmap

- [ ] Connect a persistent database (PostgreSQL/MongoDB) instead of the in-memory store
- [ ] Add CSRF protection and API rate limiting
- [ ] Configure Content-Security-Policy headers
- [ ] Production-grade authentication (JWT/session strategy)
- [ ] Error tracking & monitoring (Sentry) and Vercel Analytics

---

## 📄 License

MIT License — free to use for learning, hackathons, or your own projects.

---

## 🙋 Author

**Tanmay Tripathi** — [@Tanmay2006-Tech](https://github.com/Tanmay2006-Tech)
Forked from the original [Feedora](https://github.com/ghost33218/Feedora) project.
