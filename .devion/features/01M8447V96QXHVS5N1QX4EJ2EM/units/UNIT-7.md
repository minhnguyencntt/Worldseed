---
id: "01M8447V97F7PV7034BXX3T35N"
kind: unit
parent: 01M8447V96WTK64GW2X0GAT7S5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: IntroScreen and StoryPanel unit tests

Unit tests written from the requirement spec with storage and DOM faked via jsdom; no server or browser is started.

## Acceptance criteria
- Tests fail without the Act and pass with it
- Each test maps to a requirement acceptance criterion


## Scope
- In scope: game/frontend/tests/story.test.tsx
- Out of scope: Product code
- Preserve: Act code


## Technical constraints
- Vite + React + TypeScript under game/frontend/
- Reuse game/src runtime via imports; do not copy it


## Definition of done
- Listed tests pass in seconds


## Clarifying questions
- None
