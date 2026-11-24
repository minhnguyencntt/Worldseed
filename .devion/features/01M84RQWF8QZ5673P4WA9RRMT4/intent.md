---
id: "01M84RQWF8QZ5673P4WA9RRMT4"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-4.1 · Pin Phaser to 3.90.x in the frontend package.json and lockfile

Context: game/frontend/package.json declares phaser ^4.2.1 and package-lock.json resolves 4.2.1. The parent goal requires Phaser 3.90. Desired behavior: the manifest and lockfile resolve to a 3.90.x release, and the existing Phaser modules (createGame, config, BootScene, PhaserHost) compile and behave the same. Expected result: no Phaser 4 range or version remains. Why: the StoryForge redesign mandates Phaser 3.90.

## Acceptance criteria
- Given package.json, When read, Then the phaser dependency range only admits 3.90.x versions
- Given package-lock.json, When read, Then the node_modules/phaser entry and the root dependencies entry both resolve to 3.90.x
- Given the frontend modules that import phaser, When type-checked, Then they compile against 3.90 types


## Scope
- In scope: game/frontend/package.json
- In scope: game/frontend/package-lock.json
- In scope: game/frontend/src/phaser/*
- Out of scope: New scenes
- Out of scope: Asset or content changes
- Out of scope: Backend
- Preserve: Event bus API
- Preserve: useGameStore shape
- Preserve: PhaserHost lifecycle behavior


## Technical constraints
- Phaser must be 3.90.x, not 4.x


## Definition of done
- Manifest and lockfile pin Phaser 3.90.x
- Phaser-dependent code compiles on 3.90


## Clarifying questions
- None
