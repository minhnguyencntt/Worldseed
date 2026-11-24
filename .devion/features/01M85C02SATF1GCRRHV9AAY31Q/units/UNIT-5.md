---
id: "01M85C02SCB886HVXPRJZ2QDXB"
kind: unit
parent: 01M85C02SBSNWX9ZZMWWX5VGPS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Submit validation, quota and submit-state unit tests

Test empty, over-length, exhausted, loading, success and API error paths.

## Acceptance criteria
- No fetch on invalid input
- Exhausted disables form
- Loading, success and error states asserted


## Scope
- In scope: tests/contributionValidation.test.tsx
- Out of scope: Real network
- Preserve: tests/contribution.test.tsx


## Technical constraints
- fetch stubbed with vi.stubGlobal; POST returns contributionFixture per tests/fixtures/api.ts (mirrors contributionJSON in backend/internal/contribution/handler.go)


## Definition of done
- New test file passes


## Clarifying questions
- None
