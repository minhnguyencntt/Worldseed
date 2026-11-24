---
id: "01M84Q712AXTW1CR4TS1XSAJR3"
kind: unit
parent: 01M84Q7129NS7S0B3JNV1JVDAR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Manifest loader missing-file and malformed-input unit tests

Test loadManifestFile with temporary directories so no real asset tree is needed.

## Acceptance criteria
- Given all files present, when loaded, then ok true
- Given a missing file, when loaded, then an issue at assets.0.path
- Given absent or invalid JSON, when loaded, then ok false without throwing


## Scope
- In scope: game/tests/manifestLoader.test.ts
- Out of scope: product code
- Preserve: existing tests


## Technical constraints
- Use fs.mkdtempSync temp dir only


## Definition of done
- Test passes


## Clarifying questions
- None
