---
id: "01M855ASGSE2VSGC14RR5GP19F"
kind: unit
parent: 01M855ASGSKJS9WVS6S394X2KQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Wire preload and fallback texture into BootScene

Export the parsed manifest from runtime/content.ts and add preload() to BootScene using planPreload and a generated fallback texture on loaderror.

## Acceptance criteria
- preload queues planned entries
- loaderror registers a fallback texture


## Scope
- In scope: BootScene.ts
- In scope: runtime/content.ts
- Out of scope: tests
- Preserve: create() behavior


## Technical constraints
- Phaser 3.90 loader API
- Code path: `game/frontend/src/runtime/content.ts`
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Definition of done
- tsc --noEmit passes


## Clarifying questions
- None
