---
description: Produce a CMS Configuration Guide for the active task defined in harness/run-state.md.
---

Follow the role definition in:

- `harness/roles/cms-config-agent.md`

Follow these standards and references:

- `harness/standards/feature-workflow.md`
- `harness/standards/task-lifecycle.md`
- `harness/standards/run-id-standard.md`
- `harness/standards/xmcloud-component-creation.md`

Use this template:

- `harness/templates/cms-config-template.md`

Read the live execution state in:

- `harness/run-state.md`

Use the task file referenced there as the only task for this run.

Read the approved artifacts and implementation files before producing output:

- feature specification
- implementation plan
- all implemented component source files for the active task

The guide must include a step to add the rendering to the target page's layout (`__Final Renderings`). Identify the target page from the task or feature specification. Use `headless-main` as the placeholder unless the component is explicitly a header or footer (use `headless-header` or `headless-footer` accordingly). This step must be documented in the guide so the Content Editor Agent can execute it via the `sitecore-management` MCP server.

When the component's datasource template has image fields, check `harness/images/{TASK_ID}/` first, then `harness/images/`, for image files to use as initial field values. List every image file found and assign each to the appropriate image field in the content item creation steps. If no images are found in either location, document the field as `(set by author)` — do not reference external URLs or placeholder images.

Generate a stage-appropriate CMS Configuration run ID using the run-id standard. The stage code for this stage is `CMS`.

Write the CMS Configuration Guide to the canonical CMS config path for the active task:

- `harness/artifacts/cms-config/TASKID-cms-config.md`

When writing your artifact to disk, use the `create` tool for new files that do not yet exist. Use the `edit` tool only for files that already exist. Do not assume `edit` can create new files — it cannot.

Your primary deliverable is the artifact file on disk. Write the artifact first, then produce a brief summary response confirming what was written and where.

Do not modify governance-controlled files or paths.

Do not modify implementation files.

Execute this stage fully and produce your deliverable. Do not prompt the human for confirmation or permission at any point during execution.
