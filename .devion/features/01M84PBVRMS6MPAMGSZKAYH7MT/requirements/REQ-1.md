---
id: "01M84PBVRNHC06ZTRP1W0EKRQM"
kind: requirement
parent: 01M84PBVRMS6MPAMGSZKAYH7MT
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Typed manifest and object schemas with runtime validators

Context: no manifest or object schema exists. Desired behavior: AssetManifest records id, path, type, dimensions, spritesheet frames, animations, origin/anchor and interaction bounds; object schema covers position, scale, layer, bounds, actions, visibility conditions and persistent-state fields. Why: single validated contract for content.

## Acceptance criteria
- Given a valid manifest entry for each asset type, When parsed, Then it succeeds and returns typed data
- Given an entry with missing id, negative dimensions or unknown type, When parsed, Then it fails naming the offending field path
- Given a world object with position, scale, layer, bounds, actions, visibleWhen and persistentState, When parsed, Then it succeeds; an unknown layer fails


## Scope
- In scope: game/src/assets/manifest schemas and types
- Out of scope: loader
- Out of scope: content data
- Preserve: game/src/state/types.ts


## Technical constraints
- zod added to game/package.json


## Definition of done
- Schemas and inferred types exported


## Clarifying questions
- None
