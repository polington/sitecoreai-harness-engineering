# Task T008 — Accordion Component

Status: Active  
Backlog Item: B006  
Created: 2026-08-21

---

## Summary

Provide a reusable, accessible disclosure component for presenting titled
content panels. It is suitable for FAQ-style content such as the FAQs
page and supports nested content within each panel.

This is a platform-agnostic implementation contract. It describes the feature
that must be realized, not a target-platform component type or rendering
strategy.


The Accordion is placed in the
`headless-main` placeholder.

Place the Accordion component in the home page at the bottom of the page just before footer.

---

## Related Artifacts

Feature Specification: `harness/artifacts/specs/T008-feature-spec.md`  
Design Note: `harness/artifacts/design/T008-design-note.md`  
Implementation Plan: `harness/artifacts/plans/T008-implementation-plan.md`  
QA Review: `harness/artifacts/qa/T008-qa-review.md`  
CMS Configuration Guide: `harness/artifacts/cms-config/T008-cms-config.md`  
Content Editor Report: `harness/artifacts/content-editor/T008-content-editor.md`  
Run Report: `harness/runs/T008-run-report.md`

---

## Scope

The implementation includes:

- ordered titled panels;
- expandable and collapsible panel behavior;
- configurable initial expansion;
- optional single-panel expansion;
- nested rich content inside panels;
- configurable heading semantics;
- authoring operations for adding, removing, editing, naming, and reordering
  panels; and
- accessible keyboard and screen-reader behavior.

It does not include FAQ-specific content, search, analytics, or a new rich-text
editor.

## Content model

| Field | Cardinality | Semantics |
| --- | --- | --- |
| items | 0..n | Ordered accordion items. Each item has a stable identity, a required title, and renderable panel content. |
| expanded items | 0..n | Items expanded on initial render. Invalid identities are ignored. |
| single expansion | 0..1 | Whether opening one item closes all other items. Defaults to disabled. |
| heading level | 0..1 | Heading level used for item titles, constrained to the delivery environment's permitted hierarchy. |
| presentation variant | 0..1 | Defaults to the WKND base accordion presentation. |

An item title must remain meaningful when its panel is collapsed. Panel content
may contain text, images, links, lists, and other allowed content blocks.

## Behavior

1. Items are displayed in author-defined order.
2. Activating an item header toggles its panel between expanded and collapsed.
3. When single expansion is enabled, expanding an item collapses every other
   item. When disabled, multiple items may remain expanded simultaneously.
4. The configured expanded items are visible on initial render, subject to the
   single-expansion rule.
5. The expanded/collapsed state is synchronized between the header control and
   its panel.
6. An item can be addressed through a stable fragment/deep-link identifier
   when the target delivery platform supports URL fragments.
7. An accordion with no items exposes an authoring empty state and does not
   render empty controls in the published view.
8. Panel content remains intact when an item is collapsed and is restored when
   the item is expanded.

## Interactive states

Each item and its disclosure control must expose the following states:

- `collapsed`: the header is visible, the panel is hidden, and the state cue
  indicates that content can be opened.
- `expanded`: the header remains visible, the panel is rendered beneath it,
  and the state cue indicates that content can be closed.
- `hover`: pointer interaction provides feedback without changing row height or
  moving the state icon.
- `focus-visible`: keyboard focus has a clear outline or equivalent treatment
  that is not conveyed by color alone.
- `pressed/toggling`: activation gives immediate state feedback while the panel
  opens or closes.
- `deep-linked`: when an item is addressed by a supported fragment, that item
  opens on entry and is visually identifiable as the target item.

When single expansion is enabled, opening an item transitions the previously
expanded item to `collapsed`. When multiple expansion is enabled, opening an
item leaves other expanded items unchanged. The state of every header and panel
must remain synchronized during and after the transition.

## Authoring semantics

- Authors can add, remove, edit, name, and reorder items.
- Authors can place supported content blocks inside each item's panel.
- Authors can select one or more initially expanded items when multiple
  expansion is allowed.
- Authors can configure single expansion and the heading level within the
  permitted design system.
- The authoring experience must make the relationship between an item title
  and its panel content clear.

## Accessibility expectations

- Each item title is a heading at the configured level and contains a keyboard-
  operable disclosure control.
- The control exposes whether its panel is expanded and identifies the panel it
  controls.
- Each panel is associated with its controlling header and is unavailable to
  normal reading order while collapsed, unless the target platform's disclosure
  semantics provide an equivalent result.
- Keyboard users can move through all headers and toggle items without relying
  on pointer hover.
- Focus remains predictable after opening or closing an item.
- The visual expanded state uses more than color alone. The WKND plus/minus
  affordance is supplemental, not the only state indicator.
- Nested panel content remains accessible when expanded.

## Visual constraints

### Component anatomy

The accordion is a vertical stack of full-width disclosure rows. Each row has a
left-aligned title inside a generous clickable header, a state icon aligned to
the far right, and a content panel directly beneath it. The header and panel
share a clear visual relationship; opening a row expands content in place
instead of navigating away or creating a separate overlay.

### WKND base treatment

- Header controls are full width, borderless on the top and sides, with a thin
  lower divider separating rows.
- Header controls use approximately 1em of internal padding and left-aligned
  text.
- Item titles are bold, uppercase, and visually prominent, at roughly a
  heading-4 scale.
- A plus icon appears at the right of a collapsed row and changes to a minus
  icon for an expanded row. The icon is a secondary state cue; the expanded
  state must also be clear from layout and accessible state.
- Expanded panel content is indented slightly from the title, uses compact
  body typography, and has a small top offset from the header.
- Collapsed panels are removed from the visible layout; expanded panels fade in
  or use an equivalent short reveal transition.

The live WKND FAQ page demonstrates the content pattern: a page heading and
introductory content followed by question titles and readable answer blocks.

### Responsive behavior

- Rows remain full width within the containing column and do not require a
  minimum desktop width.
- Long titles wrap without hiding the state icon or reducing the tap target to
  text width.
- Panel content reflows naturally on narrow screens, retaining readable line
  length and spacing.
- Opening and closing a row may change page height, but the title, state icon,
  and first lines of the panel must not jump horizontally.

Exact colors, icon fonts, CSS selectors, and animation implementation are not
part of the handoff contract. The visual result must preserve clear hierarchy,
state distinction, readable panel content, and responsive behavior.

## Dependencies

- A content composition capability for nested panel content;
- stable item identity for state, accessibility relationships, and optional
  deep linking;
- heading-level configuration from the delivery environment; and
- an interaction capability for disclosure state changes.

## Acceptance criteria

- A content author can create at least three items, edit their titles and
  content, reorder them, and render the configured order.
- Each item opens and closes through its header control, and its state remains
  synchronized with the displayed panel.
- Multiple items can remain open when single expansion is disabled.
- Opening one item closes the previously open item when single expansion is
  enabled.
- Configured initially expanded items render open, with invalid item references
  ignored safely.
- Panel content can contain nested text and other allowed blocks without being
  lost when the panel is toggled.
- Header controls expose expanded state and the controlled panel to assistive
  technology and are fully keyboard operable.
- The configured heading level is respected within its permitted range.
- The visual treatment uses full-width rows, clear dividers, a right-aligned
  state cue, and an expanded panel that reads as content belonging to its
  header.
- Long titles and narrow layouts preserve usable controls, readable content,
  and the visible expanded/collapsed distinction.
- Automated tests cover collapsed, expanded, hover, focus-visible,
  pressed/toggling, deep-linked, single-expansion, and multiple-expansion
  states.
- Empty and single-item states render without misleading controls.
- Automated tests cover multi-expansion, single-expansion, initial state,
  keyboard interaction, nested content, empty state, and heading semantics.

## Live reference

- Live page: <https://wknd.site/us/en/faqs.html>
- Screenshot captured from the live page:
  ![WKND FAQ accordion rows](assets/wknd-faq-accordion.png)
- Mobile screenshot captured at a 390px viewport:
  ![WKND FAQ accordion rows on mobile](assets/wknd-faq-accordion-mobile.png)

The screenshot is a visual reference for row density, typography, dividers,
right-aligned state icons, and the full-width disclosure treatment. The written
behavior, accessibility, and acceptance criteria above are normative.

## Platform boundary

The handoff defines content structure, disclosure behavior, authoring intent,
accessibility, visual constraints, and acceptance criteria. It does not
prescribe repository paths, component inheritance mechanisms, HTML attributes,
JavaScript hooks, CSS selectors, package structure, or deployment commands.

## Task Notes

- The Accordion Component is the component to be placed directly in the `headless-main`
  placeholder by content authors (previous tasks delivered chrome components in header/footer
  placeholders via Partial Designs). This makes it a useful reference for future
  author-placed renderings in the main content area.
  
- The content for the Accordion Component can be referenced from the accordian component at the bottom of the page just above the footer in this page https://wknd.site/us/en/faqs.html#accordion-8d368fed37-item-90e54768ab 
---

## Approval

Reviewer:  
Decision:   
Notes:
