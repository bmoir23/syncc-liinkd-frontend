# Syncc Liinkd Frontend

A modern, dark-themed SaaS frontend for Syncc Liinkd — a professional link-in-bio and AI-powered booking platform. Built with **Next.js 15 App Router**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **Framer Motion**, and **Zustand**.

## Features

- 🌐 **Public Profile** — Beautiful bento-grid profile with modular cards, availability, services, and testimonials
- 💬 **AI Chat** — Scrollable transcript with typing animation, prompt chips, and booking flow
- 📅 **Booking** — Mini calendar, time slot picker, and confirmation dialog
- 🤖 **n8n Integration** — Webhook connector, workflow visualizer, and run history
- 📊 **Owner Dashboard** — Analytics, customization, agent panel, integrations, and settings
- 🎨 **Bento Customization** — Toggle cards and change accent colors
- 🔐 **Auth0** — Client-side mock integration (swap for real Auth0 with env vars)
- 📈 **PostHog** — Client-side analytics initialized from env var
- 🐳 **Dev Container** — Docker + bun for consistent dev environments
- ⚡ **CI/CD** — GitHub Actions lint/typecheck/build workflow

## Project Structure

```
/frontend
├── app/
│   ├── (public)/
│   │   ├── page.tsx                         # Landing page
│   │   └── u/[username]/
│   │       ├── layout.tsx                   # Dock + customization
│   │       ├── page.tsx                     # Profile (bento grid)
│   │       ├── work/page.tsx                # Work portfolio
│   │       ├── chat/page.tsx                # AI chat
│   │       └── book/page.tsx                # Booking
│   └── (owner)/app/
│       ├── layout.tsx                       # Sidebar layout
│       ├── dashboard/page.tsx
│       ├── analytics/page.tsx
│       ├── customize/page.tsx
│       ├── agent/page.tsx
│       ├── integrations/page.tsx
│       └── settings/page.tsx
├── components/
│   ├── layout/    (Dock, Sidebar, PageTransition)
│   ├── profile/   (BentoGrid, ProfileHeader, Services, Availability, Testimonials, Updates, CustomizationSheet)
│   ├── chat/      (Transcript, PromptChips, BookingDialog)
│   ├── booking/   (MiniCalendar, SlotPicker)
│   ├── landing/   (Hero, FeatureGrid, CTA)
│   └── integrations/ (N8nConnector, WorkflowVisualizer)
├── stores/        (chatStore, bookingStore, uiStore, integrationsStore)
├── lib/           (cn, constants, motion)
└── utils/         (n8n, posthog, auth0)
```

## Quick Start

### Prerequisites

- [bun](https://bun.sh) ≥ 1.1

### Local Development

```bash
# 1. Enter the frontend directory
cd frontend

# 2. Install dependencies
bun install

# 3. Copy env example and fill in values
cp .env.example .env.local

# 4. Start the dev server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

**Demo routes:**
- `/` — Landing page
- `/u/demo` — Public profile
- `/u/demo/work` — Portfolio
- `/u/demo/chat` — AI chat
- `/u/demo/book` — Booking
- `/app/dashboard` — Owner dashboard

### Other Scripts

```bash
bun run build      # Production build
bun run lint       # ESLint
bun run typecheck  # TypeScript check
bun run format     # Prettier format
```

## Environment Variables

Copy `frontend/.env.example` to `frontend/.env.local` and fill in:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project API key |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog host (default: `https://app.posthog.com`) |
| `NEXT_PUBLIC_AUTH0_DOMAIN` | Auth0 tenant domain |
| `NEXT_PUBLIC_AUTH0_CLIENT_ID` | Auth0 application client ID |

> All variables are `NEXT_PUBLIC_*` (client-side only). No server secrets needed.

## Dev Container (Docker)

The `.devcontainer` folder contains a Docker dev environment using **bun**.

### Using VS Code Dev Containers

1. Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
2. Open this repo in VS Code
3. Click **Reopen in Container**

### Using Docker Compose

```bash
# From the repo root
docker-compose up
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## CI/CD

GitHub Actions runs on every push and pull request:
- `bun run lint` — ESLint
- `bun run typecheck` — TypeScript
- `bun run build` — Next.js production build

See `.github/workflows/ci.yml` for configuration.

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Next.js 15](https://nextjs.org) | App Router, SSR, routing |
| [TypeScript](https://typescriptlang.org) | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations & transitions |
| [Zustand](https://zustand-demo.pmnd.rs/) | Client state management |
| [Sonner](https://sonner.emilkowal.ski/) | Toast notifications |
| [Lucide React](https://lucide.dev/) | Icons |
| [PostHog](https://posthog.com/) | Product analytics |
| [bun](https://bun.sh/) | Package manager & runtime |
