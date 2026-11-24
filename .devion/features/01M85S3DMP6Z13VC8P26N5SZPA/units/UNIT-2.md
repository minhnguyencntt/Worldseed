---
id: "01M85S3DMQS96JW7Y5PFJ328NW"
kind: unit
parent: 01M85S3DMPE72TZPHFV0MP1B20
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add createFsIo and use it in the CLI entry

Replace the cwd-relative entry block in generateArt.ts with an ArtIo built by createFsIo(defaultArtPaths(dirname(fileURLToPath(import.meta.url))), fs).

## Acceptance criteria
- createFsIo returns assetsRoot and manifestPath from the given paths
- readText on a missing manifest throws instead of returning an empty manifest
- The entry block passes real node:fs functions into createFsIo


## Scope
- In scope: generateArt.ts
- Out of scope: Tests
- Preserve: VITEST guard around the entry block


## Technical constraints
- Hard constraint: deterministic in-repo art only
- Code path: `game/frontend/scripts/generateArt.ts`


## Dependencies
- ACT1


## Definition of done
- Entry block no longer references 'public/assets' strings or EMPTY_MANIFEST_TEXT


## Clarifying questions
- None
