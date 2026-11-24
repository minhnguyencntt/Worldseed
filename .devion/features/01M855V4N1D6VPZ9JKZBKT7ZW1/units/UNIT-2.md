---
id: "01M855V4N1PK8C6YECCCZJANN9"
kind: unit
parent: 01M855V4N174WC53KBTD8Z7YYF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Resolve texture keys and generate fallback in BootScene

Add resolver param to createPhaserEffectContext, generate the fallback texture in preload, track failed ids.

## Acceptance criteria
- dust uses resolved key
- loaderror ids map to fallback


## Scope
- In scope: effectContext.ts
- In scope: BootScene.ts
- Out of scope: content.ts
- Preserve: shutdown cleanup


## Technical constraints
- Phaser 3.90
- Code path: `game/frontend/src/phaser/effectContext.ts`
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Dependencies
- ACT1


## Definition of done
- resolver used for every texture key


## Clarifying questions
- None
