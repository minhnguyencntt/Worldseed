---
id: "01M84QVS6NJ8XSZ8V72MHBXRTA"
kind: requirement
parent: 01M84QVS6NT825MT9PZAMASKQX
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Each ui folder holds a real tracked SVG under game/public/assets/ui

Context: game/public/assets/ui does not exist. Desired behavior: sound.svg, panel-frame.svg and pointer.svg are added under the matching folders, with the same content as game/frontend/public/assets/ui. Expected result: git tracks all three folders. Why: SG-2.7 requires real files so the folders are tracked.

## Acceptance criteria
- Given game/public/assets/ui/icons, When listed, Then sound.svg exists and is non-empty
- Given game/public/assets/ui/frames and cursors, When listed, Then panel-frame.svg and pointer.svg exist and are non-empty
- Given each of the three SVGs, When read, Then it has an <svg root, width and height attributes and shape-rendering="crispEdges"


## Scope
- In scope: game/public/assets/ui/icons/sound.svg
- In scope: game/public/assets/ui/frames/panel-frame.svg
- In scope: game/public/assets/ui/cursors/pointer.svg
- Out of scope: Other asset folders
- Preserve: game/frontend/public/assets/ui files


## Technical constraints
- Reuse the existing SVG content; do not invent new art


## Definition of done
- Three SVG files exist and are tracked


## Clarifying questions
- None
