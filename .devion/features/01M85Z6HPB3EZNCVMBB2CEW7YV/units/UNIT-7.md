---
id: "01M85Z6HPC98K5CNH20METTSYY"
kind: unit
parent: 01M85Z6HPB18DCCYJF9H3DN26C
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: keyboard flow and ARIA labels unit tests

Test the overlay a11y with the store seeded and the event bus spied.

## Acceptance criteria
- Live region, aria-labels, focus move and Escape asserted in one a11y test file
- Enter on an action button calls onAction and Escape emits menuClose


## Scope
- In scope: frontend/tests/objectOverlayA11y.test.tsx
- Out of scope: Screen reader in a browser
- Preserve: Existing tests


## Technical constraints
- All dependencies mocked
- Fixtures come from runtime/content bedroom scene


## Dependencies
- ACT3


## Definition of done
- Test file passes


## Clarifying questions
- None
