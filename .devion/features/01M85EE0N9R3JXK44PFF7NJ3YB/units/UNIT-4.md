---
id: "01M85EE0NAHNCAMB53T8S3JSEA"
kind: unit
parent: 01M85EE0N95XDRZ1G9V9DN3RGX
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Send disabled for blank, over-limit, zero-quota and in-flight unit tests

New test file with mocked ../src/api/client (submitContribution, listMine) following the pattern in tests/contributionQuotaGate.test.tsx.

## Acceptance criteria
- Send is disabled for blank, whitespace-only, over-limit and zero-quota states.
- Send is disabled while a submission is pending and enabled for valid text with quota.


## Scope
- In scope: tests/contributionSubmitDisabled.test.tsx
- In scope: Adapting blank/max-length tests that click a disabled Send
- Out of scope: Product code
- Preserve: Existing assertions on messages


## Technical constraints
- Mock listMine and submitContribution with vi.mock; no network


## Dependencies
- ACT-1


## Definition of done
- New tests pass; adapted existing tests pass


## Clarifying questions
- None
