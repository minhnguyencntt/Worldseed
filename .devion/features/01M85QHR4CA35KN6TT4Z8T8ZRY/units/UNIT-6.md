---
id: "01M85QHR4E30J79V9VMFMHTYFS"
kind: unit
parent: 01M85QHR4DAM42W8HY9RXH8ZFM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: 480x270 constants and computeZoom unit tests

Test constants and computeZoom with Phaser mocked, and confirm no existing test assumes 640x360.

## Acceptance criteria
- Tests assert 480x270 constants and config width/height.
- Tests assert computeZoom results for several sizes and DPR values and the clamp/invalid cases.


## Scope
- In scope: game/frontend/tests/computeZoom.test.ts
- In scope: game/frontend/tests/phaserConfig.test.ts
- Out of scope: Product code edits
- Preserve: Existing phaserConfig and phaserHost tests (they use computeZoom, not literal sizes)


## Technical constraints
- Phaser mocked with vi.mock('phaser'); unit tests only.


## Dependencies
- ACT-RES


## Definition of done
- tests pass


## Clarifying questions
- None
