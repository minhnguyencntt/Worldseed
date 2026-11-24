---
id: "01M848A8V7P7Y8734XC32D3S8A"
kind: unit
parent: 01M848A8V73MMV6234KVCF65VH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add deriveStage to LifecycleStepper module

Add a pure exported function deriveStage in LifecycleStepper.tsx that returns the later of the Round stage and the execution stage.

## Acceptance criteria
- deriveStage('CLOSED','RUNNING') returns 'DEVELOPING'
- deriveStage('OPEN') returns 'OPEN'


## Scope
- In scope: LifecycleStepper.tsx
- Out of scope: AdminApp
- Preserve: STAGES
- Preserve: stageIndex
- Preserve: LifecycleStepper component


## Technical constraints
- Code path: `game/frontend/src/components/LifecycleStepper.tsx`


## Definition of done
- deriveStage exported


## Clarifying questions
- None
