<p align="center">
  <img src="https://img.icons8.com/fluency/96/magic-lamp.png" alt="openjenie" width="80" />
</p>

<h1 align="center">openjenie</h1>

<p align="center">
  <strong>The open-source idea creation platform.</strong><br />
  <em>Ideas in. Code out. Every week.</em>
</p>

<p align="center">
  <a href="#how-it-works">How It Works</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#environment">Environment</a> •
  <a href="#docker--digitalocean">Docker & DigitalOcean</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/tRPC-11-398CCB?logo=trpc" alt="tRPC" />
  <img src="https://img.shields.io/badge/SQLite-Drizzle_ORM-003B57?logo=sqlite" alt="SQLite" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License" />
</p>

---

## The Problem

The open-source world has a gap:

- **Millions of developers** can contribute — but most don't know what to build.
- **Millions of people** have ideas for software — but can't code.
- **Hackathons** build fast but produce throwaway code.
- **Idea boards** collect ideas but never ship them.

**Nobody connects the dots.**

## The Solution

**openjenie** is a platform where anyone can submit an idea for open-source software. The community votes. We build the top-voted idea in one week - with production-quality architecture. Then the project opens for community contributions.

Every shipped project lives under one GitHub organization. One idea becomes real software, every single week.

> *"Your wish is our commit."* 🧞

---

## How It Works

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   SUBMIT     │────▶│    VOTE      │────▶│    BUILD     │────▶│   OPEN UP    │
│  Anyone posts│     │  Community   │     │  Maintainers │     │  Community   │
│  an idea     │     │  upvotes     │     │  ship in 1wk │     │  contributes │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

| Phase | What Happens |
|-------|-------------|
| **Submit** | Anyone with a GitHub account submits an idea: problem statement, target users, rough scope. |
| **Vote** | Community upvotes ideas. Limited votes per cycle to prevent gaming. Ideas carry over weekly. |
| **Build** | Maintainers select the top-voted idea, scope it, and ship a working v1 in one week. |
| **Open Up** | The project gets its own repo with CONTRIBUTING.md, issue templates, and `good-first-issue` labels from day one. |

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) | SSR for SEO, React ecosystem, unified frontend + API |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | End-to-end type safety |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) | Utility-first, accessible components |
| **API** | [tRPC 11](https://trpc.io/) | Type-safe API layer, zero codegen |
| **Database** | [SQLite](https://sqlite.org/) + [Drizzle ORM](https://orm.drizzle.team/) | Single-file persistence, type-safe queries |
| **Auth** | [Auth.js](https://authjs.dev/) (GitHub OAuth) | Seamless GitHub integration |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Smooth, performant UI animations |
| **State** | [TanStack Query](https://tanstack.com/query) | Server state management with optimistic updates |
| **Package Manager** | [pnpm](https://pnpm.io/) | Fast, disk-efficient |

### Design Decisions

- **Monolith over microservices** — small team, fast iteration, one deployment.
- **SQLite over PostgreSQL** — single-file persistence that works the same locally and in a container.
- **tRPC over REST** — full type safety from database to UI with zero boilerplate.
- **GitHub OAuth only** — our users are GitHub users. No password management needed.
- **Dark mode first** — because we have taste.

---

## Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Landing page (6 animated sections)
│   ├── ideas/              # Browse, search, filter ideas
│   ├── projects/           # Gallery of shipped projects
│   ├── about/              # Mission, values, team
│   └── admin/              # Cycle management (protected)
├── components/
│   ├── landing/            # Hero, HowItWorks, Stats, Projects, Activity, CTA
│   ├── ui/                 # shadcn/ui components
│   ├── navbar.tsx          # Glassmorphism nav with mobile menu
│   ├── footer.tsx          # Site footer
│   ├── idea-card.tsx       # Idea display with vote button
│   ├── project-card.tsx    # Shipped project card
│   └── vote-button.tsx     # Animated vote interaction
├── lib/
│   ├── db/                 # SQLite bootstrap + Drizzle schema
│   ├── trpc/               # tRPC routers (ideas, votes, projects, cycles)
│   └── auth.ts             # Auth.js configuration
└── components/             # Shared UI
```

### Data Model

```
users ──┐
        ├── ideas ──── votes
        │    │
        │    └── comments
        │
        └── projects ── cycles
```

**6 tables**, relational, normalized. Full schema in `src/lib/db/schema.ts`.

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+

### Install & Run

```bash
# Clone
git clone https://github.com/daiske-umon/opengenie.git
cd opengenie

# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your real GitHub OAuth credentials

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

The app bootstraps its SQLite schema automatically on first start. Local development uses the same GitHub OAuth and SQLite runtime shape as production.

### Local Docker

```bash
cp .env.example .env.local
mkdir -p data
docker compose up --build
```

This stores the SQLite database in `./data/openjenie.db`.

## Environment

Create `.env.local` from `.env.example`.

| Variable | Required | Example | Purpose |
|-------|-----------|-----|-----|
| `AUTH_SECRET` | Yes | `openssl rand -base64 32` | Auth.js session signing secret |
| `AUTH_URL` | Yes | `http://localhost:3000` or `https://your-domain.com` | Canonical app URL used in auth flows |
| `GITHUB_CLIENT_ID` | Yes | `Iv1.xxxxx` | GitHub OAuth app client ID |
| `GITHUB_CLIENT_SECRET` | Yes | `xxxxx` | GitHub OAuth app client secret |
| `DATABASE_PATH` | Yes | `./data/openjenie.db` or `/data/openjenie.db` | SQLite file location |
| `PORT` | No | `3000` | HTTP port |
| `NODE_ENV` | No | `development` or `production` | Standard Node environment |

### GitHub OAuth Setup

Create a GitHub OAuth App and set:

- Homepage URL: `http://localhost:3000` for local and your production domain for production.
- Authorization callback URL: `http://localhost:3000/api/auth/callback/github` for local.
- Authorization callback URL: `https://your-domain.com/api/auth/callback/github` for production.

Using separate GitHub OAuth apps for local and production is the safest setup.

## Docker & DigitalOcean

### Build Locally

```bash
docker build -t openjenie .
docker run --rm -p 3000:3000 \
  --env-file .env.local \
  -v "$(pwd)/data:/data" \
  openjenie
```

### DigitalOcean App Platform

1. Push this repo to GitHub.
2. Create a new App Platform app from the repo.
3. Choose Dockerfile-based deployment.
4. Expose port `3000`.
5. Set these environment variables:
   - `NODE_ENV=production`
   - `PORT=3000`
   - `AUTH_SECRET=<long-random-secret>`
   - `AUTH_URL=https://your-domain.com`
   - `GITHUB_CLIENT_ID=<github-oauth-client-id>`
   - `GITHUB_CLIENT_SECRET=<github-oauth-client-secret>`
   - `DATABASE_PATH=/tmp/openjenie.db`
6. Configure the GitHub OAuth callback URL as `https://your-domain.com/api/auth/callback/github`.

App Platform is not suitable for persistent SQLite production data because DigitalOcean documents that App Platform containers do not provide persistent local storage and do not support volumes. Use it only for ephemeral previews, or move the app to a managed database before using App Platform in production.

### DigitalOcean Droplet

```bash
docker build -t openjenie .
docker run -d --name openjenie \
  --restart unless-stopped \
  -p 3000:3000 \
  --env-file /opt/openjenie/.env.production \
  -v /opt/openjenie/data:/data \
  openjenie
```

---

## Community Roles

| Role | Can Do | How to Get It |
|------|--------|---------------|
| **Member** | Submit ideas, vote, comment | Sign up with GitHub |
| **Contributor** | All above + submit PRs | First merged PR |
| **Maintainer** | All above + select ideas, build projects, merge PRs | Promoted by core team |
| **Core** | All above + platform governance | Founding team |

---

## The Vision

**Year 1:** Ship 50 open-source projects from community ideas.

**Year 2:** Community maintainers outnumber core team. Companies sponsor builds.

**Year 3:** openjenie becomes to open-source what Y Combinator is to startups - the place where the best new projects are born.

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Quick start:**
1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-thing`)
3. Commit your changes (`git commit -m 'feat: add amazing thing'`)
4. Push to branch (`git push origin feature/amazing-thing`)
5. Open a Pull Request

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

<p align="center">
  <strong>Built with 🧞 by the openjenie team</strong><br />
  <em>Got an idea? Submit it. We'll build it.</em>
</p>
