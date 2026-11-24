---
id: "01M85V05ZP2HJ5CMBBQXSWNDJM"
kind: requirement
parent: 01M85V05ZNX1DGBD1YGG1SDED5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Generated boy PNGs and manifest entries exist at their declared sizes

Context: manifest still points to the placeholder character:boy SVG. Desired behavior: art:generate writes boy PNGs and adds entries with new ids character:boy-sheet (448x48) and character:boy-portrait (32x32) while the old SVG entries and scene content stay untouched. Expected result: manifest declares PNG boy assets.

## Acceptance criteria
- Given the manifest, when read, then character:boy-sheet is a spritesheet at 448x48 with 14 frames of 32x48 and a .png path
- Given the manifest, when read, then character:boy-portrait is an image at 32x32 with a .png path
- Given the manifest, when read, then the existing character:boy SVG entry is unchanged


## Scope
- In scope: generated boy PNG files
- In scope: manifest.json boy entries
- Out of scope: world content edits
- Out of scope: removing SVGs
- Preserve: all existing manifest entries


## Technical constraints
- Output only from the deterministic script, no hand-edited PNGs


## Dependencies
- REQ3


## Definition of done
- PNG files and manifest entries produced by npm run art:generate


## Clarifying questions
- None
