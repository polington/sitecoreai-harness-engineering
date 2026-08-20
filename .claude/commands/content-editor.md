---
description: Execute the CMS Configuration Guide for the active task using the sitecore-management MCP server and produce a Content Editor Report.
---

Follow the role definition in:

- `harness/roles/content-editor-agent.md`

Follow these standards and references:

- `harness/standards/feature-workflow.md`
- `harness/standards/task-lifecycle.md`
- `harness/standards/run-id-standard.md`

Use this template:

- `harness/templates/content-editor-report-template.md`

Read the live execution state in:

- `harness/run-state.md`

Use the task file referenced there as the only task for this run.

Read the approved CMS Configuration Guide before executing:

- CMS Configuration Guide artifact for the active task

Generate a stage-appropriate Content Editor run ID using the run-id standard. The stage code for this stage is `EDIT`.

Use the `sitecore-management` MCP server to execute the Sitecore item creation and configuration steps described in the CMS Configuration Guide.

After all items have been created and configured, publish every item created or updated during the run to the live publishing target. Use the `publishingTargets` query to discover the correct target database name before publishing. Publish datasource items with `publishSubItems: true`. Publish page items with `publishRelatedItems: true`. Record each publish operation ID in the Content Editor Report.

Write the Content Editor Report to the canonical content editor report path for the active task:

- `harness/artifacts/content-editor/TASKID-content-editor-report.md`

When writing your artifact to disk, use the `create` tool for new files that do not yet exist. Use the `edit` tool only for files that already exist. Do not assume `edit` can create new files — it cannot.

Your primary deliverable is the artifact file on disk. Write the artifact first, then produce a brief summary response confirming what was written and where.

Do not modify governance-controlled files or paths.

Do not modify implementation files.

Execute this stage fully and produce your deliverable. Do not prompt the human for confirmation or permission at any point during execution.
