---
id: "01M84SZR3WRANJ2K7RKY3PAXNM"
kind: unit
parent: 01M84SZR3WA4EPDRPJ6SSH6FFA
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add isIgnoredByDirRule helper for .gitignore directory rules

Add game/frontend/src/lib/gitignore.ts exporting isIgnoredByDirRule(ignoreText, path) that returns true when some non-comment line ending in `/` without other slashes equals a path segment, and handles anchored rules (containing a slash) by prefix match.

## Acceptance criteria
- Given `node_modules/` and path a/b/node_modules/x, then true
- Given `game/node_modules/` and path game/frontend/node_modules/x, then false


## Scope
- In scope: new helper
- Out of scope: full gitignore grammar
- Preserve: src/lib/phaserPin.ts


## Technical constraints
- Pure function, no fs
- New file: `game/frontend/src/lib/gitignore.ts`


## Definition of done
- Helper exported


## Clarifying questions
- None
