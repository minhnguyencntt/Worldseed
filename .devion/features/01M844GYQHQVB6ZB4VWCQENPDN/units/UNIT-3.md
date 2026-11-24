---
id: "01M844GYQJJHP3CTFWR99N0ZSV"
kind: unit
parent: 01M844GYQJ0W0MES1YFTTSS1AF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: App intro gate unit tests

Write game/frontend/tests/app.test.tsx covering the intro gate with jsdom and the real components; localStorage is jsdom's and is cleared by tests/setup.ts.

## Acceptance criteria
- Given fresh render, the intro text and Begin button show with no hotspots
- Given Begin clicked, the intro is gone


## Scope
- In scope: game/frontend/tests/app.test.tsx
- Out of scope: Product code
- Preserve: tests/setup.ts


## Technical constraints
- Vitest + @testing-library/react; no server or browser


## Dependencies
- A1


## Definition of done
- Intro gate tests pass


## Clarifying questions
- None
