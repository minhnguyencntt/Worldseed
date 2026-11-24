---
id: "01M85ADG6RT7YXD7SM8WA51KAR"
kind: unit
parent: 01M85ADG6QDV739P55F52KBW3X
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add characterClick to PhaserToReactEvents

Add characterClick: { id: string } to the PhaserToReactEvents interface so the typed bus accepts it.

## Acceptance criteria
- Given events.ts, When compiled, Then PhaserToReactEvents has characterClick with { id: string }.
- Given the existing events, When compiled, Then objectHover, objectClick and sceneReady are unchanged.


## Scope
- In scope: events.ts interface
- Out of scope: BootScene
- Preserve: createEventBus


## Technical constraints
- Code path: `game/frontend/src/phaser/events.ts`


## Definition of done
- characterClick added to PhaserToReactEvents


## Clarifying questions
- None
