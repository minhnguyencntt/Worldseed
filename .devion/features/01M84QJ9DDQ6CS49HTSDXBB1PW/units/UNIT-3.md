---
id: "01M84QJ9DET4TEWFBKZNMAA7D4"
kind: unit
parent: 01M84QJ9DDWEYRC41PWB3QHT3T
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Mocked-fs loader unit tests for valid, invalid and missing assets

Write unit tests with node:fs fully mocked proving the loader paths in R1.

## Acceptance criteria
- Valid manifest returns ok
- Invalid and unreadable manifests produce errors and an empty fallback
- Missing asset appears in missing


## Scope
- In scope: game/tests/manifestLoaderMocked.test.ts
- Out of scope: Product code
- Preserve: Other tests


## Technical constraints
- vi.mock('node:fs') with readFileSync and existsSync as vi.fn


## Definition of done
- Tests pass without touching disk


## Clarifying questions
- None
