---
id: "01M85C02SBR2NF26GC1VJ182TZ"
kind: unit
parent: 01M85C02SB3Y38NZKKSHV12GN7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Radix dialog open, Escape and focus behavior unit tests

Test the Radix dialog shell with fetch mocked.

## Acceptance criteria
- Dialog role and name asserted
- Escape calls onClose
- Focus enters dialog and returns to trigger


## Scope
- In scope: tests/contributionDialog.test.tsx
- Out of scope: Real network
- Preserve: tests/contribution.test.tsx


## Technical constraints
- jsdom, vitest, fetch stubbed with vi.stubGlobal


## Definition of done
- New test file passes


## Clarifying questions
- None
