---
id: "01M85HGG8N3KXMBMCZ9JBAWQRD"
kind: unit
parent: 01M85HGG8M1WGM30SXSRNTPF5W
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: highlightObject focuses scene objects and unsubscribes on shutdown

Fake scene objects with focus/blur spies and mocked Phaser.

## Acceptance criteria
- Focus and blur by id
- Null clears all
- No effect after shutdown


## Scope
- In scope: game/frontend/tests/bootSceneHighlight.test.ts
- Out of scope: Source changes


## Technical constraints
- Phaser mocked


## Dependencies
- ACT-2


## Definition of done
- Test file passes


## Clarifying questions
- None
