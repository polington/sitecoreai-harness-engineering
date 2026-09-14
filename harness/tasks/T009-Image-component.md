# Task T009 — Image Component

Status: Active  
Backlog Item: B006  
Created: 2026-08-21

---

## Summary

The component displays a single image, optionally with a caption and an
optional link target. It is used wherever a page needs to present one
photograph or graphic as a standalone, self-contained content block — for
example within article body content, inside tabbed itinerary content, or as
the visual representation of a page when that page is surfaced in a listing.


The Image component is placed in the
`headless-main` placeholder.

Place the Image component in the home page at the bottom of the page just before footer.

---

## Related Artifacts

Feature Specification: `harness/artifacts/specs/T009-feature-spec.md`  
Design Note: `harness/artifacts/design/T009-design-note.md`  
Implementation Plan: `harness/artifacts/plans/T009-implementation-plan.md`  
QA Review: `harness/artifacts/qa/T009-qa-review.md`  
CMS Configuration Guide: `harness/artifacts/cms-config/T009-cms-config.md`  
Content Editor Report: `harness/artifacts/content-editor/T009-content-editor.md` 
Code Review: `harness/artifacts/content-editor/T009-code-review.md` 
Deployment: `harness/artifacts/content-editor/T009-fix-and-deploy.md`
Run Report: `harness/runs/T009-run-report.md`

---

## 2. Included and Excluded Scope

**Included**

- Display of exactly one image per authored instance.
- An optional caption, shown either inline beneath the image or as a
  hover-triggered pop-up.
- An optional link that wraps the image.
- A decorative mode that suppresses both the accessible description and the
  link.
- Responsive delivery of the image at multiple widths, with the client
  selecting the appropriate rendition for the rendered element size and
  display pixel density.
- Deferred (lazy) loading by default, with an authorable override to eager
  loading.
- Reuse of an authored instance as the thumbnail image for its page in a
  separate page-listing capability.

**Excluded**

- Image galleries, carousels, or multi-image grids (this component renders
  one image only).
- Image editing, cropping, or asset management workflows.
- Authoring or management of the page-listing capability itself; this
  specification covers only how a reused instance must behave when the
  listing capability selects it (see Section 5).

## 3. Content Model

### Configuration contract

The following fields form the component's configuration contract. Field
names below are neutral labels for the underlying authoring intent, not
implementation identifiers.

| Field | Purpose | Type | Required/Optional | Cardinality | Constraints / Defaults |
|---|---|---|---|---|---|
| Image source | The image to display: an uploaded or referenced media asset, or, when inheritance is enabled, the featured image of the linked page or the current page | Asset reference or inherited reference | Required | One per instance | When inheritance is enabled and no link is set, the current page's featured image is used; when a link is set, the linked page's featured image is used |
| Alternative text | Textual description of the image for assistive technology | Text | Required, unless the image is marked decorative | One per instance | May be entered manually or inherited from the referenced asset's description metadata |
| Alternative-text inheritance toggle | Selects whether alternative text is entered manually or inherited from the asset's description metadata | Boolean toggle | Optional | One per instance | Default not confirmed by source evidence |
| Decorative toggle | Marks the image as purely decorative | Boolean toggle | Optional | One per instance | When enabled, alternative text is intentionally omitted (assistive technology ignores the image) and any link is suppressed |
| Caption | Optional caption text shown with the image | Text | Optional | One per instance | May be entered manually or inherited from the referenced asset's title metadata |
| Caption inheritance toggle | Selects whether the caption is entered manually or inherited from the asset's title metadata | Boolean toggle | Optional | One per instance | Default not confirmed by source evidence |
| Caption display mode | Controls whether the caption renders inline below the image or as a hover pop-up | Boolean/enum toggle | Optional | One per instance | Default not confirmed by source evidence |
| Link target | Destination the image links to | Page or resource reference | Optional | Zero or one per instance | Suppressed entirely when the image is marked decorative |
| Element identifier | Page-unique identifier assigned to the component's root element | Text | Optional | One per instance | Must be unique within the page when supplied |
| Loading mode | Controls whether the image loads lazily or eagerly | Boolean/enum toggle | Optional | One per instance | Default is lazy (deferred until the image nears the viewport); eager loading is an explicit override |

### Observed configuration range

Two deterministic reference instances were examined: a **minimum**
configuration and a **maximum** configuration (see Section 8 and Visual
references for the corresponding evidence). Field presence below reflects
only what was observed configured on these two instances; it must not be read
as a statement of which fields are required, optional, or defaulted — those
rules are governed solely by the configuration contract above.

- **Configured in both** (minimum and maximum): image source.
- **Minimum-configuration instance**: image source only.
- **Maximum-configuration instance**: image source, alternative text,
  alternative-text-from-asset indicator, caption text, caption-from-asset
  indicator, decorative indicator, and a caption display mode field. Field
  presence data confirms only that the caption display mode field carried a
  value on this instance; it does not establish which of the field's two
  modes (inline or pop-up) was selected. See Section 4 for what rendered
  evidence actually confirmed about this instance's caption presentation.
- The maximum-configuration instance also carried two additional stored
  values relating to a prior content-rollout event on the instance (a
  rollout timestamp and its actor). No source-analysis claim establishes
  these as authorable fields of this component's content model; they are
  noted here for completeness but are excluded from the configuration
  contract in Section 3 and from the acceptance scenarios.

## 4. Behaviors and Interactive States

- **Default rendering**: the component renders the configured or inherited
  image, scaled to its layout container, with an accessible name equal to
  the resolved alternative text (or none, when decorative).
- **Caption behavior**: the caption display mode field's contract-level
  purpose is to control whether a caption renders inline beneath the image
  or as a pop-up revealed on hover. For the captured maximum-configuration
  instance, rendered evidence confirmed only that the caption was visible
  inline beneath the image by default, without requiring a hover
  interaction; no hover-revealed overlay was observed for this instance (see
  "Hover state" below and Section 8). Whether the pop-up mode renders as a
  hover-revealed overlay on any instance remains unconfirmed by rendered
  evidence (see Section 11).
- **Decorative behavior**: when the decorative toggle is enabled, the
  rendered image carries no accessible description and is not wrapped in a
  link, regardless of any configured link target.
- **Link behavior**: when a link target is configured and the image is not
  decorative, the rendered image is wrapped in a link to that target.
- **Loading behavior**: by default, the image is not fetched until it nears
  the viewport (lazy loading). When eager loading is selected, the image is
  fetched immediately with the rest of the page content.
- **Responsive delivery**: the image is served in multiple width-specific
  renditions; the client selects and swaps in the rendition matching the
  element's rendered width and the device's pixel ratio, without requiring a
  full page reload.
- **Hover state**: on the captured maximum-configuration instance, hovering
  the image produced no observable visual change of any kind (no highlight,
  scale, overlay, or caption reveal); the caption on this instance was
  already visible before the hover interaction and remained unchanged after
  it.

## 5. Variants

| Variant | Trigger | Rendering difference |
|---|---|---|
| Inline caption | Caption display mode set to inline (or left at default) | Caption text renders as a visible block beneath the image |
| Pop-up caption | Caption display mode set to pop-up | Caption text is hidden until the image is hovered, then appears as an overlay |
| Decorative | Decorative toggle enabled | No accessible description; link suppressed even if configured |
| Linked | Link target configured, not decorative | Image is wrapped in a link |
| Listing-thumbnail reuse | Instance is selected by a separate page-listing capability as that page's thumbnail | The reused rendering always displays without a caption, without any asset-inherited text, and always with a pop-up-style title, regardless of how the source instance itself was configured |

## 6. Authoring Semantics

- The image source is the only field confirmed to be required in every case;
  all other fields are optional or conditionally required (alternative text
  is required unless the instance is decorative).
- Alternative text and caption each support two authoring modes: a manually
  entered value, or a value inherited from the referenced media asset's own
  metadata (description for alternative text, title for caption). The
  toggle for each is independent.
- When the component is configured to inherit its image rather than use a
  directly authored asset, the effective image source resolves to the
  featured image of the linked page when a link is set, or of the current
  page when no link is set.
- The element identifier, when supplied, must be unique within the page; it
  has no default value and no visual effect on its own.
- Authors should treat the decorative toggle as mutually exclusive with both
  alternative text and link target: enabling it authoring-side removes the
  effect of any value present in those fields at render time.

## 7. Accessibility Expectations

- Every non-decorative instance must resolve to a non-empty accessible
  name equal to its effective alternative text.
- A decorative instance must not expose an accessible name or role that
  would cause assistive technology to announce it as meaningful content.
- Because the decorative toggle also suppresses the link, no decorative
  instance can present as an interactive/focusable link element.
- When the caption is presented as a pop-up, the caption content must remain
  reachable by means other than hover alone (for example keyboard focus)
  for parity with the inline caption presentation; the source evidence
  gathered for this run does not confirm whether this keyboard-equivalent
  behavior exists today (see Section 11).

## 8. Visual and Responsive Constraints

- At a desktop viewport (1440x900), the captured maximum-configuration
  instance rendered as an 845x586 image subtree with a visible inline
  caption beneath the photograph.
- At a mobile viewport (390x844), the same instance rendered the identical
  photograph scaled proportionally down to 334x245, with no cropping of the
  visible image content.
- These two captures confirm proportional scaling without cropping between
  the observed desktop and mobile widths for the maximum-configuration
  instance; no evidence was gathered for the minimum-configuration instance
  at either viewport (see Section 11).
- Hovering the maximum-configuration instance produced no measurable pixel
  or computed-style change; the caption was already visible before the
  hover interaction, and no hover-triggered caption reveal was observed for
  this instance (see Section 4).

## 9. Capability Dependencies

- **Media asset management**: the component depends on a source of
  addressable image assets (uploaded or referenced) and, optionally, on
  that asset's own stored description and title metadata for the
  alternative-text and caption inheritance modes.
- **Page metadata**: image inheritance mode depends on the linked or current
  page exposing a designated "featured image."
- **Page-listing capability**: a separate, external listing capability can
  discover and reuse an authored instance of this component as a page's
  thumbnail; this component must support being rendered under that
  capability's forced constraints (no caption, no asset-inherited text,
  pop-up-style title) as described in Section 5.
- **Responsive image delivery**: the component depends on the environment's
  ability to generate and serve multiple width-specific renditions of the
  same source image.

## 10. Acceptance Scenarios

- preconditions: Minimum configuration (image source only) at 1440x900
- action: Render the component
- expected result: The image renders with no visible caption and no link
- pass if: No caption element and no link wrapper are present in the
  rendered output

- preconditions: Maximum configuration (image source, alternative text,
  caption, inline caption mode) at 1440x900
- action: Render the component
- expected result: The image renders at approximately 845x586 with a visible
  caption beneath it and an accessible name matching the configured
  alternative text
- pass if: A visible caption element is present beneath the image and the
  rendered image element's accessible name equals the configured
  alternative text

- preconditions: Maximum configuration (image source, alternative text,
  caption, inline caption mode) at 390x844
- action: Render the component
- expected result: The same photograph renders proportionally scaled down to
  approximately 334x245 with no cropping
- pass if: The rendered image's aspect ratio at 390x844 matches its aspect
  ratio at 1440x900 within normal scaling tolerance, and no part of the
  source photograph is cropped

- preconditions: Instance with the decorative toggle enabled and a link
  target configured, at any single supported viewport
- action: Render the component
- expected result: The image renders with no accessible name and is not
  wrapped in a link
- pass if: The rendered image element has no accessible name and no
  enclosing link element is present

- preconditions: Maximum configuration (image source, alternative text,
  caption) at 1440x900
- action: Render the component
- expected result: The caption is visible beneath the image without
  requiring any hover interaction
- pass if: The caption text is present in the rendered output before any
  hover interaction occurs

- preconditions: Instance with alternative-text inheritance enabled and a
  referenced media asset carrying description metadata, at any single
  supported viewport
- action: Render the component
- expected result: The rendered image's accessible name equals the
  referenced asset's description metadata rather than any manually entered
  value
- pass if: The rendered image's accessible name matches the asset's
  description metadata value

- preconditions: Instance selected by the page-listing capability for
  thumbnail reuse, originally authored with a caption and asset-inherited
  text, at any single supported viewport
- action: Render the component in the listing context
- expected result: The reused rendering shows no caption, no asset-inherited
  text, and a pop-up-style title regardless of the source instance's own
  caption and inheritance configuration
- pass if: No inline caption is present in the listing rendering and the
  title presentation is pop-up style

## 11. Evidence Limitations, Assumptions, and Open Decisions

### Evidence Limitations

- The minimum-configuration reference instance could not be located as a
  renderable element during visual capture, so no rendered evidence (any
  viewport) exists for it; all rendered visual evidence in this
  specification describes the maximum-configuration instance only.
- No visual evidence confirms the exact rendered proportions, breakpoint
  thresholds, or pixel widths used by the responsive width-rendition
  switching described in Section 4; only the overall proportional-scaling
  outcome between the two captured viewports was confirmed.
- The caption display mode field's pop-up-and-hover-reveal behavior is
  established as a contract-level capability (Section 3), but rendered
  evidence for the one captured instance carrying a value in this field
  showed the caption already visible before hover, with no hover-triggered
  change at all. This narrows, rather than repeats, the earlier open
  question about the rendered appearance of the caption presentation: the
  default-visible rendering and the absence of any hover-triggered change
  are now confirmed for this instance; what remains unconfirmed is whether
  the pop-up mode's hover-reveal effect renders as an overlay on any
  instance.
- No visual evidence confirms the keyboard-accessibility behavior of the
  pop-up caption presentation (whether the caption can be revealed without a
  hover-capable pointer).
- No console errors were observed during capture, but console evidence was
  limited to the maximum-configuration instance and the viewports captured.
- The purpose and authoring visibility of the two additional stored values
  observed on the maximum-configuration instance (a rollout timestamp and
  its actor) could not be established from the supplied context; they are
  not part of this specification's configuration contract.

### Assumptions

- The component always requires an image source: either an uploaded or
  referenced asset, or, when inheritance is enabled, the featured image of
  the linked or current page. This can be confirmed by attempting to render
  an instance with no image source and no inheritance configured and
  observing whether the environment refuses to render it or renders an
  empty placeholder.
- Responsive width delivery and lazy-loading behavior are assumed to apply
  uniformly to every authored instance, since no per-instance override for
  either behavior was found beyond the confirmed eager-loading toggle. This
  can be confirmed by authoring multiple instances at varying layout widths
  and comparing the delivered renditions.
- The default state of the alternative-text inheritance toggle, the caption
  inheritance toggle, and the caption display mode toggle are assumed to
  favor the manually authored / inline behavior in the absence of explicit
  configuration, consistent with the minimum-configuration instance
  rendering with no caption. This can be confirmed by authoring a new
  instance with only an image source and observing the caption and
  alternative-text handling.

### Open Implementation Decisions

- None of the choices identified during this run rise to a genuine
  implementation-owner decision with materially different viable outcomes;
  the items above are evidence limitations or confirmable assumptions
  rather than open decisions. No blocking decision was identified, and this
  specification is ready for implementation with the assumptions above
  treated as the working defaults, to be confirmed as described.

## 12. Implementation Guidance

- Implement the image source, alternative text, decorative toggle, caption,
  caption inheritance, caption display mode, link target, element
  identifier, and loading mode as the authorable field set from Section 3;
  treat the two rollout-related stored values noted in Section 11 as out of
  scope unless a future analysis confirms an authoring purpose for them.
- Enforce the decorative-toggle precedence rule explicitly: when decorative
  is enabled, suppress both the accessible name and the link at render time
  regardless of what those fields are configured to.
- Implement responsive width-rendition selection and swapping as a
  client-side concern that reacts to the rendered element's width and the
  device pixel ratio, independent of the authored viewport.
- Implement lazy loading as the default fetch behavior, with eager loading
  as an explicit, instance-level override.
- Design the component's rendering so it can be invoked in a constrained
  "thumbnail" mode that forces no caption, no asset-inherited text, and a
  pop-up-style title, to support the reuse scenario in Section 5 without
  requiring a separate component implementation.
- Confirm the three open assumptions in Section 11 during implementation or
  early testing, since they currently stand in for unconfirmed default
  behavior rather than tested fact. Also confirm, during implementation or
  early testing, whether the pop-up caption mode actually renders a
  hover-revealed overlay, since rendered evidence did not confirm this for
  the one instance examined.

## Visual references

_Populated deterministically at delivery time from the supplied visual
evidence references._



## Task Notes

- The Image Component is the component to be placed directly in the `headless-main`
  placeholder by content authors (previous tasks delivered chrome components in header/footer
  placeholders via Partial Designs). This makes it a useful reference for future
  author-placed renderings in the main content area.
 
---

## Approval

Reviewer:  
Decision:   
Notes:
