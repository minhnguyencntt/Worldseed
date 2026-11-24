---
id: "01M85D0J7Q7AVFQ43P40N4YWC1"
kind: unit
parent: 01M85D0J7QQZPMTWXG18QK6DB5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Blank and whitespace-only submit shows the inline message unit tests

Prove with mocked client that blank text shows the alert and never calls submitContribution.

## Acceptance criteria
- Empty submit shows alert and no API call
- Whitespace-only submit shows alert and no API call
- Textarea has aria-invalid and aria-describedby


## Scope
- In scope: New test file game/frontend/tests/contributionBlank.test.tsx
- Out of scope: Running app or browser
- Preserve: Existing contribution.test.tsx


## Technical constraints
- vi.mock('../src/api/client') with importActual to keep ApiError and MAX_PER_PLAYER; no network


## Dependencies
- ACT1


## Definition of done
- Tests pass in isolation


## Clarifying questions
- None
