---
id: "01M85MC41VC850PKC1B6FEM043"
kind: unit
parent: 01M85MC41TSRRRFAGTD3P72QR3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: BootScene plays character animation on playAnimation unit tests

Test that playAnimation drives sprite.play for known targets and is ignored for unknown targets.

## Acceptance criteria
- interact and idle emit tests assert play keys
- Unknown target test asserts no extra play


## Scope
- In scope: game/frontend/tests/bootScenePlayAnimation.test.ts
- Out of scope: Real Phaser or browser
- Preserve: Existing tests


## Technical constraints
- Mock phaser and ../src/runtime/content as in tests/bootSceneCharacters.test.ts


## Dependencies
- ACT1


## Definition of done
- Tests pass


## Clarifying questions
- None
