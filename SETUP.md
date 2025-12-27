# Developer Setup Guide

Welcome! This guide will help you get up and running with the A-Guy project.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.20.2+ or v20.9.0+ (check with `node --version`)
- **pnpm**: v9+ or v10+ (install with `npm install -g pnpm`)
- **Docker**: Latest version (for MongoDB)
- **Git**: Latest version

## First Time Setup

### 1. Clone and Install

```bash
# If you haven't cloned yet
git clone <repository-url>
cd A-Guy

# Install dependencies
pnpm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and configure the following required variables:

```env
# Database (MongoDB)
DATABASE_URL=mongodb://127.0.0.1/a-guy

# Payload CMS secrets (REQUIRED - generate unique values)
PAYLOAD_SECRET=YOUR_SECRET_HERE
CRON_SECRET=YOUR_CRON_SECRET_HERE
PREVIEW_SECRET=YOUR_SECRET_HERE

# Application URL
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Logging level (optional)
LOG_LEVEL=info
```

**Generate secure secrets:**

```bash
# Generate PAYLOAD_SECRET
openssl rand -base64 32

# Generate CRON_SECRET
openssl rand -base64 32

# Generate PREVIEW_SECRET
openssl rand -base64 32
```

**Optional: Sentry configuration** (for error tracking)

```env
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
SENTRY_AUTH_TOKEN=
```

### 3. Start MongoDB

```bash
# Start MongoDB in Docker
docker-compose up -d

# Verify MongoDB is running
docker-compose ps
```

You should see MongoDB running on port 27017.

### 4. Run Development Server

```bash
pnpm dev
```

The application will start on [http://localhost:3000](http://localhost:3000)

### 5. Create Your First Admin User

1. Visit [http://localhost:3000/admin](http://localhost:3000/admin)
2. Create your first admin user account
3. You're ready to start developing!

## Verify Setup

Run all quality gates to ensure everything is working correctly:

```bash
# Type checking (must pass)
pnpm typecheck

# Linting (must pass)
pnpm lint

# Formatting check (must pass)
npx prettier --check .

# Unit and integration tests (must pass)
pnpm test

# Production build (must pass)
pnpm build
```

All commands should complete successfully with no errors.

## Development Workflow

### Daily Development

```bash
# Start dev server with hot-reload
pnpm dev

# In another terminal, watch tests
pnpm test:int --watch
```

### Before Committing (Quality Gates)

**IMPORTANT**: All quality gates must pass before committing. Pre-commit hooks will enforce this.

```bash
# Run all quality gates
pnpm typecheck && pnpm lint && npx prettier --check . && pnpm test
```

### Working with Git

This project uses:

- **Conventional Commits** (enforced by commitlint)
- **Husky** for pre-commit hooks
- **lint-staged** for automated formatting

**Commit message format:**

```bash
# Examples
git commit -m "feat: add user profile page"
git commit -m "fix: resolve authentication timeout"
git commit -m "chore: update dependencies"
```

**Common prefixes:**

- `feat:` - New feature
- `fix:` - Bug fix
- `chore:` - Maintenance (deps, config)
- `docs:` - Documentation only
- `refactor:` - Code restructuring
- `test:` - Adding/updating tests
- `perf:` - Performance improvements

For detailed workflow instructions, see the [/implement skill documentation](.claude/skills/implement/SKILL.md).

## Troubleshooting

### MongoDB Connection Issues

If you get connection errors:

1. Check Docker is running:

```bash
docker ps
```

2. Restart MongoDB:

```bash
docker-compose down
docker-compose up -d
```

3. Verify connection string in `.env` matches:

```env
DATABASE_URI=mongodb://localhost:27017/payload-starter
```

### Port Already in Use

If port 3000 is already in use:

```bash
# Find process using port 3000
lsof -ti:3000

# Kill the process
kill -9 <PID>
```

Or change the port in `package.json`:

```json
"dev": "next dev -p 3001"
```

### Build Errors

If you get build errors:

1. Clear Next.js cache:

```bash
rm -rf .next
```

2. Reinstall dependencies:

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Husky Git Hooks Not Working

If pre-commit hooks aren't running:

```bash
# Reinstall husky
pnpm exec husky init
```

### TypeScript Errors After Installing Dependencies

```bash
# Clean TypeScript build cache
rm -f tsconfig.tsbuildinfo

# Rerun typecheck
pnpm typecheck
```

### Environment Variable Issues

If you get errors about missing environment variables:

1. Ensure `.env` file exists in the project root
2. Verify all required secrets are set (PAYLOAD_SECRET, CRON_SECRET, PREVIEW_SECRET)
3. Restart the dev server after changing `.env`

## Next Steps

Once your environment is set up:

1. **Read the documentation**:
   - [README.md](README.md) - Full project documentation
   - [PROJECT-TOOLING.md](PROJECT-TOOLING.md) - Stack rules and approved tools
   - [/implement skill](.claude/skills/implement/SKILL.md) - Engineering workflow

2. **Explore Payload CMS**:
   - Visit `/admin` to explore the admin panel
   - Review existing collections in `src/collections/`
   - Check out the Payload configuration in `src/payload.config.ts`

3. **Understand the tech stack**:
   - **Frontend**: Next.js 15 (App Router) + TypeScript + TailwindCSS
   - **Backend**: Payload CMS (inside the same Next.js app)
   - **Database**: MongoDB
   - **UI**: shadcn/ui + Radix Primitives + lucide-react
   - **Validation**: Zod (required at all API boundaries)
   - **Logging**: Pino (with requestId correlation)
   - **Error Tracking**: Sentry

4. **Start building**:
   - Create your first Payload collection
   - Build frontend components using shadcn/ui
   - Add API routes with proper Zod validation
   - Write tests for your features

5. **Review quality standards**:
   - All PRs must pass: typecheck, lint, format, tests
   - Follow Conventional Commits format
   - Use the `/implement` skill for structured task execution

## Useful Commands

### Development

```bash
pnpm dev              # Start dev server with hot-reload
pnpm build            # Build for production
pnpm start            # Start production server
pnpm dev:prod         # Clean build + start (simulates production)
```

### Quality Gates (Required Before Committing)

```bash
pnpm typecheck        # Type checking (tsc --noEmit)
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues automatically
npx prettier --check . # Check code formatting
npx prettier --write . # Auto-format code
```

### Testing

```bash
pnpm test             # Run all tests (integration + E2E)
pnpm test:int         # Run integration tests only (Vitest)
pnpm test:e2e         # Run E2E tests only (Playwright)
```

### Database (MongoDB via Docker)

```bash
docker-compose up -d  # Start MongoDB in background
docker-compose down   # Stop MongoDB
docker-compose ps     # Check MongoDB status
docker-compose logs   # View MongoDB logs
docker-compose logs -f mongo  # Follow MongoDB logs
```

### Payload CMS

```bash
pnpm payload generate:types     # Generate TypeScript types from collections
pnpm payload generate:importmap # Generate import map
pnpm payload                    # Access Payload CLI
```

### Dependency Management

```bash
pnpm install          # Install dependencies
pnpm add <package>    # Add new dependency
pnpm add -D <package> # Add dev dependency
pnpm reinstall        # Clean reinstall (removes node_modules + lockfile)
```

## Additional Resources

- **Payload CMS Docs**: [https://payloadcms.com/docs](https://payloadcms.com/docs)
- **Next.js Docs**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **shadcn/ui**: [https://ui.shadcn.com](https://ui.shadcn.com)
- **Zod Validation**: [https://zod.dev](https://zod.dev)
- **Conventional Commits**: [https://www.conventionalcommits.org](https://www.conventionalcommits.org)

## Getting Help

If you run into issues:

1. Check this setup guide and troubleshooting section
2. Review the [README.md](README.md) for architecture details
3. Check [PROJECT-TOOLING.md](PROJECT-TOOLING.md) for approved patterns
4. Review the [/implement skill](.claude/skills/implement/SKILL.md) for workflow guidance
5. Ask your team or create an issue in the repository
