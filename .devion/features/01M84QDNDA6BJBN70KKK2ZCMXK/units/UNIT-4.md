---
id: "01M84QDNDB5J5BXD9213CMS2JB"
kind: unit
parent: 01M84QDNDBK8MA5RKP1H0KVH36
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: loadManifestWithFallback unit tests

Test missing-file reporting and non-throwing fallback using a temp directory.

## Acceptance criteria
- Missing asset reported and dropped
- Bad manifest yields empty manifest and errors
- Complete manifest has no missing


## Scope
- In scope: game/tests/manifestFallback.test.ts
- Out of scope: product code
- Preserve: manifestLoader.test.ts


## Technical constraints
- Filesystem limited to os.tmpdir temp dir


## Definition of done
- Tests pass


## Clarifying questions
- None
