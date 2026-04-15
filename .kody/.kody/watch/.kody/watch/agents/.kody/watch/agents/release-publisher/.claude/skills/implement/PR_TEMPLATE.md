# Pull Request Template

Use this template when creating pull requests as part of the Engineering Task Execution Contract.

---

## What / Why

<!-- Brief description of what changed and why -->
<!-- Example: Added user avatar upload feature to allow users to personalize their profiles -->

## Scope of Changes

<!-- List affected files/modules/features -->
<!-- Example:
- Modified: src/app/profile/page.tsx
- Added: src/app/api/upload-avatar/route.ts
- Updated: src/lib/schemas/user.ts (added avatar field validation)
-->

## How It Was Tested

<!-- Exact commands run and their results -->
<!-- Example:
✓ pnpm -s tsc --noEmit - PASSED
✓ pnpm -s lint - PASSED
✓ pnpm -s format - PASSED
✓ pnpm -s test - PASSED (18/18 tests, +3 new tests)
✓ Manual testing: Uploaded avatar in profile settings, verified S3 upload, checked error states
-->

## Definition of Done Checklist

<!-- Check ALL items before requesting review -->

- [ ] All quality gates pass (typecheck, lint, format, tests)
- [ ] Zod validation at all modified/added API boundaries
- [ ] Pino logs with requestId correlation for server-side changes
- [ ] Sentry captures relevant errors
- [ ] Tests added/updated for logic changes or bug fixes
- [ ] No new dependencies without approval
- [ ] CI checks green

## Screenshots / GIF (if UI changed)

<!-- Attach visual evidence if applicable -->
<!-- Example: Before/After screenshots, GIF showing the new feature in action -->

## Risks / Rollback Notes

<!-- Any deployment risks or rollback instructions -->
<!-- Example:
- Risk: New S3 bucket policy required (already configured in staging)
- Rollback: Revert this PR and redeploy previous version
- No database migrations in this PR
-->

---

## Additional Context (Optional)

<!-- Any other context, related issues, dependencies, or notes for reviewers -->
<!-- Example:
- Related to issue #123
- Depends on feature flag ENABLE_AVATAR_UPLOAD (already enabled in production)
- Follows design spec: https://figma.com/...
-->
