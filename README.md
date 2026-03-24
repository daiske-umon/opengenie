<p align="center">
  <img src="https://img.icons8.com/fluency/96/magic-lamp.png" alt="OpenGenie" width="80" />
</p>

<h1 align="center">OpenGenie</h1>

<p align="center">
  <strong>The open-source idea creation platform.</strong><br />
  <em>Ideas in. Code out. Every week.</em>
</p>

<p align="center">
  <a href="#how-it-works">How It Works</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
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

**OpenGenie** is a platform where anyone can submit an idea for open-source software. The community votes. We build the top-voted idea in one week — with production-quality architecture. Then the project opens for community contributions.

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
| **Database** | [SQLite](https://sqlite.org/) + [Drizzle ORM](https://orm.drizzle.team/) | Zero-config local dev, type-safe queries |
| **Auth** | [Auth.js](https://authjs.dev/) (GitHub OAuth) | Seamless GitHub integration |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Smooth, performant UI animations |
| **State** | [TanStack Query](https://tanstack.com/query) | Server state management with optimistic updates |
| **Package Manager** | [pnpm](https://pnpm.io/) | Fast, disk-efficient |

### Design Decisions

- **Monolith over microservices** — small team, fast iteration, one deployment.
- **SQLite over PostgreSQL** — zero infrastructure for local dev. Migrate to Postgres when needed.
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
│   ├── landing/            # Hero, HowItWorks, Stats, Projects, Testimonials, CTA
│   ├── ui/                 # shadcn/ui components
│   ├── navbar.tsx          # Glassmorphism nav with mobile menu
│   ├── footer.tsx          # Site footer
│   ├── idea-card.tsx       # Idea display with vote button
│   ├── project-card.tsx    # Shipped project card
│   └── vote-button.tsx     # Animated vote interaction
├── server/
│   ├── db/                 # Drizzle schema + migrations
│   ├── trpc/               # tRPC routers (ideas, votes, projects, cycles)
│   └── auth/               # Auth.js configuration
└── lib/                    # Shared utilities
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

**6 tables**, relational, normalized. Full schema in `src/server/db/schema.ts`.

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
# Edit .env.local with your GitHub OAuth credentials (optional for demo mode)

# Run database migrations & seed
pnpm db:push
pnpm db:seed

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — you should see the landing page.

### Demo Mode

Don't have GitHub OAuth credentials? The app includes a demo login that creates a test user automatically. Just click "Demo Login" on the sign-in page.

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

**Year 3:** OpenGenie becomes to open-source what Y Combinator is to startups — the place where the best new projects are born.

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
  <strong>Built with 🧞 by the OpenGenie team</strong><br />
  <em>Got an idea? Submit it. We'll build it.</em>
</p>
