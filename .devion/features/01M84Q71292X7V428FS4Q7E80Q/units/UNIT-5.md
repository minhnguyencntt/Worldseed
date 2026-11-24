---
id: "01M84Q712A6R5YXT5Z86PHDG2H"
kind: unit
parent: 01M84Q7129V94JK8ABC5KKY3PP
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Manifest file validity and scene coverage unit tests

Test that the real manifest.json parses via parseManifest and every asset path exists and every bedroom.yaml asset ref has an id.

## Acceptance criteria
- Given manifest.json, when parseManifest runs, then ok is true
- Given each entry, when path is resolved, then the file exists
- Given bedroom.yaml asset refs, when matched, then each is a manifest id


## Scope
- In scope: game/tests/assetManifestFile.test.ts
- Out of scope: product code
- Preserve: existing tests


## Technical constraints
- Read-only filesystem access


## Definition of done
- Test passes


## Clarifying questions
- None
