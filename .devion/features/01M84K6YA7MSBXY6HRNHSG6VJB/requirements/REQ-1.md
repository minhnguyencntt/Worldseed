---
id: "01M84K6YA8V6QWJGWC1G5PMGXE"
kind: requirement
parent: 01M84K6YA7MSBXY6HRNHSG6VJB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · LifecycleStepper carries no execution-derived stage logic

Context: LifecycleStepper.tsx exports EXECUTION_STAGES and deriveStage(roundStatus, executionStatus), which map execution statuses to stages. Execution no longer exists and AdminApp only passes round.status. Desired behavior: only STAGES, stageIndex and LifecycleStepper remain. Expected result: the stepper renders the same as before. Why: it removes the last frontend reference to execution state.

## Acceptance criteria
- Given the LifecycleStepper module, when its exports are inspected, then deriveStage is undefined and STAGES, stageIndex and LifecycleStepper are still exported
- Given status CLOSED, when LifecycleStepper renders, then the CLOSED step has aria-current=step and OPEN is done
- Given LifecycleStepper.tsx, when its source is read, then it contains no 'execution' text


## Scope
- In scope: game/frontend/src/components/LifecycleStepper.tsx
- Out of scope: AdminApp layout
- Out of scope: game UI
- Preserve: STAGES order
- Preserve: STATUS_ALIASES
- Preserve: stageIndex


## Technical constraints
- Frontend tsc --noEmit must still pass


## Definition of done
- deriveStage and EXECUTION_STAGES are deleted
- Stepper rendering is unchanged


## Clarifying questions
- None
