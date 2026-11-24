---
id: "01M855ASGSKJS9WVS6S394X2KQ"
kind: requirement
parent: 01M855ASGRMR9B70PK1JTY83JQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene preloads planned assets and falls back for missing ones

BootScene gains preload() that queues each planned entry (image or spritesheet) with this.load, listens for loaderror to record failed keys, and registers a generated fallback texture so missing assets render a visible marker instead of Phaser's default green box or a crash. The manifest is bundled in runtime/content.ts.

## Acceptance criteria
- Given a plan with an image and a spritesheet entry, When preload runs, Then this.load.image and this.load.spritesheet are called with the entry key and url
- Given a loaderror event for a key, When it fires, Then that key is recorded as failed and the fallback texture exists
- Given an unknown ref, When the scene resolves a key, Then the fallback key is returned


## Scope
- In scope: BootScene.preload
- In scope: runtime manifest export
- Out of scope: buildScene rendering of objects
- Preserve: BootScene.create effects and transition wiring


## Technical constraints
- Phaser 3.90 loader API


## Dependencies
- REQ1


## Definition of done
- BootScene uses planPreload and resolveTextureKey


## Clarifying questions
- None
