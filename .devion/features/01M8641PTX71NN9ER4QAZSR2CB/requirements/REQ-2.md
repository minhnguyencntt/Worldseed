---
id: "01M8641PTXGRCNHEJC3C09ZMES"
kind: requirement
parent: 01M8641PTX71NN9ER4QAZSR2CB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Non-JSON round responses show an explained message

Context: describeRoundError in App.tsx handles ApiError, TypeError and generic Error, so a SyntaxError from res.json() falls into the generic Error branch and its message is shown. Desired: SyntaxError returns 'Round service returned an unexpected response (not JSON)'. Why: no raw parser text in the UI.

## Acceptance criteria
- Given a SyntaxError, When describeRoundError runs, Then it returns 'Round service returned an unexpected response (not JSON)'
- Given an ApiError, a TypeError, another Error or a non-Error, When describeRoundError runs, Then the output is unchanged


## Scope
- In scope: describeRoundError in game/frontend/src/App.tsx
- Out of scope: client.ts changes
- Preserve: Existing describeRoundError outputs


## Technical constraints
- SyntaxError check must come before the generic Error branch


## Definition of done
- SyntaxError branch added and unit-tested


## Clarifying questions
- None
