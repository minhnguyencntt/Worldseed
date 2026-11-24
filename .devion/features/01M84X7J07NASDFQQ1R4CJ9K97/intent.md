---
id: "01M84X7J07NASDFQQ1R4CJ9K97"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.2 · Scene object entity with hover, label, click, actions and keyboard access

Context: game/src/entities/SceneObject.ts only creates a sprite (key, position, scale, depth) and toggles visibility from visibleWhen. No interaction helper exists in game/src/systems yet. Desired behavior: every authored ObjectSpec becomes an interactive entity. Expected result: hover highlights the object and shows its name, a click or keyboard activation emits an event carrying the object id and its currently available actions. Why: interactive bedroom objects must be data-driven and keyboard accessible.

## Acceptance criteria
- Given a pointer position inside an object's interactionBounds, When hit-tested, Then the helper reports a hit and a position outside reports a miss
- Given an object with actions guarded by conditions, When the state changes, Then only actions whose conditions pass are listed
- Given a pointer over the object, When hover starts and ends, Then highlight and name label toggle on and off
- Given a click or Enter/Space on a focused visible object, When activated, Then an interact event with the object id and available actions is emitted


## Scope
- In scope: New interaction helper in game/src/systems
- In scope: SceneObject hover, label, click, focus and activation
- In scope: RenderContext/RenderHandle interface extension
- In scope: buildScene focus cycling and interact callback
- Out of scope: Phaser-backed RenderContext implementation
- Out of scope: React ActionMenu changes
- Out of scope: New content or assets
- Preserve: ObjectSpec schema
- Preserve: Existing SceneObject sprite creation arguments and visibility sync
- Preserve: buildScene layer ordering


## Technical constraints
- Engine code stays free of Phaser imports; rendering goes through RenderContext
- Reuse evaluateAll from game/src/systems/conditions.ts


## Definition of done
- All requirements delivered with Act and Verify units
- Unit tests green with fake render context


## Non-functional requirements
- Pure, deterministic helper functions


## Clarifying questions
- None
