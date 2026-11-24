---
id: "01M84WZ47YBREF7B4P8J148K0X"
kind: unit
parent: 01M84WZ47Y1KGEPRSW570N8QXJ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: SceneObject entity unit tests with fake context

Test entity against REQ2 criteria using a fake RenderContext.

## Acceptance criteria
- Constructor test passes with one sprite call
- Visibility and destroy tests pass


## Scope
- In scope: tests/sceneObject.test.ts
- Out of scope: app


## Technical constraints
- Fake RenderContext built with vi.fn


## Definition of done
- Tests green


## Clarifying questions
- None
