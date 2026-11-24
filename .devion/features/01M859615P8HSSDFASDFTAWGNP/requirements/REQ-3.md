---
id: "01M859615P114GZNH2TCVQA9EX"
kind: requirement
parent: 01M859615P8HSSDFASDFTAWGNP
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Scene suite proves hover, click and missing-asset fallback with Phaser mocked via @game

Context: SceneObject wires onHover/onClick; BootScene (frontend/src/phaser/BootScene.ts) uses planPreload and resolveTextureKey with FALLBACK_KEY. Desired behavior: suite asserts these through @game with phaser mocked. Expected result: passes together with REQ-B suite. Why: confirms SG-5.6.2 areas 4-5.

## Acceptance criteria
- Given a visible object, when hover is true then false, then setHighlighted and setLabelVisible get true then false
- Given a visible synced object, when click fires, then the listener receives objectId and available actions; a hidden object emits nothing
- Given an asset id absent from the manifest, when resolveTextureKey runs, then it returns the fallback key
- Given a scene referencing an unknown asset, when preload runs, then it is not loaded and the fallback texture is generated


## Scope
- In scope: hover
- In scope: click
- In scope: fallback texture
- Out of scope: real Phaser rendering
- Preserve: tests/preload.test.ts


## Technical constraints
- Mock 'phaser' and frontend runtime modules with vi.mock


## Dependencies
- REQ-A


## Definition of done
- suite green


## Clarifying questions
- None
