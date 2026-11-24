---
id: "01M857STNXPWPP07BBCRXGYH81"
kind: requirement
parent: 01M857STNX1YWBTW0H0K7DRF3M
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · bootScene suite mocks content and uses the zero-argument constructor

bootScene.test.ts imports scene and world from the real content module. It must mock it with sceneSpec and keep new BootScene() free of arity or typing errors.

## Acceptance criteria
- Given the mocked content, when the suite runs, then readState, onStateChange and shutdown tests pass
- Given tsc type-checking, when run on the test, then no constructor-arity or implicit-any error is reported


## Scope
- In scope: bootScene.test.ts mocks
- Out of scope: BootScene constructor changes
- Preserve: Store sync behavior


## Technical constraints
- BootScene constructor takes no arguments


## Definition of done
- Suite passes


## Clarifying questions
- None
