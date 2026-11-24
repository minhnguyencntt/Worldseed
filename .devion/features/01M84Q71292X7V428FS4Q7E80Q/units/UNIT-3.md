---
id: "01M84Q712AF04JQC3TMMGNJNYC"
kind: unit
parent: 01M84Q7129NS7S0B3JNV1JVDAR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement loadManifestFile with on-disk reference check

Create game/src/assets/loaders/manifestLoader.ts exporting loadManifestFile.

## Acceptance criteria
- Given a valid manifest and files, when called, then returns ok with data
- Given a missing file or bad JSON, when called, then returns issues and does not throw


## Scope
- In scope: new loader file
- Out of scope: tests
- Preserve: manifest/index.ts


## Technical constraints
- Return ParseResult shape from manifest/index.ts
- New file: `game/src/assets/loaders/manifestLoader.ts`


## Definition of done
- Loader exported


## Clarifying questions
- None
