---
description: Review the code produced by the build agent for the active task and produce a Code Review artifact with findings and suggested fixes.
---

Follow the role definition in:

- `harness/roles/code-review-agent.md`

Follow these standards and references:

- `harness/standards/feature-workflow.md`
- `harness/standards/task-lifecycle.md`
- `harness/standards/run-id-standard.md`
- `harness/standards/coding-standard.md`

Use this template:

- `harness/templates/code-review-template.md`

Read the live execution state in:

- `harness/run-state.md`

Use the task file referenced there as the only task for this run.

Read all approved upstream artifacts before reviewing any code:

- Feature Specification artifact for the active task
- Design Note artifact for the active task
- Implementation Plan artifact for the active task
- QA Review artifact for the active task

Generate a stage-appropriate Code Review run ID using the run-id standard. The stage code for this stage is `REVIEW`.

Write the Code Review artifact to the canonical code review path for the active task:

- `harness/artifacts/code-review/TASKID-code-review.md`

When writing your artifact to disk, use the `create` tool for new files that do not yet exist. Use the `edit` tool only for files that already exist. Do not assume `edit` can create new files — it cannot.

Your primary deliverable is the artifact file on disk. Write the artifact first, then produce a brief summary response confirming what was written and where.

Do not modify implementation files.

Do not modify governance-controlled files or paths.

Execute this stage fully and produce your deliverable. Do not prompt the human for confirmation or permission at any point during execution.
