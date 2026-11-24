---
id: "01M844Z5BYV93BJGSGTRSHHZZT"
kind: requirement
parent: 01M844Z5BYSQ03SPD4YVSF3YEC
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Frontend tsc --noEmit passes with Node test types

Context: tests/layout.test.tsx imports node:fs and node:path and uses process.cwd(), but tsconfig types is ["vite/client","vitest/globals"] and @types/node is not installed, giving TS2307/TS2591. Desired behavior: tsc --noEmit is clean. Expected result: zero type errors. Why: type-check is a gate for the assembled frontend.

## Acceptance criteria
- Given package.json, when devDependencies are read, then @types/node is listed
- Given tsconfig.json, when compilerOptions.types is read, then it includes "node" alongside "vite/client" and "vitest/globals"
- Given game/frontend, when tsc --noEmit runs, then no TS2307 or TS2591 errors remain


## Scope
- In scope: Add @types/node devDependency
- In scope: Add node to tsconfig types
- Out of scope: Changing test logic in layout.test.tsx
- Preserve: strict mode
- Preserve: @game/* path alias


## Technical constraints
- Do not loosen strict or skipLibCheck settings


## Definition of done
- tsc --noEmit reports 0 errors


## Clarifying questions
- None
