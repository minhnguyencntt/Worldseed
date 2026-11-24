---
id: "01M848HGWD32GWDHWZMEB0KJ9W"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-6.3 · Render ExecutionPanel in AdminApp with the loaded execution

Context: AdminApp (game/frontend/src/components/AdminApp.tsx) already loads the round, contributions and the current Round's execution (state `execution`, `contributions`), and renders LifecycleStepper. ExecutionPanel (game/frontend/src/components/ExecutionPanel.tsx) exists but is not rendered. Desired behavior: AdminApp renders ExecutionPanel showing contribution count, duration, agent logs, test results, release version and failure reason from the loaded execution. Expected result: the admin sees these values on the admin page, covered by a unit test. Why: the admin needs to monitor the Worker execution.

## Acceptance criteria
- Given a loaded execution and contributions, when AdminApp renders, then ExecutionPanel shows the contribution count, duration, agent logs, test results, release version and failure reason
- Given no execution for the round, when AdminApp renders, then ExecutionPanel shows 'Not available' placeholders and the correct contribution count
- A unit test with mocked fetch asserts the rendered panel values


## Scope
- In scope: Render ExecutionPanel in AdminApp
- In scope: Unit test for AdminApp rendering ExecutionPanel
- Out of scope: Approve/Retry wiring
- Out of scope: Backend changes
- Out of scope: ExecutionPanel internals
- Preserve: LifecycleStepper rendering
- Preserve: Token gate and round controls
- Preserve: Existing admin tests


## Technical constraints
- Frontend only; no new API calls
- Reuse existing ExecutionInfo state in AdminApp


## Definition of done
- ExecutionPanel is rendered in AdminApp
- Unit tests pass


## Clarifying questions
- None
