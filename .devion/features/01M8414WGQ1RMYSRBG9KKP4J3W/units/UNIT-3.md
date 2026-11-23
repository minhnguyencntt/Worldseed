---
id: "01M8414WGRNTE6GPNS1RZ3XY2F"
kind: unit
parent: 01M8414WGR17QT0BMYRJPZ02TC
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Scaffold game runtime and the-boys-room content

Context: No game module exists.
Desired behavior: Add runtime.ts stub and world-content.yaml plus loader.
Expected result: Runtime and content files are separated; loader parses world id/title from YAML text.
Why: Implements REQ-GAME product code only.

## Acceptance criteria
- Given Act complete, when inspecting the root, then runtime.ts and world-content.yaml both exist.
- Given YAML text for the-boys-room, when loadWorldFromYaml parses it, then id and title match the content file.


## Scope
- In scope: runtime stub
- In scope: content YAML
- In scope: YAML loader
- In scope: yaml dependency on package.json
- Out of scope: Test files
- Out of scope: Full RPG systems
- Out of scope: UI
- Out of scope: Nested game/ directory
- Preserve: Runtime file separate from content YAML


## Technical constraints
- Keep world data in YAML files
- Do not put prose story content inside runtime.ts
- New file: `package.json`
- New file: `runtime.ts`
- New file: `loadWorld.ts`
- New file: `world-content.yaml`
- New file: `bedroom.yaml`


## Dependencies
- REQ-GAME
- ACT-FE


## Definition of done
- All code_paths created
- No test files added by this Act


## Clarifying questions
- None
