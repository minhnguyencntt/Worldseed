---
id: "01M857F2G1S6W3EW16HHWJP6G3"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.5.2 Update BootScene tests for sceneSpec mock and constructor arity

Context: BootScene.create now calls buildScene(..., sceneSpec) and createPhaserEffectContext(scene, resolveKey), but some bootScene*.test.ts files mock '../src/runtime/content' without sceneSpec and call the effect context factory with one argument. Desired behavior: every bootScene*.test.ts mock includes sceneSpec and passes the right arguments. Expected result: the tests pass and have no type errors. Why: keeps the thin-wrapper BootScene refactor covered by green, type-safe tests.

## Acceptance criteria
- Given bootSceneFallback.test.ts and bootScenePreload.test.ts, When they mock '../src/runtime/content', Then the mock exposes scene, manifest and sceneSpec
- Given bootSceneEffects.test.ts, When it calls createPhaserEffectContext, Then it passes the scene and a resolveKey function and tsc reports no arity error
- Given the bootScene*.test.ts files, When they run under vitest, Then all pass


## Scope
- In scope: game/frontend/tests/bootScene*.test.ts
- In scope: type-only fixes in BootScene.ts, effectContext.ts, content.ts
- Out of scope: BootScene behavior changes
- Out of scope: backend
- Preserve: BootScene runtime behavior
- Preserve: existing passing assertions


## Technical constraints
- Vitest and phaser mocked; no browser
- Tests live in game/frontend/tests


## Definition of done
- Updated bootScene tests pass
- No type errors in bootScene*.test.ts


## Clarifying questions
- None
