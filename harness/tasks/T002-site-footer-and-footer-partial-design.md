# Task T002 — Site Footer and Footer Partial Design

Status: Ready  
Backlog Item: B003  
Created: 2026-05-05

---

## Summary

Implement a site footer component and the supporting SXA Partial Design and Page Design
configuration needed to deliver it.

This task delivers three things together:

1. The **Site Footer** rendering itself — site logo, multi-column layout with secondary
   navigation links and social media links (Facebook, X/Twitter, LinkedIn), authored copyright
   text, and responsive behaviour that stacks to a single column on mobile.
2. A new SXA **Partial Design** named **"Footer"** that places the footer rendering inside the
   `headless-footer` placeholder.
3. An update to the existing **"Default" Page Design** to include the Footer Partial Design,
   so every page already using the Default Page Design automatically gains the footer.

---

## Related Artifacts

Feature Specification: `harness/artifacts/specs/T002-feature-spec.md`  
Design Note: `harness/artifacts/design/T002-design-note.md`  
Implementation Plan: `harness/artifacts/plans/T002-implementation-plan.md`  
QA Review: `harness/artifacts/qa/T002-qa-review.md`  
CMS Configuration Guide: `harness/artifacts/cms-config/T002-cms-config.md`  
Run Report: `harness/runs/T002-run-report.md`

---

## Scope

### In Scope

- Implement the **Site Footer** rendering with:
  - Authored site logo (Sitecore Image field, with link to home page).
  - Secondary navigation links authored as a Sitecore Link List field on the footer
    data source item.
  - Social media links for Facebook, X (Twitter), and LinkedIn, each as an authored
    Sitecore link field (URL + optional label/icon).
  - Authored copyright text (Sitecore Single-Line Text field).
  - Multi-column layout: logo column, navigation column, social links column.
  - Responsive layout that stacks to a single column on mobile at the design system's
    defined breakpoint.
  - Accessibility: semantic `<footer>` / `<nav>` landmarks, keyboard navigation, visible
    focus states, appropriate ARIA labels.
  - Alignment with the project design system (typography, spacing, colour tokens,
    breakpoints).
- Create an SXA **Partial Design** item named **"Footer"** under the site's
  Presentation / Partial Designs folder.
  - The Footer Partial Design places the Site Footer rendering in the `headless-footer`
    placeholder.
- Update the existing **"Default" Page Design** to reference the Footer Partial Design,
  so all pages using the Default Page Design render the footer.
- Provide unit/component tests covering footer rendering, navigation link output, social
  link output, and mobile stacking behaviour.
- Provide a CMS Configuration Guide covering all Sitecore items, templates, rendering
  definitions, placeholder settings, available renderings entries, Footer Partial Design
  creation, and Default Page Design update steps.

### Out of Scope

- Changes to the Header Partial Design or any Partial Design other than "Footer".
- Additional social media platforms beyond Facebook, X (Twitter), and LinkedIn.
- Multi-section or mega-footer navigation (accordion or tabbed nav groups).
- Language switcher, sitemap, or search functionality in the footer.
- Additional Page Designs beyond "Default".
- Personalization or A/B testing rules on the footer, Partial Design, or Page Design.
- Any changes to the Site Header rendering (delivered by T001).

---

## Acceptance Criteria

Acceptance criteria will be finalised in the Feature Specification. The task must,
at minimum, deliver the following:

- A Partial Design item named "Footer" exists in the site's Partial Designs folder and
  places the Site Footer rendering in the `headless-footer` placeholder.
- The existing "Default" Page Design references the Footer Partial Design so every page
  using that Page Design renders the footer.
- The Site Footer rendering displays an authored logo image that links to the home page.
- The Site Footer rendering displays secondary navigation links sourced from a Sitecore
  Link List field (not hard-coded).
- The Site Footer rendering displays authored social media links for Facebook, X (Twitter),
  and LinkedIn, each opening in a new tab.
- The Site Footer rendering displays an authored copyright text string.
- The footer renders in a multi-column layout on desktop (logo column, navigation column,
  social column).
- The footer stacks to a single column on mobile at the design system breakpoint.
- The footer is keyboard-accessible and announces correctly to assistive technologies
  (semantic landmarks, focus order, visible focus, ARIA where required).
- Component tests cover footer rendering, navigation link output, social link output, and
  mobile/responsive layout behaviour, and all tests pass.
- Lint and typecheck pass for all changed code.
- A CMS Configuration Guide is produced that fully describes how to recreate the Site Footer
  rendering definition, data source template, Footer Partial Design, and Default Page Design
  update in a clean Sitecore environment.

---

## Dependencies

- The base SXA site already exists in the repository's Sitecore content tree.
- Project design system tokens (typography, colour, spacing, breakpoints) are available for
  use by the footer.
- The "Default" Page Design and `headless-footer` placeholder must exist in the Sitecore
  content tree before the CMS Configuration steps for this task can be executed. These were
  established as part of the B002 / T001 work. If they are absent, the CMS Configuration
  stage will be blocked.

---

## Risks

- Updating the "Default" Page Design to add the Footer Partial Design may affect the
  presentation of any page already authored against that design; this should be verified
  during QA.
- The shape of the Sitecore route/layout data exposed to the head application for navigation
  links should be confirmed during the Design and Implementation Planning stages to align with
  the approach used by the Site Header.
- Social media link icons will require SVG assets or an icon library; availability in the
  project should be confirmed during Implementation Planning.
- The `headless-footer` placeholder key used in the Footer Partial Design must match the key
  registered in the head application's placeholder configuration; a mismatch will cause the
  footer rendering not to appear.

---

## Task Notes

- The Footer Partial Design is introduced as a separate Partial Design (rather than adding
  the footer rendering directly into the existing Header Partial Design) to keep each Partial
  Design focused on a single piece of page chrome and to allow independent reuse or
  replacement in future.
- The Default Page Design is updated (not replaced) to compose both the Header and Footer
  Partial Designs.
- Social link fields should be modelled as individual General Link fields (one per platform)
  on the data source template to keep authoring simple and to avoid dependency on a structured
  list implementation at this stage.

---

## Approval

Reviewer:  
Decision: Pending  
Notes:
