# Project Tooling & Execution Rules (Payload + Next.js)

## Stack (Must Use)

- Frontend: Next.js (App Router) + TypeScript (strict) + TailwindCSS
- Backend: Payload CMS (runs inside the same Next.js app)
- Database: MongoDB
- Packages: pnpm
- Scaffolding: create-payload-app starter (single app template)

## API

- REST API only.

## Full Tooling Set (Approved)

### Repo / Workflow

- GitHub Actions (CI)
- Husky + lint-staged (pre-commit quality gates)
- commitlint (Conventional Commits)

### UI Layer

- shadcn/ui (component base)
- Radix UI Primitives (accessible primitives)
- lucide-react (icons)

### UX Utilities

- Sonner (toasts)
- cmdk (command palette)

## Quality Gates (Must Block PR)

- Typecheck: `tsc --noEmit`
- Lint: ESLint
- Format: Prettier
  Rule: A task is not "done" unless all gates pass.

## Validation

- Zod MUST be used at API boundaries (route handlers / server actions / webhooks).
- Inputs must be validated; invalid input must return clear errors.

## Testing (Required)

- Unit/Integration: Vitest
- UI: React Testing Library
- E2E (core flows only): Playwright
- Integration DB fidelity (when needed): Testcontainers (Mongo)
  Rule: Add tests whenever logic is added/changed or a bug is fixed (test-first for bug fixes).

## Observability (Required for server-side work)

- Logging: Pino structured JSON logs with request correlation (requestId)
- Error tracking: Sentry (frontend + backend)
  Rule: Any new endpoint or background-relevant behavior must log meaningful events and surface errors.

## Delivery

- Single app deployment (Next + Payload together).
- Hosting: Next on Vercel (default).
- Uploads: Use an S3-compatible storage adapter (local disk uploads are forbidden in production).

## Optional Tools (Require Explicit Approval)

- Turborepo (monorepo caching)
- Changesets (versioning/release notes for multi-package)
- Framer Motion (animations)
- TanStack Query (client-side server-state)
- Storybook (component lab)
- Chromatic (visual regression)
- next-bundle-analyzer (bundle inspection)
- Search: Meilisearch / Typesense
- Analytics/flags: PostHog

## Execution Rules

- Keep PRs small and single-purpose.
- Do not introduce new frameworks/libraries without explicit approval.
- Prefer existing tools in this stack; avoid duplicates.
- If a task conflicts with these rules, STOP and propose a compliant alternative.
