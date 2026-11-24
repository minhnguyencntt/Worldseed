---
id: "01M85FWFYE26ZRTDR5WTEPR56G"
kind: requirement
parent: 01M85FWFYE6T0BGGMNHZ3BZKFR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Clicking Retry reloads history and returns to the loading state

Context: the Retry button increments reloadKey, which re-runs the history effect that sets historyStatus to 'loading' and calls listMine. Desired behavior: after the click the error is gone, the loading message shows while pending, and listMine is called again. Expected result: the player sees the loading state, then the list or a new error. Why: gives clear feedback that a retry is in progress.

## Acceptance criteria
- Given the error state, When Retry is clicked and listMine is pending, Then 'Loading your suggestions…' is shown and the error alert and Retry button are absent
- Given Retry is clicked, When the call settles, Then listMine has been called exactly twice
- Given Retry fails again, When the second call rejects, Then the error and Retry are shown again


## Scope
- In scope: Retry click handler and effect re-run
- Out of scope: Error copy
- Preserve: Cancellation guard in the history effect


## Technical constraints
- Reload driven by reloadKey in the effect dependencies


## Definition of done
- Retry returns to loading and refetches


## Clarifying questions
- None
