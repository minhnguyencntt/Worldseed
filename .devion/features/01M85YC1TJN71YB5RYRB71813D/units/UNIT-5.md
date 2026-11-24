---
id: "01M85YC1TKC6R8BDDQ4788P7DG"
kind: unit
parent: 01M85YC1TJ6GRVQD0YHX8H1SEM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Inventory grid slots, icons and empty slots unit tests

Tests cover empty inventory, partial inventory and an unknown item.

## Acceptance criteria
- Six slots for 0, 1 and 6 items
- Icon and name for old-key
- Unknown item has name and no icon


## Scope
- In scope: new tests
- In scope: frameKit.test.tsx and story.test.tsx updates
- Out of scope: product code
- Preserve: existing assertions


## Technical constraints
- Unit tests only, no browser.


## Dependencies
- ACT2


## Definition of done
- Tests pass; old Empty text assertions updated


## Clarifying questions
- None
