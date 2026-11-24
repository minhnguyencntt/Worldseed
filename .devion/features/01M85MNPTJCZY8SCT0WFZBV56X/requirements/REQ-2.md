---
id: "01M85MNPTJN2Z2441YTP0WZR6S"
kind: requirement
parent: 01M85MNPTJCZY8SCT0WFZBV56X
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene unsubscribes transitionTo when the scene shuts down

Context: the SHUTDOWN handler already releases the playAnimation subscription. Desired behavior: also release transitionTo so a dead scene does not react. Expected result: after shutdown, transitionTo emits do nothing.

## Acceptance criteria
- Given the SHUTDOWN callback ran, when transitionTo is emitted, then fadeOut is not called
- Given another transitionTo subscriber registered before create, when shutdown ran, then it still receives events


## Scope
- In scope: unsubscribe in SHUTDOWN handler
- Out of scope: other subscriptions
- Preserve: existing shutdown cleanup


## Technical constraints
- Call only the unsubscribe function returned by reactToPhaser.on, never clear()


## Definition of done
- Unsubscribe field reset to null


## Clarifying questions
- None
