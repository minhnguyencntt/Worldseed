---
id: "01M859KF8T5AKC120G1N229EM2"
kind: unit
parent: 01M859KF8TRGXPZTM1CXZRTZCZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add contextual action events for bed, computer, window and door

Edit action events in bedroom.yaml so each key object changes flags, inventory or history.

## Acceptance criteria
- Bed search adds old-key
- Computer search sets computer_on
- Window inspect sets window_seen
- Door leave gated on old-key sets door_unlocked


## Scope
- In scope: bedroom.yaml actions
- In scope: world.yaml flags
- Out of scope: Tests
- Preserve: Inspect texts


## Technical constraints
- Action ids from the enum
- Code path: `game/src/content/worlds/the-boys-room/scenes/bedroom.yaml`
- Code path: `game/src/content/worlds/the-boys-room/world.yaml`


## Dependencies
- REQ3


## Definition of done
- Events authored


## Clarifying questions
- None
