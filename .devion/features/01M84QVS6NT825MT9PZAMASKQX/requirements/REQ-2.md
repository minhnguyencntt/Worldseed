---
id: "01M84QVS6PEN370GZRXGK3JXYX"
kind: requirement
parent: 01M84QVS6NT825MT9PZAMASKQX
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Manifest ui entries carry dimensions that match the SVG files

Context: the three ui manifest entries have id, path and type but no dimensions, and the asset manifest requires dimensions for the asset records. Desired behavior: add dimensions 16x16, 24x24 and 16x16 matching the SVG width and height attributes. Expected result: the manifest still validates and every ui path resolves. Why: SG-2.7 asks for matching manifest entries.

## Acceptance criteria
- Given manifest.json, When parsed with parseManifest, Then ok is true
- Given the ui:icon-sound entry, When read, Then dimensions is {width:16,height:16}; ui:panel-frame is {24,24}; ui:cursor-pointer is {16,16}
- Given each ui entry path, When resolved under game/public/assets, Then the file exists and its SVG width and height equal the entry dimensions


## Scope
- In scope: The three ui entries in manifest.json
- Out of scope: Non-ui entries
- Preserve: ids and paths of all entries


## Technical constraints
- dimensions must be positive integers per dimensionsSchema


## Dependencies
- REQ1


## Definition of done
- Manifest ui entries have correct dimensions


## Clarifying questions
- None
