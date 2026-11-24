---
id: "01M85B0RB849C2ETNBMFWBYY3N"
kind: unit
parent: 01M85B0RB8VN2GS0PE22KD4JZY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: characterSchema defaults and rejection unit tests

Extend game/tests/characterSchema.test.ts with tests using the real characterSchema and in-memory input.

## Acceptance criteria
- Default scale and layer are asserted
- Missing idle and non-positive scale throw


## Scope
- In scope: game/tests/characterSchema.test.ts
- Out of scope: Product code
- Preserve: Existing interaction tests


## Technical constraints
- No I/O, pure zod parsing


## Definition of done
- New tests pass and fail if the schema rule is removed


## Clarifying questions
- None
