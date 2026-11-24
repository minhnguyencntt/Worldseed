---
id: "01M85XYJFJRE797SK1M1GZHDYT"
kind: requirement
parent: 01M85XYJFJR8B71Q5VBGPRKMNR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Pill and icon controls cover loading, error with retry, empty and sound and settings states

Context: error, loading and empty states render as bare spans, and icon buttons are plain frame buttons. Desired behavior: the state messages appear inside the same pill (test id round-pill with data-state loading, error or empty), Retry stays a frame button, and sound and settings icons sit in a labelled control group. Expected result: every status is covered and wired to real props and uiStore. Why: the Done-when requires tests for loading, error and retry.

## Acceptance criteria
- Given loading, when rendered, then the pill has data-state loading with text Loading round… and no timer.
- Given error, when rendered, then the pill has data-state error with role alert text Round unavailable: <error> and Retry calls onRetry once.
- Given no round, when rendered, then the pill has data-state empty with No active round.
- Given the icon group, when sound or settings is clicked, then uiStore changes.


## Scope
- In scope: HeaderOverlay state markup
- In scope: icon group
- Out of scope: App round loading logic
- Preserve: messages text
- Preserve: Retry behavior
- Preserve: uiStore wiring


## Technical constraints
- No mock data in place of API; Zustand store stays.


## Dependencies
- REQ1


## Definition of done
- States render in the pill


## Non-functional requirements
- role alert kept


## Clarifying questions
- None
