---
id: "01M844GYQJ55B1RVZJXYYRYX24"
kind: unit
parent: 01M844GYQJKSFBQC069PMYP5R3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: App playing view unit tests

Extend game/frontend/tests/app.test.tsx with tests for the playing view using the real useGame against jsdom localStorage (cleared by tests/setup.ts) and the bedroom.yaml content bundled by content.ts.

## Acceptance criteria
- After Begin the scene, hotspots, toggle and opening dialogue render
- Hotspot click opens the action menu
- Search records history and opens the bookshelf
- Dialogue choice is recorded


## Scope
- In scope: game/frontend/tests/app.test.tsx
- Out of scope: Product code
- Preserve: Intro tests


## Technical constraints
- Fixture is the real content in game/content/worlds/the-boys-room/scenes/bedroom.yaml; do not hard-code a copy


## Dependencies
- A2


## Definition of done
- All app tests pass


## Clarifying questions
- None
