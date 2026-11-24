---
id: "01M84SFS5WW0K1TN4377M18QZT"
kind: requirement
parent: 01M84SFS5WHSV8JDBER3WPPA5H
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene.ts and PhaserHost.tsx use only Phaser 3.90 APIs

Context: BootScene uses Phaser.Scenes.Events.SHUTDOWN and this.events.once; PhaserHost uses game.scale.refresh() and game.destroy(true). Desired behavior: these remain 3.90 APIs, documented, and covered by mocked tests. Why: guards the lifecycle on the pinned version.

## Acceptance criteria
- Given BootScene.create with phaser mocked, when SHUTDOWN is emitted, then the store subscription is removed.
- Given PhaserHost mounted and unmounted with createGame mocked, then scale.refresh is called on resize and destroy(true) is called once on unmount.
- Given the two source files, when scanned, then no Phaser 4-only API is referenced.


## Scope
- In scope: BootScene.ts
- In scope: PhaserHost.tsx
- Out of scope: config.ts
- Out of scope: New scenes
- Preserve: sceneReady emission
- Preserve: Single instance per host


## Technical constraints
- Phaser ~3.90.0


## Definition of done
- Comments added and tests pass


## Clarifying questions
- None
