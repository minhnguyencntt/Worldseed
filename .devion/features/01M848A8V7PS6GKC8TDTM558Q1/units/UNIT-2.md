---
id: "01M848A8V8JW4R02SYG6QPSVE0"
kind: unit
parent: 01M848A8V7HNBPWW9AY4P6KCMC
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Render LifecycleStepper in AdminApp from Round and execution

Extend AdminApp's load effect to list executions and render LifecycleStepper with deriveStage.

## Acceptance criteria
- Stepper visible after token entry
- Executions 404 does not raise an error alert


## Scope
- In scope: AdminApp.tsx
- Out of scope: ExecutionPanel
- Preserve: Token gate and round controls


## Technical constraints
- Code path: `game/frontend/src/components/AdminApp.tsx`


## Definition of done
- Stepper rendered


## Clarifying questions
- None
