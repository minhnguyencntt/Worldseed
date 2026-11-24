---
id: "01M855ASGRMR9B70PK1JTY83JQ"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.4 Asset preload and validation with fallback used by the scene

Context: BootScene (game/frontend/src/phaser/BootScene.ts) has no preload(); scene object and dust asset ids in bedroom.yaml are never validated against the manifest at load time. Desired behavior: a pure engine planner decides which manifest assets the scene needs and reports unknown or missing ones, and BootScene preloads them and substitutes a fallback texture for any that are missing. Why: missing assets must not crash the scene.

## Acceptance criteria
- Given a scene whose objects and effects reference manifest ids, When the preload plan is built, Then it lists each referenced asset once with its path, type and frame spec
- Given a scene referencing an id absent from the manifest or a file that fails to load, When the scene runs, Then the fallback texture key is used and no exception is thrown
- Given BootScene starts, When Phaser calls preload, Then the planned assets are queued through the planner


## Scope
- In scope: engine preload planner
- In scope: fallback texture resolver
- In scope: BootScene preload wiring
- Out of scope: new artwork
- Out of scope: backend changes
- Out of scope: rewriting buildScene
- Preserve: existing manifest schema
- Preserve: existing buildEffects and playSceneTransition behavior


## Technical constraints
- Phaser 3.90 APIs only
- Engine modules under game/src stay Phaser-free and take injected contexts


## Definition of done
- Both requirements are implemented, verified and the scene uses the preload step


## Non-functional requirements
- Unit tests run with Phaser mocked


## Clarifying questions
- None
