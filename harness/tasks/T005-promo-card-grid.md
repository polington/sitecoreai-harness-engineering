# Task T005 — Promo Card Grid

Status: Complete  
Backlog Item: B006  
Created: 2026-05-20  
Completed: 2026-05-20

---

## Summary

Create a promo card component and a card grid container component. The grid container
holds a multi-value field (Multilist or Treelist) that references promo card data source
items. Each promo card displays an image, title, description, and link. The grid is
placed in the `headless-main` placeholder and is responsive across all supported
breakpoints.

---

## Related Artifacts

Feature Specification: `harness/artifacts/specs/T005-feature-spec.md`  
Design Note: `harness/artifacts/design/T005-design-note.md`  
Implementation Plan: `harness/artifacts/plans/T005-implementation-plan.md`  
QA Review: `harness/artifacts/qa/T005-qa-review.md`  
CMS Configuration Guide: `harness/artifacts/cms-config/T005-cms-config.md`  
Run Report: `harness/runs/T005-run-report.md`

---

## Scope

### In Scope

- Implement the **Promo Card Grid** container rendering with:
  - A multi-value field (Multilist or Treelist) referencing one or more Promo Card data
    source items.
  - Responsive grid layout: 1 column on mobile, 2 columns on tablet, 3 columns on
    desktop (aligned to design system breakpoints).
  - Equal-height card layout within each row.
  - Appropriate spacing/gap tokens from the design system between cards.
- Implement the **Promo Card** presentational component with:
  - Authored image (Sitecore Image field) rendered with Next.js Image optimisation,
    displayed at the top of the card with a consistent aspect ratio.
  - Authored title (Sitecore Single-Line Text field) rendered as a heading element.
  - Authored description (Sitecore Multi-Line Text field) rendered as body text below
    the title.
  - Authored link (Sitecore General Link field) rendered as a clickable call-to-action.
    When the link field is empty, no CTA is rendered.
- Register the Promo Card Grid rendering in Sitecore as an available rendering for the
  `headless-main` placeholder.
- Create a data source template for the **Promo Card Grid** with the multi-value field
  referencing Promo Card items.
- Create a data source template for the **Promo Card** with fields for image, title,
  description, and link.
- Provide unit/component tests covering:
  - Grid rendering with multiple cards.
  - Grid rendering with a single card.
  - Grid rendering with no cards (empty state).
  - Individual card rendering with all fields populated.
  - Individual card rendering without the optional link.
  - Responsive column count behaviour.
- Provide a CMS Configuration Guide covering all Sitecore items, templates, rendering
  definitions, placeholder settings, available renderings entries, data source template
  creation, multi-value field configuration, and serialization steps.

### Out of Scope

- Nested placeholder approach for card composition (cards are referenced via a multi-value
  field, not inserted as child renderings).
- Carousel or slider behaviour for cards.
- Configurable column counts per instance (fixed responsive grid: 1/2/3 columns).
- Card animations or hover transition effects beyond basic hover states.
- Content personalisation or A/B testing on individual cards.
- Card variants or alternate card layouts (single card design only).
- Filtering or sorting of cards by category or tag.
- Pagination or "load more" for large numbers of cards.

---

## Acceptance Criteria

Acceptance criteria will be finalised in the Feature Specification. The task must,
at minimum, deliver the following:

- The Promo Card Grid rendering is registered as an available rendering for the
  `headless-main` placeholder.
- A data source template exists for the Promo Card Grid with a multi-value field
  (Multilist/Treelist) that references Promo Card items.
- A data source template exists for the Promo Card with fields for image, title,
  description, and link.
- The grid renders referenced Promo Card items in a responsive layout: 1 column on
  mobile, 2 columns on tablet, 3 columns on desktop.
- Each promo card displays an image (with appropriate alt text), a title, a description,
  and an optional CTA link.
- When no cards are referenced, the grid renders gracefully without errors (empty state).
- When a card's link field is empty, no CTA element is rendered for that card.
- Cards within a row maintain equal height.
- The component is keyboard-accessible and announces correctly to assistive technologies
  (semantic markup, meaningful image alt text, visible focus states on links, appropriate
  ARIA attributes where required).
- Component tests cover grid with multiple cards, single card, empty state, card with
  all fields, card without link, and all tests pass.
- Lint and typecheck pass for all changed code.
- A CMS Configuration Guide is produced that fully describes how to recreate the Promo
  Card Grid rendering definition, Promo Card data source template, multi-value field
  configuration, placeholder settings, available renderings entry, and serialization in
  a clean Sitecore environment.

---

## Dependencies

- The base SXA site already exists in the repository's Sitecore content tree.
- The "Default" Page Design and `headless-main` placeholder must exist in the Sitecore
  content tree (established by T001).
- Project design system tokens (typography, colour, spacing, breakpoints) are available
  for use by the promo card grid.

---

## Risks

- Multi-value field performance: if a large number of cards are referenced, data fetching
  and rendering performance should be validated; consider whether a practical maximum
  should be enforced or documented.
- Image aspect ratio consistency: if authors upload images with inconsistent aspect ratios,
  cards may appear misaligned. The implementation should enforce a fixed aspect ratio
  container for the card image.
- The Multilist/Treelist field requires a clearly defined source path for card items;
  this should be documented in the CMS Configuration Guide to avoid author confusion.
- Equal-height card layout may be affected by varying description lengths; CSS approach
  (e.g. flexbox or grid) must accommodate varying content without overflow issues.

---
