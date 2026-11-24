---
id: "01M844Z5BY4C038KA2VQ54YQ4P"
kind: unit
parent: 01M844Z5BYV93BJGSGTRSHHZZT
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Type-check config unit tests

Test that tsconfig.json types includes node and package.json lists @types/node, so the tsc gate is satisfied.

## Acceptance criteria
- Test asserts tsconfig types contains node, vite/client and vitest/globals
- Test asserts @types/node is in devDependencies


## Scope
- In scope: tests/typecheck.test.ts
- Out of scope: Running tsc inside the test
- Preserve: Existing tests


## Technical constraints
- Reads files from disk only; no network or child processes


## Definition of done
- Test passes


## Clarifying questions
- None
