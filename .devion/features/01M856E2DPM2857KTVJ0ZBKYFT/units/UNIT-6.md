---
id: "01M856E2DQ1GHMF9WWP23VVYY3"
kind: unit
parent: 01M856E2DP1WHWVGHQY520WGGC
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: preload.test.ts BootScene planner and fallback unit tests

Add BootScene tests to game/tests/preload.test.ts mirroring the mocking pattern of game/frontend/tests/bootScenePreload.test.ts.

## Acceptance criteria
- Given known bed and unknown ghost refs, when preload runs, then load.image is called once for objects/bed and console.warn names objects/ghost
- Given unknown id, when resolveKey runs, then FALLBACK_KEY returned
- Given loaderror on a known id, when resolveKey runs, then FALLBACK_KEY returned


## Scope
- In scope: BootScene describe in preload.test.ts
- Out of scope: Real Phaser
- Preserve: Frontend tests


## Technical constraints
- vi.mock phaser (Scene class with events.once), the content module, ../store/gameStore, ./events and ./effectContext paths of BootScene using absolute frontend paths


## Dependencies
- ACT2


## Definition of done
- Tests pass


## Clarifying questions
- None
