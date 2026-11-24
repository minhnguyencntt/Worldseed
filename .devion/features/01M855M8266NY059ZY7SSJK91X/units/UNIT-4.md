---
id: "01M855M826YRQ0V4NDRXM6HX1M"
kind: unit
parent: 01M855M826XA4NEJ3H488X6FR4
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: resolveTextureKey unit tests

Write tests from the REQ2 spec using an in-memory manifest only.

## Acceptance criteria
- Known, unknown and undefined ids are asserted
- The tests pass


## Scope
- In scope: game/tests/resolveTextureKey.test.ts
- Out of scope: Phaser
- Out of scope: Filesystem
- Preserve: Existing tests


## Technical constraints
- Use the literal fallback id 'fallback:missing' in the tests, to match FALLBACK_ASSET_ID in src/assets/loaders/manifestLoader.ts


## Dependencies
- ACT2


## Definition of done
- Tests pass


## Clarifying questions
- None
