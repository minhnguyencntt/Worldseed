---
id: "01M85W67040N1DWBZAFHXB0R6G"
kind: requirement
parent: 01M85W6704EZDXVXS3Q7YVB48F
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Item icon PNGs are generated and registered in the manifest at declared size

Context: art:generate (game/frontend/scripts/generateArt.ts) writes PNGs under game/public/assets and merges entries into worlds/the-boys-room/manifest.json; tests/sceneArtSources.test.ts compares generated entries with the committed manifest and checks palette and PNG sizes. Desired behavior: after running art:generate, six item/ entries with 16x16 dimensions are committed with their PNGs, and sceneArtSources.test.ts explicitly asserts them. Why: the criterion asks for icons registered in the manifest and covered by the existing test.

## Acceptance criteria
- Given the committed manifest, When item/ entries are listed, Then six image entries have dimensions 16x16 and paths ending .png under worlds/the-boys-room/items/.
- Given the generated files, When PNG headers are read, Then each item PNG size equals its manifest dimensions.
- Given the manifest, When scanned, Then no path ends in .svg.


## Scope
- In scope: Running art:generate
- In scope: Committed manifest item entries and PNG files
- In scope: Extending tests/sceneArtSources.test.ts
- Out of scope: Inventory UI rendering
- Preserve: Existing manifest entries unchanged


## Technical constraints
- Manifest is only updated by the deterministic art:generate script, not hand-edited.


## Dependencies
- REQ1


## Definition of done
- Manifest and PNGs committed in sync with sources.


## Clarifying questions
- None
