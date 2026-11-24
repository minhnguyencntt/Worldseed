---
id: "01M84SNEWGC9WK158BGV5ZA68N"
kind: unit
parent: 01M84SNEWGRWYXCN6PH7WQKWRN
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add phaserPinProblems helper

Create src/lib/phaserPin.ts exporting phaserPinProblems(pkg, lock) that validates the three phaser fields against 3.90.x.

## Acceptance criteria
- Returns [] for 3.90.x inputs
- Returns one message per bad field for 4.x inputs


## Scope
- In scope: game/frontend/src/lib/phaserPin.ts
- Out of scope: Tests
- Preserve: cn in utils.ts


## Technical constraints
- No new dependencies
- New file: `game/frontend/src/lib/phaserPin.ts`


## Dependencies
- R1


## Definition of done
- npm run typecheck passes


## Clarifying questions
- None
