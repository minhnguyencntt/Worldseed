---
id: "01M85FWFYFFQ4HVERXTWCX9YXV"
kind: unit
parent: 01M85FWFYE26ZRTDR5WTEPR56G
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Retry returns to the loading state and reloads unit tests

Test that after Retry the loading message shows while pending, listMine is called twice, and a second failure shows the error again.

## Acceptance criteria
- Pending retry shows loading and hides error and Retry
- listMine called twice
- Second rejection shows error and Retry again


## Scope
- In scope: New test file
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Use a manually controlled promise for the second listMine call; no real network


## Definition of done
- Tests pass


## Clarifying questions
- None
