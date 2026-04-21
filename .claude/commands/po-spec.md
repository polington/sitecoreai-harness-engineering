---
description: Produce a feature specification for the active task defined in harness/run-state.md.
---

Follow the role definition in:

- `harness/roles/po-spec-agent.md`

Follow these standards and references:

- `harness/standards/feature-workflow.md`
- `harness/standards/task-lifecycle.md`
- `harness/standards/testing-standard.md`
- `harness/standards/run-id-standard.md`

Use this template:

- `harness/templates/feature-spec-template.md`

Read the live execution state in:

- `harness/run-state.md`

Use the task file referenced there as the only task for this run.

Use the current run ID from `harness/run-state.md`.

Read only the files needed for this stage.

Do not read `active-task.md`.

Do not read unrelated prior task artifacts unless explicitly instructed.

Do not perform broad repository searches if the required inputs are already known.

Write the feature specification directly to the canonical specification path defined by the task file and/or run-state.

When writing your artifact to disk, use the `create` tool for new files that do not yet exist. Use the `edit` tool only for files that already exist. Do not assume `edit` can create new files — it cannot.

Your primary deliverable is the artifact file on disk. Write the artifact first, then produce a brief summary response confirming what was written and where.

Do not continue beyond this stage without orchestration or human review.
