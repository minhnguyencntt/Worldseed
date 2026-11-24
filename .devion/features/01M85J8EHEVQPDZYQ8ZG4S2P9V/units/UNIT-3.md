---
id: "01M85J8EHFSH8ZBD7EY4X6P9D4"
kind: unit
parent: 01M85J8EHFY1MFSYQ49XMYSNPW
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Remove scene and store focus in the BootScene SHUTDOWN handler

Extend the SHUTDOWN callback in BootScene.create so focus is cleared after the store is unsubscribed and before objects are destroyed.

## Acceptance criteria
- All objects blurred
- Store focus null


## Scope
- In scope: game/frontend/src/phaser/BootScene.ts
- Out of scope: onStateChange
- Preserve: existing cleanup


## Technical constraints
- Unsubscribe first
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Dependencies
- ACT-1


## Definition of done
- Shutdown clears focus; tsc passes


## Clarifying questions
- None
