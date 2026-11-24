---
id: "01M855ASGS17NA12PH9PKXVK71"
kind: unit
parent: 01M855ASGRW00F7RAQ59KM5BX5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: planPreload and resolveTextureKey unit tests

Pure unit tests with in-memory manifest and scene objects; no filesystem.

## Acceptance criteria
- planPreload test asserts deduplicated entries and the unknown ref issue
- resolveTextureKey test asserts the fallback key for an unknown id


## Scope
- In scope: game/tests/preload.test.ts
- Out of scope: Phaser


## Technical constraints
- Fixture shape mirrors assetSchema and sceneSchema in game/src


## Definition of done
- Tests pass


## Clarifying questions
- None
