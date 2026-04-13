# Coding Standard

## Purpose

Define the coding conventions and architectural guidelines for the project.

The goal is to ensure the codebase remains:

- consistent
- maintainable
- readable
- accessible

---

## Technology Stack

This project uses:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Sitecore Content SDK for Next.js
- next-intl

---

## Architectural Principles

### Prefer Simplicity

Solutions should favor clarity over cleverness.

Avoid unnecessary abstraction layers.

---

### Separate Concerns

Different responsibilities should live in different parts of the project.

Examples:

- route and page composition → `src/app/`
- Sitecore page composition and placeholders → `src/Layout.tsx`, `src/Providers.tsx`
- Sitecore data access → `src/lib/sitecore-client.ts`
- UI and rendering components → `src/components/`
- request and locale handling → `src/i18n/`, `src/proxy.ts`
- application and Sitecore integration config → `sitecore.config.ts`, `next.config.ts`

---

### Preserve The Existing Delivery Pipeline

This repository is a Sitecore Content SDK rendering host.

When implementing features:

- preserve the existing `[site]/[locale]/[[...path]]` route shape unless the task explicitly changes routing
- use the shared Sitecore client instead of introducing alternate data-fetching clients
- keep page composition aligned with the existing placeholder and layout flow
- keep component registration aligned with the existing `sitecore-tools` generation flow instead of inventing a parallel mapping mechanism

---

### Prefer Server Components

Use server components by default.

Client components should only be used when:

- browser APIs are required
- interactive state is required

---

## TypeScript Rules

- All exported functions must be typed.
- Avoid the use of `any`.
- Prefer narrow types over broad ones.
- Reuse SDK types where available instead of recreating broad local equivalents.

---

## Component Design Rules

Components should:

- have a single responsibility
- be composable
- avoid excessive nesting
- distinguish clearly between Sitecore-rendered content concerns and application-only UI behavior

Reusable components should live in `src/components`.

When rendering Sitecore-authored content:

- prefer the SDK field/rendering primitives already used by the app
- guard optional field and route data explicitly
- avoid hard-coding authored content into components that are meant to render CMS data

---

## Styling Rules

Styling should primarily use Tailwind utilities.

Avoid:

- large custom CSS files
- deeply nested selectors
- inconsistent spacing systems

Prefer the existing global styling and semantic tokens already present in the app over introducing a separate ad hoc visual system in feature code.

---

## Accessibility Rules

All UI must maintain basic accessibility standards:

- semantic HTML should be used
- headings should follow a logical hierarchy
- form inputs must have labels
- interactive elements must be keyboard accessible

---

## Anti-Patterns

Avoid:

- mixing business logic into UI components
- untyped helper functions
- duplicating utility logic
- overly complex component trees
- introducing a second Sitecore client or parallel route-resolution path
- bypassing the existing placeholder-driven layout composition for convenience
- manually editing generated `.sitecore/` artifacts when the supported workflow is to regenerate them from source changes
