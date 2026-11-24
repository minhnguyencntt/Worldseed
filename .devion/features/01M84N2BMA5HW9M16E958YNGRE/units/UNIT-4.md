---
id: "01M84N2BMBPEW67BZESM3DRJ0N"
kind: unit
parent: 01M84N2BMBM9AXXZ1A4EZ8TSGY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Store-driven drawer and legacy CSS removal unit tests

Rewrite the legacy-class assertions in tests/layout.test.tsx and tests/layoutStack.test.tsx to the store-driven drawer with data-state, and assert the legacy CSS is absent. Real useUiStore is used, reset in beforeEach.

## Acceptance criteria
- Drawer toggles via store, aria-expanded and data-state.
- Legacy CSS absent, contribution-sheet kept.
- Single aside and story-content root.


## Scope
- In scope: tests/layout.test.tsx
- In scope: tests/layoutStack.test.tsx
- Out of scope: product code
- Preserve: package.json manifest test


## Technical constraints
- Do not mock useUiStore


## Dependencies
- ACT-2


## Definition of done
- Tests pass


## Clarifying questions
- None
