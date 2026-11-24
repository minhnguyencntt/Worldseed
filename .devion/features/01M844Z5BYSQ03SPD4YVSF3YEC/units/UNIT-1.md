---
id: "01M844Z5BYK3P1057MPSR4666C"
kind: unit
parent: 01M844Z5BYV93BJGSGTRSHHZZT
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Declare @types/node and node types in tsconfig

Add @types/node to devDependencies in game/frontend/package.json and add "node" to compilerOptions.types in game/frontend/tsconfig.json so layout.test.tsx type-checks.

## Acceptance criteria
- package.json devDependencies contains @types/node
- tsconfig.json types contains node
- tsc --noEmit exits 0


## Scope
- In scope: package.json
- In scope: tsconfig.json
- Out of scope: Test files
- Preserve: Other dependencies


## Technical constraints
- Code path: `game/frontend/package.json`
- Code path: `game/frontend/tsconfig.json`


## Definition of done
- tsc --noEmit exits 0


## Clarifying questions
- None
