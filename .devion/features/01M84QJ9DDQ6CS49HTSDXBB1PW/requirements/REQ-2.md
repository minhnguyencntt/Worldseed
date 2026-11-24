---
id: "01M84QJ9DDVMMF1FTACZ8ZKKH3"
kind: requirement
parent: 01M84QJ9DDQ6CS49HTSDXBB1PW
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Dangling asset references are reported against a loader-produced manifest with fs mocked

After a manifest is loaded through mocked fs where one file is missing, refs to the dropped asset and to unknown ids must be reported by checkAssetRefs as dangling while present ids pass.

## Acceptance criteria
- Given a loaded manifest missing asset 'b', then checkAssetRefs(['a','b','ghost']) returns issues for 'b' and 'ghost' only
- Given all refs present, then it returns an empty array


## Scope
- In scope: checkAssetRefs combined with loadManifestWithFallback
- Out of scope: Loader changes
- Preserve: checkAssetRefs signature


## Technical constraints
- No real filesystem access


## Definition of done
- Dangling-reference scenarios asserted


## Clarifying questions
- None
