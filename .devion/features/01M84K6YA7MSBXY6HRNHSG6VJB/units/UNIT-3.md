---
id: "01M84K6YA89P4HMDHNY8H7SSJ9"
kind: unit
parent: 01M84K6YA8V6QWJGWC1G5PMGXE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: LifecycleStepper has no execution helpers and still renders stages

Replace game/frontend/tests/deriveStage.test.ts, which imports the removed deriveStage, with a test of the remaining module.

## Acceptance criteria
- Given the module namespace, when deriveStage is read, then it is undefined
- Given status CLOSED, when the stepper renders, then the CLOSED step is current
- Given the source file, when it is read, then it has no 'execution' text


## Scope
- In scope: game/frontend/tests/lifecycleStepper.test.tsx
- In scope: game/frontend/tests/deriveStage.test.ts
- Out of scope: Product code
- Preserve: adminStepper.test.tsx


## Technical constraints
- Unit tests only, no network; use Vitest and Testing Library as in adminStepper.test.tsx
- Read the source with node:fs relative to the test file


## Definition of done
- The new test passes and deriveStage.test.ts is deleted


## Clarifying questions
- None
