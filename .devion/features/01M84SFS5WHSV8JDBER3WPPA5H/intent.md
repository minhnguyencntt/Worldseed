---
id: "01M84SFS5WHSV8JDBER3WPPA5H"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-4.1.3 · Replace Phaser 4-only APIs with 3.90 equivalents in the Phaser modules

Context: package.json pins phaser ~3.90.0. The files game/frontend/src/phaser/BootScene.ts, config.ts, createGame.ts, events.ts and game/frontend/src/components/PhaserHost.tsx were read. They use Phaser.AUTO, Phaser.Scale.FIT, Phaser.Scale.CENTER_BOTH, render.pixelArt/roundPixels/antialias, Phaser.Scenes.Events.SHUTDOWN, game.scale.refresh() and game.destroy(true). All of these exist in 3.90. No Phaser 4-only API was found. Desired behavior: the audit is recorded as the code stays on 3.90-only APIs, and mocked unit tests fail if a Phaser 4-only API is introduced. Why: Phaser is pinned to 3.90 and Phaser 4-only APIs would break at runtime.

## Acceptance criteria
- Given the five files, when they are scanned, then none references a Phaser 4-only API such as Phaser.Renderer.WebGL.Renderer.Filters, Phaser.GameObjects.Filters or the setFilter/enableFilters family.
- Given buildGameConfig with a mocked phaser module, when called, then it returns the 3.90 config shape (type AUTO, 640x360, pixelArt, roundPixels, FIT scaling).
- Given BootScene and PhaserHost with phaser mocked, when mounted and unmounted, then only 3.90 methods are called (events.once, scale.refresh, destroy(true)) and the scene unsubscribes on shutdown.


## Scope
- In scope: game/frontend/src/phaser/BootScene.ts
- In scope: game/frontend/src/phaser/config.ts
- In scope: game/frontend/src/phaser/createGame.ts
- In scope: game/frontend/src/phaser/events.ts
- In scope: game/frontend/src/components/PhaserHost.tsx
- Out of scope: Upgrading Phaser
- Out of scope: Changing the package.json or lockfile pin
- Out of scope: Adding new scenes
- Preserve: Typed event bus contract
- Preserve: Single Phaser instance per host
- Preserve: Pixel-art render settings


## Technical constraints
- Phaser stays at ~3.90.0
- Tests use vitest with phaser mocked and no browser


## Definition of done
- Each requirement has Act and Verify units completed
- All new unit tests pass


## Clarifying questions
- None
