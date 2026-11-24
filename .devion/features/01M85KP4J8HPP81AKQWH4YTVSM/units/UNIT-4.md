---
id: "01M85KP4J92ZACGW4Z29NGKNXY"
kind: unit
parent: 01M85KP4J9EEFQMNPVZ8Y2KSCS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Store focus is null when nothing focused and apply is a no-op

Add bootSceneKeyboardStoreNull.test.ts with the same mocks; set the fake object isFocused false and true in separate cases.

## Acceptance criteria
- With no focused object, Tab leaves store focusedObjectId null and emits focusChange id null.
- With a focused object and non-null game state, Tab does not call blur on the object.


## Scope
- In scope: New test file
- Out of scope: Browser runs
- Preserve: Existing focus apply tests


## Technical constraints
- Seed state with createInitialState as in bootSceneFocusApply.test.ts


## Definition of done
- Tests pass


## Clarifying questions
- None
