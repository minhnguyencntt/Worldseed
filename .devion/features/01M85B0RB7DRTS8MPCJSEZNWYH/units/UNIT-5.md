---
id: "01M85B0RB8VY20T67ZPYSGK8NW"
kind: unit
parent: 01M85B0RB8BGHZHPABD17NWAH3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: validateWorld scene character path and count unit tests

Extend the 'validateWorld scene characters' describe in game/tests/validator.test.ts using the real validateWorld.

## Acceptance criteria
- Index 1 path asserted
- Undefined characters gives no error
- Exactly one error for one unknown id


## Scope
- In scope: game/tests/validator.test.ts
- Out of scope: Product code
- Preserve: Existing two tests


## Technical constraints
- Reuse validWorld, validScene and characterFields from the file


## Definition of done
- Tests pass and fail if the check is removed


## Clarifying questions
- None
