---
id: "01M85VQ95TYJNT4BCKJ4G8EWRV"
kind: unit
parent: 01M85VQ95S3EEFDY0MT6XG2E13
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Point Vite publicDir at game/public

Add publicDir to the Vite config so assets/ URLs used by BootScene reach game/public/assets.

## Acceptance criteria
- vite.config.ts exports publicDir resolving to game/public
- Existing alias, server.fs and test config in vite.config.ts are unchanged


## Scope
- In scope: vite.config.ts
- Out of scope: BootScene
- Preserve: alias, server.fs and test config


## Technical constraints
- Vite stays
- Code path: `game/frontend/vite.config.ts`


## Dependencies
- R3
- A2


## Definition of done
- publicDir set


## Clarifying questions
- None
