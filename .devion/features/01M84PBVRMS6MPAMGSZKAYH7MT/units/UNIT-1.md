---
id: "01M84PBVRN7AG0MQPQ43CW3GAD"
kind: unit
parent: 01M84PBVRNHC06ZTRP1W0EKRQM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add zod and manifest/object schemas

Add zod dependency and create schemas for manifest assets and world objects.

## Acceptance criteria
- Schemas export parse-able validators and inferred types
- zod is declared in game/package.json


## Scope
- In scope: schema files
- Out of scope: tests
- Preserve: existing types.ts


## Technical constraints
- Code path: `game/package.json`
- New file: `game/src/assets/manifest/schema.ts`
- New file: `game/src/assets/manifest/types.ts`


## Definition of done
- Schemas exported: assetManifestSchema, worldObjectSchema, sceneSchema


## Clarifying questions
- None
