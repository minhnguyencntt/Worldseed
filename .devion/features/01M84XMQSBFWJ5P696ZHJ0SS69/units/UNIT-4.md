---
id: "01M84XMQSCR546R87ZSNN713XC"
kind: unit
parent: 01M84XMQSB4VEBKD6F3AFSXQNY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Effects schema and bedroom content unit tests

Write tests from the requirement criteria for valid, invalid and absent effects.

## Acceptance criteria
- Valid, invalid and missing effects cases are each asserted in the suite
- Bedroom scene effect types dust, ambientLight and transition are asserted


## Scope
- In scope: game/tests/effectsSchema.test.ts
- Out of scope: rendering
- Preserve: existing tests


## Technical constraints
- Filesystem only via the real content file read


## Definition of done
- Tests pass


## Clarifying questions
- None
