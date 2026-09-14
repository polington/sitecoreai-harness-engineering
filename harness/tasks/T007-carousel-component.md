# Task T007 — Carousel Component

Status: Complete  
Backlog Item: B006  
Created: 2026-08-20

---

## Summary

Provide a reusable, accessible carousel for presenting an ordered sequence of
content panels. A panel may contain an image, teaser, or another allowed content
block. The component supports the home-page hero treatment and the smaller
image-focused treatment used elsewhere in the site.

This is a platform-agnostic implementation contract. The implementation must
preserve the observable behavior described here without requiring the target
platform to use a particular component model, markup, or client-side framework.

The Carousel is placed in the
`headless-main` placeholder.

Place the Carousel component in the home page at the bottom of the page just before footer.

---

## Related Artifacts

Feature Specification: `harness/artifacts/specs/T007-feature-spec.md`  
Design Note: `harness/artifacts/design/T007-design-note.md`  
Implementation Plan: `harness/artifacts/plans/T007-implementation-plan.md`  
QA Review: `harness/artifacts/qa/T007-qa-review.md`  
CMS Configuration Guide: `harness/artifacts/cms-config/T007-cms-config.md`  
Content Editor Report: `harness/artifacts/cms-config/T007-content-editor.md`  
Run Report: `harness/runs/T007-run-report.md`

---

## Scope

The implementation includes:

- ordered panel management;
- active-panel selection;
- previous and next navigation;
- position indicators;
- optional automatic transitions;
- pause and resume controls when automatic transitions are active;
- authoring operations for adding, removing, editing, naming, and reordering panels;
- responsive presentation variants; and
- accessible keyboard and screen-reader behavior.

It does not include a new carousel content type, a new image service, or
platform-specific deployment and packaging behavior.

## Content model

| Field | Cardinality | Semantics |
| --- | --- | --- |
| panels | 0..n | Ordered panel content. Each panel has a stable identity, optional title, and renderable content. |
| active panel | 0..1 | Panel shown initially. If omitted or invalid, the first available panel is active. |
| autoplay | 0..1 | Whether panels transition automatically. Defaults to disabled. |
| transition delay | 0..1 | Non-negative duration between automatic transitions. Default is 5 seconds when autoplay is enabled. |
| pause-on-hover | 0..1 | Whether pointer hover pauses automatic transitions. Defaults to enabled. |
| accessibility labels | 0..n | Optional labels for the carousel, previous/next controls, play/pause controls, and indicator list. |
| presentation variant | 0..1 | `default`, `hero`, or `mini`. Defaults to `default`. |

Panel titles are used as indicator text when available. The implementation must
not require every panel to have a title; it must generate an unambiguous
position label when a title is absent.

## Behavior

1. Panels are displayed in author-defined order, with only the active panel
   visible in the normal published presentation.
2. Previous and next controls move one position at a time and wrap from the
   first panel to the last and from the last panel to the first.
3. Selecting an indicator makes its panel active and updates the active state
   of the controls and indicators.
4. If autoplay is enabled, the carousel advances after the configured delay.
5. Automatic transitions pause on pointer hover unless pause-on-hover has been
   disabled.
6. Users can explicitly pause and resume automatic transitions. A user pause
   must not be undone by a later hover or focus event.
7. Automatic transitions pause when the document is hidden and resume only
   according to the component's normal pause state when the document becomes
   visible again.
8. An active panel can be addressed through a stable fragment/deep-link
   identifier when the target delivery platform supports URL fragments.
9. A carousel with no panels exposes an authoring empty state and does not
   present misleading navigation in the published view.

## Interactive states

### Panel and navigation states

- `inactive`: the panel is not visible in the stage and is not announced as the
  current panel.
- `active`: the panel is visible, announced as the current panel, and its
  corresponding indicator is selected.
- `transitioning`: the outgoing and incoming panels may cross-fade, but only
  one panel is interactively current and the transition must not block input.
- `indicator default`: the indicator is available but not selected.
- `indicator active`: the indicator has a distinct visual state and exposes
  that it controls the current panel.
- `indicator focus-visible`: keyboard focus is visibly distinguishable from
  the selected state.
- `control default`, `control hover`, `control focus-visible`, and
  `control pressed`: previous, next, play, and pause controls provide visible
  feedback without changing their position or obscuring the stage.

For an empty or single-panel carousel, navigation controls and indicators are
hidden or clearly inactive because there is no meaningful destination to move
to.

### Playback states

- `idle`: autoplay is disabled and the carousel remains on the selected panel.
- `playing`: autoplay is enabled and the configured delay advances panels.
- `paused-hover`: pointer hover pauses automatic advancement when pause-on-
  hover is enabled.
- `paused-user`: an explicit pause action stops advancement until the user
  resumes it; leaving the carousel must not silently resume it.
- `paused-hidden`: the document is hidden, so automatic advancement is
  suspended without losing the current panel.

Selecting an indicator must not unexpectedly restart a user-paused carousel.

## Authoring semantics

- Authors can add, remove, edit, name, and reorder panels.
- The allowed panel content types are controlled by the delivery environment's
  content policy.
- Authors can select the initial active panel and configure autoplay behavior.
- Authors can choose the presentation variant without changing panel content.
- Authoring controls must remain usable while the carousel is in an editing or
  preview state; automatic transitions must not make panel editing unreliable.

## Accessibility expectations

- The carousel has an accessible name or an equivalent contextual label.
- Each panel exposes its position and active/inactive state to assistive
  technology.
- Previous, next, play, pause, and indicator controls have accessible names.
- Indicator selection and panel activation are keyboard operable.
- Focus is not trapped inside the carousel, and automatic transitions do not
  unexpectedly move keyboard focus.
- Automatic motion can be paused by the user and must not continue while the
  document is hidden.
- Panel content remains available to keyboard and screen-reader users when it
  becomes active.

## Visual constraints

### Component anatomy

The carousel is a single visual stage containing one active panel at a time.
The stage is followed or overlaid by navigation controls and a row of position
indicators. The active panel is visually distinct; inactive panels are removed
from the visible stage rather than displayed as a horizontal strip. Panels may
contain a full-bleed image, an image with an overlaid teaser, or another
allowed content block.

Previous and next controls are compact icon-led controls placed at the edge of
the stage/control row. Their text labels may be visually hidden in the compact
presentation, but the controls must remain discoverable and accessible. The
indicators are small circular markers centered beneath the stage; the active
marker uses a darker treatment than inactive markers.

### WKND variants

- `default`: a relative-positioned content stage with fade-in/fade-out panel
  transitions, centered indicators below the stage, and previous/next controls
  aligned to the control row.
- `hero`: an edge-to-edge presentation with no horizontal inset and extra
  spacing below the carousel. On narrow screens, the indicators move to a
  left-aligned position with the page gutter so they remain usable below the
  large visual stage.
- `mini`: an edge-to-edge image presentation. The image stage is approximately
  400px high, fills the available width, uses cover cropping, and keeps the
  image focal point centered.

The live WKND home page demonstrates the carousel as a sequence of image-led
adventure/editorial panels with a title, description, destination action, and
visible `Previous`, `Next`, and numbered indicators.

### Responsive and motion behavior

- The stage width follows its containing layout; hero and mini variants remove
  side padding rather than shrinking the image into a narrow inset.
- Image crops must preserve the subject and avoid distortion as the viewport
  changes.
- Panel changes use a short fade or equivalent low-distraction transition;
  the transition must not delay keyboard activation or obscure the new panel.
- Indicators and controls remain visible and usable at narrow widths.

The implementation may use different layout primitives, but it must preserve
the hierarchy, responsive intent, active-state distinction, and control
discoverability of these variants.

## Dependencies

- A panel/content composition capability;
- stable panel identity for active state, accessibility relationships, and
  optional deep linking;
- an image/content rendering capability for panel contents;
- a link or navigation capability for nested teaser content; and
- a client-side interaction capability for transitions and state changes.

## Acceptance criteria

- A content author can create at least three panels, reorder them, select the
  initial panel, and render the configured order.
- Previous, next, and indicator controls activate the expected panel and keep
  active state synchronized.
- Autoplay is disabled by default, can be enabled, uses the configured delay,
  pauses on hover by default, and provides explicit pause/resume behavior.
- Autoplay pauses when the document is hidden.
- A panel without a title still receives a meaningful position label.
- The carousel is operable with keyboard input and exposes names and states for
  all interactive controls.
- The default, hero, and mini variants render responsively and preserve the
  required active-panel and control behavior, including the hero full-width
  treatment and mini centered image crop.
- The visual stage shows one active panel, centered state indicators, and
  discoverable navigation controls with a clear active/inactive distinction.
- Panel transitions are visually restrained and do not interfere with
  interaction or accessibility.
- Automated tests cover inactive, active, transitioning, focus-visible,
  playing, hover-paused, user-paused, and document-hidden states.
- Empty and single-panel states do not expose misleading navigation.
- Authoring add/remove/edit/reorder operations do not corrupt the active panel
  or panel order.
- Automated tests cover state transitions, autoplay/pause behavior, keyboard
  interaction, empty/single-panel behavior, and the three presentation variants.

## Live reference

- Live page: <https://wknd.site/us/en.html>
- Screenshot captured from the live page:
  ![WKND homepage carousel hero](assets/wknd-home-carousel.png)
- Mobile screenshot captured at a 390px viewport:
  ![WKND homepage carousel hero on mobile](assets/wknd-home-carousel-mobile.png)

The screenshot is a visual reference for composition, image treatment, teaser
placement, indicators, and navigation controls. The written behavior,
accessibility, and acceptance criteria above are normative.

## Platform boundary

The handoff defines feature intent, content behavior, authoring semantics,
accessibility, and acceptance criteria. It does not prescribe repository paths,
component inheritance mechanisms, HTML attributes, JavaScript hooks, CSS
selectors, package structure, or deployment commands.

## Task Notes

- The Carousel Component is the component to be placed directly in the `headless-main`
  placeholder by content authors (previous tasks delivered chrome components in header/footer
  placeholders via Partial Designs). This makes it a useful reference for future
  author-placed renderings in the main content area.
  

---

## Approval

Reviewer:  
Decision: Approved  
Notes:
