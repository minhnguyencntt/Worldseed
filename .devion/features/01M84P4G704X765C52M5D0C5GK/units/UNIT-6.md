---
id: "01M84P4G71BARB12W6SKB03BGJ"
kind: unit
parent: 01M84P4G70Y5GXRTM4G897W73D
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: No standalone RoundBadge or Countdown in App unit tests

Assert a single timer inside the header and no App.tsx references to the removed components.

## Acceptance criteria
- One timer exists
- App.tsx lacks RoundBadge and Countdown


## Scope
- In scope: New test file
- Out of scope: Product code
- Preserve: tests/countdown.test.tsx


## Definition of done
- Tests pass


## Clarifying questions
- None
