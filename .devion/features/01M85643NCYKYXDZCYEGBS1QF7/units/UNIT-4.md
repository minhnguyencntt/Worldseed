---
id: "01M85643NDKT0TCTDZGW5K5P80"
kind: unit
parent: 01M85643NDTVPSXJZ4PQS2PXG9
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: preload.test.ts BootScene planner and fallback unit tests

Extend game/tests/preload.test.ts with a BootScene block mirroring the mocking pattern in game/frontend/tests/bootScenePreload.test.ts (the BootScene.preload and resolveKey contract in game/frontend/src/phaser/BootScene.ts).

## Acceptance criteria
- Only the known referenced asset is loaded
- Unknown ref triggers console.warn
- Fallback key used for unknown or failed ids


## Scope
- In scope: BootScene describe block in preload.test.ts
- Out of scope: Real Phaser
- Preserve: Planner tests


## Technical constraints
- vi.mock('phaser'), vi.mock of '../frontend/src/runtime/content' and '../frontend/src/store/gameStore' if needed


## Definition of done
- Command passes


## Clarifying questions
- None
