---
id: "01M84QJ9DDQ6CS49HTSDXBB1PW"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-2.5 · Mocked-dependency unit tests for the manifest loader

Context: game/src/assets/loaders/manifestLoader.ts exports loadManifestFile, loadManifestWithFallback and checkAssetRefs. Existing tests (tests/manifestLoader.test.ts, manifestFallback.test.ts) use real temp directories, and tests/manifestRefs.test.ts covers checkAssetRefs in memory. Desired behavior: a suite where node:fs is fully mocked covers valid and invalid manifests, dangling references and missing-asset fallbacks. Why: the sub-goal requires all dependencies mocked.

## Acceptance criteria
- Given node:fs is mocked, when loadManifestFile and loadManifestWithFallback run, then no real disk access occurs
- Given valid, schema-invalid, unreadable and missing-asset inputs, when the loader runs, then each yields the asserted result
- Given refs absent from the manifest, when checkAssetRefs runs, then each dangling ref is reported


## Scope
- In scope: New mocked unit tests for the manifest loader
- Out of scope: Changing loader behavior
- Out of scope: Browser or e2e checks
- Preserve: Existing manifest tests
- Preserve: Loader public API


## Technical constraints
- vitest with vi.mock('node:fs')
- Tests live in game/tests


## Definition of done
- New mocked test files exist in the working tree and pass


## Clarifying questions
- None
