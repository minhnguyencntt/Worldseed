---
id: "01M85WR55CRBS31SS65AHBA322"
kind: unit
parent: 01M85WR55CYWB99P9V3J3VJ8MR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add lighting effect schema variants and author them in bedroom.yaml

Add four zod variants to effectSchema and declare the effects in bedroom.yaml, replacing the non-palette ambientLight colour with a palette colour.

## Acceptance criteria
- effectSchema parses the four new types
- bedroom.yaml lists six non-transition effects with PALETTE colours


## Scope
- In scope: schema.ts
- In scope: bedroom.yaml
- Out of scope: rendering
- Preserve: existing variants


## Technical constraints
- Shared palette only
- Data-driven content
- Code path: `game/src/content/schema.ts`
- Code path: `game/src/content/worlds/the-boys-room/scenes/bedroom.yaml`


## Dependencies
- REQ1


## Definition of done
- Schema and YAML updated; typecheck passes


## Clarifying questions
- None
