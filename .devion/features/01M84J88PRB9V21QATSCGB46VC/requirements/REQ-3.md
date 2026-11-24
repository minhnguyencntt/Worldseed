---
id: "01M84J88PSFZV9F5DHJKTJMV0T"
kind: requirement
parent: 01M84J88PRB9V21QATSCGB46VC
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · API client and test fixtures carry no execution code and the frontend type-checks

client.ts exports ExecutionInfo, approveExecution, retryExecution, rejectExecution, listExecutions, findExecutionForRound and getCurrentRoundExecution. These are removed. tests/executions.test.ts, tests/adminExecution.test.tsx and tests/adminActions.test.tsx exercise only them and are deleted; executionFixture and failedExecutionFixture are removed from tests/fixtures/api.ts; adminStepper, adminWorld and deriveStage tests are adjusted.

## Acceptance criteria
- Given client.ts, when imported, then it exports none of the execution functions or ExecutionInfo
- Given game/frontend, when npm run typecheck runs, then it exits 0
- Given game/frontend, when npm run test runs, then all remaining tests pass
- Given game/frontend/src, when searched case-insensitively for approveExecution, retryExecution, rejectExecution, listExecutions, ExecutionPanel, then there are no matches


## Scope
- In scope: game/frontend/src/api/client.ts
- In scope: tests/executions.test.ts
- In scope: tests/adminExecution.test.tsx
- In scope: tests/adminActions.test.tsx
- In scope: tests/fixtures/api.ts
- In scope: tests/adminStepper.test.tsx
- In scope: tests/adminWorld.test.tsx
- In scope: tests/deriveStage.test.ts
- Out of scope: backend
- Preserve: Round, world, contribution and player client functions


## Technical constraints
- Remove ExecutionInfo type only after AdminApp no longer uses it


## Dependencies
- req2


## Definition of done
- Client and fixtures clean
- Typecheck and tests green


## Clarifying questions
- None
