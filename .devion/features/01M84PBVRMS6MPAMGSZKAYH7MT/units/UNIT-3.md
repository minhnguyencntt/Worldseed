---
id: "01M84PBVRNDSZ274KK4JBHYTWX"
kind: unit
parent: 01M84PBVRNCNBVKKNDV8Q60DX0
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement the manifest loader

Implement loader that never throws.

## Acceptance criteria
- Returns report with errors, dangling, missing
- resolveAsset returns fallback for missing


## Scope
- In scope: loader file
- Out of scope: tests


## Technical constraints
- exists injected
- New file: `game/src/assets/loaders/manifestLoader.ts`


## Definition of done
- Loader exported


## Clarifying questions
- None
