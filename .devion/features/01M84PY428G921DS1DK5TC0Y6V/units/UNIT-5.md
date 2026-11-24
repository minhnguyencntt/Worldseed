---
id: "01M84PY4295RZHMB8W6D2YZV83"
kind: unit
parent: 01M84PY428HZM5F652E0K6V2CC
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Relocated the-boys-room content and loader validation unit tests

Prove R2 with unit tests; update existing path assertions and temp-dir fixtures to include the new required fields.

## Acceptance criteria
- New path loads six objects with layer and position
- Missing position throws
- Old content dir absent


## Scope
- In scope: tests/content.test.ts
- In scope: tests/layout.test.ts
- In scope: tests/loader.test.ts
- Out of scope: app code


## Technical constraints
- Temp dir only for loader fixtures


## Definition of done
- Tests pass


## Clarifying questions
- None
