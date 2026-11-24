---
id: "01M864WDRBMVD1TAJ3G8BXWFWW"
kind: unit
parent: 01M864WDRB4PZ82B17RQYF3YWQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Base typography and backdrop CSS unit tests

Write tests/baseTypography.test.ts that reads src/styles.css with node:fs and asserts the rules, from R1 acceptance criteria.

## Acceptance criteria
- body rule uses ink-1, parchment-5, VT323 20px
- h1,h2 use the pixel font and sf-dialog exists


## Scope
- In scope: game/frontend/tests/baseTypography.test.ts
- Out of scope: Browser rendering
- Preserve: Existing tests


## Technical constraints
- Filesystem reads only the repo stylesheet


## Definition of done
- Test passes


## Clarifying questions
- None
