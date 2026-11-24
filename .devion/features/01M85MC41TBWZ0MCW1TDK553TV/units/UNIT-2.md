---
id: "01M85MC41VEADMWP6RCH24H3YS"
kind: unit
parent: 01M85MC41T37W8R2SXQ896KXFM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Unsubscribe playAnimation in the BootScene SHUTDOWN handler

Call the stored unsubscribe in the SHUTDOWN handler.

## Acceptance criteria
- After shutdown playAnimation no longer reaches the scene
- Character map is cleared


## Scope
- In scope: BootScene.ts SHUTDOWN handler
- Out of scope: Other cleanup
- Preserve: Existing cleanup


## Technical constraints
- Depends on ACT1 fields existing
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Dependencies
- ACT1


## Definition of done
- Shutdown releases the subscription


## Clarifying questions
- None
