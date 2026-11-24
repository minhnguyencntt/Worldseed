---
id: "01M85NA12KKGVGVADQTHYZ49RN"
kind: unit
parent: 01M85NA12J3STAQ8RH0XHBWYVQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: transitionTo ignored after SHUTDOWN while other subscribers stay active

Mirror tests/bootScenePlayAnimationShutdown.test.ts for transitionTo with Phaser mocked.

## Acceptance criteria
- No fadeOut or scene.start after shutdown
- A pre-existing subscriber still receives transitionTo


## Scope
- In scope: new test file
- Out of scope: product code
- Preserve: existing tests


## Technical constraints
- Everything external mocked


## Definition of done
- Tests pass


## Clarifying questions
- None
