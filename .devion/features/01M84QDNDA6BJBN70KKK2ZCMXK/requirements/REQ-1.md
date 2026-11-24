---
id: "01M84QDNDBBV3C831C2DEE6846"
kind: requirement
parent: 01M84QDNDA6BJBN70KKK2ZCMXK
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Loader reports object and scene asset refs that are not manifest ids

Context: bedroom.yaml objects carry an asset string that must equal a manifest asset id, but only a test checks this today. Desired behavior: an exported loader helper takes the manifest and a list of refs and returns an issue for each ref that has no matching manifest id. Expected result: callers can validate content against the manifest at load time. Why: a typo in content must be reported, not crash rendering.

## Acceptance criteria
- Given refs ['a','ghost'] and a manifest with only id 'a', when checkAssetRefs runs, then one issue is returned naming 'ghost'.
- Given all refs match manifest ids, when checkAssetRefs runs, then an empty list is returned.
- Given an empty refs list, when checkAssetRefs runs, then an empty list is returned and nothing throws.


## Scope
- In scope: checkAssetRefs helper in manifestLoader.ts
- Out of scope: reading yaml scene files in the loader
- Preserve: existing loader exports


## Technical constraints
- Reuse ManifestIssue type from ../manifest


## Definition of done
- checkAssetRefs exported and covered by unit tests


## Clarifying questions
- None
