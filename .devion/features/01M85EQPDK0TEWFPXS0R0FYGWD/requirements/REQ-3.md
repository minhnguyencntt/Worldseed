---
id: "01M85EQPDM4PRXH1HC34P00Z8Z"
kind: requirement
parent: 01M85EQPDK0TEWFPXS0R0FYGWD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · History load failure shows an explained error with Retry

Context: the catch in the history effect is empty so failures are invisible. Desired behavior: on rejection show 'Could not load your suggestions' (role alert) and a Retry button that re-runs listMine and returns to loading, then ready. Why: players can recover without closing the sheet.

## Acceptance criteria
- Given listMine rejects, when loading ends, then role alert text 'Could not load your suggestions' and a button named Retry are visible
- Given the error state, when Retry is clicked and listMine then resolves, then listMine was called twice and the history list renders without the error


## Scope
- In scope: Error state and Retry
- Out of scope: Automatic retry or backoff
- Preserve: Submit still works when history failed


## Technical constraints
- Retry re-triggers the existing effect via a reload counter


## Definition of done
- Error and Retry work


## Clarifying questions
- None
