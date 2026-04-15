# Quick Setup Guide

## First Time Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and update:

```env
DATABASE_URI=mongodb://localhost:27017/payload-starter
PAYLOAD_SECRET=your-super-secret-key-change-this
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

Generate a secure secret:

```bash
openssl rand -base64 32
```

### 3. Start MongoDB

```bash
docker-compose up -d
```

Verify MongoDB is running:

```bash
docker-compose ps
```

### 4. Run Development Server

```bash
pnpm dev
```

### 5. Create Your First Admin User

Visit http://localhost:3000/admin and create your first user account.

## Verify Setup

Run all quality gates to ensure everything is working:

```bash
# Type checking
pnpm typecheck

# Linting
pnpm lint

# Formatting
pnpm format:check

# Unit tests
pnpm test

# Build
pnpm build
```

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
rm -rf .husky
pnpm exec husky init
```

## Next Steps

1. ✅ Read [README.md](README.md) for full documentation
2. ✅ Review [project-tooling.md](project-tooling.md) for development rules
3. ✅ Create your first Payload collection
4. ✅ Build your frontend components
5. ✅ Set up your CI/CD pipeline

## Useful Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server

# Quality
pnpm lint             # Run linter
pnpm typecheck        # Check types
pnpm format           # Format code

# Testing
pnpm test             # Run unit tests
pnpm test:e2e         # Run E2E tests

# Database
docker-compose up -d  # Start MongoDB
docker-compose down   # Stop MongoDB
docker-compose logs   # View MongoDB logs

# Payload
pnpm payload generate:types  # Generate TypeScript types
```
