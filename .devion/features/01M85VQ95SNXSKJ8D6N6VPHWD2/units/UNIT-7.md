---
id: "01M85VQ95TFNKR68GQEBNHWZT0"
kind: unit
parent: 01M85VQ95S3EEFDY0MT6XG2E13
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Vite publicDir and BootScene PNG preload without fallback

Phaser is mocked as in bootScenePreload.test.ts; the real manifest and scene are used.

## Acceptance criteria
- publicDir ends in game/public
- Preload loads PNG paths
- resolveKey never returns fallback
- Animation frames are 4, 6, 4


## Scope
- In scope: Two new frontend tests
- Out of scope: Product code
- Preserve: Existing bootScene tests


## Technical constraints
- Phaser mocked, no browser


## Dependencies
- A3


## Definition of done
- Both pass


## Clarifying questions
- None
