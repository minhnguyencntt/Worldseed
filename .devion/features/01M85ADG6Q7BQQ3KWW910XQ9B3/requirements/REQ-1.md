---
id: "01M85ADG6QDV739P55F52KBW3X"
kind: requirement
parent: 01M85ADG6Q7BQQ3KWW910XQ9B3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · PhaserToReactEvents declares a typed characterClick event

Context: events.ts defines PhaserToReactEvents with objectHover, objectClick and sceneReady. Desired behavior: add characterClick: { id: string } so emit and on are type-checked for it. Expected result: handlers subscribed to characterClick receive the payload. Why: React needs a typed NPC click signal distinct from object clicks.

## Acceptance criteria
- Given phaserToReact, When emit('characterClick', { id: 'boy' }) is called, Then a handler registered via on('characterClick') is called once with { id: 'boy' }.
- Given the events file, When type-checked, Then characterClick payload is { id: string } and existing events are unchanged.


## Scope
- In scope: PhaserToReactEvents interface in events.ts
- Out of scope: BootScene emission
- Out of scope: React subscribers
- Preserve: existing events and createEventBus behavior


## Technical constraints
- Keep events.ts dependency-free


## Definition of done
- characterClick present in PhaserToReactEvents


## Clarifying questions
- None
