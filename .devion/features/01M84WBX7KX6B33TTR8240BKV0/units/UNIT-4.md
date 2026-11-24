---
id: "01M84WBX7KZF5NBVNJ8CJZC51Z"
kind: unit
parent: 01M84WBX7KY58B9P1FQZG74HWK
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add effects schema, effect entities and fade transition

Extend sceneSchema, create effect entities, add runTransition and wire into buildScene and WorldScene; add effect entries to bedroom.yaml.

## Acceptance criteria
- Scenes without effects parse with an empty effects list and effect entries create dust and overlay handles
- runTransition calls fade out, then swap, then fade in


## Scope
- In scope: game/src/content/schema.ts
- In scope: game/src/state/types.ts
- In scope: game/src/entities/effects.ts
- In scope: game/src/engine/transition.ts
- In scope: game/src/scenes/buildScene.ts
- In scope: game/src/content/worlds/the-boys-room/scenes/bedroom.yaml
- In scope: game/frontend/src/phaser/WorldScene.ts
- Out of scope: tests


## Technical constraints
- Code path: `game/src/content/schema.ts`
- Code path: `game/src/state/types.ts`
- New file: `game/src/entities/effects.ts`
- New file: `game/src/engine/transition.ts`
- New file: `game/src/scenes/buildScene.ts`
- Code path: `game/src/content/worlds/the-boys-room/scenes/bedroom.yaml`
- New file: `game/frontend/src/phaser/WorldScene.ts`


## Definition of done
- Typechecks


## Clarifying questions
- None
