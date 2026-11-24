---
id: "01M84SFS5WAA6CSJ3WEXC2M417"
kind: unit
parent: 01M84SFS5WW0K1TN4377M18QZT
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Document the 3.90 lifecycle APIs in BootScene and PhaserHost

The audit found BootScene and PhaserHost use only 3.90 APIs. Add comments naming them. Do not change behavior.

## Acceptance criteria
- Given BootScene.ts, when read, then a comment states it uses Phaser.Scenes.Events.SHUTDOWN and this.events.once from 3.90.
- Given PhaserHost.tsx, when read, then a comment states it uses game.scale.refresh and game.destroy(true) from 3.90.


## Scope
- In scope: BootScene.ts
- In scope: PhaserHost.tsx
- Out of scope: Behavior changes
- Preserve: Lifecycle behavior


## Technical constraints
- Comments only
- Code path: `game/frontend/src/phaser/BootScene.ts`
- Code path: `game/frontend/src/components/PhaserHost.tsx`


## Definition of done
- Comments added; tests/bootScene.test.ts and tests/phaserHost.test.tsx still pass


## Clarifying questions
- None
