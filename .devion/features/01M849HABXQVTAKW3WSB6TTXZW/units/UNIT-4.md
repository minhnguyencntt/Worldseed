---
id: "01M849HABYXKWQB55MPKD4EGGZ"
kind: unit
parent: 01M849HABYP92DX4GS3MHZEK8S
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: AdminApp execution action error display unit tests

Extend tests/adminActions.test.tsx with failure cases.

## Acceptance criteria
- 500 message shown
- 401 returns to the token gate
- Old error cleared on new action


## Scope
- In scope: tests/adminActions.test.tsx
- Out of scope: Real server
- Preserve: Existing tests


## Technical constraints
- fetch mocked


## Definition of done
- Tests and npm run typecheck pass


## Clarifying questions
- None
