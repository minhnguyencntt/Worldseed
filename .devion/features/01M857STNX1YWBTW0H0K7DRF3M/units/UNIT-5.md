---
id: "01M857STNYBSFHHDJRC4CHWYJJ"
kind: unit
parent: 01M857STNXKWFDC8D25YNF2C0Q
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: bootSceneBuild asserts buildScene gets the mocked sceneSpec

Add a content vi.mock to bootSceneBuild.test.ts.

## Acceptance criteria
- buildScene called with mocked sceneSpec
- Hardcoded-id scan passes


## Scope
- In scope: bootSceneBuild.test.ts
- Out of scope: Product code
- Preserve: Shutdown test


## Technical constraints
- Unit tests only


## Definition of done
- Command passes


## Clarifying questions
- None
