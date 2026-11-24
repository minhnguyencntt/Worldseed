---
id: "01M84KNPXBYPNHPRM1H0YHTWQD"
kind: unit
parent: 01M84KNPXB7SRR2TP2MMDGFG4S
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Shell responsive rendering unit tests

Rewrite tests/layout.test.tsx assertions: the CSS-file test is replaced by class assertions; the store is reset between tests.

## Acceptance criteria
- Class-based layout asserted
- Drawer toggle drives the store


## Scope
- In scope: game/frontend/tests/layout.test.tsx
- Out of scope: browser
- Preserve: single .story-panel and story-content tests


## Technical constraints
- jsdom has no media queries; assert class strings


## Definition of done
- Tests pass


## Clarifying questions
- None
