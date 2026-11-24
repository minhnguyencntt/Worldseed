---
id: "01M84TJ7NVJEYQ6T3JDBETWZTV"
kind: unit
parent: 01M84TJ7NVJETW3NRAFTET87R2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add guard CLI script and chain it into the test script

Run checkTrackedFiles against real git and run it before vitest in npm test.

## Acceptance criteria
- Script exits non-zero when a dependency path is tracked
- scripts.test runs the guard before vitest run


## Scope
- In scope: game/frontend/scripts/assertNoTrackedNodeModules.ts
- In scope: game/frontend/package.json
- Out of scope: tests
- Preserve: other scripts


## Technical constraints
- Reuse execFileSync like untrackNodeModules.ts
- New file: `game/frontend/scripts/assertNoTrackedNodeModules.ts`
- Code path: `game/frontend/package.json`


## Dependencies
- ACT1


## Definition of done
- npm test invokes guard first


## Clarifying questions
- None
