---
description: Produce a QA review for the active task defined in harness/run-state.md.
---

Follow the role definition in:

- `harness/roles/qa-agent.md`

Follow these standards and references:

- `harness/standards/feature-workflow.md`
- `harness/standards/testing-standard.md`
- `harness/standards/task-lifecycle.md`
- `harness/standards/run-id-standard.md`
- `harness/design-system/design-system.md`

Use this template:

- `harness/templates/qa-review-template.md`

Read the live execution state in:

- `harness/run-state.md`

Use the task file referenced there as the only task for this run.

Read the approved artifacts referenced by the task file and/or run-state before producing output:

- feature specification
- design note
- implementation plan
- build validation evidence from the run report

Generate a stage-appropriate QA run ID using the run-id standard.

Write the QA review to the canonical QA review path defined by the task file and/or run-state.

When writing your artifact to disk, use the `create` tool for new files that do not yet exist. Use the `edit` tool only for files that already exist. Do not assume `edit` can create new files — it cannot.

Your primary deliverable is the artifact file on disk. Write the artifact first, then produce a brief summary response confirming what was written and where.

Do not modify governance-controlled files or paths.

Do not modify implementation files.

Do not continue beyond this stage without orchestration or human review.
