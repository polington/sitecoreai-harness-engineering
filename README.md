# AI-Assisted Feature Engineering with SitecoreAI

A reference implementation demonstrating **AI-assisted feature delivery** using a structured harness workflow on a SitecoreAI project. This repository accompanies a conference presentation on using AI coding agents for reliable, repeatable software engineering.

## What This Repository Demonstrates

This project shows how AI coding agents (GitHub Copilot, Cursor, Claude Code, Windsurf) can be orchestrated through a **stage-based workflow** to deliver production-quality features — from specification through implementation and QA — with full traceability.

The key idea: instead of ad-hoc prompting, a **harness** provides structure, standards, and guardrails that make AI-assisted development predictable and auditable.

### Features Built by AI Agents

| Task | Description |
|------|-------------|
| T001 | Site Header with navigation + SXA Partial/Page Designs |
| T002 | Site Footer with secondary nav and social links |
| T003 | Automated CI/CD testing (GitHub Actions) |
| T004 | Hero Banner component |
| T005 | Promo Card Grid component |

Each feature was delivered through the full harness workflow: Specification → Design → Implementation Planning → Build → QA → CMS Configuration.

## Repository Structure

```
├── harness/                    # The AI workflow operating system
│   ├── standards/              # Coding, testing, and process standards
│   ├── roles/                  # Agent role definitions (orchestrator, build, QA, etc.)
│   ├── templates/              # Templates for all stage artifacts
│   ├── tasks/                  # Durable task definitions
│   ├── artifacts/              # Stage outputs (specs, designs, plans, QA reviews)
│   ├── runs/                   # Run reports for completed tasks
│   ├── backlog/                # Future work items
│   └── design-system/          # Visual design system reference
├── src/
│   ├── headapps/
│   │   └── rob-harness-engineering/   # Next.js App Router head application
│   └── authoring/                      # Sitecore platform and serialized items
├── .github/
│   ├── workflows/ci.yml        # PR validation workflow
│   └── agents/                 # GitHub Copilot Coding Agent mode definitions
├── .cursor/rules/              # Cursor agent mode definitions
└── xmcloud.build.json          # SitecoreAI build configuration
```

## The Harness

The `harness/` directory is the core of this demonstration. It provides:

- **Stage-based workflow** — features progress through Specification, Design, Planning, Build, QA, and CMS Configuration stages sequentially
- **Role definitions** — each stage is handled by a specialized agent role with bounded responsibilities
- **Standards** — coding conventions, testing requirements, and process rules that agents follow
- **Templates** — consistent output formats for every artifact
- **Traceability** — every decision and output is recorded in artifacts and run reports

See [harness/README.md](harness/README.md) for full details.

## Technology Stack

- **CMS:** SitecoreAI
- **Front-end:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS
- **SDK:** Sitecore Content SDK for Next.js
- **i18n:** next-intl
- **CI:** GitHub Actions

## Prerequisites

- Node.js 24+
- A SitecoreAI environment (for full CMS integration)
- npm

## Getting Started

```bash
# Clone the repository
git clone https://github.com/robearlam/sitecoreai-harness-engineering.git
cd sitecoreai-harness-engineering

# Install head application dependencies
cd src/headapps/rob-harness-engineering
npm install

# Copy environment template and configure
cp .env.remote.example .env.local
# Edit .env.local with your SitecoreAI connection details

# Start development server
npm run dev
```

### Available Commands

From `src/headapps/rob-harness-engineering/`:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest test suite |

## AI Agent Configuration

This repository includes configuration for multiple AI coding tools:

| Tool | Configuration |
|------|---------------|
| GitHub Copilot (VS Code) | `.github/copilot-instructions.md`, `harness/roles/` |
| GitHub Copilot Coding Agent | `.github/agents/` |
| Cursor | `.cursor/rules/` |
| Claude Code | `CLAUDE.md` |
| Windsurf | `.windsurfrules` |

The harness roles in `harness/roles/` define the core agent behaviours. The tool-specific configuration files adapt these roles to each tool's format.

## License

This project is licensed under the Apache License 2.0 — see the [LICENSE](LICENSE) file for details.

## Disclaimer

This is a **demonstration repository** accompanying a conference presentation. It is intended as a reference for how AI-assisted workflows can be structured, not as a production-ready starter kit. The XM Cloud environment backing this project may not be available.
