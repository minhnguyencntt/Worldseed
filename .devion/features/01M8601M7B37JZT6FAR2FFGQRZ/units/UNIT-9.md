---
id: "01M8601M7CY8KVQFR51Y2HV7ZW"
kind: unit
parent: 01M8601M7B8533WQTHKH2DEX3M
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: empty and unknown scene transition ignored unit tests

With Phaser faked, emit transitionTo with '' and an unknown id.

## Acceptance criteria
- Given '' emitted, then fadeOut and scene.start are not called
- Given an unknown id with scene.get returning null, then they are not called


## Scope
- In scope: tests/bootSceneTransitionIgnore.test.ts
- Out of scope: real Phaser
- Preserve: bootSceneTransition tests


## Technical constraints
- Copy the phaser vi.mock of bootSceneTransition.test.ts with scene.get as vi.fn


## Dependencies
- ACT-IGNORE


## Definition of done
- Tests pass


## Clarifying questions
- None
