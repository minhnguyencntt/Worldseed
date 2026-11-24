---
id: "01M849YRQX8Y0Z5HXZSRA5G16M"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-6.4.5 · Unit tests with mocked fetch for Reject, Approve, Retry and 401 behaviour

Context: the frontend already has rejectExecution in game/frontend/src/api/client.ts, a Reject button in ExecutionPanel.tsx, and AdminApp.tsx handlers (runExecutionAction). Existing tests cover rejectExecution (executions.test.ts), the panel Reject button (executionReject.test.tsx) and AdminApp approve, retry and reject POSTs plus approve 401 and retry 500 (adminActions.test.tsx). Desired behavior: the remaining gaps (Retry 401, Reject 401, Reject failure display, id encoding in rejectExecution) are covered by passing unit tests. Expected result: all tests exist in the workspace and pass. Why: guards the admin approval workflow against regression.

## Acceptance criteria
- Given an AWAITING_APPROVAL execution, when the reject endpoint returns 401, then the token gate shows 'Invalid token'
- Given a FAILED execution, when the retry endpoint returns 401, then the token gate shows 'Invalid token'
- Given a reject request that fails with 500 and a JSON error, when Reject is clicked, then the Execution region shows the server message in an alert
- Given an id containing reserved characters, when rejectExecution is called, then the URL path segment is percent-encoded
- Given the unit test files for these features, when they are run, then they all pass


## Scope
- In scope: Unit tests in game/frontend/tests for rejectExecution, ExecutionPanel Reject and AdminApp execution actions
- Out of scope: Backend changes
- Out of scope: New UI behavior
- Out of scope: Real network, browser or server tests
- Preserve: Existing passing tests
- Preserve: Current AdminApp, ExecutionPanel and client behavior


## Technical constraints
- Vitest with mocked global fetch only
- Fixtures follow the ExecutionInfo type in game/frontend/src/api/client.ts


## Definition of done
- All listed unit tests exist and pass
- No product behavior changed


## Clarifying questions
- None
