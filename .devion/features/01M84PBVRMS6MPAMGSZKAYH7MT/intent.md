---
id: "01M84PBVRMS6MPAMGSZKAYH7MT"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-2 Typed asset manifest and validated content schemas

Context: game/ has YAML-based content (game/src/content/loader.ts) and a hardcoded ASSET_PATHS/HOTSPOTS map in game/frontend/src/runtime/assets.ts. Desired behavior: typed interfaces plus zod validators for the asset manifest and world objects, scene/location content under game/src/content/worlds/the-boys-room, the asset folder tree, and a loader that reports missing assets without crashing. Why: future AI cycles can add or replace assets without rewriting the engine.

## Acceptance criteria
- Given a manifest and world content, When validated, Then typed zod schemas accept valid data and reject invalid data with path-specific errors
- Given a manifest reference to a file that does not exist, When the loader runs, Then it reports the asset as missing and does not throw
- Given the repo, When listing game/public/assets, Then worlds/the-boys-room/{backgrounds,furniture,objects,characters,effects,audio} and ui/{icons,frames,cursors} exist


## Scope
- In scope: zod schemas and TS types
- In scope: the-boys-room content files
- In scope: asset folder tree
- In scope: manifest loader and unit tests
- Out of scope: Phaser rendering
- Out of scope: new artwork
- Out of scope: UI changes
- Preserve: existing game/content YAML loader and its tests
- Preserve: game/frontend runtime behavior


## Technical constraints
- TypeScript with zod runtime validators
- content separate from engine


## Definition of done
- All requirements, Act and Verify units complete


## Clarifying questions
- None
