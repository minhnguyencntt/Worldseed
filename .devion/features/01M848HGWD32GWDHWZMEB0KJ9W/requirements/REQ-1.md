---
id: "01M848HGWDHV0NWH1Y13A7PDWF"
kind: requirement
parent: 01M848HGWD32GWDHWZMEB0KJ9W
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · AdminApp renders ExecutionPanel with count and loaded execution

Context: ExecutionPanel accepts `execution` and `contributionCount`; AdminApp holds `contributions` and `execution`. Desired behavior: AdminApp renders <ExecutionPanel execution={execution} contributionCount={contributions.length} /> once the round is loaded. Expected result: the admin page shows count, duration, logs, tests, release version and failure reason. Why: monitor Worker execution.

## Acceptance criteria
- Given 1 contribution and a FAILED execution with log, tests, release_version and error, when AdminApp loads, then the region labelled 'Execution' shows 'Contributions: 1', the log, tests, release version and 'Failure reason: <error>'
- Given the executions endpoint returns an empty list, when AdminApp loads, then 'Contributions: 1' is shown and logs, tests and release version read 'Not available'


## Scope
- In scope: AdminApp.tsx render of ExecutionPanel
- Out of scope: Approve/Retry handlers
- Preserve: Existing AdminApp markup and behavior


## Technical constraints
- No change to api/client.ts


## Definition of done
- AdminApp renders ExecutionPanel with live data


## Clarifying questions
- None
