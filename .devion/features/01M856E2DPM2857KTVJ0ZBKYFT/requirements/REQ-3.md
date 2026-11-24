---
id: "01M856E2DP1WHWVGHQY520WGGC"
kind: requirement
parent: 01M856E2DPM2857KTVJ0ZBKYFT
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · preload.test.ts proves BootScene uses the planner and the fallback texture

Context: BootScene.preload calls planPreload, loads only planned image assets, warns on unknown ones and generates fallback:missing; resolveKey uses resolveTextureKey. Desired behavior: the fallback key is an exported constant and preload.test.ts asserts planner use and fallback resolution. Expected result: passing BootScene tests with phaser, content, gameStore, events and effectContext mocked. Why: criteria of SG-5.4.3.

## Acceptance criteria
- Given scene refs objects/bed (known) and objects/ghost (unknown), when preload runs, then load.image is called once with objects/bed and its manifest path and a warning names objects/ghost
- Given an unknown id, when resolveKey runs, then it returns the exported FALLBACK_KEY
- Given a loaderror for a known id, when resolveKey runs, then it returns FALLBACK_KEY


## Scope
- In scope: Export FALLBACK_KEY from BootScene.ts
- In scope: BootScene tests in preload.test.ts
- Out of scope: Behavior changes to preload or resolveKey
- Preserve: Existing frontend BootScene tests


## Technical constraints
- vi.mock phaser, ../src/runtime/content equivalents, store, events and effectContext; no real Phaser


## Dependencies
- REQ2


## Definition of done
- BootScene tests pass


## Clarifying questions
- None
