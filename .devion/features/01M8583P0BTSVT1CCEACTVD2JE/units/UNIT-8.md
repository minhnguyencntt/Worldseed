---
id: "01M8583P0CWMAAJVFJ0NAS31BA"
kind: unit
parent: 01M8583P0BQMX1RQNPFV7DTX5F
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Fallback tests mock sceneSpec and type the particles mock

Add sceneSpec to the content mock and type the particles mock signature.

## Acceptance criteria
- Given typed particles mock, When tsc runs, Then no TS2493
- Given the suite, When run, Then it passes


## Scope
- In scope: bootSceneFallback.test.ts
- Out of scope: product code
- Preserve: assertions


## Definition of done
- Suite passes


## Clarifying questions
- None
