---
id: "01M848ZFYJ0M10R6GX7ZK6A6KB"
kind: unit
parent: 01M848ZFYJ9EC0MXARTWXXZ6SP
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: ExecutionPanel Reject button unit tests

Add game/frontend/tests/reject.test.tsx rendering ExecutionPanel with executionFixture from tests/fixtures/api.ts (mirrors the ExecutionInfo type in src/api/client.ts) and vi.fn callbacks; no network.

## Acceptance criteria
- Test asserts Reject shown and onReject called with 'EX1' for AWAITING_APPROVAL
- Test asserts Reject absent for FAILED, RUNNING, and for AWAITING_APPROVAL without onReject


## Scope
- In scope: game/frontend/tests/reject.test.tsx
- Out of scope: product code
- Preserve: tests/actions.test.tsx unchanged


## Technical constraints
- vitest + @testing-library/react + user-event; fixture from tests/fixtures/api.ts, not inline payloads


## Definition of done
- All reject tests pass


## Clarifying questions
- None
