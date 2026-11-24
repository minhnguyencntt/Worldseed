---
id: "01M858C7X98F9YNFJZ44RH881G"
kind: unit
parent: 01M858C7X9KQWTCPQ1PFTR5TEW
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Fallback test types the particles mock

Type the particles mock so calls[0][2] compiles.

## Acceptance criteria
- No TS2493 error is reported at the calls[0][2] read
- Asserts FALLBACK third argument and setDepth(3)


## Scope
- In scope: bootSceneFallback.test.ts
- Out of scope: src
- Preserve: assertions


## Definition of done
- Suite passes


## Clarifying questions
- None
