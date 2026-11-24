---
id: "01M84PBVRNWN22DRPEVFTCZB2Z"
kind: requirement
parent: 01M84PBVRMS6MPAMGSZKAYH7MT
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · The Boy's Room scene content and asset folders live outside the engine

Context: world content is YAML in game/content and hotspots are hardcoded. Desired behavior: a manifest.json and scene definition (bookshelf, computer, bed, window, door) under game/src/content/worlds/the-boys-room, and the public asset folder tree with .gitkeep files. Why: AI agents edit content, not engine.

## Acceptance criteria
- Given the-boys-room manifest and scene files, When parsed with the R1 schemas, Then both are valid
- Given the scene objects, When listing their asset ids, Then every id exists in the manifest
- Given the repo, When checking game/public/assets, Then all required folders exist


## Scope
- In scope: manifest.json
- In scope: scene.json
- In scope: folder tree
- Out of scope: artwork files
- Out of scope: engine code
- Preserve: game/content/worlds/the-boys-room YAML


## Technical constraints
- Folders created via .gitkeep


## Dependencies
- R1


## Definition of done
- Content validates against schemas


## Clarifying questions
- None
