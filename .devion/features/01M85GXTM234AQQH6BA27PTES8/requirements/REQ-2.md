---
id: "01M85GXTM3Z9TF48ZF30BBXZ6B"
kind: requirement
parent: 01M85GXTM234AQQH6BA27PTES8
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Canvas objectClick events select the object and open the ActionMenu

Context: BootScene emits phaserToReact 'objectClick' {id}, but nothing in src consumes it; selection currently comes only from SceneView buttons calling setSelectedId. Desired behavior: App subscribes to phaserToReact.on('objectClick') and calls setSelectedId(id), unsubscribing on unmount. Expected result: a canvas click opens the ActionMenu for that object. Why: interactions must keep updating real game state after the HTML hotspots are gone.

## Acceptance criteria
- Given the App is mounted, when phaserToReact emits objectClick with id bookshelf, then the ActionMenu shows the bookshelf actions.
- Given the App is unmounted, when objectClick is emitted afterwards, then no handler runs and no React state update warning occurs.
- Given the ActionMenu is open, when an action is chosen, then game state updates through useGame.act as before.


## Scope
- In scope: objectClick subscription in App.tsx
- Out of scope: Hover, characterClick and highlightObject handling
- Preserve: useGame.act and choose behavior
- Preserve: event bus API in phaser/events.ts


## Technical constraints
- Use the existing phaserToReact bus and its on() unsubscribe function


## Definition of done
- Subscription added before the early return so hook order is stable
- Unsubscribes on unmount


## Non-functional requirements
- No leaked listeners after unmount


## Clarifying questions
- None
