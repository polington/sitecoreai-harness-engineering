# Task T001 — Site Header, Header Partial Design, and Default Page Design

Status: Ready  
Backlog Item: B002  
Created: 2026-04-27

---

## Summary

Establish the foundational SXA presentation structure for the site and deliver the
first component that lives inside it.

This task delivers three things together:

1. A new SXA **Partial Design** named **"Header"** that defines the shared page
   chrome — it renders the site header at the top, exposes a main content
   placeholder for page-specific content, and exposes a footer placeholder
   reserved for the future B003 footer work.
2. A new SXA **Page Design** named **"Default"** that composes the **Header**
   Partial Design. The "Default" Page Design is configured as the site's default
   Page Design and is explicitly assigned to the site's home/root page so all
   existing and newly created pages pick it up automatically.
3. The **Site Header** rendering itself (the full B002 backlog scope) — site
   logo, primary navigation driven from Sitecore layout/route data, and
   responsive mobile behaviour with a hamburger menu — placed inside the
   Header Partial Design.

This task is the first piece of "site chrome" and is a prerequisite for later
backlog items (B003 footer, B004 hero, B005 rich text, etc.) that will be
authored into the Main placeholder of the Default Page Design.

---

## Related Artifacts

Feature Specification: `harness/artifacts/specs/T001-feature-spec.md`  
Design Note: `harness/artifacts/design/T001-design-note.md`  
Implementation Plan: `harness/artifacts/plans/T001-implementation-plan.md`  
QA Review: `harness/artifacts/qa/T001-qa-review.md`  
CMS Configuration Guide: `harness/artifacts/cms-config/T001-cms-config.md`  
Run Report: `harness/runs/T001-run-report.md`

---

## Scope

### In Scope

- Create an SXA Partial Design item named **"Header"** under the site's
  Presentation / Partial Designs folder.
- The Header Partial Design layout exposes, in document order:
  - the site header rendering at the top,
  - a `headless-main` placeholder for page content,
  - a `headless-footer` placeholder reserved for the future footer rendering
    (left empty for this task).
- Create an SXA Page Design item named **"Default"** under the site's
  Presentation / Page Designs folder.
- The Default Page Design references the Header Partial Design so every page
  using it inherits the header and the standard placeholder structure.
- Configure the Default Page Design as the site's default Page Design.
- Assign the Default Page Design to the site's home/root page so existing
  pages pick it up automatically.
- Implement the Site Header rendering with:
  - authored site logo (Sitecore Image field, with link to home),
  - primary navigation links sourced from Sitecore route/layout data,
  - responsive layout including a mobile hamburger menu,
  - accessibility: semantic `<header>` / `<nav>`, keyboard navigation, focus
    states, appropriate ARIA labels,
  - alignment with the project design system (typography, spacing, colour
    tokens, breakpoints).
- Provide unit/component tests covering header rendering, navigation link
  generation, and mobile menu open/close behaviour.
- Provide a CMS Configuration Guide covering all Sitecore items, templates,
  rendering definitions, placeholder settings, available renderings entries,
  Partial Design + Page Design creation, default Page Design assignment, and
  serialization steps.

### Out of Scope

- The footer rendering itself (delivered by B003); only the empty
  `headless-footer` placeholder is wired up.
- Additional Page Designs beyond "Default".
- Additional Partial Designs beyond "Header".
- Mega-menu / multi-level navigation beyond what the standard Sitecore route
  hierarchy provides for the primary nav.
- Search box, language switcher, or utility navigation in the header.
- Personalization or A/B testing rules on the header, Partial Design, or
  Page Design.

---

## Acceptance Criteria

Acceptance criteria will be finalised in the Feature Specification. The task
must, at minimum, deliver the following:

- A Partial Design item named "Header" exists in the site's Partial Designs
  folder and contains the header rendering plus `headless-main` and
  `headless-footer` placeholders.
- A Page Design item named "Default" exists in the site's Page Designs folder
  and references the Header Partial Design.
- The "Default" Page Design is set as the site's default Page Design.
- The "Default" Page Design is assigned to the site's home/root page and any
  existing pages that previously had no Page Design pick it up.
- The Site Header rendering displays an authored logo that links to the home
  page.
- The Site Header rendering displays primary navigation links sourced from
  Sitecore data (not hard-coded).
- The header collapses to a mobile layout with a hamburger menu below the
  defined breakpoint, and the menu opens/closes via mouse and keyboard.
- The header is keyboard-accessible and announces correctly to assistive
  technologies (semantic landmarks, focus order, visible focus, ARIA where
  required).
- Component tests cover header rendering, navigation link output, and mobile
  menu toggle behaviour, and all tests pass.
- Lint and typecheck pass for all changed code.
- A CMS Configuration Guide is produced that fully describes how to recreate
  the Header Partial Design, the Default Page Design, the default-Page-Design
  assignment, and the header rendering registration in a clean Sitecore
  environment.

---

## Dependencies

- The base SXA site already exists in the repository's Sitecore content tree.
- Project design system tokens (typography, colour, spacing, breakpoints) are
  available for use by the header.

---

## Risks

- Partial Design / Page Design creation is content-tree work; if the site's
  Presentation folder structure differs from SXA defaults the CMS guide will
  need to call out the actual paths used.
- Forcing the Default Page Design onto the home/root page may overwrite a
  pre-existing Page Design assignment; this needs to be explicitly handled
  during CMS Configuration.
- Primary navigation behaviour depends on the shape of the Sitecore route
  data exposed to the head application; this should be confirmed during the
  Design and Implementation Planning stages.

---

## Task Notes

- Task ID T001 is reused intentionally; no prior T001 task file or artifacts
  exist on disk despite stale references in `harness/run-state.md`. The
  orchestrator should reset run-state for this task at workflow start.
- The Header Partial Design intentionally owns the `headless-main` and
  `headless-footer` placeholders so that future backlog items (B003, B004,
  B005, …) can be added either by extending the Header Partial Design or by
  introducing additional Partial Designs composed into the Default Page
  Design, without having to rework page-level layout.
- Backlog item B002 is considered fully delivered by this task, including
  the SXA design infrastructure that the original B002 entry did not call
  out explicitly.

---

## Approval

Reviewer:  
Decision: Pending  
Notes:
