# Task T001 — Site Header with Navigation

Status: Ready  
Backlog Item: B002  
Created: 2026-04-20

---

## Summary

Implement a site header component that renders a site logo and authored navigation links from a dedicated Sitecore data source. The header should appear in the `headless-header` placeholder, support two-level navigation with dropdowns, highlight the active page, and provide responsive mobile behaviour via a hamburger menu with a slide-out panel.

---

## Related Artifacts

Feature Specification: `harness/artifacts/specs/T001-feature-spec.md`  
Design Note: `harness/artifacts/design/T001-design-note.md`  
Implementation Plan: `harness/artifacts/plans/T001-implementation-plan.md`  
QA Review: `harness/artifacts/qa/T001-qa-review.md`  
Run Report: `harness/runs/RUN-2026-04-20-T001.md`

---

## Acceptance Criteria

- The header renders in the `headless-header` placeholder from Sitecore layout data.
- A site logo is displayed from an authored Image field on the header data source item.
- Primary navigation links are rendered from authored link fields on the data source.
- Two-level navigation is supported: top-level items may contain child links displayed as a dropdown.
- The currently active page is visually indicated in the navigation.
- On mobile viewports, navigation collapses behind a hamburger icon.
- Tapping the hamburger icon reveals a slide-out or dropdown panel containing all navigation items.
- The header is accessible: keyboard-navigable, uses semantic landmarks, and provides appropriate ARIA attributes for dropdowns.
- The component is registered in the appropriate component map via the `sitecore-tools` generation flow.
- Lint and build validation pass with the component in place.

---

## Task Notes

- Navigation data comes from a dedicated data source item with authored links (not derived from the content tree).
- Logo is an authored Image field on the same header data source.
- CMS items (rendering definition, data source template, placeholder setting update) are prerequisites to be created manually in XM Cloud and serialized before E2E validation.
- The component should work with mock/fallback data during local development if CMS items are not yet available.

---

## Approval

Reviewer:  
Decision: Pending  
Notes:
