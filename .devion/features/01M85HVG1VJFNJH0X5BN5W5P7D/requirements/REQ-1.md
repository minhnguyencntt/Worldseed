---
id: "01M85HVG1VYP9AXT9BCESB9D9Y"
kind: requirement
parent: 01M85HVG1VJFNJH0X5BN5W5P7D
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Typed focusChange and menuClose events exist on the Phaser to React bus

Context: events.ts declares objectHover, objectClick, characterClick and sceneReady. Keyboard handling needs two more typed events. Desired: focusChange carries the focused object id or null, and menuClose carries no data. Why: typed events are required between Phaser and React.

## Acceptance criteria
- Given the bus, when focusChange is emitted with {id:'bookshelf'}, then a subscribed handler receives that payload.
- Given the bus, when menuClose is emitted, then a subscribed handler is called once.


## Scope
- In scope: game/frontend/src/phaser/events.ts
- Out of scope: BootScene changes
- Preserve: Existing event names and payloads


## Technical constraints
- Keep the dependency-free createEventBus


## Definition of done
- Interface compiles with tsc and the events are usable by emit/on


## Clarifying questions
- None
