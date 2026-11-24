---
id: "01M856R3XH4Q820DBKR1DBD8TD"
kind: unit
parent: 01M856R3XHF1HXW7QZM0KR0W2H
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Build scene objects in BootScene.create via buildScene

Add a validated sceneSpec export to runtime/content.ts and make BootScene.create build objects through buildScene with the Phaser render context, destroying them on shutdown.

## Acceptance criteria
- create calls buildScene(ctx, sceneSpec) once
- Shutdown destroys every built object


## Scope
- In scope: content.ts
- In scope: BootScene.ts
- Out of scope: State sync
- Preserve: Effects and transition wiring


## Technical constraints
- Use sceneSchema.parse
- Code path: `game/frontend/src/runtime/content.ts`
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Dependencies
- R2
- A1


## Definition of done
- BootScene holds sceneObjects built from content only


## Clarifying questions
- None
