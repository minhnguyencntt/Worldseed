---
id: "01M85643NDKCHD6HYMERABTV10"
kind: requirement
parent: 01M85643NCYKYXDZCYEGBS1QF7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · preload.test.ts proves planner dedup, unknown refs and fallback key

Context: planPreload dedupes via a Set and splits load/unknown against the manifest; resolveTextureKey returns the fallback for undefined or unknown ids. Desired behavior: preload.test.ts asserts these with an in-memory manifest. Expected result: the three behaviors are covered in the requested file. Why: SG-5.4.3 done-when.

## Acceptance criteria
- Given two objects with asset 'A' in the manifest, when planPreload runs, then load equals ['A'] and unknown is []
- Given asset 'Z' and dust asset 'Y' not in the manifest, when planPreload runs, then unknown equals ['Z','Y'] and load is []
- Given id 'Z' or undefined, when resolveTextureKey runs with fallback 'fb', then 'fb' is returned; given 'A', then 'A'


## Scope
- In scope: Engine-level assertions in preload.test.ts
- Out of scope: BootScene assertions
- Preserve: planPreload semantics


## Technical constraints
- Use in-memory AssetManifest and fixtures/valid-world


## Definition of done
- Cases pass via vitest


## Clarifying questions
- None
