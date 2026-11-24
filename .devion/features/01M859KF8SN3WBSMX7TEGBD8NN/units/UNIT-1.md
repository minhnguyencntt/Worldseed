---
id: "01M859KF8TEPSJB6X7K960BM35"
kind: unit
parent: 01M859KF8T3YPJQZBJHA3SVZYN
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add characters schema, animation resolver and Phaser character rendering

Add characters to sceneSchema and SceneDef, a pure resolver, preload of character spritesheets and Phaser sprites in BootScene driven by yaml.

## Acceptance criteria
- sceneSchema accepts characters with required animations.idle
- resolveCharacterAnimation returns manifest animation or idle fallback
- BootScene creates sprites for each character and plays idle then interact on objectClick


## Scope
- In scope: schema.ts
- In scope: types.ts
- In scope: characterAnimation.ts
- In scope: planPreload.ts
- In scope: BootScene.ts
- In scope: bedroom.yaml boy
- Out of scope: Tests
- Preserve: Object rendering


## Technical constraints
- Resolver has no Phaser import
- Code path: `game/src/content/schema.ts`
- Code path: `game/src/state/types.ts`
- New file: `game/src/engine/characterAnimation.ts`
- Code path: `game/src/engine/planPreload.ts`
- Code path: `game/frontend/src/phaser/BootScene.ts`
- Code path: `game/src/content/worlds/the-boys-room/scenes/bedroom.yaml`


## Dependencies
- REQ1


## Definition of done
- Boy defined in bedroom.yaml and animates in BootScene


## Clarifying questions
- None
