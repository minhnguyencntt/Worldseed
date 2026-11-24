---
id: "01M85HGG8NJX2WV5951684X6ED"
kind: unit
parent: 01M85HGG8M1WGM30SXSRNTPF5W
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Subscribe BootScene to highlightObject and release it on shutdown

Subscribe to reactToPhaser highlightObject in BootScene.create, apply focus or blur through SceneObject, and unsubscribe in the SHUTDOWN handler.

## Acceptance criteria
- highlightObject id focuses that object and blurs the rest
- null blurs all; handler removed on shutdown


## Scope
- In scope: game/frontend/src/phaser/BootScene.ts
- Out of scope: Tests
- Preserve: Existing SHUTDOWN cleanup


## Technical constraints
- Reuse SceneObject.focus/blur and spec.id
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Dependencies
- REQ-2


## Definition of done
- highlightObject drives focus; no leak


## Clarifying questions
- None
