---
id: "01M85KP4J9EEFQMNPVZ8Y2KSCS"
kind: requirement
parent: 01M85KP4J8HPP81AKQWH4YTVSM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Store write stays consistent with scene focus and null when nothing is focused

Context: the focused id is currently computed inline for the event. Desired behavior: a single private helper computes the focused id (null when none) and its result is used for both the store write and the focusChange event, so the later store-driven applyFocusedObject is a no-op. Expected result: no focus flicker or blur after a keyboard move. Why: single source of focus truth.

## Acceptance criteria
- Given no object isFocused after a move, when handled, then store focusedObjectId is null and focusChange emits id null.
- Given the store write triggers onStateChange, when applyFocusedObject runs, then the focused object's blur is not called.


## Scope
- In scope: Private helper in BootScene for the focused id
- Out of scope: Changing applyFocusedObject
- Preserve: applyFocusedObject semantics


## Technical constraints
- Keep helper private to BootScene


## Dependencies
- REQ1 Act touches the same handler


## Definition of done
- Store and event use the same computed id


## Clarifying questions
- None
