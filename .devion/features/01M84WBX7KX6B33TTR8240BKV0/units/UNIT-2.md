---
id: "01M84WBX7KPSJHSZART7VN5PQV"
kind: unit
parent: 01M84WBX7KJATZPD0TQB1NKDDD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add preload planner and texture resolver with fallback

Add pure planner functions over the manifest and wire WorldScene.preload to queue only planned assets.

## Acceptance criteria
- Plan dedupes refs and reports missing
- resolveTextureKey never throws


## Scope
- In scope: game/src/assets/loaders/preload.ts
- In scope: game/frontend/src/phaser/WorldScene.ts
- Out of scope: tests
- Preserve: manifestLoader exports


## Technical constraints
- New file: `game/src/assets/loaders/preload.ts`
- New file: `game/frontend/src/phaser/WorldScene.ts`


## Definition of done
- Typechecks


## Clarifying questions
- None
