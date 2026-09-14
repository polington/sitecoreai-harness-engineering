---
description: Apply code review fixes to the active task's implementation, validate, commit, and push to origin to trigger deployment.
---

Follow the role definition in:

- `harness/roles/fix-deploy-agent.md`

Follow these standards and references:

- `harness/standards/feature-workflow.md`
- `harness/standards/task-lifecycle.md`
- `harness/standards/run-id-standard.md`
- `harness/standards/coding-standard.md`

Use this template:

- `harness/templates/fix-deploy-report-template.md`

Read the live execution state in:

- `harness/run-state.md`

Use the task file referenced there as the only task for this run.

Read the approved Code Review artifact before applying any fixes:

- Code Review artifact for the active task (`harness/artifacts/code-review/TASKID-code-review.md`)

Confirm `Approval Recommendation: Proceed to Fix and Deploy` is set in the Code Review artifact before proceeding. If it is not, stop and escalate immediately.

Generate a stage-appropriate Fix and Deploy run ID using the run-id standard. The stage code for this stage is `DEPLOY`.

Apply each fix described in the Code Review findings. Run the validation loop (`npm run lint`, `npm run build`) after all fixes are applied. Use up to 3 iterations. Do not push if validation is failing.

Once validation passes, commit and push using only the allowed commands:

- `git add <specific files>`
- `git commit -m "fix(TASKID): apply code review fixes — <brief summary>"`
- `git push origin`

Write the Fix and Deploy Report to the canonical path for the active task:

- `harness/artifacts/fix-deploy/TASKID-fix-deploy-report.md`

When writing your artifact to disk, use the `create` tool for new files that do not yet exist. Use the `edit` tool only for files that already exist. Do not assume `edit` can create new files — it cannot.

Your primary deliverable is the artifact file on disk. Write the artifact first, then produce a brief summary response confirming what was written and where.

Do not modify governance-controlled files or paths.

Execute this stage fully and produce your deliverable. Do not prompt the human for confirmation or permission at any point during execution.
