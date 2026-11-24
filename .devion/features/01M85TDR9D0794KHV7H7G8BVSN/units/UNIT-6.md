---
id: "01M85TDR9EYJNMH0F27G31CBBZ"
kind: unit
parent: 01M85TDR9ERS48353PZ53BCKGQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Boy manifest animations, sizes and generator unit tests

Test generateAssets copies animations, PNG sizes via readPngSize, and ART_SOURCES entries are manifest-valid.

## Acceptance criteria
- entry carries animations/origin
- sheet PNG 448x48, portrait 32x32
- ranges 0-3, 4-9, 10-13 with rates


## Scope
- In scope: new tests/boyManifest.test.ts
- Out of scope: disk I/O


## Technical constraints
- Unit tests only; no filesystem, generator run in memory


## Definition of done
- test passes


## Clarifying questions
- None
