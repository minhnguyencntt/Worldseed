---
id: "01M849HABY7HRFG51PT93Y5ANX"
kind: unit
parent: 01M849HABYP92DX4GS3MHZEK8S
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Show execution action failures through actionError

Add actionError state to AdminApp, clear on start/success, set on non-401 failure with 'Request failed' fallback, route 401 to handleError, pass to ExecutionPanel.

## Acceptance criteria
- Non-401 failures set actionError
- 401 failures invoke handleError and leave actionError empty


## Scope
- In scope: AdminApp.tsx
- Out of scope: ExecutionPanel
- Preserve: handleError


## Technical constraints
- No duplicate declarations of actionError or runExecutionAction
- Code path: `game/frontend/src/components/AdminApp.tsx`


## Definition of done
- npm run typecheck passes


## Clarifying questions
- None
