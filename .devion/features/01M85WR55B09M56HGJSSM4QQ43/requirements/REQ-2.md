---
id: "01M85WR55CV9APGA6Z00PCTYQS"
kind: requirement
parent: 01M85WR55B09M56HGJSSM4QQ43
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Phaser effect context renders each lighting effect on the effects layer and destroys it

Context: effectContext.ts switch handles dust, ambientLight and transition. Desired: render moonlightShaft, lampGlow, doorLight and vignette as Phaser game objects at spec.depth, with a destroy that removes every object it created. Dust keeps using resolveKey(spec.asset), the generated dust sprite.

## Acceptance criteria
- Given each new effect spec, when createEffect runs with a mocked scene, then a game object is added with setDepth(spec.depth)
- Given a vignette handle, when destroy runs, then every band object it created is destroyed
- Given a dust spec, when createEffect runs, then particles use the key returned by resolveKey for effect:dust


## Scope
- In scope: game/frontend/src/phaser/effectContext.ts
- Out of scope: content changes
- Preserve: existing dust and ambientLight rendering


## Technical constraints
- Phaser stays on 3.90.x
- Use only Phaser 3.90 APIs


## Dependencies
- REQ1


## Definition of done
- All effect types rendered and destroyable


## Non-functional requirements
- Colours parsed from spec hex, no literals


## Clarifying questions
- None
