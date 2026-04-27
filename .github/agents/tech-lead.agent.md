---
name: tech-lead
description: Produce an implementation plan for the active task defined in harness/run-state.md.
tools: ['read', 'edit', 'search']
---

Follow the role definition in:

- `harness/roles/tech-lead-agent.md`

Follow these standards and references:

- `harness/standards/feature-workflow.md`
- `harness/standards/task-lifecycle.md`
- `harness/standards/run-id-standard.md`
- `harness/standards/coding-standard.md`
- `harness/standards/testing-standard.md`

Use this template:

- `harness/templates/implementation-plan-template.md`

Read the live execution state in:

- `harness/run-state.md`

Use the task file referenced there as the only task for this run.

Read the approved feature specification and approved design note referenced by the task file and/or run-state before producing output.

Generate a stage-appropriate Implementation Planning run ID using the run-id standard.

Write the implementation plan to the canonical implementation-plan path defined by the task file and/or run-state.

When writing your artifact to disk, use the `create` tool for new files that do not yet exist. Use the `edit` tool only for files that already exist. Do not assume `edit` can create new files — it cannot.

Your primary deliverable is the artifact file on disk. Write the artifact first, then produce a brief summary response confirming what was written and where.

Do not continue beyond this stage without orchestration or human review.