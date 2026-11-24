---
id: "01M84QDNDB7FPTNGY63RGW1J1H"
kind: unit
parent: 01M84QDNDBBV3C831C2DEE6846
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: checkAssetRefs unit tests

Test checkAssetRefs with in-memory manifests.

## Acceptance criteria
- Unknown ref reported by name
- All-known and empty refs give []


## Scope
- In scope: game/tests/manifestRefs.test.ts
- Out of scope: product code
- Preserve: existing tests


## Technical constraints
- No filesystem needed


## Definition of done
- Tests pass


## Clarifying questions
- None
