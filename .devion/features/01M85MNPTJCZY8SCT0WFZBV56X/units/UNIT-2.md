---
id: "01M85MNPTK7BTHK8EDH1RQS65R"
kind: unit
parent: 01M85MNPTJN2Z2441YTP0WZR6S
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Unsubscribe transitionTo in the BootScene SHUTDOWN handler

In the SHUTDOWN callback in BootScene.create, call and null the unsubscribeTransition function next to the playAnimation release.

## Acceptance criteria
- After SHUTDOWN, transitionTo no longer reaches BootScene
- Other subscribers stay registered


## Scope
- In scope: BootScene.ts SHUTDOWN handler
- Out of scope: tests
- Preserve: existing cleanup


## Technical constraints
- Do not call reactToPhaser.clear()
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Dependencies
- ACT-1 adds the unsubscribeTransition field


## Definition of done
- Unsubscribe called and set to null


## Clarifying questions
- None
