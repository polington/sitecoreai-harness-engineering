# Task T004 — Teaser Component

Status: Complete  
Backlog Item: B006  
Created: 2026-08-12

---

## Summary

Provide a reusable content teaser that combines optional imagery, editorial
text, navigation, and calls to action. The teaser is used across the site for
featured articles, recent articles, adventures, cards, list items, and hero or
carousel content.

This is a platform-agnostic implementation contract. The implementation must
preserve the content and interaction behavior without requiring the target
platform to use a particular component model or markup.

The teaser is placed in the
`headless-main` placeholder.

---

## Related Artifacts

Feature Specification: `harness/artifacts/specs/T006-feature-spec.md`  
Design Note: `harness/artifacts/design/T006-design-note.md`  
Implementation Plan: `harness/artifacts/plans/T006-implementation-plan.md`  
QA Review: `harness/artifacts/qa/T006-qa-review.md`  
CMS Configuration Guide: `harness/artifacts/cms-config/T006-cms-config.md`  
Run Report: `harness/runs/T006-run-report.md`

---

## Scope

Implement the **Teaser Component** rendering with:

- optional image content;
- optional pretitle, title, and rich-text description;
- optional primary destination link;
- zero or more call-to-action links;
- optional sourcing of title, description, and image from a linked content item;
- responsive presentation variants;
- accessible image, heading, and link behavior; and
- authoring controls for composing the teaser content.

It does not include page discovery, content search, authentication, destination
page rendering, or a new image or rich-text editing service.

## Content model

| Field | Cardinality | Semantics |
| --- | --- | --- |
| image | 0..1 | Editorial image with alternative text, decorative state, and optional destination behavior. |
| pretitle | 0..1 | Short contextual label displayed before the title. |
| title | 0..1 | Primary teaser heading. It may be authored directly or sourced from the linked content item. |
| description | 0..1 | Rich-text supporting copy. It may be authored directly or sourced from the linked content item. |
| primary link | 0..1 | Destination for the teaser when the teaser is configured as a linked unit. |
| actions | 0..n | Labeled calls to action, each with a destination and visible label. |
| title heading level | 0..1 | Heading level selected within the delivery environment's allowed hierarchy. |
| image sourcing | 0..1 | Whether the image is authored directly or inherited from the linked/current content item. |
| presentation variant | 0..1 | `default`, `featured`, `hero`, `card`, `list`, `slide`, or `secure`. |

The teaser may render with any useful subset of image, pretitle, title,
description, and actions. It must not render an empty shell as meaningful
content.

## Behavior

1. Directly authored content takes precedence unless the author explicitly
   enables sourcing from the linked content item.
2. When title sourcing is enabled, the title is resolved from the linked
   content item. When description sourcing is enabled, the description is
   resolved from the linked content item.
3. When image sourcing is enabled, the image is resolved from the linked
   content item, or from the current content item when no link is configured.
4. A primary link makes the teaser navigable as a unit when there are no
   separate actions that would create ambiguous nested navigation.
5. Each action remains independently selectable and has its own visible label
   and destination.
6. Missing optional fields are omitted without leaving broken labels, empty
   links, or excessive layout gaps.
7. A teaser with no image, text, or action content renders an authoring empty
   state or no published output, according to the delivery environment's
   standard empty-component behavior.
8. A secure presentation may visually indicate restricted content, but access
   control is owned by the destination/content system and is not implemented by
   the teaser itself.

## Interactive states

### Link and action states

- `static`: a teaser with no destination presents editorial content without
  implying that the entire block is clickable.
- `linked default`: a teaser with a primary destination makes the linked region
  visually discoverable and exposes a meaningful accessible name.
- `hover`: linked content and actions provide a visual affordance. Card image
  zoom or action-color changes are allowed, but hover must not be the only way
  to discover the destination.
- `focus-visible`: the primary link and every action have a clear keyboard
  focus treatment. Focus must not disappear when the teaser uses an image-led
  or overlay layout.
- `pressed/active`: activating a link or action gives normal browser/platform
  feedback without changing the teaser's geometry or causing a second action
  to activate accidentally.
- `multiple-actions`: each action has an independent focus and activation state;
  the primary link must not wrap or intercept action activation.

### Content and access states

- `content-present`: available fields render in the defined order and the
  selected variant's layout remains coherent.
- `content-partial`: missing optional fields are omitted, with no empty heading,
  broken link, or reserved visual gap.
- `secure/restricted`: the teaser is visually muted, shows a restriction cue,
  and communicates the restricted state in text or accessible metadata. The
  destination system, not the teaser, decides whether activation is allowed.
- `secure/available`: when access is available, the teaser must not remain
  visually disabled solely because it uses the secure variant.

### Responsive interaction states

- On narrow screens, the entire linked region and each action retain usable
  touch targets and visible focus/pressed feedback.
- Overlay layouts move content into normal document flow when needed; no text
  or action may be hidden behind the image or viewport edge.

## Authoring semantics

- Authors can select or upload an image and provide alternative text or mark it
  decorative where appropriate.
- Authors can enter a pretitle, title, rich-text description, primary link, and
  multiple action links.
- Authors can choose whether title, description, and image are sourced from a
  linked content item.
- Authors can choose an allowed heading level and presentation variant.
- Authors can configure whether image and title navigation are active when a
  primary link is present.
- The authoring experience must show the relationship between a teaser's
  content, destination, actions, and selected presentation variant.

## Accessibility expectations

- The title uses a semantically appropriate heading level and remains a useful
  accessible name where it is the primary teaser label.
- Every non-decorative image has meaningful alternative text. Decorative images
  are excluded from the accessibility tree.
- Link and action labels describe their destinations or purpose without relying
  on surrounding visual styling alone.
- The component does not create ambiguous nested interactive elements. A
  linked teaser and its actions must have a predictable focus and activation
  model.
- Rich-text descriptions preserve readable structure and do not rely on color
  or hover-only presentation.
- The secure presentation communicates its state non-visually as well as
  visually when it is used.

## Visual constraints

### Shared anatomy

A teaser has an optional image area and a content area containing, in order,
the pretitle, title, description, and action area. The title is editorial and
prominent; the description supports it with readable body copy; actions are
visually identifiable as destinations rather than plain text. The base WKND
styling uses a serif title, bold pretitle, generous description line spacing,
and an uppercase, filled call-to-action treatment.

The image must preserve its subject through responsive cropping. If the teaser
is linked as a unit, the visual design should make the clickable region clear;
separate actions must remain visually and interactively distinct.

### Component variants

- `default`: image and editorial content are presented as a straightforward
  teaser with title, description, and optional action.
- `featured`: a prominent split composition with a large image region and a
  contrasting light-gray content pane. The image and content occupy unequal
  widths, with the content pane narrower than the image. On small screens the
  split collapses into a vertical stack.
- `hero`: a large image stage. On desktop, content sits in a white panel that
  overlaps the lower portion of the image; on small screens, image and content
  stack with the image above the copy. The image stage is substantially taller
  on desktop than mobile.
- `card`: a compact, image-forward block with a fixed square-like height and
  clipped image area. Title and description are suppressed in favor of a
  bottom-aligned action. The pretitle appears as a contrasting badge at the
  top-right. Hover may slightly zoom the image and change the action treatment,
  but the destination cannot depend on hover.
- `list`: a compact editorial item with a constrained image height, a sans-serif
  bold uppercase title, and smaller gray uppercase supporting text.
- `slide`: a tall image-backed composition for use inside a carousel. Content
  is positioned over the image toward the lower-left on larger screens and
  becomes centered/stacked on small screens. The title is large and serif;
  supporting copy is constrained to a readable column.
- `secure`: a muted version for restricted content. The teaser is visually
  de-emphasized, includes a restriction cue near the upper-left, and uses a
  subdued action treatment. The cue must be supplemented by text or accessible
  state and must not imply that the teaser itself enforces authorization.

The component also supports image-position variants equivalent to `imagetop`
and `imagebottom`, which change the image focal point without changing content
order or link behavior.

### Responsive and interaction behavior

- Image and content widths adapt without stretching or distorting the image.
- Featured layouts stack cleanly on small screens; hero and slide layouts
  reduce image height and move overlay content into a readable flow.
- Card, list, and secure treatments remain legible when the available column is
  narrow.
- Hover styling is supplementary. Focus, touch, and keyboard activation must
  expose the same destination and state changes.

The implementation may use different layout primitives, but must preserve the
variant's editorial hierarchy, responsive intent, image cropping/focal intent,
and action discoverability.

## Dependencies

- An image/content asset capability supporting alternative text and responsive
  delivery;
- a link/navigation capability;
- rich-text rendering and sanitization;
- optional linked-content metadata for title, description, and featured image
  sourcing;
- heading-level policy from the delivery environment; and
- an authorization/content-state signal when the secure presentation is used.

## Acceptance criteria

- The Teaser Component rendering is registered as an available rendering for the `headless-main`
  placeholder.
- A content author can create a teaser with an image, title, description, and
  destination link and render it as a coherent navigable unit.
- A teaser can render with only a subset of optional fields without broken
  markup, empty labels, or misleading spacing.
- Direct, linked-content, and image-sourced values resolve according to the
  configured sourcing rules.
- Multiple actions render with distinct labels and destinations without
  ambiguous nested navigation.
- Non-decorative images expose meaningful alternative text, and decorative
  images are ignored by assistive technology.
- Heading levels remain semantically valid and configurable within the allowed
  design-system range.
- The default, featured, hero, card, list, slide, and secure variants render
  responsively and preserve their intended content hierarchy, including the
  split featured layout, hero overlap/stack behavior, image-forward card,
  compact list, tall slide, and muted secure treatment.
- Image focal positioning equivalent to top and bottom is supported where the
  selected presentation requires it.
- Each variant preserves the shared anatomy of image, editorial content, and
  action area while applying its defined geometry, spacing, typography, and
  image-cropping intent.
- No required destination or state is available only through hover styling.
- Automated tests cover static, linked, hover, focus-visible, pressed/active,
  multiple-action, partial-content, secure/restricted, secure/available, and
  narrow-screen interaction states.
- A secure teaser communicates restricted state without relying only on an
  icon, while leaving authorization to the destination/content system.
- Empty teaser content produces the delivery environment's standard empty
  state rather than a misleading blank component.
- Automated tests cover optional-field combinations, linked-content sourcing,
  multiple actions, image accessibility, navigation semantics, responsive
  variants, and secure-state communication.

## Live reference

- Live page: <https://wknd.site/us/en.html>
- Screenshot captured from the live page:
  ![WKND featured article teaser](assets/wknd-home-featured-teaser.png)
- Mobile screenshot captured at a 390px viewport:
  ![WKND featured article teaser on mobile](assets/wknd-home-featured-teaser-mobile.png)

The screenshot is a visual reference for the featured teaser's split image and
content layout, typography, spacing, description width, and call-to-action
treatment. The written behavior, accessibility, and acceptance criteria above
are normative.

## Platform boundary

The handoff defines content intent, sourcing rules, link behavior,
accessibility, visual constraints, and acceptance criteria. It does not
prescribe repository paths, component inheritance mechanisms, HTML attributes,
JavaScript hooks, CSS selectors, package structure, or deployment commands.

## Task Notes

- The Teaser Component is the component to be placed directly in the `headless-main`
  placeholder by content authors (previous tasks delivered chrome components in header/footer
  placeholders via Partial Designs). This makes it a useful reference for future
  author-placed renderings in the main content area.
  

---

## Approval

Reviewer:  
Decision: Approved  
Notes:
