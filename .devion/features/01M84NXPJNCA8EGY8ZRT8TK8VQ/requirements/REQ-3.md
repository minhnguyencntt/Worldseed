---
id: "01M84NXPJN7Q60E5W6Q8KG3E5X"
kind: requirement
parent: 01M84NXPJNCA8EGY8ZRT8TK8VQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Old RoundBadge and Countdown usage is removed from the App layout

Context: App renders RoundBadge and Countdown inside the scene slot, duplicating the header. Desired behavior: remove those imports and JSX from App. Expected result: round status and countdown appear only once, in the header. Why: avoid duplicate round UI.

## Acceptance criteria
- Given the playing view, then exactly one element shows the round status and one countdown, both within the header.
- Given the source of App.tsx, then it does not import RoundBadge or Countdown.


## Scope
- In scope: App.tsx imports and JSX
- Out of scope: Deleting RoundBadge.tsx / Countdown.tsx
- Out of scope: Their own tests
- Preserve: HeaderOverlay's internal Countdown use


## Dependencies
- REQ2


## Definition of done
- No RoundBadge or Countdown in App


## Clarifying questions
- None
