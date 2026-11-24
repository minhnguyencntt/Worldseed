---
id: "01M859KF8TPQ7FDEZ3HAZ3XF6J"
kind: unit
parent: 01M859KF8TM69TJEVPGAFV4MVC
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Author opening dialogue branches in bedroom.yaml

Give each intro choice a next node and set_flag events.

## Acceptance criteria
- Intro choice 0 goes to look-around and sets looked_around
- Intro choice 1 goes to explore and sets exploring


## Scope
- In scope: bedroom.yaml dialogue
- In scope: world.yaml flags
- Out of scope: Tests
- Preserve: Intro text


## Technical constraints
- Existing GameEvent types only
- Code path: `game/src/content/worlds/the-boys-room/scenes/bedroom.yaml`
- Code path: `game/src/content/worlds/the-boys-room/world.yaml`


## Dependencies
- REQ2


## Definition of done
- Branch nodes authored


## Clarifying questions
- None
