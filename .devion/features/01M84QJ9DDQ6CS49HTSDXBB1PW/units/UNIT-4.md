---
id: "01M84QJ9DEF2Q7607TWTEQJNA2"
kind: unit
parent: 01M84QJ9DDVMMF1FTACZ8ZKKH3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Mocked-fs dangling reference unit tests

Chain the mocked fallback loader into checkAssetRefs to prove dangling references are reported.

## Acceptance criteria
- Dropped and unknown ids are reported
- All-present refs yield no issues


## Scope
- In scope: game/tests/manifestDanglingMocked.test.ts
- Out of scope: Product code
- Preserve: Other tests


## Technical constraints
- vi.mock('node:fs')


## Definition of done
- Tests pass


## Clarifying questions
- None
