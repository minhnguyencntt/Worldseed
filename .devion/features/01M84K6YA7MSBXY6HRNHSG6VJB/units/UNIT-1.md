---
id: "01M84K6YA88SJXSKB4FAM5GAZ8"
kind: unit
parent: 01M84K6YA8V6QWJGWC1G5PMGXE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Delete deriveStage and EXECUTION_STAGES from LifecycleStepper

Delete the EXECUTION_STAGES map and the deriveStage function from game/frontend/src/components/LifecycleStepper.tsx. Nothing in game/frontend/src imports deriveStage; only AdminApp imports LifecycleStepper.

## Acceptance criteria
- Given the file after the change, when it is read, then deriveStage and EXECUTION_STAGES are absent
- Given the file after the change, when tsc runs, then it passes


## Scope
- In scope: LifecycleStepper.tsx
- Out of scope: Tests
- Preserve: STAGES
- Preserve: stageIndex
- Preserve: LifecycleStepper


## Technical constraints
- Keep exports STAGES, stageIndex, LifecycleStepper and LifecycleStepperProps
- Code path: `game/frontend/src/components/LifecycleStepper.tsx`


## Definition of done
- Execution helpers are removed and the frontend type-checks


## Clarifying questions
- None
