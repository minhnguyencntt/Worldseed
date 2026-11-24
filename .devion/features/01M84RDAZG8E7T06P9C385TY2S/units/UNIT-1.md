---
id: "01M84RDAZHXE7J942V4BR0BF0D"
kind: unit
parent: 01M84RDAZGR8REASBKE89M9M5S
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add phaser dependency, createGame factory, game config and PhaserHost

Context: no Phaser code exists. Implement the dependency, a testable factory, config with pixel-art settings and a lifecycle-safe host component. Expected result: PhaserHost renders a div container and owns one game instance.

## Acceptance criteria
- Given the package manifest, When read, Then phaser is ^3.90.0.
- Given PhaserHost source, When read, Then it guards creation with a ref and destroys in effect cleanup.


## Scope
- In scope: package.json
- In scope: config.ts
- In scope: createGame.ts
- In scope: PhaserHost.tsx
- Out of scope: tests
- Out of scope: scenes
- Preserve: existing dependencies


## Technical constraints
- Phaser 3.90
- Code path: `game/frontend/package.json`
- New file: `game/frontend/src/phaser/config.ts`
- New file: `game/frontend/src/phaser/createGame.ts`
- New file: `game/frontend/src/components/PhaserHost.tsx`


## Dependencies
- REQ1


## Definition of done
- Files exist and tsc --noEmit passes


## Clarifying questions
- None
