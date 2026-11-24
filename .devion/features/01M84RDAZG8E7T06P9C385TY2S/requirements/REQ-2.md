---
id: "01M84RDAZH8ZAJAP4ACCCSKXVB"
kind: requirement
parent: 01M84RDAZG8E7T06P9C385TY2S
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · A typed event bus defines Phaser to React and React to Phaser events

Context: no bridge exists between Phaser and React. Desired behavior: create src/phaser/events.ts with PhaserToReactEvents (objectHover {id: string|null}, objectClick {id: string}, sceneReady {sceneId: string}) and ReactToPhaserEvents (highlightObject {id: string|null}, playAnimation {target: string, name: string}, transitionTo {sceneId: string}). Provide createEventBus<T>() with on (returning unsubscribe), off, emit and clear, and two exported buses. Expected result: typed delivery with no Phaser import. Why: React and Phaser need decoupled communication.

## Acceptance criteria
- Given a listener on objectClick, When emit('objectClick', {id:'bookshelf'}) runs, Then the listener receives {id:'bookshelf'} once.
- Given the unsubscribe returned by on is called, When emit runs again, Then the listener is not called.
- Given clear() is called, When any event is emitted, Then no listener is called.
- Given the events module, When it is imported, Then it does not import phaser.


## Scope
- In scope: createEventBus
- In scope: two event maps
- In scope: exported buses
- Out of scope: wiring into scenes
- Preserve: existing store


## Technical constraints
- TypeScript generics keyed by event map
- No Phaser import in events.ts


## Dependencies
- INT


## Definition of done
- events.ts typechecks with generic event maps


## Non-functional requirements
- No listener leaks after unsubscribe


## Clarifying questions
- None
