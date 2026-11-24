---
id: "01M858C7X90KMH6CWECP6HQB63"
kind: unit
parent: 01M858C7X9RRHZB84P976QTN84
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Type the asset callback in BootScene.preload

Annotate the find callback parameter in BootScene.preload with the manifest asset entry type.

## Acceptance criteria
- No TS7006 at BootScene.ts line 42
- Preload still loads image assets


## Scope
- In scope: BootScene.ts preload
- Out of scope: manifest schema
- Preserve: load.image call


## Technical constraints
- Use the asset type inferred from the manifest schema already exported
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Definition of done
- Callback typed


## Clarifying questions
- None
