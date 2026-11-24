---
id: "01M84VMJ3A099CQEHQ7Z1T39RE"
kind: unit
parent: 01M84VMJ3A52YFCQ2ACYAXZW9B
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Dedupe and strip stage prefixes in parseGitLsFiles

Modify parseGitLsFiles in trackedNodeModules.ts so conflict stage entries collapse to one path.

## Acceptance criteria
- parseGitLsFiles returns each path once for stage 1-3 duplicates.
- Stage-prefixed lines yield the bare path.


## Scope
- In scope: parseGitLsFiles
- Out of scope: Other helpers
- Preserve: Signature (output: string): string[]


## Technical constraints
- Pure function
- Code path: `game/frontend/src/lib/trackedNodeModules.ts`


## Definition of done
- Implementation merged; npx tsc --noEmit passes


## Clarifying questions
- None
