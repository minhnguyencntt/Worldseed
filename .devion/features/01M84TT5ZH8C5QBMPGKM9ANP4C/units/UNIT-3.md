---
id: "01M84TT5ZHD8S4KAJXF4V3Z26A"
kind: unit
parent: 01M84TT5ZHBN26HBZ1P4G9V2GK
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Chain the guard into the test script

Replace scripts.test value.

## Acceptance criteria
- scripts.test equals the chained command 'vite-node scripts/assertNoTrackedNodeModules.ts && vitest run'.
- All other entries under scripts in package.json are unchanged.


## Scope
- In scope: package.json
- Preserve: other scripts


## Technical constraints
- Code path: `game/frontend/package.json`


## Dependencies
- ACT2


## Definition of done
- package.json updated


## Clarifying questions
- None
