---
id: "01M85F81SG6PB1WC0F7KBQJF4P"
kind: requirement
parent: 01M85F81SGV3FKVSCM5F5FF7CG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · A reload counter in the history effect powers Retry

Context: no way to reload history after failure. Desired behavior: a reloadKey counter in the history effect deps; the error state shows a Retry button that increments it, and the effect alone sets status back to loading. Expected result: one click retries the load. Why: recoverable failures.

## Acceptance criteria
- Given status is error, When Retry is clicked, Then listMine is called a second time
- Given the retry resolves, When the effect settles, Then status is ready and Retry is gone
- Given status is not error, When rendered, Then no Retry button exists


## Scope
- In scope: reloadKey state, effect dependency, Retry button
- Out of scope: Automatic retry or backoff
- Preserve: Single-writer rule: the button never sets history status directly


## Technical constraints
- Retry handler only calls setReloadKey


## Dependencies
- R1


## Definition of done
- Retry works via the reload counter


## Clarifying questions
- None
