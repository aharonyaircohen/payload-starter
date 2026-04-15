---
name: implement
description: Execute engineering tasks with full contract enforcement including branch creation, tests, commits, PR, and CI verification. Use when the user says "implement", asks to build a feature, fix a bug, or complete any engineering task that requires code changes. Enforces Payload CMS + Next.js stack rules, quality gates, and structured delivery.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Engineering Task Execution Contract

You are a senior engineer executing a single, well-scoped task in this repository.

## Stack & Non-Negotiables

- **Next.js** (App Router) + **TypeScript** (strict) + **TailwindCSS**
- **Payload CMS** inside the same Next.js app
- **MongoDB**
- **pnpm** (package manager)
- **REST API only** (NO GraphQL)
- **UI**: shadcn/ui + Radix Primitives + lucide-react + next-themes
- **UX**: Sonner (toast notifications) + cmdk (command palette)
- **Validation**: Zod at ALL API boundaries (route handlers / server actions / webhooks)
- **Observability (server-side)**: Pino JSON logs with requestId correlation + Sentry (frontend + backend)
- **Uploads**: S3-compatible adapter in production (local disk uploads forbidden in production)

## Workflow (Must Follow)

**🚨 CRITICAL SAFETY RULE - READ FIRST:**

**NEVER commit or push to the default branch (main/master)**

- All work MUST be done on a feature branch
- Always verify current branch before: committing, pushing, or creating PR
- The helper script includes safety checks to prevent accidental pushes to default branch
- If you're ever on the default branch, immediately switch to your feature branch

### 1. Understand & Validate

- Understand the task objective and constraints
- **If something conflicts with the stack rules above**: STOP and propose a compliant alternative
- Restate the task as:
  - **Objective**: (one sentence)
  - **Scope boundaries**: (what IS and IS NOT in scope)
- Ask clarifying questions ONLY if required (max 5 questions)
- If no clarification needed, proceed immediately

### 2. Create Git Branch

**IMPORTANT: Always sync with default branch first:**

```bash
# Get the default branch name (usually 'main' or 'master')
DEFAULT_BRANCH=$(git remote show origin | grep 'HEAD branch' | cut -d' ' -f5)

# Switch to default branch, fetch latest, and pull
git checkout $DEFAULT_BRANCH
git fetch origin
git pull origin $DEFAULT_BRANCH

# Create new feature branch from updated default branch
git checkout -b <branch-name>
```

**⚠️ CRITICAL SAFETY RULE:**

- **NEVER push to the default branch (main/master)**
- **ONLY push to your newly created feature branch**
- Always verify you're on the correct branch before pushing: `git branch --show-current`
- If you accidentally switch to default branch, immediately switch back to your feature branch

**Branch naming convention:**

- `feat/<short-slug>` - for new features
- `fix/<short-slug>` - for bug fixes
- `chore/<short-slug>` - for maintenance tasks

**Example:** `feat/user-avatar-upload`

### 3. Implement Changes

- **Keep the PR small and single-purpose**
- Minimize surface area - only change what's necessary
- **Do NOT add new libraries/frameworks without explicit approval**
- Follow existing code patterns and conventions
- Ensure all new/modified API boundaries have Zod validation
- Add Pino logging for new/changed server-side behavior (include requestId correlation)
- Ensure Sentry captures relevant errors (no silent failures)

### 4. Tests & Quality Gates (Mandatory)

Run ALL of these commands and ensure they pass:

```bash
# Type checking (must pass)
pnpm -s tsc --noEmit

# Linting (must pass)
pnpm -s lint

# Formatting (must pass)
pnpm -s format
# OR if format script doesn't exist:
pnpm -s prettier:check

# Unit/Integration tests (must pass)
pnpm -s test
```

**Additional test requirements:**

- **UI changes**: Add React Testing Library tests
- **E2E for core flows**: Use Playwright (only when relevant)
- **Bug fixes**: Write test-first - add a failing test that reproduces the bug, then fix it
- **Logic changes**: Add or update tests to cover the new behavior

### 5. Commit Discipline

**⚠️ BEFORE COMMITTING - Verify you're on your feature branch:**

```bash
# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
DEFAULT_BRANCH=$(git remote show origin | grep 'HEAD branch' | cut -d' ' -f5)

# Safety check
if [ "$CURRENT_BRANCH" = "$DEFAULT_BRANCH" ]; then
    echo "❌ ERROR: You are on $DEFAULT_BRANCH - switch to your feature branch!"
    exit 1
fi

echo "✓ Safe to commit on branch: $CURRENT_BRANCH"
```

**Use Conventional Commits** (commitlint enforced):

```
feat: add user avatar upload to profile settings
fix: correct timezone handling in date picker
chore: update dependencies to latest versions
```

**Rules:**

- **NEVER commit directly to default branch (main/master)**
- Always verify current branch before committing
- Make commits logically grouped
- Avoid generic messages like "misc" or "updates"
- Use imperative mood: "add feature" not "added feature"
- Each commit message must clearly describe the change

**Common prefixes:**

- `feat:` - new feature
- `fix:` - bug fix
- `chore:` - maintenance (deps, config, etc.)
- `docs:` - documentation only
- `refactor:` - code restructuring without behavior change
- `test:` - adding or updating tests
- `perf:` - performance improvements

### 6. Pull Request

**Automated PR creation workflow:**

1. **Ensure GitHub CLI is installed and authenticated:**

   ```bash
   # Check/install gh CLI
   which gh || brew install gh

   # Authenticate (first time only)
   gh auth status || gh auth login
   ```

2. **Verify you're on your feature branch (CRITICAL SAFETY CHECK):**

   ```bash
   CURRENT_BRANCH=$(git branch --show-current)
   DEFAULT_BRANCH=$(git remote show origin | grep 'HEAD branch' | cut -d' ' -f5)

   if [ "$CURRENT_BRANCH" = "$DEFAULT_BRANCH" ]; then
       echo "❌ ERROR: You are on $DEFAULT_BRANCH - DO NOT PUSH!"
       echo "Switch to your feature branch first"
       exit 1
   fi

   echo "✓ Safe to proceed on branch: $CURRENT_BRANCH"
   ```

3. **Update branch with latest changes from default branch:**

   ```bash
   # Get default branch name
   DEFAULT_BRANCH=$(git remote show origin | grep 'HEAD branch' | cut -d' ' -f5)

   # Fetch latest changes
   git fetch origin

   # Rebase your branch on top of the latest default branch
   git rebase origin/$DEFAULT_BRANCH

   # If conflicts occur, resolve them and continue:
   # git add <resolved-files>
   # git rebase --continue
   ```

4. **Push branch and create PR:**

   **Option A: Use the helper script** (recommended):

   ```bash
   .claude/skills/implement/create-pr.sh \
     "feat: your feature description" \
     "What changed and why" \
     "List of affected files" \
     "✓ pnpm -s tsc --noEmit - PASSED\n✓ pnpm -s lint - PASSED\n✓ pnpm -s test - PASSED"
   ```

   **Option B: Manual gh command:**

   ```bash
   # Push branch (use --force-with-lease if rebased)
   git push -u origin <branch-name> --force-with-lease

   # Create PR
   gh pr create --title "<conventional-commit-title>" --body "$(cat <<'EOF'
   ```

## What / Why

[Brief description of what changed and why]

## Scope of Changes

[List affected files/modules/features]

## How It Was Tested

[Exact commands run with results]
✓ pnpm -s tsc --noEmit - PASSED
✓ pnpm -s lint - PASSED
✓ pnpm -s format - PASSED
✓ pnpm -s test - PASSED

## Definition of Done Checklist

- [ ] All quality gates pass (typecheck, lint, format, tests)
- [ ] Zod validation at all modified/added API boundaries
- [ ] Pino logs with requestId correlation for server-side changes
- [ ] Sentry captures relevant errors
- [ ] Tests added/updated for logic changes or bug fixes
- [ ] No new dependencies without approval
- [ ] CI checks green

## Screenshots / GIF (if UI changed)

[Attach visual evidence if applicable]

## Risks / Rollback Notes

[Any deployment risks or rollback instructions]

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"

```

**PR title format** (Conventional Commit style):

```

feat: add user avatar upload feature
fix: resolve authentication timeout issue
chore: update dependencies

```

For the complete PR template reference, see [PR_TEMPLATE.md](PR_TEMPLATE.md).

### 7. CI/CD Verification

- **Ensure GitHub Actions checks are green**
- **If CI fails**:
  1. Diagnose the failure
  2. Fix the issue locally
  3. Push new commits
  4. Update PR description with:
     - What failed
     - What you changed to fix it

### 8. Definition of Done (DoD)

**The task is NOT DONE unless ALL of these are true:**

- [ ] All required quality gates pass locally AND in CI
- [ ] Zod validation exists at any modified/added API boundary
- [ ] Pino logs meaningful events for new/changed server-side behavior (with requestId correlation)
- [ ] Sentry captures relevant errors (no silent failures)
- [ ] Tests added/updated for logic changes or bug fixes
- [ ] No new dependencies introduced without approval
- [ ] PR opened with the required structured description
- [ ] CI checks are green
- [ ] Branch follows naming convention
- [ ] All commits follow Conventional Commits format

## Output Requirements (Final Report)

When you complete the task, provide:

1. **Branch name**: `feat/feature-name`
2. **List of commits**:
```

abc1234 feat: add feature X
def5678 test: add tests for feature X

```
3. **PR link** (or PR title + full body if link not available)
4. **Test commands executed + results**:
```

✓ pnpm -s tsc --noEmit - PASSED
✓ pnpm -s lint - PASSED
✓ pnpm -s format - PASSED
✓ pnpm -s test - PASSED (15 tests)

````
5. **CI status summary**: All checks passed / What failed and how you fixed it

## Common Patterns

### Adding a new API route

```typescript
// src/app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { logger } from '@/lib/logger'

const requestSchema = z.object({
field: z.string().min(1),
})

export async function POST(req: NextRequest) {
const requestId = crypto.randomUUID()

try {
 const body = await req.json()
 const validated = requestSchema.parse(body)

 logger.info({ requestId, action: 'example_action' }, 'Processing request')

 // ... your logic here

 return NextResponse.json({ success: true })
} catch (error) {
 logger.error({ requestId, error }, 'Request failed')

 if (error instanceof z.ZodError) {
   return NextResponse.json(
     { error: 'Validation failed', details: error.errors },
     { status: 400 },
   )
 }

 return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}
}
````

### Adding a Server Action

```typescript
'use server'

import { z } from 'zod'
import { logger } from '@/lib/logger'

const inputSchema = z.object({
  userId: z.string().uuid(),
  data: z.string(),
})

export async function myServerAction(input: unknown) {
  const requestId = crypto.randomUUID()

  try {
    const validated = inputSchema.parse(input)

    logger.info({ requestId, userId: validated.userId }, 'Server action called')

    // ... your logic

    return { success: true }
  } catch (error) {
    logger.error({ requestId, error }, 'Server action failed')
    throw error
  }
}
```

## Anti-Patterns (Avoid These)

❌ **DO NOT**:

- **🚨 CRITICAL: NEVER commit or push to default branch (main/master)** - Always work on feature branches
- **🚨 CRITICAL: NEVER skip branch verification before pushing** - Always check `git branch --show-current`
- Skip tests ("I'll add tests later")
- Commit without running quality gates locally first
- Add dependencies without asking
- Use GraphQL (REST only)
- Hardcode secrets or API keys
- Create nested metadata structures in Payload
- Allow silent failures (always log and capture errors)
- Skip Zod validation at API boundaries
- Forget requestId correlation in logs
- Use local disk uploads in production code
- Make PRs that do multiple unrelated things
- Use generic commit messages
- Skip the PR template

✅ **DO**:

- **Always verify you're on a feature branch before committing/pushing**
- Use the helper script's built-in safety checks
- Run all quality gates before committing
- Keep PRs focused and small
- Ask before adding dependencies
- Always validate with Zod at boundaries
- Always log with requestId correlation
- Always capture errors in Sentry
- Write tests for bug fixes before fixing
- Follow Conventional Commits format
- Use the full PR template
- Keep commits logically grouped

---

**Remember**: Quality and consistency over speed. A well-tested, properly documented PR that follows all standards is infinitely better than a quick hack.
