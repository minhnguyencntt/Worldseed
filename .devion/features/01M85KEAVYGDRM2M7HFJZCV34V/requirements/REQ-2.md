---
id: "01M85KEAVYH6ASHXSSAQ54DNJE"
kind: requirement
parent: 01M85KEAVYGDRM2M7HFJZCV34V
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Shutdown unsubscribes from the store so later changes do not reach the scene

Context: the handler already calls this.unsubscribe, but ordering relative to the focus reset matters: the unsubscribe must run before setFocusedObject(null) so the reset does not trigger onStateChange on destroyed objects. Desired behavior: unsubscribe first, then clear focus. Expected result: onStateChange is not called after shutdown. Why: prevents calls on destroyed objects.

## Acceptance criteria
- Given shutdown has run, when setFocusedObject is called with an id, then no object focus or sync is invoked.
- Given shutdown, when focus is cleared, then onStateChange is not called by that update.


## Scope
- In scope: Ordering of unsubscribe and focus reset in the SHUTDOWN handler
- Out of scope: Subscription creation
- Preserve: unsubscribe set to null after shutdown


## Technical constraints
- Keep this.unsubscribe nullable field


## Definition of done
- Unsubscribe precedes the focus reset


## Clarifying questions
- None
