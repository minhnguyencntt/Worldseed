---
id: "01M84MX32EW8S7MH1C6Q4TG2DE"
kind: unit
parent: 01M84MX32E0X7BSC7E146YQWTH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Tests import the actual store and never mock it

Add guard tests to game/frontend/tests/uiStoreRealGuard.test.ts asserting no mock functions, the module exports useUiStore, and no vi.mock appears in the store test sources.

## Acceptance criteria
- Given the imports, when vi.isMockFunction is called on useUiStore and its actions, then false.
- Given the namespace import, when keys are read, then useUiStore is present.
- Given store test sources read from disk, when searched for vi.mock, then none found.


## Scope
- In scope: tests/uiStoreRealGuard.test.ts
- Out of scope: Product code edits
- Preserve: Existing tests


## Technical constraints
- Read files with node:fs and node:path relative to import.meta.url; no network


## Definition of done
- Guard test file passes


## Clarifying questions
- None
