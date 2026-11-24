---
id: "01M859615QVHM49QFHSRJYPHBH"
kind: unit
parent: 01M859615PS01QZJMRTYYZT1JB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: game tsconfig @game alias unit tests

Context: ACT-A added the @game path to game/tsconfig.json. Desired behavior: a unit test asserts tsconfig and the vitest alias agree. Expected result: the test passes. Why: proves REQ-A from the spec before relying on the alias.

## Acceptance criteria
- paths['@game/*'] equals ['./src/*']
- vitest alias @game resolves to the same src folder


## Scope
- In scope: tests/tsconfigAlias.test.ts
- Out of scope: running tsc
- Preserve: vitestPhaserAlias.test.ts


## Technical constraints
- Read files with node:fs only


## Dependencies
- ACT-A


## Definition of done
- test passes


## Clarifying questions
- None
