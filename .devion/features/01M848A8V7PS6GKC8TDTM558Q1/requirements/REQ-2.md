---
id: "01M848A8V7HNBPWW9AY4P6KCMC"
kind: requirement
parent: 01M848A8V7PS6GKC8TDTM558Q1
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · AdminApp renders LifecycleStepper for the current Round

Context: AdminApp loads the admin Round and contributions after the token is entered. Desired behavior: it also lists executions, picks the one for the Round, and renders LifecycleStepper with deriveStage(round.status, execution?.status). Expected result: the stepper is visible with the right current step; a non-401 failure of the executions call leaves the stepper on the Round status. Why: live lifecycle view for the admin.

## Acceptance criteria
- Given token secret and an OPEN Round, when AdminApp loads, then list 'Round lifecycle' has exactly one aria-current step reading OPEN.
- Given a CLOSED Round and a RUNNING execution for that Round, when AdminApp loads, then the current step reads DEVELOPING.
- Given the executions endpoint returns 404, when AdminApp loads, then the stepper still shows the Round status stage and no error alert appears.
- Given the executions endpoint returns 401, when AdminApp loads, then the token gate shows Invalid token.


## Scope
- In scope: AdminApp.tsx load effect and render
- Out of scope: ExecutionPanel
- Out of scope: Backend
- Preserve: Token gate, Open/Close round, contributions list, existing admin tests


## Technical constraints
- Use listExecutions and findExecutionForRound from api/client.ts
- No new API


## Dependencies
- R1


## Definition of done
- Stepper rendered in AdminApp


## Clarifying questions
- None
