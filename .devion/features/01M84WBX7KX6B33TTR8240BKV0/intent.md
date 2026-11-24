---
id: "01M84WBX7KX6B33TTR8240BKV0"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5 · Data-driven layered scene renderer and interactive object system

Context: game/src holds engine/scene.ts (pure view/action logic), systems/*, a zod content schema (content/schema.ts) and a manifest loader with fallback (assets/loaders/manifestLoader.ts). The Phaser side (frontend/src/phaser/BootScene.ts) only reads state and renders nothing. Desired behavior: a generic engine under src/engine, src/scenes, src/entities and src/systems builds the bedroom from content definitions with nothing hardcoded in the scene class, renders ordered layers, preloads and validates assets with graceful fallback, supports interactive objects, dust and ambient light effects and scene transitions. Why: future AI cycles must add objects, characters and scenes by editing content and manifest only.

## Acceptance criteria
- Given a scene definition, when it is built, then every object becomes an entity with no object id referenced in engine code
- Given objects on all six layers, when built, then display depth follows Background < Furniture < Interactive < Characters < Effects < UI Overlay
- Given a missing asset, when a scene is built, then a fallback texture is used and no exception is thrown
- Given an interactive object, when hovered, clicked, focused by keyboard or hidden by a visibility condition, then the correct highlight, label, event or removal occurs
- Given effects and a goto_scene event, when handled, then dust, ambient light and a fade transition run from content data


## Scope
- In scope: game/src/engine
- In scope: game/src/scenes
- In scope: game/src/entities
- In scope: game/src/systems
- In scope: game/src/assets/loaders
- In scope: content schema effects field
- In scope: Phaser scene adapter in frontend/src/phaser
- In scope: unit tests with Phaser mocked
- Out of scope: New pixel art
- Out of scope: React UI changes
- Out of scope: Backend/Go API changes
- Preserve: Existing getSceneView and performAction behavior
- Preserve: Existing manifest schema and loader exports
- Preserve: Existing typed event bus in frontend/src/phaser/events.ts


## Technical constraints
- Phaser 3.90 pinned in frontend; game/ package has no phaser dependency so engine code uses structural types
- Tests must mock Phaser, no browser
- Content validated by zod schemas


## Definition of done
- All requirements have Act and Verify units green
- Existing game and frontend unit tests still pass


## Non-functional requirements
- Pixel-art friendly rendering preserved
- No memory leaks: entities destroy their listeners


## Clarifying questions
- None
