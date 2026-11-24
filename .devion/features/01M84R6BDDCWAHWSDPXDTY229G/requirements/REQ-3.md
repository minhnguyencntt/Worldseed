---
id: "01M84R6BDEZJJTVK98H3EATG7J"
kind: requirement
parent: 01M84R6BDDCWAHWSDPXDTY229G
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Boy walk and interact spritesheets and glow effect are registered

Context: character:boy is an idle sheet with 2 frames at 64x48. Desired behavior: character:boy-walk (4 frames, 128x48) and character:boy-interact (3 frames, 96x48) with 32x48 frames and animations, plus effect:glow. Expected result: the boy has idle, walk and interact animations. Why: character animation requirement.

## Acceptance criteria
- Given the manifest, when read, then character:boy-walk has frameCount 4 and animation walk, character:boy-interact has frameCount 3 and animation interact, and effect:glow exists
- Given each sheet SVG, when its width is read, then it equals frameWidth multiplied by frameCount
- Given the idle sheet, when read, then character:boy still defines the idle animation


## Scope
- In scope: 3 SVG files
- In scope: 3 manifest entries
- Out of scope: NPC sheets
- Out of scope: Phaser animation creation
- Preserve: character:boy entry


## Technical constraints
- Frame size 32x48, origin 0.5,1


## Definition of done
- Files and entries committed


## Clarifying questions
- None
