---
id: "01M84J88PS44TYPRFKHAFYQ8RF"
kind: unit
parent: 01M84J88PSFZV9F5DHJKTJMV0T
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Client and fixtures carry no execution code unit tests

Delete execution-only tests and fixtures; add a test asserting client exports.

## Acceptance criteria
- client module has no execution exports
- deriveStage tests no longer need executionFixture
- typecheck passes


## Scope
- In scope: tests/executions.test.ts
- In scope: tests/adminExecution.test.tsx
- In scope: tests/adminActions.test.tsx
- In scope: tests/fixtures/api.ts
- In scope: tests/deriveStage.test.ts
- In scope: tests/clientNoExecution.test.ts
- Out of scope: src
- Preserve: Other tests


## Definition of done
- Suite and tsc green


## Clarifying questions
- None
