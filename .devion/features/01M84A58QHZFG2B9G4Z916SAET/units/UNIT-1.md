---
id: "01M84A58QJ2QCCED5HJPH0ETWM"
kind: unit
parent: 01M84A58QJ2GVQ576HZF7ZTC7R
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add getWorld client and show the World title in AdminApp

Add getWorld to the API client and use it in AdminApp to show the title.

## Acceptance criteria
- getWorld GETs /api/v1/worlds/{id} and returns {id,title}.
- AdminApp heading shows the title, falling back to WORLD_ID.


## Scope
- In scope: client.ts
- In scope: AdminApp.tsx
- Out of scope: Tests
- Preserve: Other client functions


## Technical constraints
- Code path: `game/frontend/src/api/client.ts`
- Code path: `game/frontend/src/components/AdminApp.tsx`


## Definition of done
- Type-checks; heading uses title


## Clarifying questions
- None
