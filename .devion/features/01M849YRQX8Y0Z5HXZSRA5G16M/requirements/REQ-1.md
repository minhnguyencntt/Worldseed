---
id: "01M849YRQX7CK61M97F1YXWD7R"
kind: requirement
parent: 01M849YRQX8Y0Z5HXZSRA5G16M
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · A 401 from Retry or Reject returns AdminApp to the token gate

Context: AdminApp.runExecutionAction routes a 401 ApiError to handleError, which clears the token and sets gateError 'Invalid token'. Only the Approve 401 is tested today. Desired behavior: Retry and Reject 401 are proven to behave identically. Expected result: the token input is shown with an Invalid token alert. Why: an expired admin token must never leave stale controls.

## Acceptance criteria
- Given a FAILED execution, when Retry gets 401, then the gate shows an alert 'Invalid token' and the 'Admin token' field
- Given an AWAITING_APPROVAL execution, when Reject gets 401, then the gate shows an alert 'Invalid token' and the 'Admin token' field


## Scope
- In scope: 401 handling for Retry and Reject in AdminApp
- Out of scope: Approve 401 (already tested)
- Preserve: handleError behavior


## Technical constraints
- Mocked fetch only


## Definition of done
- Retry and Reject 401 tests pass


## Clarifying questions
- None
