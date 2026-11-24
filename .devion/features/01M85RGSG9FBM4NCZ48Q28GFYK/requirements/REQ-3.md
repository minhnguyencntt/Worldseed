---
id: "01M85RGSG9A5951ZCTYZFE3EX6"
kind: requirement
parent: 01M85RGSG9FBM4NCZ48Q28GFYK
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · art:generate script writes PNGs and the manifest, and is wired as an npm script

Context: package.json has no generator command. Desired behavior: runGenerateArt(deps) generates assets, writes each PNG under the assets root and rewrites the manifest JSON with two-space indent and trailing newline; scripts/generateArt.ts wires node:fs; package.json gets art:generate. Why: this is the real entry point that reaches the new code.

## Acceptance criteria
- Given fake IO, when runGenerateArt runs twice, then the written bytes of each file are equal
- Given fake IO, when it runs, then the manifest written parses and holds an entry per source
- Given package.json, when read, then scripts.art:generate equals vite-node scripts/generateArt.ts


## Scope
- In scope: runGenerateArt
- In scope: scripts/generateArt.ts
- In scope: art:generate npm script
- Out of scope: running in CI
- Out of scope: deployment
- Preserve: existing npm scripts


## Technical constraints
- Assets root is game/frontend/public/assets; manifest is game/public/assets/worlds/the-boys-room/manifest.json
- No CDN or image service; deterministic output


## Dependencies
- REQ-1
- REQ-2


## Definition of done
- npm run art:generate works from game/frontend


## Non-functional requirements
- Finishes in seconds


## Clarifying questions
- None
