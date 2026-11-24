---
id: "01M8601M7C7WHGSNKACD1Z9064"
kind: unit
parent: 01M8601M7BKRMAF22Y0N8NKBCB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: GameLayout wide split and narrow drawer unit tests

Update existing layout tests to the new split and cover wide and narrow class sets and the drawer toggle.

## Acceptance criteria
- Given a wide layout, when rendered, then md:grid-cols-[3fr_1fr] is present
- Given the narrow classes, when inspected, then the aside has max-md:fixed and data-state toggles with the store


## Scope
- In scope: tests/layoutDesktop.test.tsx
- In scope: tests/layoutSplit.test.tsx
- Out of scope: browser checks
- Preserve: existing drawer toggle test in layout.test.tsx


## Technical constraints
- Unit tests only, jsdom, no browser


## Dependencies
- ACT-LAYOUT


## Definition of done
- Tests pass


## Clarifying questions
- None
