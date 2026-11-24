---
id: "01M84J88PSTFXQQJH6HRMX5N52"
kind: unit
parent: 01M84J88PSJVC1D76BGSY6PZNB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: AdminApp makes no execution calls unit tests

Update tests/adminStepper.test.tsx and tests/adminWorld.test.tsx so they no longer stub the executions endpoint, and assert it is never requested.

## Acceptance criteria
- Fetch is never called with /api/v1/admin/executions
- CLOSED round shows CLOSED as the single current step
- 401 from the round endpoint shows Invalid token


## Scope
- In scope: tests/adminStepper.test.tsx
- In scope: tests/adminWorld.test.tsx
- Out of scope: src
- Preserve: Other admin tests


## Technical constraints
- fetch is stubbed with vi.stubGlobal; fixtures from tests/fixtures/api.ts (roundFixture, adminContributionFixture) mirror the backend round handler JSON


## Definition of done
- Updated tests green


## Clarifying questions
- None
