---
id: "01M849SG8CQMNHPZHXJAJ9BPPA"
kind: unit
parent: 01M849SG8B65WPTHY6NGBPMM3T
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: No stale round or execution data after a 401 and token re-entry

Add tests to the adminActions test file with the same fetch stub and fixtures.

## Acceptance criteria
- After a 401 no 'Execution' region is rendered.
- After re-entry the data is loaded again from the new responses.


## Scope
- In scope: tests/adminActions.test.tsx
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- fetch is stubbed; no server


## Definition of done
- Tests pass


## Clarifying questions
- None
