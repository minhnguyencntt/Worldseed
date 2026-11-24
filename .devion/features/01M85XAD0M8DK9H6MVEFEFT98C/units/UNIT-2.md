---
id: "01M85XAD0NNBNMSDKS7DAGWYXQ"
kind: unit
parent: 01M85XAD0NZN5VMA50KKS4VQF5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add @fontsource pixel font packages and import them in main.tsx

Add press-start-2p and vt323 packages and import their css.

## Acceptance criteria
- Both packages in dependencies
- main.tsx imports their 400.css


## Scope
- In scope: package.json
- In scope: package-lock.json
- In scope: main.tsx
- Out of scope: tests
- Preserve: phaser ~3.90.0


## Technical constraints
- Fonts bundled through npm packages, not loaded from a URL
- Phaser stays 3.90.x
- Code path: `game/frontend/package.json`
- Code path: `game/frontend/package-lock.json`
- Code path: `game/frontend/src/main.tsx`


## Dependencies
- R2


## Definition of done
- npm install resolves; fonts imported


## Clarifying questions
- None
