---
id: "01M84T6537S7DADSBWHFVQ7T52"
kind: unit
parent: 01M84T6537GC5YKDGR64QW90RD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add untrackNodeModules cleanup with an injected git runner

Add GitRunner type and untrackNodeModules to the same module; it lists files via git ls-files and untracks node_modules roots from the index only.

## Acceptance criteria
- Calls git rm -r --cached --ignore-unmatch -- <roots>
- Skips git rm when nothing is tracked


## Scope
- In scope: untrackNodeModules
- Out of scope: Tests
- Preserve: Disk contents


## Technical constraints
- Args as array
- New file: `game/frontend/src/lib/untrackNodeModules.ts`


## Dependencies
- a1


## Definition of done
- untrackNodeModules exported


## Clarifying questions
- None
