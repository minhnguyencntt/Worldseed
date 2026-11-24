---
id: "01M84QJ9DESS9RQ5Q4FVVDA798"
kind: unit
parent: 01M84QJ9DDWEYRC41PWB3QHT3T
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm loader reads fs only through node:fs named imports

The loader already imports existsSync and readFileSync from node:fs and join from node:path, so vi.mock('node:fs') can intercept them. Confirm no other fs access exists; no code change is expected.

## Acceptance criteria
- Loader imports only readFileSync and existsSync from node:fs
- No other I/O or clock use exists in the loader


## Scope
- In scope: manifestLoader.ts
- Out of scope: Tests
- Preserve: Public exports


## Technical constraints
- Code path: `game/src/assets/loaders/manifestLoader.ts`


## Definition of done
- Loader confirmed mockable


## Clarifying questions
- None
