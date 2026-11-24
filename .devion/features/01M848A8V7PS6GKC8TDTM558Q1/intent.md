---
id: "01M848A8V7PS6GKC8TDTM558Q1"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-6.2 · Render LifecycleStepper in AdminApp with derived current stage

Context: LifecycleStepper exists (game/frontend/src/components/LifecycleStepper.tsx) but AdminApp does not render it. Desired behavior: after the admin token is accepted, AdminApp shows the stepper with the current stage derived from the Round status and the current Round's execution status. Expected result: the admin sees where the Round is in OPEN → COMPLETED. Why: the admin needs a live lifecycle view.

## Acceptance criteria
- Given an authenticated admin and an OPEN Round, when AdminApp loads, then the Round lifecycle stepper marks OPEN as the current step.
- Given a CLOSED Round whose execution is RUNNING, when AdminApp loads, then DEVELOPING is the current step.
- Given a unit test with mocked fetch, when it runs, then no real network is used.


## Scope
- In scope: Stage derivation helper
- In scope: AdminApp renders LifecycleStepper
- In scope: Unit tests with mocked fetch
- Out of scope: Backend changes
- Out of scope: ExecutionPanel wiring
- Out of scope: Approve/Retry wiring
- Preserve: Existing AdminApp token gate, round controls and contributions list
- Preserve: listExecutions, findExecutionForRound client functions


## Technical constraints
- Frontend only, game/frontend
- Reuse existing STAGES, stageIndex and listExecutions/findExecutionForRound


## Definition of done
- Stepper rendered in AdminApp and tests pass


## Clarifying questions
- None
