---
id: "01M84QJ9DDWEYRC41PWB3QHT3T"
kind: requirement
parent: 01M84QJ9DDQ6CS49HTSDXBB1PW
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Loader valid, invalid and missing-asset fallback paths are proven with fs mocked

With readFileSync and existsSync mocked, loadManifestFile and loadManifestWithFallback must be shown to return ok for a valid manifest, parse errors for a schema-invalid manifest, a 'cannot read manifest' error for an unreadable or malformed file, and a filtered manifest plus missing list when asset files are absent.

## Acceptance criteria
- Given a valid manifest and existsSync true, then loadManifestFile returns ok true
- Given a schema-invalid manifest, then loadManifestFile returns ok false and the fallback returns an empty manifest with errors
- Given existsSync false for one asset, then the fallback lists it in missing and keeps the others


## Scope
- In scope: loadManifestFile
- In scope: loadManifestWithFallback
- Out of scope: checkAssetRefs
- Preserve: Existing behavior


## Technical constraints
- No real filesystem access


## Definition of done
- All paths asserted with mocked fs


## Clarifying questions
- None
