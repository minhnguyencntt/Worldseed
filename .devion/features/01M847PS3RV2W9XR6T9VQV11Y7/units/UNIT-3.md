---
id: "01M847PS3SBPMM0W1HZBBG9971"
kind: unit
parent: 01M847PS3RVCAJMFMJRDF5ZSY3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add token-gated AdminApp with Round controls

Implement admin client functions taking a token, the TokenGate form, AdminApp round view and route selection by location.hash.

## Acceptance criteria
- Admin calls send the Bearer header
- AdminApp renders gate until token set
- Route #/admin renders AdminApp


## Scope
- In scope: client.ts
- In scope: TokenGate.tsx
- In scope: AdminApp.tsx
- In scope: main.tsx
- Out of scope: Tests
- Preserve: Default route renders App


## Technical constraints
- No router dependency
- New file: `game/frontend/src/api/client.ts`
- New file: `game/frontend/src/components/TokenGate.tsx`
- New file: `game/frontend/src/components/AdminApp.tsx`
- Code path: `game/frontend/src/main.tsx`
- Code path: `game/frontend/src/styles.css`


## Dependencies
- REQ-3


## Definition of done
- tsc passes


## Clarifying questions
- None
