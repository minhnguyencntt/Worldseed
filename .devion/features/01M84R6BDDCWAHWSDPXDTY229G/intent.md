---
id: "01M84R6BDDCWAHWSDPXDTY229G"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-3 · Create coherent temporary pixel-art bedroom assets

Context: game/public/assets/worlds/the-boys-room holds one flattened bedroom background, three furniture SVGs, three object SVGs, one idle-only boy sheet and one dust SVG. Desired behavior: separate layered files for background, furniture, objects, characters and effects are registered in manifest.json with dimensions, frames and animations, and a document lists replacement requirements. Expected result: manifest-driven, validated, no gray placeholders. Why: future cycles can swap individual assets.

## Acceptance criteria
- Given the manifest, when loaded, then wall, floor, window and lighting background assets, five furniture assets, computer, books, door, window and secret door state assets, three boy sheets and dust and glow effects all exist as separate files
- Given a spritesheet entry, when validated, then frameCount matches the sheet dimensions and every animation frame index is valid
- Given the replacement document, when read, then it lists temporary-asset replacement requirements and does not claim production quality
- Given every manifest entry, when resolved, then it points to an existing file


## Scope
- In scope: SVG assets under game/public/assets/worlds/the-boys-room
- In scope: manifest.json entries
- In scope: schema validation of frames and animations
- In scope: replacement requirements document
- Out of scope: Phaser scene rendering changes
- Out of scope: backend changes
- Out of scope: production-quality artwork
- Preserve: existing manifest ids such as scene:bedroom, objects/bed and character:boy
- Preserve: existing manifest tests


## Technical constraints
- Use crisp pixel-art SVG (shape-rendering=crispEdges) with explicit integer width/height
- No gray rectangles as placeholders
- Manifest typed by zod schema in game/src/assets/manifest/schema.ts


## Definition of done
- All requirements delivered and unit tests green


## Clarifying questions
- None
