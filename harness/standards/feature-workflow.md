# Feature Workflow Standard

## Purpose

This document defines how a feature moves through the harness workflow from initial execution to final approval.

The workflow exists to ensure that features are:

- executed sequentially
- guided by explicit artifacts
- implemented within controlled scope
- validated before approval
- traceable across every stage

The workflow uses `harness/run-state.md` as the authoritative source of live execution state.

---

## Core Principles

### Sequential Stage Execution

A feature moves through the harness one stage at a time.

Stages are:

- Specification
- Design
- Implementation Planning
- Build
- QA
- CMS Configuration
- Content Editor
- Code Review
- Fix and Deploy
- Awaiting Approval
- Complete

Only one stage should be active at a time for a given task run.

A later stage must not begin until the previous stage has produced its required artifact or completion result.

---

### Artifact-Driven Progression

Each stage produces an artifact or execution result that becomes the input for the next stage.

Expected progression:

- Specification produces a Feature Specification
- Design produces a Design Note
- Implementation Planning produces an Implementation Plan
- Build produces code changes, tests, and a Build Run Report
- QA produces a QA Review
- CMS Configuration produces a CMS Configuration Guide
- Content Editor executes the guide and produces a Content Editor Report
- Code Review produces a Code Review artifact with findings and suggested fixes
- Fix and Deploy applies those fixes, validates, commits, and pushes to origin

This ensures that every stage works from explicit documented inputs rather than relying on memory or unstated assumptions.

---

### Run-State-Driven Orchestration

The current task and current stage are determined by:

```text
harness/run-state.md
```

This file defines:

- the active task
- the current stage
- the current run ID
- completed stages
- configured approval requirements
- stop reason if execution is paused

All automated orchestration should use `run-state.md` as the source of truth.

---

### Durable Task Definitions

Task files under `harness/tasks/` define the durable task record.

Task files should describe:

- the feature title
- summary
- artifact locations
- stable task notes
- approval section

Task files are not the authoritative source of live execution state.

They provide stable task identity and context for the workflow.

---

### Human-Guided, Increasingly Automatable

The harness is designed to support increasing automation over time while preserving human governance.

The orchestrator may automatically move work through stages when allowed by run-state approval settings.

However, configured approval gates must still be respected.

Examples:

- a workflow may proceed automatically from Specification to Design
- a workflow may proceed automatically from Design to Planning
- a workflow may stop before Build if configured
- a workflow must stop before Complete if final approval is required

---

### Governance Files Are Protected

Workflow governance files are human-controlled or orchestrator-controlled.

Stage agents may read these files, but must not modify them during normal feature execution.

Protected governance files include:

- `harness/run-state.md`
- files under `harness/tasks/`
- files under `harness/backlog/`
- files under `harness/standards/`
- files under `harness/roles/`
- files under `harness/templates/`
- files under `.github/agents/`

The orchestrator may update `harness/run-state.md` as part of workflow control.
Stage agents must not modify governance files unless explicitly instructed to perform a harness change.

---

## Workflow Stages

## 1. Specification

Purpose:

Define the feature clearly in terms of user value, scope, and acceptance criteria.

Inputs:

- task file
- run-state
- project standards
- feature specification template

Output:

- `harness/artifacts/specs/TASKID-feature-spec.md`

The workflow may continue to Design if specification succeeds and no approval gate blocks progression.

---

## 2. Design

Purpose:

Translate the specification into a UX and layout design aligned with the design system.

Inputs:

- feature specification
- task file
- run-state
- design system
- design note template

Output:

- `harness/artifacts/design/TASKID-design-note.md`

The workflow may continue to Implementation Planning if design succeeds and no approval gate blocks progression.

---

## 3. Implementation Planning

Purpose:

Create the technical implementation plan for the feature.

Inputs:

- feature specification
- design note
- task file
- run-state
- implementation plan template

Output:

- `harness/artifacts/plans/TASKID-implementation-plan.md`

The workflow may continue to Build if planning succeeds and no approval gate blocks progression.

---

## 4. Build

Purpose:

Implement the feature and validate it through the controlled validation loop.

Inputs:

- feature specification
- design note
- implementation plan
- task file
- run-state
- codebase

Outputs:

- implementation changes in `src/`
- test changes
- build validation results
- run report entry or build run report

The Build stage may use the controlled validation loop defined by the Build role and standards.

This stage should stop if:

- validation fails beyond the retry limit
- a blocking issue is discovered
- approval is required before further progression

If Build succeeds, the workflow moves to QA.

---

## 5. QA

Purpose:

Validate that the implemented feature satisfies the specification, design, and implementation plan.

Inputs:

- feature specification
- design note
- implementation plan
- build outputs
- build validation evidence
- run-state
- QA template

Output:

- `harness/artifacts/qa/TASKID-qa-review.md`

If QA finds blocking issues, the workflow returns to Build.

If QA passes, the workflow moves to CMS Configuration.

---

## 5.5. CMS Configuration

Purpose:

Produce a human-executable guide detailing every Sitecore item, template, placeholder setting, and serialization step required to support the implemented component in XM Cloud.

Inputs:

- feature specification
- implementation plan
- implemented component source files
- run-state
- CMS config template

Output:

- `harness/artifacts/cms-config/TASKID-cms-config.md`

The workflow moves to Content Editor after the CMS Configuration Guide is produced, unless `Require Approval Before Content Editor` is set, in which case the orchestrator stops for human review before invoking the Content Editor stage.

---

## 5.6. Content Editor

Purpose:

Execute the approved CMS Configuration Guide by making live Sitecore configuration changes through the `sitecore-management` MCP server and produce a record of everything that was created or updated.

Inputs:

- CMS Configuration Guide
- run-state
- content editor report template

Output:

- `harness/artifacts/content-editor/TASKID-content-editor-report.md`

The report documents every Sitecore item created, its GUID and path, and includes testing guidance so the reviewer can immediately validate the component in Sitecore Pages.

The workflow moves to Code Review after the Content Editor Report is produced.

---

## 5.7. Code Review

Purpose:

Review the code produced by the Build Agent against the approved specification, design note, implementation plan, and QA Review. Identify issues and propose a concrete fix for each one.

Inputs:

- feature specification
- design note
- implementation plan
- QA Review
- implemented source files for the active task
- run-state
- code review template

Output:

- `harness/artifacts/code-review/TASKID-code-review.md`

The Code Review artifact includes an Approval Recommendation field.

If the recommendation is `Proceed to Fix and Deploy`, the workflow moves to Fix and Deploy.

If the recommendation is `Back to Build`, the orchestrator returns the task to Build for remediation. After Build completes, Code Review runs again. The orchestrator may repeat this loop up to 2 times before setting the task to Blocked.

CMS Configuration and Content Editor are not re-run during a Code Review remediation loop — only Build and Code Review repeat.

---

## 5.8. Fix and Deploy

Purpose:

Apply the fixes proposed in the approved Code Review artifact, validate the result, commit all changes, and push to origin. Pushing to origin triggers deployment.

Inputs:

- Code Review artifact (`harness/artifacts/code-review/TASKID-code-review.md`)
- implemented source files for the active task
- run-state
- fix and deploy report template

Output:

- `harness/artifacts/fix-deploy/TASKID-fix-deploy-report.md`

The Fix and Deploy Report records the fixes applied, validation results, commit SHA, and push confirmation.

The workflow moves to Awaiting Approval after a successful push, unless `Require Approval Before Fix and Deploy` is set, in which case the orchestrator stops for human review before invoking this stage.

---

## 6. Awaiting Approval

Purpose:

Pause the workflow for human review before final completion.

Inputs:

- QA Review
- prior artifacts
- run-state
- current implementation

At this stage the human reviewer may:

- approve the task
- request corrective implementation work
- request design or planning changes

If approved, the workflow moves to Complete.

---

## 7. Complete

Purpose:

Mark the task as completed.

Completion means:

- required artifacts exist
- implementation is present
- QA has passed
- approval has been granted
- run-state reflects final completion

At completion, the orchestrator should:

- mark the current task as complete in run-state
- clear or transition the active task run
- preserve the run report and artifact trail

---

## Orchestrator Responsibilities

The orchestrator is responsible for workflow control.

Its responsibilities include:

- reading `harness/run-state.md`
- identifying the active task and stage
- selecting the correct stage agent
- updating run-state after stage completion
- generating the next stage run ID
- stopping when a stage fails or an approval gate is reached
- creating or updating run reports

The orchestrator must not override lifecycle or approval rules.

---

## Stage Agent Responsibilities

Stage agents are responsible only for performing the work of their assigned stage.

Stage agents should:

- read run-state
- read the task file
- read required prior artifacts
- produce the expected artifact or implementation result
- report blockers clearly

Stage agents must not:

- advance workflow state
- select the next stage
- modify governance files
- bypass approval gates

---

## Build Validation Loop

The Build stage may use a controlled validation loop to reduce human intervention during implementation.

The validation loop may:

- run approved commands
- inspect failures
- apply bounded in-scope fixes
- rerun validation within the allowed retry limit

The validation loop must not:

- modify governance files
- broaden scope
- continue indefinitely
- bypass stage or approval controls

This loop improves efficiency but does not replace the broader workflow controls.

---

## Approval Configuration

Run-state may define approval gates such as:

- Require Approval Before Build
- Require Approval Before Content Editor
- Require Approval Before Complete

These gates allow the workflow to become more autonomous over time without sacrificing control.

The orchestrator must obey these flags.

If an approval gate is reached, the workflow stops and records the stop reason in run-state.

---

## Stop Conditions

The workflow must stop when:

- a stage fails
- validation fails beyond retry limits
- an approval gate is reached
- required artifacts are missing
- the active task is unclear
- lifecycle rules prevent progression

When this happens, run-state should record:

- current stage
- current status
- stop reason
- current run ID

This makes the workflow resumable and inspectable.

---

## Summary

The feature workflow defines how a task moves through Specification, Design, Planning, Build, QA, CMS Configuration, Content Editor, Code Review, Fix and Deploy, Approval, and Completion.

The workflow is:

- stage-based
- artifact-driven
- controlled by `harness/run-state.md`
- executed by stage agents
- coordinated by an orchestrator
- bounded by lifecycle and approval rules

This design reduces manual coordination while preserving human governance where it matters.