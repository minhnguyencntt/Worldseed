---
id: "01M84PNYJWJKMZZD8KEB85A040"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-2.1 Typed manifest interfaces and zod validators

Context: game/ has a yaml-only runtime (game/package.json) with src/content, engine, state and systems, but no src/assets folder. Desired behavior: a typed asset manifest module with zod runtime validators covering asset id, path, type, dimensions, spritesheet frames, animations, origin/anchor and interaction bounds. Expected result: later cycles can validate manifest JSON without touching the engine. Why: AI-friendly, validated content architecture.

## Acceptance criteria
- Given game/package.json, when read, then zod is declared as a dependency
- Given a valid manifest object, when validated, then typed data is returned
- Given an invalid manifest object, when validated, then a failure naming the bad field path is returned
- Given the module, when imported, then TypeScript interfaces exist for id, path, type, dimensions, frames, animations, origin and interaction bounds


## Scope
- In scope: game/src/assets/manifest schemas, types and validators
- In scope: zod dependency in game/package.json
- Out of scope: Manifest loader and reference checks
- Out of scope: Phaser rendering
- Out of scope: Authoring the-boys-room manifest content
- Out of scope: Frontend changes
- Preserve: Existing game/src/content, engine, state and systems behavior
- Preserve: yaml dependency


## Technical constraints
- Use zod as runtime validator
- TypeScript strict, ESM, Bundler resolution
- Files live under game/src/assets/manifest


## Definition of done
- All three requirements delivered and verified by unit tests


## Clarifying questions
- None
