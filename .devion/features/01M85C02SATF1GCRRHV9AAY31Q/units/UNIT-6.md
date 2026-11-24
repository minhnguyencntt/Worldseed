---
id: "01M85C02SC2KZSQX1R6JHAE8YZ"
kind: unit
parent: 01M85C02SBEG7ZAD8ZX633QZVB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Contribution history loading, empty, error and list unit tests

Test history rendering for success, pending, empty and failure.

## Acceptance criteria
- History prompts render marked Sent
- Loading and empty messages
- Load error alert and submit still works


## Scope
- In scope: tests/contributionHistory.test.tsx
- Out of scope: Real network
- Preserve: tests/contribution.test.tsx


## Technical constraints
- fetch stubbed; history payload uses contributionFixture mirroring contributionJSON in backend/internal/contribution/handler.go


## Definition of done
- New test file passes


## Clarifying questions
- None
