---
id: "01M85KEAVYT83W8JGKVND4G11Z"
kind: unit
parent: 01M85KEAVYC749XHV0V461PZ5E
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Blur focused objects and clear store focus in the BootScene SHUTDOWN handler

Edit the SHUTDOWN callback in BootScene.create so focused objects are blurred before destruction and the store focus is cleared after unsubscribing.

## Acceptance criteria
- Focused objects are blurred on shutdown.
- Store focusedObjectId is null after shutdown.


## Scope
- In scope: BootScene.ts SHUTDOWN handler
- Out of scope: Tests
- Preserve: Existing cleanup lines


## Technical constraints
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Definition of done
- Handler blurs objects, unsubscribes, then calls setFocusedObject(null)


## Clarifying questions
- None
