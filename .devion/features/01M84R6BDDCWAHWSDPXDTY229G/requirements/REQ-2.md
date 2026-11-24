---
id: "01M84R6BDEKYWKF580D3038DP2"
kind: requirement
parent: 01M84R6BDDCWAHWSDPXDTY229G
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Books and secret door states exist as separate object assets

Context: objects folder has computer, door and window only. Desired behavior: a books object and two secret door state images (closed, open) as separate files with manifest entries. Expected result: persistent door state can switch textures. Why: the bookshelf secret door must stay open on return.

## Acceptance criteria
- Given the manifest, when read, then objects/books, objects/secret-door-closed and objects/secret-door-open exist
- Given each SVG, when its size is read, then it equals manifest dimensions
- Given both secret door states, when compared, then they have identical dimensions and different content


## Scope
- In scope: 3 SVG files
- In scope: 3 manifest entries with interactionBounds
- Out of scope: object state logic in content YAML
- Preserve: existing door and window entries


## Technical constraints
- Both door states share one size


## Definition of done
- Files and entries committed


## Clarifying questions
- None
