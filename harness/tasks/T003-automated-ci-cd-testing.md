# Task T003 — Automated CI/CD Testing

Status: Ready  
Backlog Item: B013  
Created: 2026-05-11

---

## Summary

Create GitHub Actions workflows that automatically run the head application's test suite
when a pull request is opened or updated, ensuring code quality and preventing regressions
from being merged.

This task delivers:

1. A **GitHub Actions workflow** that triggers on pull request events (opened, synchronize,
   reopened) targeting the main branch.
2. The workflow installs dependencies, runs the existing Jest test suite, lints the codebase,
   and performs a TypeScript type-check against the head application in
   `src/headapps/rob-harness-engineering/`.
3. Branch protection guidance so the workflow's checks can be required before merge.

---

## Related Artifacts

Feature Specification: `harness/artifacts/specs/T003-feature-spec.md`  
Design Note: `harness/artifacts/design/T003-design-note.md`  
Implementation Plan: `harness/artifacts/plans/T003-implementation-plan.md`  
QA Review: `harness/artifacts/qa/T003-qa-review.md`  
Run Report: `harness/runs/T003-run-report.md`

---

## Scope

### In Scope

- Create a GitHub Actions workflow file (e.g. `.github/workflows/ci.yml`) that:
  - Triggers on `pull_request` events (opened, synchronize, reopened) targeting the
    default branch.
  - Checks out the repository.
  - Sets up the appropriate Node.js version.
  - Installs dependencies for the head application at
    `src/headapps/rob-harness-engineering/`.
  - Runs the Jest test suite (`npm test` or equivalent) and reports pass/fail status.
  - Runs the ESLint linter (`npm run lint` or equivalent) and reports pass/fail status.
  - Runs the TypeScript compiler in `--noEmit` mode for type-checking.
- Ensure the workflow uses caching (e.g. npm/yarn cache) to speed up subsequent runs.
- Ensure the workflow correctly scopes commands to the head application's working
  directory.
- Document recommended branch protection rules to make these checks required before
  merge.

### Out of Scope

- End-to-end or integration testing (Playwright, Cypress, etc.).
- Deployment pipelines (CD to staging or production environments).
- Docker or container-based builds.
- Testing of the Sitecore platform project or serialized items.
- Modifying existing tests or adding new test coverage (the workflow runs whatever
  tests already exist).
- Enforcing branch protection rules in the repository settings (documentation only).
- Notification integrations (Slack, Teams, email) for build results.
- Matrix builds across multiple Node.js versions (single version targeting the
  project's current Node.js version is sufficient).

---

## Acceptance Criteria

Acceptance criteria will be finalised in the Feature Specification. The task must,
at minimum, deliver the following:

- A GitHub Actions workflow file exists in `.github/workflows/` and is valid YAML.
- The workflow triggers automatically when a pull request is opened, updated, or
  reopened against the default branch.
- The workflow installs the head application's dependencies and runs the full Jest
  test suite; the job fails if any test fails.
- The workflow runs ESLint; the job fails if any lint error is reported.
- The workflow runs the TypeScript compiler in type-check mode; the job fails if any
  type error is reported.
- The workflow uses dependency caching to avoid redundant installs on subsequent runs.
- The workflow completes successfully (green) when all tests pass, lint is clean, and
  types are correct.
- The workflow reports a clear failure (red) with actionable output when any check fails.
- Documentation is provided describing how to configure branch protection rules to
  require the workflow checks before merge.

---

## Dependencies

- The head application at `src/headapps/rob-harness-engineering/` has a working test
  suite (Jest), ESLint configuration, and TypeScript configuration.
- The repository is hosted on GitHub with Actions enabled.
- An appropriate Node.js version is documented or inferable from the project's
  configuration (e.g. `package.json` engines field, `.nvmrc`, or similar).

---

## Risks

- If the head application's existing tests are flaky or environment-dependent, the CI
  workflow may produce false failures; this should be identified during QA.
- The working directory for npm commands must be correctly set to the head application
  subdirectory; an incorrect path will cause all steps to fail.
- If the project uses private npm registries or scoped packages requiring authentication,
  the workflow will need registry credentials configured as GitHub secrets; this should
  be confirmed during Implementation Planning.
- GitHub Actions minutes may be limited on the repository's plan; the workflow should
  be efficient to minimise usage.

---

## Task Notes

- This task focuses on pull request validation only. Continuous deployment (CD) pipelines
  are a separate concern and are not part of this backlog item.
- The workflow should be designed to be extensible so that future test types (e.g.
  end-to-end tests, additional head applications) can be added as separate jobs without
  reworking the existing configuration.
- CMS Configuration is not applicable for this task as it does not involve Sitecore
  content items or rendering definitions.

---

## Approval

Reviewer:  
Decision: Pending  
Notes:
