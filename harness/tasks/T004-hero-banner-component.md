# Task T004 — Hero Banner Component

Status: Done  
Backlog Item: B004  
Created: 2026-05-11

---

## Summary

Create a hero banner rendering component that displays an authored heading, subheading,
background image, and an optional call-to-action link. The banner is placed in the
`headless-main` placeholder and renders full-width with a fixed height, centre-aligned
text overlay, and an author-configurable semi-transparent scrim over the background image
to ensure text readability.

---

## Related Artifacts

Feature Specification: `harness/artifacts/specs/T004-feature-spec.md`  
Design Note: `harness/artifacts/design/T004-design-note.md`  
Implementation Plan: `harness/artifacts/plans/T004-implementation-plan.md`  
QA Review: `harness/artifacts/qa/T004-qa-review.md`  
CMS Configuration Guide: `harness/artifacts/cms-config/T004-cms-config.md`  
Run Report: `harness/runs/T004-run-report.md`

---

## Scope

### In Scope

- Implement the **Hero Banner** rendering with:
  - Authored heading text (Sitecore Single-Line Text field), rendered as an `<h1>` or
    configurable heading level.
  - Authored subheading text (Sitecore Single-Line Text field), rendered below the heading.
  - Authored background image (Sitecore Image field) rendered as a full-width, fixed-height
    background using Next.js Image optimisation where feasible.
  - A single optional call-to-action link (Sitecore General Link field) rendered as a
    styled button. When the link field is empty, the CTA is not rendered.
  - A semi-transparent dark overlay/scrim applied over the background image to ensure
    text contrast. The overlay opacity should be author-configurable via a Sitecore field
    (e.g. a Droplink or Number field with a sensible default value).
  - Centre-aligned text overlay (heading, subheading, and CTA) positioned over the
    background image.
  - Fixed height banner (e.g. `60vh` or a design-system-aligned token value) that remains
    consistent across viewport sizes.
  - Full-width layout that breaks out of any parent content container to span the full
    viewport width.
  - Responsive behaviour: text sizes should scale down for mobile viewports while
    maintaining readability and the centre-aligned layout.
  - Accessibility: appropriate semantic markup, meaningful `alt` text on the background
    image, sufficient colour contrast between overlay text and the scrim, keyboard-focusable
    CTA link, visible focus states, and appropriate ARIA attributes where required.
  - Alignment with the project design system (typography, spacing, colour tokens,
    breakpoints).
- Register the Hero Banner rendering in Sitecore as an available rendering for the
  `headless-main` placeholder.
- Create a data source template for the Hero Banner with fields for heading, subheading,
  background image, CTA link, and overlay opacity.
- Provide unit/component tests covering:
  - Rendering with all fields populated.
  - Rendering without the optional CTA link.
  - Overlay scrim presence.
  - Responsive/mobile behaviour.
- Provide a CMS Configuration Guide covering all Sitecore items, templates, rendering
  definitions, placeholder settings, available renderings entries, data source template
  creation, and serialization steps.

### Out of Scope

- Video or animated backgrounds.
- Multiple CTA buttons (only a single optional CTA is supported).
- Configurable text alignment (text is always centre-aligned).
- Carousel or slideshow behaviour (single static hero only).
- Parallax scrolling effects on the background image.
- Content personalisation or A/B testing rules on the hero banner.
- Animation or transition effects on text/CTA appearance.
- Additional hero banner variants or layout options beyond the single full-width design.

---

## Acceptance Criteria

Acceptance criteria will be finalised in the Feature Specification. The task must,
at minimum, deliver the following:

- The Hero Banner rendering is registered as an available rendering for the `headless-main`
  placeholder.
- A data source template exists with fields for heading, subheading, background image, CTA
  link, and overlay opacity.
- The Hero Banner displays an authored heading and subheading, centre-aligned over a
  full-width background image.
- The background image is rendered at a fixed height (approximately `60vh`) and scales
  responsively without distortion.
- A semi-transparent dark overlay/scrim is applied over the background image, with
  author-configurable opacity.
- When a CTA link is authored, a styled button/link is rendered below the subheading.
- When no CTA link is authored, no button or empty link element is rendered.
- The hero banner spans the full viewport width regardless of parent container constraints.
- Text overlay remains readable against the background image at all supported viewport sizes.
- The hero banner is keyboard-accessible and announces correctly to assistive technologies
  (semantic markup, visible focus states on the CTA, meaningful image alt text, ARIA
  attributes where required).
- Component tests cover hero rendering with all fields, rendering without the CTA, overlay
  presence, and all tests pass.
- Lint and typecheck pass for all changed code.
- A CMS Configuration Guide is produced that fully describes how to recreate the Hero Banner
  rendering definition, data source template, placeholder settings, available renderings
  entry, and serialization in a clean Sitecore environment.

---

## Dependencies

- The base SXA site already exists in the repository's Sitecore content tree.
- The "Default" Page Design and `headless-main` placeholder must exist in the Sitecore
  content tree (established by T001).
- Project design system tokens (typography, colour, spacing, breakpoints) are available for
  use by the hero banner.

---

## Risks

- Full-width breakout styling may conflict with parent container constraints depending on
  the page layout structure; this should be confirmed during the Design and Implementation
  Planning stages.
- Next.js Image component constraints (fixed dimensions, layout modes) may complicate the
  full-width background image approach; a CSS background-image fallback strategy should be
  considered during Implementation Planning.
- Author-configurable overlay opacity introduces a risk of content editors setting very low
  opacity values that result in poor text contrast; the implementation should enforce a
  sensible minimum or provide guidance in the CMS Configuration Guide.
- The background image `alt` text strategy needs careful consideration — decorative hero
  images may warrant an empty `alt` attribute, while meaningful images should carry
  descriptive text. This should be addressed in the Design stage.

---

## Task Notes

- The hero banner is the first component to be placed directly in the `headless-main`
  placeholder by content authors (previous tasks delivered chrome components in header/footer
  placeholders via Partial Designs). This makes it a useful reference for future
  author-placed renderings in the main content area.
- The overlay opacity field should default to a sensible value (e.g. 40–50% opacity) so
  the hero is usable immediately after authoring without requiring the editor to configure
  the overlay.

---

## Approval

Reviewer:  
Decision: Approved  
Notes:
