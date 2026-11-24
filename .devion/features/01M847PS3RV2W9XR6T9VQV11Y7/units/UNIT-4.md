---
id: "01M847PS3S92ZKV8MN9QEWHYN2"
kind: unit
parent: 01M847PS3RY5MY69H3B7JK7SMM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add LifecycleStepper and ExecutionPanel to AdminApp

Implement the stepper and panel components and render them in AdminApp using the Round status, contribution count and the execution for the Round.

## Acceptance criteria
- Seven stages render in order
- Panel shows duration from updated_at difference
- Failure reason shown


## Scope
- In scope: client.ts
- In scope: LifecycleStepper.tsx
- In scope: ExecutionPanel.tsx
- In scope: AdminApp.tsx
- Out of scope: Tests
- Preserve: Open/Close controls


## Technical constraints
- No new deps
- New file: `game/frontend/src/api/client.ts`
- New file: `game/frontend/src/components/LifecycleStepper.tsx`
- New file: `game/frontend/src/components/ExecutionPanel.tsx`
- New file: `game/frontend/src/components/AdminApp.tsx`


## Dependencies
- REQ-4


## Definition of done
- tsc passes


## Clarifying questions
- None
