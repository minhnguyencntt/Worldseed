---
id: "01M848HGWDF9N7802H39R4AADR"
kind: unit
parent: 01M848HGWDHV0NWH1Y13A7PDWF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Render ExecutionPanel in AdminApp

Import ExecutionPanel in AdminApp.tsx and render it after the LifecycleStepper, passing execution and contributions.length.

## Acceptance criteria
- AdminApp output contains a region with aria-label 'Execution' once the round has loaded
- ExecutionPanel receives execution state and contributions.length


## Scope
- In scope: game/frontend/src/components/AdminApp.tsx
- Out of scope: Tests
- Out of scope: ExecutionPanel changes
- Preserve: LifecycleStepper and controls


## Technical constraints
- Render only when `round` is loaded, same as the stepper
- Code path: `game/frontend/src/components/AdminApp.tsx`


## Definition of done
- ExecutionPanel rendered in AdminApp
- tsc --noEmit passes


## Clarifying questions
- None
