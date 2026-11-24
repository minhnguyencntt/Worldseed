---
id: "01M84J88PSJVC1D76BGSY6PZNB"
kind: requirement
parent: 01M84J88PRB9V21QATSCGB46VC
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · AdminApp no longer imports, renders or calls anything execution-related

AdminApp.tsx imports ExecutionPanel and approve/retry/reject/listExecutions/findExecutionForRound and ExecutionInfo; it holds execution, actionError, actionDetail state, fetches executions in its load effect, defines runExecutionAction and renders ExecutionPanel. All of this is removed; the stepper uses the round status alone and the load effect fetches only the round and contributions.

## Acceptance criteria
- Given a valid token and an OPEN round, when AdminApp loads, then fetch is never called with /api/v1/admin/executions
- Given a CLOSED round, when AdminApp loads, then the stepper shows the CLOSED step as current
- Given a 401 from the round or contributions call, when AdminApp loads, then the token gate shows Invalid token
- Given AdminApp source, when searched, then it has no Execution, approve, retry or reject identifiers


## Scope
- In scope: game/frontend/src/components/AdminApp.tsx
- Out of scope: client.ts removal
- Out of scope: LifecycleStepper
- Preserve: Round controls, world title, duration and limit fields, contributions list, handleError 401 behavior


## Technical constraints
- Keep LifecycleStepper and deriveStage exports unchanged


## Definition of done
- AdminApp compiles without execution references
- Admin tests for kept behavior pass


## Clarifying questions
- None
