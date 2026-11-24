---
id: "01M849SG8B65WPTHY6NGBPMM3T"
kind: requirement
parent: 01M849SG8BV17V8CN3AAN5CNFR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · After a 401 and re-entry, AdminApp shows no stale round or execution data

After the gate returns, a re-entered token must show the Loading round state rather than the previous round, execution and contribution list, so stale Approve, Retry or Reject buttons cannot appear.

## Acceptance criteria
- Given a 401 from an execution action, when the gate is shown, then no Round or Execution content is rendered.
- Given the token is re-entered, when data reloads, then the loaded round and execution come from the new responses.


## Scope
- In scope: handleError 401 branch in AdminApp.tsx
- Out of scope: Backend
- Preserve: Existing reload flow via reloads counter


## Technical constraints
- Reset state with the existing setters setRound, setExecution and setContributions


## Dependencies
- REQ1


## Definition of done
- 401 branch resets round, execution and contributions


## Clarifying questions
- None
