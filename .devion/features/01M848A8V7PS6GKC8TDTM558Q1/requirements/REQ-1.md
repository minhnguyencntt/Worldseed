---
id: "01M848A8V73MMV6234KVCF65VH"
kind: requirement
parent: 01M848A8V7PS6GKC8TDTM558Q1
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · A deriveStage helper maps Round and execution status to a lifecycle stage

Context: stageIndex maps only Round status. Desired behavior: deriveStage(roundStatus, executionStatus?) returns the later of the Round-derived stage and the execution-derived stage (RUNNING→DEVELOPING, AWAITING_APPROVAL or APPROVED→PUBLISHING, COMPLETED→COMPLETED; QUEUED/FAILED add nothing). Expected result: a stage string usable as LifecycleStepper status. Why: Round status alone lags execution progress.

## Acceptance criteria
- Given roundStatus CLOSED and executionStatus RUNNING, when deriveStage is called, then it returns DEVELOPING.
- Given roundStatus OPEN and no execution status, when deriveStage is called, then it returns OPEN.
- Given roundStatus PUBLISHING and executionStatus RUNNING, when deriveStage is called, then it returns PUBLISHING (never moves backwards).


## Scope
- In scope: deriveStage export in LifecycleStepper.tsx
- Out of scope: Backend status changes
- Preserve: STAGES, stageIndex, LifecycleStepper behavior


## Technical constraints
- Execution statuses per backend/internal/execution/execution.go


## Definition of done
- deriveStage exported and typed


## Clarifying questions
- None
