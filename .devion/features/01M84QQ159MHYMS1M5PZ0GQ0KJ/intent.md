---
id: "01M84QQ159MHYMS1M5PZ0GQ0KJ"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-2.6 · Create the asset files that manifest.json references

Context: game/public/assets/worlds/the-boys-room/manifest.json lists ten the-boys-room assets (backgrounds/bedroom-room.svg, furniture/bed.svg, bookshelf.svg, desk.svg, objects/old-computer.svg, window.svg, door.svg, characters/boy-sheet.svg, effects/dust.svg, audio/ambient-room.wav). Today only manifest.json lives under game/public; the files exist solely under game/frontend/public/assets. Desired behavior: the ten files exist under game/public/assets/worlds/the-boys-room. Expected result: every manifest path resolves to a real file. Why: the asset architecture keeps content under game/public/assets and the loader must not report missing assets.

## Acceptance criteria
- Given game/public/assets as the root, When each of the ten listed manifest paths is resolved, Then a non-empty file exists
- Given the manifest, When parseManifest runs, Then it still returns ok
- Given the files, When inspected, Then each SVG is well-formed and the WAV has a RIFF/WAVE header


## Scope
- In scope: Ten asset files under game/public/assets/worlds/the-boys-room
- Out of scope: Editing manifest.json
- Out of scope: ui/* assets
- Out of scope: Runtime or loader changes
- Out of scope: Final production artwork
- Preserve: manifest.json content
- Preserve: game/frontend/public/assets files
- Preserve: existing tests


## Technical constraints
- Temporary pixel-art SVGs with shape-rendering crispEdges
- Do not touch .ai-dlc or context.md


## Definition of done
- All ten files exist at the manifest paths
- New unit tests pass


## Clarifying questions
- None
