# Web Release

Inspect the repository before proposing any files. Read its existing GitHub
Actions, `kody.config.json`, manifests, lockfiles, workspace configuration,
version files, Vercel configuration, branch layout, and documented release and
security policies.

Build the smallest repository-specific configuration that can use the existing
Store Web Release solution without changing its behavior. Preserve and verify
every current setting that applies:

- `git.defaultBranch` identifies the branch that receives the validated release
  pull request.
- `release.version` defines repository-owned read and write commands and the
  files they change. Preserve a compatible `release.versionFiles` fallback when
  the repository already uses it.
- `release.validation` identifies the repository-owned GitHub Actions workflow
  and any inputs that must be dispatched for the prepared release pull request.
- `release.releaseBranch` identifies the production release branch. Leaving it
  unset or equal to the default branch is valid only for a verified
  single-branch release.
- `release.allowAdminMerge` preserves the repository's explicit choice for the
  promotion pull request; never enable it to bypass policy.
- `release.productionUrl` identifies the live site checked after deployment.
- `release.smokeCommand` is a verified command that proves the live site works.
- `release.productionDeployRequired` records whether missing Vercel deployment
  configuration must block the release.
- `release.timeoutMs` is long enough for the repository's real validation and
  deployment checks without hiding a stalled release.

Create or improve only the native validation workflow required by
`release.validation`. Reuse a compatible existing workflow. Verify every
install, lint, typecheck, test, build, and smoke command before placing it in
configuration or GitHub Actions. Do not invent a command or replace a working
release workflow merely to standardize its shape.

The temporary Constructor owns this Blueprint application until its pull
request passes the required checks. The supplied installation bundle includes
the Store-owned Web Release Maintainer Loop and its activation configuration;
deliver both unchanged in the same pull request. Do not start the Maintainer
directly from the default branch during construction.

The installed Maintainer behavior must remain the current Web Release sequence: prepare a
release pull request, explicitly run repository-owned validation, merge it to
the default branch, open and merge the promotion pull request when a distinct
release branch exists, deploy that branch to Vercel Production, and verify the
live result.

Do not store `VERCEL_ACCESS_TOKEN`, `VERCEL_ORG_ID`, or `VERCEL_PROJECT_ID` in
the repository. They remain Kody-managed secrets. Do not perform a production
release during Blueprint application. The resulting pull request contains the
repository-specific configuration, native validation workflow, and supplied
Store activation patch and files. The existing Store Web Release solution and
its Maintainer Loop own ongoing execution after that pull request is accepted.

If the repository does not provide enough evidence to determine a release
branch, version adapter, validation workflow, production deployment policy, or
required live check, return `blocked` and state the exact owner decision needed
instead of guessing.