---
id: "01M85Z6HPCTR1KPSJ7E8EZ405Z"
kind: unit
parent: 01M85Z6HPBK4R3CVWV5SC2HRFM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: hover emission and overlay plate and action list unit tests

Test SceneObject hover callback, BootScene emission with Phaser mocked, and ObjectOverlay output from the real bedroom content.

## Acceptance criteria
- objectHover emission verified
- Plate and action list verified against content
- Click calls game.act


## Scope
- In scope: frontend/tests/objectOverlay.test.tsx
- In scope: frontend/tests/bootSceneHover.test.ts
- Out of scope: Real browser
- Preserve: Existing tests


## Technical constraints
- All dependencies mocked
- Fixtures come from game/src/content/worlds/the-boys-room/scenes/bedroom.yaml via runtime/content, not hard-coded payloads


## Dependencies
- ACT2


## Definition of done
- Test files pass


## Clarifying questions
- None
