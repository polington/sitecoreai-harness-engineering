# AGENTS.md

## Project Overview

This repository is a reference implementation of a **custom AI development harness** on top of a **SitecoreAI (XM Cloud)** project. It demonstrates a stage-based workflow (Specification → Design → Implementation Planning → Build → QA → CMS Configuration → Approval → Complete) for delivering features with AI coding agents, with full traceability of every stage's inputs and outputs.

This is a monorepo with two distinct concerns:

- **`harness/`** — the workflow operating system itself (standards, roles, templates, tasks, artifacts, run state). This is the primary subject of this repo.
- **`src/headapps/rob-harness-engineering/`** — the Sitecore Content SDK / Next.js application the harness builds features into. It has its own nested [`AGENTS.md`](src/headapps/rob-harness-engineering/AGENTS.md) with app-specific guidance (App Router structure, middleware, i18n, component maps). **When editing code in that app, its AGENTS.md takes precedence over this file.**

## Where To Start

- Read [`harness/README.md`](harness/README.md) first — it explains the harness structure and how to interact with it.
- Read [`harness/run-state.md`](harness/run-state.md) to find the currently active task, stage, and run ID before doing any feature work.
- Do not skip stages, broaden a stage's input set casually, or treat narration as completed work — see `harness/standards/stage-input-contracts.md` and `harness/roles/orchestrator-agent.md` for the enforcement rules.

## Repository Structure

```
harness/            Workflow standards, role definitions, templates, tasks, artifacts, run state
src/headapps/…       Next.js App Router head application (has its own AGENTS.md)
src/authoring/       Sitecore platform items and serialized content
.github/agents/       GitHub Copilot custom agent definitions (mirror harness/roles/)
.github/workflows/    CI (test/lint) pipeline
.cursor/rules/        Cursor agent definitions (repo root mirrors .github/agents/)
.claude/commands/     Claude Code command definitions (repo root mirrors .github/agents/)
```

## Setup, Build, and Test Commands

All application commands run from `src/headapps/rob-harness-engineering/`:

```bash
npm install
npm run dev          # dev server
npm run build         # production build
npm run lint          # ESLint
npm test              # Jest suite
```

There are no repo-root build/test commands — this root only contains harness governance files and documentation.

## Multi-Tool Agent Configuration

This repo supports several AI coding tools. Each stage role (`orchestrator`, `po-spec`, `feature-design`, `tech-lead`, `build`, `qa`, `cms-config`) is defined once in `harness/roles/`, and each tool has a thin adapter that points back to that canonical role definition plus the relevant `harness/standards/` and `harness/templates/`:

| Tool | Adapter location |
|------|-------------------|
| GitHub Copilot (VS Code custom agents) | `.github/agents/*.agent.md` |
| Cursor | `.cursor/rules/*.mdc` |
| Claude Code | `.claude/commands/*.md` |

**When updating a role's behavior, edit `harness/roles/<role>-agent.md` first, then update all three adapters to stay consistent.** They are not auto-synced — check all three before assuming a role change is fully applied.

## Conventions For Agents Working In This Repo

- Treat `harness/run-state.md` as the single source of live execution state; task files under `harness/tasks/` are durable definitions, not live state.
- Only modify `harness/standards/`, `harness/roles/`, `harness/templates/`, or the tool adapters listed above when explicitly asked to change the harness itself — not during normal feature execution.
- Every artifact you claim to have created must actually be verified on disk (exists, non-empty, structurally valid) before advancing a stage — see the Anti-Narration Rule in `harness/roles/orchestrator-agent.md`.
- Follow `harness/standards/coding-standard.md` and `harness/standards/testing-standard.md` during Build.

## Security Considerations

- Never commit `.env` or `.env.local` files (see the head app's `AGENTS.md` for environment variable handling).
- Never hardcode Sitecore API keys, editing secrets, or host URLs.
- This repository currently has no automated dependency or secret scanning in CI (`.github/workflows/ci.yml` only runs tests and lint) — flag this if asked to harden the pipeline.
