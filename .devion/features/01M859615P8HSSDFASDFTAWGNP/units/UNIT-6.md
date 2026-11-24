---
id: "01M859615Q787B60A8Z0ZRT5WE"
kind: unit
parent: 01M859615P114GZNH2TCVQA9EX
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Scene hover, click and missing-asset fallback unit tests with Phaser mocked via @game

Context: ACT-C confirmed hover, click and fallback paths. Desired behavior: a suite asserts them through @game with phaser mocked. Expected result: tests pass together with the build suite. Why: proves REQ-C from the spec.

## Acceptance criteria
- Hover true/false toggles highlight and label
- Click emits objectId and actions only when visible
- Unknown asset resolves to fallback key and fallback texture is generated


## Scope
- In scope: tests/sceneAliasInteraction.test.ts
- Out of scope: real rendering
- Preserve: preload.test.ts


## Technical constraints
- vi.mock('phaser') and the frontend runtime/store/events/effectContext modules, mirroring tests/preload.test.ts


## Dependencies
- ACT-C
- VER-B


## Definition of done
- test passes; all scene tests pass together


## Clarifying questions
- None
