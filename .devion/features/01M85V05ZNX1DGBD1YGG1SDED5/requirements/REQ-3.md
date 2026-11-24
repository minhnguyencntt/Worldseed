---
id: "01M85V05ZPN09QQFVTJTAK9F00"
kind: requirement
parent: 01M85V05ZNX1DGBD1YGG1SDED5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Generator carries animations and origin into manifest entries and boy sources are registered

Context: ArtSource (src/art/sources.ts) has only id, path, frames, and generateAssets (src/lib/generateAssets.ts) emits entries without animations or origin. Desired behavior: optional fields copied to spritesheet entries; boy sheet declares idle [0-3], walk [4-9], interact [10-13] with rates and origin {0.5,1}; both boy sources added to ART_SOURCES. Expected result: generated entries pass parseManifest.

## Acceptance criteria
- Given a source with animations and origin, when generateAssets runs, then the entry has the same animations and origin
- Given a source without them, when generateAssets runs, then the entry has neither key
- Given ART_SOURCES, when ids are listed, then they include the boy sheet and portrait ids once each
- Given the boy sheet entry, when read, then frameCount is 14 and animations idle, walk, interact cover frames 0-3, 4-9, 10-13


## Scope
- In scope: sources.ts type and registration
- In scope: generateAssets.ts entry copying
- In scope: animation declarations on the boy sheet source
- Out of scope: room source registration
- Out of scope: scene content switch
- Preserve: existing entry shape for sources without new fields
- Preserve: mergeManifest behaviour


## Technical constraints
- Manifest animation shape must match animationSchema in game/src/assets/manifest/schema.ts
- Shared palette; deterministic output


## Dependencies
- REQ1
- REQ2


## Definition of done
- Generated boy entries validate against manifestSchema


## Clarifying questions
- None
