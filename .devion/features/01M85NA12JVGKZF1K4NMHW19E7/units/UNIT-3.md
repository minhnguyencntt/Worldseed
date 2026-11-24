---
id: "01M85NA12K7HD5KF6FGK478C6X"
kind: unit
parent: 01M85NA12J7Y0KTQR65BQXJWDR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: transitionTo unsubscribe is stored and restart yields one handler

Add tests with Phaser mocked, copying the vi.mock setup from tests/bootSceneTransition.test.ts (camera with fadeOut and once spies, scene.start spy).

## Acceptance criteria
- One emit after create gives one fadeOut
- One emit after shutdown plus re-create gives one fadeOut on the new scene


## Scope
- In scope: new test file
- Out of scope: product code
- Preserve: existing tests


## Technical constraints
- Everything external mocked; no browser


## Definition of done
- Tests pass


## Clarifying questions
- None
