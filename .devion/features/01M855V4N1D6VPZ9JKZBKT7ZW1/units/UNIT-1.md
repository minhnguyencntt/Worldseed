---
id: "01M855V4N1SXFTXZNVWT7NYZE1"
kind: unit
parent: 01M855V4N1JCEQFQZBX1GTRH62
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add BootScene.preload driven by planPreload

Bundle manifest.json into runtime/content.ts, validate with parseManifest, and add BootScene.preload that loads planned ids.

## Acceptance criteria
- preload calls this.load.image(id, 'assets/'+path) only for planned image ids
- unknown ids are warned, not loaded


## Scope
- In scope: content.ts
- In scope: BootScene.ts
- Out of scope: effectContext
- Preserve: create()


## Technical constraints
- Phaser 3.90
- Code path: `game/frontend/src/runtime/content.ts`
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Definition of done
- BootScene has preload using planPreload


## Clarifying questions
- None
