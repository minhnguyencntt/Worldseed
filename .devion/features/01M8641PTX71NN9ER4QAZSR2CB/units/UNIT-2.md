---
id: "01M8641PTX12ZEHKEFXCWAXAWD"
kind: unit
parent: 01M8641PTXGRCNHEJC3C09ZMES
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Handle SyntaxError in describeRoundError

Add a SyntaxError branch to describeRoundError in App.tsx before the generic Error branch.

## Acceptance criteria
- SyntaxError returns the explained message
- Other branches unchanged


## Scope
- In scope: game/frontend/src/App.tsx
- Out of scope: Tests
- Preserve: ApiError, TypeError, Error and fallback outputs


## Technical constraints
- Branch placed before `e instanceof Error && e.message`
- Code path: `game/frontend/src/App.tsx`


## Definition of done
- Branch added


## Clarifying questions
- None
