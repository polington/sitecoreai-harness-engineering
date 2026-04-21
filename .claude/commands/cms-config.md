---
description: Produce a CMS Configuration Guide for the active task defined in harness/run-state.md.
---

Follow the role definition in:

- `harness/roles/cms-config-agent.md`

Follow these standards and references:

- `harness/standards/feature-workflow.md`
- `harness/standards/task-lifecycle.md`
- `harness/standards/run-id-standard.md`

Use this template:

- `harness/templates/cms-config-template.md`

Read the live execution state in:

- `harness/run-state.md`

Use the task file referenced there as the only task for this run.

Read the approved artifacts and implementation files before producing output:

- feature specification
- implementation plan
- all implemented component source files for the active task

Generate a stage-appropriate CMS Configuration run ID using the run-id standard. The stage code for this stage is `CMS`.

Write the CMS Configuration Guide to the canonical CMS config path for the active task:

- `harness/artifacts/cms-config/TASKID-cms-config.md`

Do not modify governance-controlled files or paths.

Do not modify implementation files.

Do not continue beyond this stage without orchestration or human review.
