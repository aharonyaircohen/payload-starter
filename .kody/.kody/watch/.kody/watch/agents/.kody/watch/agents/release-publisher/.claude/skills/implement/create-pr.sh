#!/bin/bash
# Helper script to create PR with the Engineering Task Execution Contract template
# Usage: ./create-pr.sh "PR Title" "What/Why description" "Scope of changes" "Test results"

set -e

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "GitHub CLI (gh) is not installed. Installing..."
    brew install gh
fi

# Check authentication
if ! gh auth status &> /dev/null; then
    echo "Please authenticate with GitHub:"
    gh auth login
fi

# Get current branch
BRANCH=$(git branch --show-current)

# Get default branch name
echo "Getting default branch name..."
DEFAULT_BRANCH=$(git remote show origin | grep 'HEAD branch' | cut -d' ' -f5)
echo "Default branch: $DEFAULT_BRANCH"

# SAFETY CHECK: Never push to default branch
if [ "$BRANCH" = "$DEFAULT_BRANCH" ]; then
    echo "❌ ERROR: Cannot push to default branch '$DEFAULT_BRANCH'"
    echo "You are currently on the default branch."
    echo "Please switch to your feature branch first:"
    echo "  git checkout <your-feature-branch>"
    exit 1
fi

echo "✓ Current branch: $BRANCH (safe to push)"

# Get arguments
PR_TITLE="${1:-feat: update}"
WHAT_WHY="${2:-[Brief description of what changed and why]}"
SCOPE="${3:-[List affected files/modules/features]}"
TEST_RESULTS="${4:-[Test results]}"

# Update branch with latest changes from default branch
echo "Fetching latest changes from origin..."
git fetch origin

echo "Rebasing $BRANCH on top of origin/$DEFAULT_BRANCH..."
if git rebase origin/$DEFAULT_BRANCH; then
    echo "✓ Branch successfully rebased"
else
    echo "❌ Rebase failed - please resolve conflicts manually"
    echo "After resolving conflicts, run:"
    echo "  git add <resolved-files>"
    echo "  git rebase --continue"
    echo "  git push -u origin $BRANCH --force-with-lease"
    echo "Then run this script again"
    exit 1
fi

# Push branch (use --force-with-lease since we rebased)
echo "Pushing branch: $BRANCH"
git push -u origin "$BRANCH" --force-with-lease

# Create PR
echo "Creating pull request..."
gh pr create --title "$PR_TITLE" --body "$(cat <<EOF
## What / Why

$WHAT_WHY

## Scope of Changes

$SCOPE

## How It Was Tested

$TEST_RESULTS

## Definition of Done Checklist

- [ ] All quality gates pass (typecheck, lint, format, tests)
- [ ] Zod validation at all modified/added API boundaries
- [ ] Pino logs with requestId correlation for server-side changes
- [ ] Sentry captures relevant errors
- [ ] Tests added/updated for logic changes or bug fixes
- [ ] No new dependencies without approval
- [ ] CI checks green

## Screenshots / GIF (if UI changed)

N/A

## Risks / Rollback Notes

[Any deployment risks or rollback instructions]

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"

echo "✅ Pull request created successfully!"
