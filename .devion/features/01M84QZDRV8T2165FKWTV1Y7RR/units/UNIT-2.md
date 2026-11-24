---
id: "01M84QZDRV9V8CARTR675ASPB6"
kind: unit
parent: 01M84QZDRVNM7KF5TMY7VCNGEJ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Committed manifest paths vs present files with fs mocked unit tests

New test file tests/manifestFilesMocked.test.ts mocks node:fs, serves the committed manifest.json text via the mock, and asserts the helper against a file list.

## Acceptance criteria
- Full list yields no missing paths
- List missing one path yields exactly that path
- fs is mocked and no asset file is read


## Scope
- In scope: game/tests/manifestFilesMocked.test.ts
- Out of scope: Product code changes
- Preserve: Existing tests


## Technical constraints
- vi.mock('node:fs'); committed manifest text obtained via vi.importActual('node:fs') once in a hoisted factory, or imported as JSON


## Definition of done
- Test file passes via vitest filter


## Clarifying questions
- None
