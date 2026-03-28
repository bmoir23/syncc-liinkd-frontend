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

## Recommended Next Step: LLM Server + Automations Backend + Connector

To keep this frontend clean and production-safe, use a **3-layer integration model**:

1. **Frontend (this repo)**  
   - Renders UI and sends user actions to your backend API.
   - Never stores model/provider secrets.
2. **Automations Backend (new service)**  
   - Owns auth, rate limiting, retries, logging, and workflow orchestration.
   - Calls LLM server and/or n8n webhooks.
3. **LLM Server (new service)**  
   - Single gateway for model providers (OpenAI-compatible API is ideal).
   - Can point to Ollama/vLLM/local models in dev, hosted providers in prod.

### Suggested Service Contracts

- `POST /api/chat`  
  Backend receives `{ userId, message, context }` and returns `{ reply, traceId }`.
- `POST /api/automations/trigger`  
  Backend receives `{ workflow, payload }` and triggers n8n/job runner.
- `GET /api/health`  
  Health endpoint for frontend checks and CI smoke tests.

### Environment Variable Plan (for next implementation phase)

Keep secrets in backend only. For frontend, add only public base URLs:

```bash
# Example: frontend/.env.local (future)
NEXT_PUBLIC_AUTOMATIONS_API_BASE_URL=http://localhost:4000
NEXT_PUBLIC_LLM_GATEWAY_BASE_URL=http://localhost:8000
```

For backend (separate repo/service), keep secret values server-side only:

```bash
# backend/.env (future, do not expose to client)
OPENAI_API_KEY=...
N8N_WEBHOOK_SECRET=...
JWT_SECRET=...
```

### Implementation Sequence (Minimal Risk)

1. Stand up backend with `/api/health` and `/api/chat` mock responses.
2. Point frontend connector(s) to backend base URL (feature-flagged).
3. Add n8n trigger endpoint in backend with request validation + retries.
4. Add LLM provider adapter behind backend (one interface, many providers).
5. Add observability: request IDs, structured logs, and failure metrics.

## Branching & Delivery Best Practices

Use a lightweight GitHub Flow with protected `main`:

- `main` = always deployable
- Feature branches:
  - `feat/<scope>-<short-description>`
  - `fix/<scope>-<short-description>`
  - `docs/<scope>-<short-description>`

Recommended PR checklist:

- [ ] Scope is small and focused
- [ ] Lint, typecheck, build pass locally
- [ ] Env/config changes documented
- [ ] API contract changes reflected in README
- [ ] Security review completed (no client-side secrets, input validated)

## Documentation to Impress Employers (Portfolio-Ready)

For job opportunities, keep docs outcome-oriented and easy to review:

1. **3-layer integration model section** (this README): components + data flow.
2. **Setup section**: exact local run commands for frontend/backend/LLM.
3. **API contract examples**: request/response payloads for key endpoints.
4. **Branching/quality process**: how you ship safely (CI + PR checklist).
5. **Roadmap**: short list of next milestones with measurable outcomes.

This demonstrates product thinking, engineering discipline, and production readiness.

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
