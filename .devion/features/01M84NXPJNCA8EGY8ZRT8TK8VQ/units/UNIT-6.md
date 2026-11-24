---
id: "01M84NXPJP232MMP8W6D6XAWYG"
kind: unit
parent: 01M84NXPJN7Q60E5W6Q8KG3E5X
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: No standalone RoundBadge or Countdown in App unit tests

Assert round status renders once within header and App source lacks the imports.

## Acceptance criteria
- Status appears once inside header.
- App.tsx source has no RoundBadge/Countdown.


## Scope
- In scope: tests/appNoLegacyRound.test.tsx
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Mock ../src/api/client getCurrentRound with Round-typed fixture matching game/frontend/src/api/client.ts Round


## Definition of done
- Tests pass


## Clarifying questions
- None
