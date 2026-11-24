---
id: "01M84MFPVV8H5BJSSV1HW9NJ50"
kind: unit
parent: 01M84MFPVVP1DMDZMHAB763YBX
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add zustand to game/frontend package.json and package-lock.json

Run npm install zustand in game/frontend so package.json dependencies and package-lock.json are updated together. No other dependency changes.

## Acceptance criteria
- Given the change, when package.json is read, then dependencies.zustand exists
- Given the change, when package-lock.json is read, then node_modules/zustand is resolved


## Scope
- In scope: game/frontend/package.json
- In scope: game/frontend/package-lock.json
- Out of scope: Store implementation
- Out of scope: Tests
- Preserve: Existing dependencies and lockfileVersion 3


## Technical constraints
- Use npm, not yarn or pnpm
- Code path: `game/frontend/package.json`
- Code path: `game/frontend/package-lock.json`


## Definition of done
- zustand present in dependencies and lockfile


## Clarifying questions
- None
