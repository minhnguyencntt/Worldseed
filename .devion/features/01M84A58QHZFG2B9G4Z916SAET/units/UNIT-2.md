---
id: "01M84A58QJ34D6RDJK0ZRZ4F11"
kind: unit
parent: 01M84A58QJ8ZYTYTPZF3QJ0360
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add createRound client and Create round button sending the duration

Add createRound and a button in AdminApp using durationHours.

## Acceptance criteria
- createRound POSTs world_id and duration to /api/v1/admin/rounds.
- Button triggers it, reloads current round, 401 returns to gate.


## Scope
- In scope: client.ts
- In scope: AdminApp.tsx
- Out of scope: Tests
- Preserve: Open/Close buttons


## Technical constraints
- Body fields per backend createRoundRequest
- Code path: `game/frontend/src/api/client.ts`
- Code path: `game/frontend/src/components/AdminApp.tsx`


## Definition of done
- Type-checks


## Clarifying questions
- None
