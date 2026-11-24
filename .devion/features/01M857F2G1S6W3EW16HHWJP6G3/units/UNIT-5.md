---
id: "01M857F2G26H5XFTXCEN40Z9C2"
kind: unit
parent: 01M857F2G2ZY5PP9Q73T6NRSDC
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Effect context tests use two arguments and typed mocks

Pass a resolveKey to createPhaserEffectContext in the effects tests and type the particles mock.

## Acceptance criteria
- Given the effects tests, When called with (scene, resolveKey), Then fadeIn and rectangle assertions pass
- Given the typed particles mock, When calls[0][2] is read, Then it equals the fallback key


## Scope
- In scope: two test files
- Out of scope: app code
- Preserve: existing assertions


## Technical constraints
- Phaser scene faked


## Definition of done
- Both files pass and type-check


## Clarifying questions
- None
